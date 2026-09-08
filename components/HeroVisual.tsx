"use client";

/**
 * HeroVisual - frame and stage for the 3D hero device.
 * The canvas itself is client-only; a glass frame, a violet bloom pool and
 * a skeleton keep the layout stable while WebGL boots.
 */

import { Suspense } from "react";
import dynamic from "next/dynamic";

const Laptop3D = dynamic(() => import("./Laptop3D"), {
  ssr: false,
  loading: () => <VisualSkeleton />,
});

function VisualSkeleton() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="relative h-28 w-44 rounded-lg border border-iris-200 bg-iris-50">
        <div className="absolute inset-0 animate-pulseGlow rounded-lg bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.35),transparent_70%)]" />
      </div>
    </div>
  );
}

export default function HeroVisual() {
  return (
    <div className="relative h-[340px] w-full sm:h-[460px] lg:h-[620px]">
      {/* bloom pool behind the device */}
      <div className="pointer-events-none absolute inset-0 -z-10 animate-pulseGlow rounded-[2rem] bg-[radial-gradient(60%_55%_at_50%_45%,rgba(139,92,246,0.2),transparent_70%)] blur-2xl" />

      {/* rotating conic halo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 animate-spinSlow rounded-full opacity-50 [background:conic-gradient(from_0deg,transparent,rgba(139,92,246,0.22),transparent_45%,rgba(167,139,250,0.22),transparent)] blur-2xl" />

      <div className="absolute inset-0">
        <Suspense fallback={<VisualSkeleton />}>
          <Laptop3D />
        </Suspense>
      </div>

      {/* drag affordance */}
      <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
        drag to rotate
      </p>
    </div>
  );
}
