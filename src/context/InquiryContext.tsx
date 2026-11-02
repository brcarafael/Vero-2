import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductId, getProductById } from '../data/products';
import { useLanguage } from './LanguageContext';

interface InquiryContextType {
  selectedProductIds: ProductId[];
  addProduct: (id: ProductId) => void;
  removeProduct: (id: ProductId) => void;
  toggleProduct: (id: ProductId) => void;
  clearInquiry: () => void;
  isProductSelected: (id: ProductId) => boolean;
  inquiryCount: number;
  notification: string | null;
  dismissNotification: () => void;
  scrollToInquiryForm: () => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

const STORAGE_KEY = 'vero_inquiry_products';

export function InquiryProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const [selectedProductIds, setSelectedProductIds] = useState<ProductId[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return ['green-coffee']; // Default convenient initial product
  });

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedProductIds));
    } catch {
      // ignore
    }
  }, [selectedProductIds]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3800);
  };

  const addProduct = (id: ProductId) => {
    if (!selectedProductIds.includes(id)) {
      setSelectedProductIds((prev) => [...prev, id]);
      const product = getProductById(id);
      const name = product ? product.title[language] || product.title.en : id;
      const feedback =
        language === 'pt'
          ? `✓ ${name} adicionado à sua consulta`
          : language === 'es'
          ? `✓ ${name} añadido a su consulta`
          : `✓ ${name} added to your inquiry`;
      showNotification(feedback);
    }
  };

  const removeProduct = (id: ProductId) => {
    setSelectedProductIds((prev) => prev.filter((p) => p !== id));
  };

  const toggleProduct = (id: ProductId) => {
    if (selectedProductIds.includes(id)) {
      removeProduct(id);
    } else {
      addProduct(id);
    }
  };

  const clearInquiry = () => {
    setSelectedProductIds([]);
  };

  const isProductSelected = (id: ProductId) => selectedProductIds.includes(id);

  const scrollToInquiryForm = () => {
    const el = document.getElementById('inquiry-form') || document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const value = {
    selectedProductIds,
    addProduct,
    removeProduct,
    toggleProduct,
    clearInquiry,
    isProductSelected,
    inquiryCount: selectedProductIds.length,
    notification,
    dismissNotification: () => setNotification(null),
    scrollToInquiryForm,
  };

  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>;
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
}
