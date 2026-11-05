import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { ProductId, getProductById } from '../data/products';

export type AppRoute =
  | { view: 'home' }
  | { view: 'product'; productId: ProductId };

interface RouterContextType {
  route: AppRoute;
  navigateToHome: (targetHash?: string) => void;
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
  const routeRef = useRef(route);
  routeRef.current = route;

  const [lastOpenedProductId, setLastOpenedProductId] = useState<ProductId | null>(null);
  const [pendingScrollHash, setPendingScrollHash] = useState<string | null>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const clean = window.location.hash.replace(/^\/?#/, '');
      return clean && !clean.startsWith('/products/') ? clean : null;
    }
    return null;
  });
  const catalogScrollYRef = useRef<number>(0);

  // Instant scroll jump helper (never animates through previous pages)
  const jumpToTopInstant = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  };

  // Single owner for cross-view scroll-to-section: executes once target section renders on home
  useEffect(() => {
    if (route.view === 'home' && pendingScrollHash) {
      const scrollToTarget = () => {
        const el = document.getElementById(pendingScrollHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setPendingScrollHash(null);
          return true;
        }
        return false;
      };

      if (!scrollToTarget()) {
        const frame = requestAnimationFrame(() => {
          if (!scrollToTarget()) {
            setTimeout(scrollToTarget, 30);
          }
        });
        return () => cancelAnimationFrame(frame);
      }
    }
  }, [route.view, pendingScrollHash]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const targetRoute = parsePath(window.location.pathname, window.location.hash);
      const prevRoute = routeRef.current;

      const isViewChanging =
        targetRoute.view !== prevRoute.view ||
        (targetRoute.view === 'product' &&
          prevRoute.view === 'product' &&
          targetRoute.productId !== prevRoute.productId);

      if (!isViewChanging) {
        // In-page anchor navigation on home: do not override scroll with restoreY!
        if (window.location.hash) {
          const targetId = window.location.hash.replace(/^\/?#/, '');
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
        return;
      }

      setRoute(targetRoute);

      if (targetRoute.view === 'product') {
        jumpToTopInstant();
      } else {
        // Returning to catalog from product detail page
        const cleanHash = window.location.hash ? window.location.hash.replace(/^\/?#/, '') : null;
        if (cleanHash && !cleanHash.startsWith('/products/')) {
          setPendingScrollHash(cleanHash);
        } else {
          const restoreY = event.state?.catalogScrollY ?? catalogScrollYRef.current ?? 0;
          window.scrollTo({ top: restoreY, left: 0, behavior: 'instant' as ScrollBehavior });
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateToHome = (targetHash?: string) => {
    const cleanHash = targetHash ? targetHash.replace(/^\/?#/, '') : null;
    const returnY = catalogScrollYRef.current;
    const targetUrl = cleanHash ? `/#${cleanHash}` : '/';

    if (window.location.pathname !== '/' || window.location.hash !== (cleanHash ? `#${cleanHash}` : '')) {
      window.history.pushState({ view: 'home', catalogScrollY: returnY }, '', targetUrl);
    }
    setRoute({ view: 'home' });

    if (cleanHash) {
      setPendingScrollHash(cleanHash);
    } else {
      setPendingScrollHash(null);
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
