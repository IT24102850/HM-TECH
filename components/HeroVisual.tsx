"use client";

/**
 * HeroVisual — HM-TECH 3D visual
 * ------------------------------------------------------------------
 * Visual-only: just the 3D laptop. The floating software-themed
 * overlay cards (Build passing, deploy.js, AI badge, device chip,
 * connector lines) have been removed per request — this now renders
 * Laptop3D alone inside its wrapping frame.
 * ------------------------------------------------------------------
 */

import { Suspense } from "react";
import dynamic from "next/dynamic";

// The 3D canvas must never render on the server.
const Laptop3D = dynamic(() => import("./Laptop3D"), {
  ssr: false,
  loading: () => <VisualSkeleton />,
});

// Loading placeholder
function VisualSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "16px",
        background: "radial-gradient(circle at 50% 40%, rgba(120,120,120,0.1), transparent 60%), #0a0a0f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "160px",
          height: "100px",
          borderRadius: "6px",
          border: "1px solid rgba(139,92,246,0.2)",
          background: "rgba(139,92,246,0.05)",
          animation: "hmPulse 1.8s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes hmPulse { 0%,100% { opacity: .5 } 50% { opacity: 1 } }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

// Main component
export default function HeroVisual() {
  return (
    <div
      className="relative w-full h-[340px] sm:h-[440px] lg:h-[600px] overflow-hidden rounded-2xl"
      style={{
        background: "radial-gradient(120% 90% at 50% 38%, rgba(120,120,120,0.1), rgba(10,10,15,0.4) 55%, #0a0a0f 85%)",
      }}
    >
      <div className="absolute inset-0">
        <Suspense fallback={<VisualSkeleton />}>
          <Laptop3D />
        </Suspense>
      </div>

      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}