import React, { useState, useEffect } from 'react';
import {
  AMERICAS_VIEWBOX,
  CANADA_PATH,
  BRAZIL_PATH,
  OTHER_AMERICAS_PATH,
  CANADA_MARKER,
  BRAZIL_MARKER,
} from '../data/americasMapPaths';
import { Language } from '../data/copy';

interface AmericasMapProps {
  isRevealed: boolean;
  language: Language;
}

export default function AmericasMap({ isRevealed, language }: AmericasMapProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (isRevealed && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isRevealed, hasAnimated]);

  // Localized country labels matching verified requirements
  const canadaLabel =
    language === 'pt' || language === 'es' ? 'VERO · Canadá' : 'VERO · Canada';
  const brazilLabel =
    language === 'pt' || language === 'es' ? 'Brasensa · Brasil' : 'Brasensa · Brazil';

  // Single-run reveal logic (stays permanently visible once shown without scroll flicker)
  const isAnimated = prefersReducedMotion || isRevealed || hasAnimated;

  // Connecting curve path between Canada and Brazil markers
  // Sweeps gracefully southeastward over the Atlantic corridor into central Brazil
  const connectionPath = `M ${CANADA_MARKER.x},${CANADA_MARKER.y} C 395,245 450,340 ${BRAZIL_MARKER.x},${BRAZIL_MARKER.y}`;

  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] mx-auto aspect-[540/680] select-none">
      <svg
        viewBox={AMERICAS_VIEWBOX}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full block drop-shadow-2xs"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Map of the Americas illustrating commercial coordination between VERO in Canada and Brasensa in Brazil"
        role="img"
      >
        <defs>
          {/* Subtle gradient for coordinating line */}
          <linearGradient id="coordLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#064E3B" />
            <stop offset="50%" stopColor="#0B3D2E" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>

          {/* Marker glow filter */}
          <filter id="markerGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#064E3B" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 1. Muted, warm continental landmasses of the Americas */}
        <g id="americas-continents">
          <path
            d={OTHER_AMERICAS_PATH}
            fill="#EDE4D0"
            stroke="#DFD5BE"
            strokeWidth="0.65"
            strokeLinejoin="round"
            className="transition-colors duration-300"
          />
        </g>

        {/* 2. Highlighted Canada in deep forest green */}
        <g id="country-canada">
          <path
            d={CANADA_PATH}
            fill="#0B3D2E"
            stroke="#064E3B"
            strokeWidth="0.85"
            strokeLinejoin="round"
            className="transition-all duration-300 hover:brightness-105"
          />
        </g>

        {/* 3. Highlighted Brazil in deep forest green */}
        <g id="country-brazil">
          <path
            d={BRAZIL_PATH}
            fill="#0B3D2E"
            stroke="#064E3B"
            strokeWidth="0.85"
            strokeLinejoin="round"
            className="transition-all duration-300 hover:brightness-105"
          />
        </g>

        {/* 4. Fine curved coordination line joining Canada and Brazil */}
        <g id="commercial-coordination-line">
          {/* Underlay subtle line for depth */}
          <path
            d={connectionPath}
            stroke="#E2ECE3"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* Primary animated connecting line (draws over ~700ms) */}
          <path
            d={connectionPath}
            pathLength="100"
            stroke="url(#coordLineGrad)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="100"
            strokeDashoffset={isAnimated ? '0' : '100'}
            style={{
              transition: prefersReducedMotion
                ? 'none'
                : 'stroke-dashoffset 700ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </g>

        {/* 5. Canada country-level marker pin */}
        <g
          id="marker-canada"
          style={{
            opacity: isAnimated ? 1 : 0,
            transformOrigin: `${CANADA_MARKER.x}px ${CANADA_MARKER.y}px`,
            transform: isAnimated ? 'scale(1)' : 'scale(0.6)',
            transition: prefersReducedMotion ? 'none' : 'opacity 350ms ease-out, transform 350ms ease-out',
          }}
        >
          {/* Subtle outer halo */}
          <circle
            cx={CANADA_MARKER.x}
            cy={CANADA_MARKER.y}
            r="6.5"
            fill="#FAF7EF"
            stroke="#0B3D2E"
            strokeWidth="1.25"
            filter="url(#markerGlow)"
          />
          {/* Inner solid anchor */}
          <circle
            cx={CANADA_MARKER.x}
            cy={CANADA_MARKER.y}
            r="3.5"
            fill="#0B3D2E"
          />
          {/* Center pinpoint */}
          <circle
            cx={CANADA_MARKER.x}
            cy={CANADA_MARKER.y}
            r="1.2"
            fill="#FAF7EF"
          />
        </g>

        {/* 6. Brazil country-level marker pin */}
        <g
          id="marker-brazil"
          style={{
            opacity: isAnimated ? 1 : 0,
            transformOrigin: `${BRAZIL_MARKER.x}px ${BRAZIL_MARKER.y}px`,
            transform: isAnimated ? 'scale(1)' : 'scale(0.6)',
            transition: prefersReducedMotion
              ? 'none'
              : 'opacity 350ms ease-out 120ms, transform 350ms ease-out 120ms',
          }}
        >
          {/* Subtle outer halo */}
          <circle
            cx={BRAZIL_MARKER.x}
            cy={BRAZIL_MARKER.y}
            r="6.5"
            fill="#FAF7EF"
            stroke="#0B3D2E"
            strokeWidth="1.25"
            filter="url(#markerGlow)"
          />
          {/* Inner solid anchor */}
          <circle
            cx={BRAZIL_MARKER.x}
            cy={BRAZIL_MARKER.y}
            r="3.5"
            fill="#0B3D2E"
          />
          {/* Center pinpoint */}
          <circle
            cx={BRAZIL_MARKER.x}
            cy={BRAZIL_MARKER.y}
            r="1.2"
            fill="#FAF7EF"
          />
        </g>
      </svg>

      {/* Responsive HTML Label Overlays: precisely positioned relative to marker coordinates */}
      {/* 12-14 CSS pixels legible across all viewports, never scaled down to microscopic sizes */}
      <div
        className="absolute pointer-events-none transition-all duration-350 ease-out z-10"
        style={{
          left: '56.98%',
          top: '30.97%',
          opacity: isAnimated ? 1 : 0,
          transform: isAnimated
            ? 'translate(-50%, calc(-100% - 10px)) scale(1)'
            : 'translate(-50%, calc(-100% - 6px)) scale(0.9)',
          transition: prefersReducedMotion
            ? 'none'
            : 'opacity 350ms ease-out 120ms, transform 350ms ease-out 120ms',
        }}
      >
        <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded-md bg-[#FAF7EF]/95 shadow-2xs border border-[#0B3D2E]/20 text-xs sm:text-[13px] md:text-sm font-bold text-[#0B3D2E] tracking-tight whitespace-nowrap font-heading">
          {canadaLabel}
        </span>
      </div>

      <div
        className="absolute pointer-events-none transition-all duration-350 ease-out z-10"
        style={{
          left: '86.06%',
          top: '71.50%',
          opacity: isAnimated ? 1 : 0,
          transform: isAnimated
            ? 'translate(-70%, 12px) scale(1)'
            : 'translate(-70%, 8px) scale(0.9)',
          transition: prefersReducedMotion
            ? 'none'
            : 'opacity 350ms ease-out 240ms, transform 350ms ease-out 240ms',
        }}
      >
        <span className="inline-block px-2 sm:px-2.5 py-0.5 rounded-md bg-[#FAF7EF]/95 shadow-2xs border border-[#0B3D2E]/20 text-xs sm:text-[13px] md:text-sm font-bold text-[#0B3D2E] tracking-tight whitespace-nowrap font-heading">
          {brazilLabel}
        </span>
      </div>
    </div>
  );
}

