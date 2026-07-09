"use client";

/**
 * HeroVisual — HM-TECH 3D visual
 * ------------------------------------------------------------------
 * Visual-only: the laptop plus four quiet software-themed elements —
 * a build/deploy status pill, a code editor card, an AI badge, and a
 * synced-device chip — tied together with subtle animated connector
 * lines so it reads as one connected system rather than icons
 * scattered around a laptop. No hero copy — that lives in your own
 * page/section markup, this component just fills its container.
 * Drop it in the right column of a 2-col grid, e.g.:
 *
 *   <section className="grid lg:grid-cols-2 gap-10 items-center">
 *     <div>...hero copy...</div>
 *     <HeroVisual />
 *   </section>
 *
 * Kept deliberately restrained — soft gradients and one glow each,
 * not a "tech demo" look — for a professional, product-photography
 * feel.
 *
 * Required deps already used elsewhere in this project:
 *   framer-motion, lucide-react, @react-three/fiber, @react-three/drei
 * ------------------------------------------------------------------
 */

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BrainCircuit, Smartphone, GitBranch, CheckCircle2 } from "lucide-react";

// The 3D canvas must never render on the server.
const Laptop3D = dynamic(() => import("./Laptop3D"), {
  ssr: false,
  loading: () => <VisualSkeleton />,
});

// ───────────────────────────────────────────
// Loading placeholder — shown while the R3F
// chunk + GLB are fetched. Keeps layout stable
// instead of a layout-shifting blank box.
// ───────────────────────────────────────────
function VisualSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "16px",
        background:
          "radial-gradient(circle at 50% 40%, rgba(139,92,246,0.10), transparent 60%), #0a0a0f",
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

// ───────────────────────────────────────────
// Floating code card — "software company" reads
// clearly through a code editor
// ───────────────────────────────────────────
const codeLines = [
  "const deploy = async () => {",
  "  await cloud.init({ region: 'global' });",
  "  const pipeline = new AIDataFlow();",
  "  return pipeline.optimize();",
  "};",
];

function CodeEditorCard({ reduceMotion }: { reduceMotion: boolean }) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setKey((k) => k + 1), 6000);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <motion.div
      className="absolute top-[9%] right-[5%] z-10 hidden lg:block"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.55, type: "spring", stiffness: 120, damping: 16 }}
    >
      <div
        style={{
          width: "250px",
          background: "rgba(15,10,26,0.92)",
          borderRadius: "12px",
          border: "1px solid rgba(139,92,246,0.18)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(139,92,246,0.08)",
          overflow: "hidden",
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            padding: "9px 14px",
            background: "rgba(139,92,246,0.06)",
            borderBottom: "1px solid rgba(139,92,246,0.12)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {["#ef4444", "#facc15", "#4ade80"].map((c) => (
            <span key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c }} />
          ))}
          <span style={{ marginLeft: "6px", fontSize: "10.5px", opacity: 0.5, color: "#fff" }}>deploy.js</span>
        </div>
        <div style={{ padding: "14px 16px", minHeight: "96px" }}>
          <AnimatePresence mode="wait">
            <motion.div key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {codeLines.map((line, i) => (
                <motion.div
                  key={`${key}-${i}`}
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduceMotion ? 0 : i * 0.35, duration: 0.3 }}
                  style={{
                    fontSize: "10.5px",
                    color: i === 0 ? "#c084fc" : i === 3 ? "#4ade80" : "#a8a3b8",
                    lineHeight: 1.65,
                    whiteSpace: "pre",
                  }}
                >
                  {line}
                  {i === codeLines.length - 1 && (
                    <motion.span
                      aria-hidden
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: reduceMotion ? 0 : codeLines.length * 0.35 }}
                      style={{
                        display: "inline-block",
                        width: "6px",
                        height: "11px",
                        marginLeft: "3px",
                        background: "#8B5CF6",
                        animation: reduceMotion ? "none" : "hmCursorBlink 1s step-end infinite",
                        verticalAlign: "text-bottom",
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <style>{`
        @keyframes hmCursorBlink { 50% { opacity: 0; } }
      `}</style>
    </motion.div>
  );
}

// ───────────────────────────────────────────
// Deploy status card — a CI/deploy pill reading
// "Build passing". Pairs the code card with a
// second, distinct piece of dev-tool language
// instead of two similar-looking widgets.
// ───────────────────────────────────────────
function DeployStatusCard({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      className="absolute top-[10%] left-[5%] z-10 hidden lg:block"
      initial={{ opacity: 0, y: -18, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ delay: 0.7, type: "spring", stiffness: 140, damping: 16 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 16px 10px 10px",
          borderRadius: "12px",
          background: "rgba(15,10,26,0.92)",
          border: "1px solid rgba(139,92,246,0.18)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.45), 0 0 24px rgba(139,92,246,0.06)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "9999px",
            background: "rgba(74,222,128,0.12)",
            border: "1px solid rgba(74,222,128,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <motion.div
            initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.4, type: "spring", stiffness: 300, damping: 14 }}
            style={{ display: "flex" }}
          >
            <CheckCircle2 size={16} color="#4ADE80" strokeWidth={2} />
          </motion.div>
        </div>
        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#fff",
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              lineHeight: 1.3,
            }}
          >
            Build passing
          </div>
          <div
            style={{
              fontSize: "9.5px",
              color: "#8a85a0",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              lineHeight: 1.3,
            }}
          >
            <GitBranch size={10} strokeWidth={2} />
            main · deployed
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ───────────────────────────────────────────
// Connector lines — thin gradient threads from
// each floating card toward the laptop, with a
// slow flowing dash to suggest live data sync.
// This is what turns "icons scattered around a
// laptop" into "one connected system" visually.
// ───────────────────────────────────────────
function ConnectorLines({ reduceMotion }: { reduceMotion: boolean }) {
  // Percent-based coordinates in a 0–100 viewBox, roughly matching the
  // corner positions of the four cards and a shared point near the
  // laptop's screen. Tune these if you reposition the cards above.
  const paths = [
    "M 80 17 Q 64 30 51 44", // deploy status card -> laptop
    "M 20 18 Q 36 32 51 44", // code editor card -> laptop
    "M 14 84 Q 30 66 45 53", // device chip -> laptop
    "M 86 82 Q 68 66 55 53", // AI badge -> laptop
  ];

  return (
    <svg
      className="absolute inset-0 z-[5] hidden lg:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <defs>
        <linearGradient id="hmConnectorGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
          <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="url(#hmConnectorGradient)"
          strokeWidth={0.3}
          strokeLinecap="round"
          strokeDasharray="2.5 2"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            ...(reduceMotion ? {} : { strokeDashoffset: [0, -9] }),
          }}
          transition={{
            pathLength: { delay: 1.3 + i * 0.12, duration: 0.85, ease: "easeInOut" },
            opacity: { delay: 1.3 + i * 0.12, duration: 0.4 },
            strokeDashoffset: reduceMotion
              ? undefined
              : { delay: 2.2, duration: 2.6, repeat: Infinity, ease: "linear" },
          }}
        />
      ))}
    </svg>
  );
}

// ───────────────────────────────────────────
// AI illustration badge — a restrained circular
// mark, not a glowing sticker. One soft pulse
// behind a solid gradient disc reads as "active
// processing" without looking busy.
// ───────────────────────────────────────────
function AIBadge({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      className="absolute bottom-[15%] right-[7%] z-10 hidden lg:block"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.06 }}
      transition={{ delay: 0.85, type: "spring", stiffness: 160, damping: 14 }}
    >
      <div style={{ position: "relative", width: "54px", height: "54px" }}>
        {!reduceMotion && (
          <motion.span
            aria-hidden
            animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "9999px",
              background: `radial-gradient(circle, ${"#8B5CF6"}55, transparent 70%)`,
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "9999px",
            background: "linear-gradient(135deg, #6D28D9, #8B5CF6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 12px 32px rgba(109,40,217,0.35)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <BrainCircuit size={22} color="#ffffff" strokeWidth={1.6} />
        </div>
      </div>
    </motion.div>
  );
}

// ───────────────────────────────────────────
// Floating device chip — a secondary device
// syncing with the dashboard
// ───────────────────────────────────────────
function DeviceChip({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      className="absolute bottom-[16%] left-[6%] z-10 hidden lg:block"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      transition={{ delay: 1.0, type: "spring", stiffness: 160, damping: 14 }}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
        style={{
          width: "46px",
          height: "46px",
          borderRadius: "12px",
          background: "rgba(15,10,26,0.9)",
          border: "1px solid rgba(139,92,246,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <Smartphone size={19} color="#A78BFA" strokeWidth={1.6} />
      </motion.div>
    </motion.div>
  );
}

// ───────────────────────────────────────────
// Main export — drop this into your existing
// hero grid's right column, or use full-bleed.
// ───────────────────────────────────────────
export default function HeroVisual() {
  const reduceMotion = Boolean(useReducedMotion());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This ensures client-side-only components don't cause a hydration mismatch.
    setIsMounted(true);
  }, []);

  return (
    <div
      className="relative w-full h-[340px] sm:h-[440px] lg:h-[600px] overflow-hidden rounded-2xl"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 38%, rgba(139,92,246,0.12), rgba(10,10,15,0.4) 55%, #0a0a0f 85%)",
      }}
    >
      <div className="absolute inset-0">
        <Suspense fallback={<VisualSkeleton />}>
          <Laptop3D />
        </Suspense>
      </div>

      {isMounted && (
        <>
          <ConnectorLines reduceMotion={reduceMotion} />
          <DeployStatusCard reduceMotion={reduceMotion} />
          <CodeEditorCard reduceMotion={reduceMotion} />
          <AIBadge reduceMotion={reduceMotion} />
          <DeviceChip reduceMotion={reduceMotion} />
        </>
      )}

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