import { useEffect, useRef, useState } from 'react';

interface ScrollRevealOptions {
  /** Offset threshold to enter: e.g. 0.1 */
  threshold?: number;
  /** Margin for triggering entry (e.g. '0px 0px -40px 0px') */
  rootMargin?: string;
  /** Buffer margin outside viewport before re-arming (default 50px) */
  exitBufferPx?: number;
}

/**
 * Lightweight scroll reveal hook with natural re-arming on full viewport exit.
 * Guarantees no restarts from small movements near the screen edge.
 * Immediate visibility under prefers-reduced-motion.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -30px 0px',
    exitBufferPx = 50,
  } = options;

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Immediate visibility if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Check initial position on mount
    const initialRect = element.getBoundingClientRect();
    const inViewport = initialRect.top < window.innerHeight && initialRect.bottom > 0;
    if (inViewport) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // Re-arm only after the element has genuinely left the viewport by exitBufferPx
            const rect = entry.boundingClientRect;
            const fullyAbove = rect.bottom < -exitBufferPx;
            const fullyBelow = rect.top > window.innerHeight + exitBufferPx;
            if (fullyAbove || fullyBelow) {
              setIsVisible(false);
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, exitBufferPx]);

  return [ref, isVisible] as const;
}
