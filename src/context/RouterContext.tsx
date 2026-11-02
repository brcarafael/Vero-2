import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductId, getProductById } from '../data/products';

export type AppRoute =
  | { view: 'home' }
  | { view: 'product'; productId: ProductId };

interface RouterContextType {
  route: AppRoute;
  navigateToHome: () => void;
  navigateToProduct: (id: ProductId) => void;
  currentPath: string;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

function parsePath(pathname: string, hash: string): AppRoute {
  // Check hash route first: e.g. #/products/green-coffee
  if (hash.startsWith('#/products/')) {
    const slug = hash.replace('#/products/', '').split('?')[0].split('/')[0];
    const match = getProductById(slug);
    if (match) return { view: 'product', productId: match.id };
  }

  // Check pathname route: e.g. /products/green-coffee
  const productPrefix = '/products/';
  if (pathname.startsWith(productPrefix)) {
    const slug = pathname.substring(productPrefix.length).split('?')[0].split('/')[0];
    const match = getProductById(slug);
    if (match) return { view: 'product', productId: match.id };
  }

  return { view: 'home' };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<AppRoute>(() =>
    parsePath(window.location.pathname, window.location.hash)
  );

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parsePath(window.location.pathname, window.location.hash));
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateToHome = () => {
    if (window.location.pathname !== '/' || window.location.hash !== '') {
      window.history.pushState({}, '', '/');
    }
    setRoute({ view: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (id: ProductId) => {
    const newPath = `/products/${id}`;
    window.history.pushState({}, '', newPath);
    setRoute({ view: 'product', productId: id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPath =
    route.view === 'product' ? `/products/${route.productId}` : '/';

  return (
    <RouterContext.Provider
      value={{
        route,
        navigateToHome,
        navigateToProduct,
        currentPath,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return ctx;
}
