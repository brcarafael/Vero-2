import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { InquiryProvider } from './context/InquiryContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import HowVeroHelps from './components/HowVeroHelps';
import CommercialProcess from './components/CommercialProcess';
import OriginAndBrasensa from './components/OriginAndBrasensa';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';
import InquiryBar from './components/InquiryBar';
import ProductDetailView from './components/ProductDetailView';
import { getProductById } from './data/products';

function AppContent() {
  const { route, navigateToHome } = useRouter();

  if (route.view === 'product') {
    const product = getProductById(route.productId);

    if (!product) {
      return (
        <div className="min-h-screen bg-[#FAF7EF] flex flex-col justify-between">
          <Header />
          <main className="flex-grow pt-28 pb-16 max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold font-heading text-[#111827] mb-3">
              Commodity Not Found
            </h1>
            <p className="text-sm text-[#4B5563] mb-6">
              The requested Brazilian agricultural commodity page could not be located.
            </p>
            <button
              onClick={navigateToHome}
              className="px-6 py-2.5 bg-[#064E3B] text-white rounded-xl text-sm font-semibold hover:bg-[#0B3D2E] transition-colors"
            >
              Return to Commodity Catalog
            </button>
          </main>
          <Footer />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#FAF7EF] text-[#111827] flex flex-col selection:bg-[#E2ECE3] selection:text-[#064E3B]">
        <Header />
        <main className="flex-grow pt-16 sm:pt-20">
          <ProductDetailView product={product} />
        </main>
        <InquiryBar />
        <Footer />
      </div>
    );
  }

  // Home Route (Main Discovery & Lead Generation Narrative)
  return (
    <div className="min-h-screen bg-[#FAF7EF] text-[#111827] flex flex-col selection:bg-[#E2ECE3] selection:text-[#064E3B]">
      {/* Fixed Header */}
      <Header />

      {/* Main Narrative Flow */}
      <main className="flex-grow pt-16 sm:pt-20">
        {/* Section 1: Hero & Trade Corridor Desk */}
        <Hero />

        {/* Section 2: Commodity Discovery & Technical Catalog */}
        <Products />

        {/* Section 3: How VERO Assists Canadian & Global Buyers */}
        <HowVeroHelps />

        {/* Section 4: Transparent 4-Step Commercial Process */}
        <CommercialProcess />

        {/* Section 5: Origin & Brasensa Bilateral Structure */}
        <OriginAndBrasensa />

        {/* Section 6: Streamlined Single Lead Intake Form */}
        <LeadForm />
      </main>

      {/* Floating Multi-Product Inquiry Basket */}
      <InquiryBar />

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <InquiryProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </InquiryProvider>
    </LanguageProvider>
  );
}
