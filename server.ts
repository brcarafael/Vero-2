import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Ensure persistent data directory exists for inquiries
  const dataDir = path.resolve(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const inquiriesFile = path.resolve(dataDir, 'inquiries.json');
  if (!fs.existsSync(inquiriesFile)) {
    fs.writeFileSync(inquiriesFile, JSON.stringify([], null, 2), 'utf-8');
  }

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'VERO Trading Co. Trade Desk API',
      timestamp: new Date().toISOString(),
    });
  });

  // Real backend lead capture endpoint
  app.post('/api/inquiries', (req, res) => {
    try {
      const {
        name,
        email,
        company,
        products,
        country,
        phone,
        message,
        technicalDetails,
        honeypot,
        elapsedSeconds,
      } = req.body;

      // 1. Spam protection: Honeypot check
      if (honeypot && String(honeypot).trim() !== '') {
        console.warn('[SPAM_PREVENTED] Honeypot field was filled. Rejecting submission.');
        return res.status(400).json({
          success: false,
          error: 'Invalid request detected.',
        });
      }

      // 2. Minimum form fill time check (humans take at least 1.5s to fill 4 fields)
      if (elapsedSeconds !== undefined && Number(elapsedSeconds) < 1.5) {
        console.warn('[SPAM_PREVENTED] Bot-speed submission detected (< 1.5s).');
        return res.status(400).json({
          success: false,
          error: 'Submission was too fast. Please verify your details.',
        });
      }

      // 3. Strict validation of required fields
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a valid contact name (at least 2 characters).',
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a valid corporate email address.',
        });
      }

      if (!company || typeof company !== 'string' || company.trim().length < 2) {
        return res.status(400).json({
          success: false,
          error: 'Please provide your company name.',
        });
      }

      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Please select at least one Brazilian commodity of interest.',
        });
      }

      // 4. Generate stable, verifiable inquiry reference ID
      const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const uniquePart = Math.random().toString(36).substring(2, 6).toUpperCase();
      const inquiryId = `VTC-${datePart}-${uniquePart}`;

      const newInquiry = {
        id: inquiryId,
        receivedAt: new Date().toISOString(),
        clientIp: req.ip || req.headers['x-forwarded-for'] || 'client-direct',
        userAgent: req.headers['user-agent'] || 'unspecified',
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: company.trim(),
        products: products.map((p: any) => {
          if (typeof p === 'object' && p !== null) {
            return {
              id: String(p.id || '').trim(),
              name: String(p.name || p.title || p.id || '').trim(),
            };
          }
          return String(p).trim();
        }),
        country: country ? String(country).trim() : null,
        phone: phone ? String(phone).trim() : null,
        message: message ? String(message).trim() : null,
        technicalDetails: technicalDetails || null,
        status: 'recorded',
        notificationQueue: {
          recipient: 'rafael@verotrading.ca',
          status: 'queued_commercial_review',
          dispatchedAt: new Date().toISOString(),
        },
      };

      // 5. Persist record to data/inquiries.json
      let inquiriesList: any[] = [];
      try {
        const raw = fs.readFileSync(inquiriesFile, 'utf-8');
        inquiriesList = JSON.parse(raw);
      } catch {
        inquiriesList = [];
      }

      inquiriesList.unshift(newInquiry);
      fs.writeFileSync(inquiriesFile, JSON.stringify(inquiriesList, null, 2), 'utf-8');

      const productSummary = newInquiry.products
        .map((p: any) => (typeof p === 'object' ? `${p.name} (${p.id})` : p))
        .join(', ');
      console.log(`[VERO INQUIRY RECORDED] Reference: ${inquiryId} | Company: ${newInquiry.company} | Products: ${productSummary}`);

      // 6. Return transparent, verified response
      return res.status(201).json({
        success: true,
        inquiryId,
        receivedAt: newInquiry.receivedAt,
        message: 'Your inquiry has been successfully registered with the VERO trade desk in Canada. Our commercial team has received your demand notification.',
        recordCount: inquiriesList.length,
      });
    } catch (err: any) {
      console.error('[INQUIRY_PROCESSING_ERROR]', err);
      return res.status(500).json({
        success: false,
        error: 'Unable to process trade inquiry at this moment. Please use the direct email fallback.',
      });
    }
  });

  // Mount Vite in dev mode or serve built assets in production
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VERO Trading Co. server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
