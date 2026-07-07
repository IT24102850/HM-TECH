"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Activity, Banknote, Truck, ShoppingBag, HeartPulse, Building2 } from "lucide-react";
import TiltCard from "@/components/TiltCard";

const categories = ["All", "Fintech", "Healthtech", "Logistics", "Commerce"] as const;

const projects = [
  { name: "Ledgerline", category: "Fintech", icon: Banknote, result: "37% faster checkout", copy: "Rebuilt a legacy ledger UI into a real-time reconciliation dashboard." },
  { name: "Vitalcare OS", category: "Healthtech", icon: HeartPulse, result: "2.1x clinician adoption", copy: "A scheduling and charting platform designed around clinician workflow, not admin convenience." },
  { name: "Portway", category: "Logistics", icon: Truck, result: "19% lower fleet idle-time", copy: "Live fleet routing with a 3D yard-map view for dispatch teams." },
  { name: "Northfield Markets", category: "Commerce", icon: ShoppingBag, result: "28% higher AOV", copy: "A storefront rebuilt around a 3D product configurator for custom orders." },
  { name: "Cascade Health", category: "Healthtech", icon: Activity, result: "41% fewer no-shows", copy: "Patient intake and reminders redesigned for a mobile-first waiting room." },
  { name: "Brightloop Capital", category: "Fintech", icon: Building2, result: "3x faster onboarding", copy: "KYC and onboarding flow rebuilt as a guided, single-page journey." },
];

export default function PortfolioGrid() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2.5">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === c
                ? "border-iris-600 bg-iris-gradient text-white shadow-iris-sm"
                : "border-iris-200 bg-white text-ink/70 hover:border-iris-400"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {filtered.map((p) => (
          <motion.div
            key={p.name}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <TiltCard>
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-iris-gradient text-white shadow-iris-sm">
                  <p.icon className="h-6 w-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-iris-500">{p.category}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-ink">{p.name}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink/60">{p.copy}</p>
              <div className="mt-6 flex items-center justify-between border-t border-iris-100 pt-5">
                <span className="text-sm font-semibold text-iris-700">{p.result}</span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-ink/50">
                  Case study <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
