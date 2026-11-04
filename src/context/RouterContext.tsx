import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { ProductId, getProductById } from '../data/products';

export type AppRoute =
  | { view: 'home' }
  | { view: 'product'; productId: ProductId };

interface RouterContextType {
  route: AppRoute;
  navigateToHome: () => void;
  navigateToProduct: (id: ProductId) => void;
  currentPath: string;
  lastOpenedProductId: ProductId | null;
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

  const [lastOpenedProductId, setLastOpenedProductId] = useState<ProductId | null>(null);
  const catalogScrollYRef = useRef<number>(0);

  // Instant scroll jump helper (never animates through previous pages)
  const jumpToTopInstant = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const targetRoute = parsePath(window.location.pathname, window.location.hash);
      setRoute(targetRoute);

      if (targetRoute.view === 'product') {
        jumpToTopInstant();
      } else {
        // Returning to catalog via browser Back button
        const restoreY = event.state?.catalogScrollY ?? catalogScrollYRef.current ?? 0;
        window.scrollTo({ top: restoreY, left: 0, behavior: 'instant' as ScrollBehavior });
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState as EventListener);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState as EventListener);
    };
  }, []);

  const navigateToHome = () => {
    const returnY = catalogScrollYRef.current;

    if (window.location.pathname !== '/' || window.location.hash !== '') {
      window.history.pushState({ view: 'home', catalogScrollY: returnY }, '', '/');
    }
    setRoute({ view: 'home' });

    // Restore catalog position instantly without scrolling through content
    window.scrollTo({ top: returnY, left: 0, behavior: 'instant' as ScrollBehavior });

    // Return focus to the link or card that opened the product
    if (lastOpenedProductId) {
      setTimeout(() => {
        const triggerEl = document.getElementById(`product-detail-trigger-${lastOpenedProductId}`);
        if (triggerEl) {
          triggerEl.focus({ preventScroll: true });
        }
      }, 50);
    }
  };

  const navigateToProduct = (id: ProductId) => {
    // Record current catalog scroll position before leaving home
    if (route.view === 'home') {
      catalogScrollYRef.current = window.scrollY;
    }
    setLastOpenedProductId(id);

    const newPath = `/products/${id}`;
    window.history.pushState(
      { view: 'product', productId: id, catalogScrollY: catalogScrollYRef.current },
      '',
      newPath
    );
    setRoute({ view: 'product', productId: id });

    // Instant top positioning without animated scrolling through the page
    jumpToTopInstant();
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
        lastOpenedProductId,
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
