"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";

const budgets = ["Under $20k", "$20k – $50k", "$50k – $150k", "$150k+"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [budget, setBudget] = useState(budgets[1]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("sent"), 1100);
  }

  return (
    <div className="card-surface relative overflow-hidden p-8 md:p-10">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[360px] flex-col items-center justify-center text-center"
          >
            <div className="grid h-14 w-14 place-items-center rounded-full bg-iris-gradient text-white">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold text-ink">Message sent</h3>
            <p className="mt-2 max-w-xs text-sm text-ink/60">
              Thanks for reaching out — a member of the team will reply
              within one business day.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="Full name" name="name" placeholder="Jordan Lee" required />
              <Field label="Work email" name="email" type="email" placeholder="jordan@company.com" required />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="Company" name="company" placeholder="Company name" />
              <div>
                <label className="mb-2 block text-sm font-medium text-ink/80">Estimated budget</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full rounded-xl border border-iris-200 bg-white px-4 py-3 text-sm text-ink focus:border-iris-500"
                >
                  {budgets.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-ink/80">Tell us about the project</label>
              <textarea
                required
                rows={5}
                placeholder="What are you building, and what does success look like in 90 days?"
                className="w-full resize-none rounded-xl border border-iris-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:border-iris-500"
              />
            </div>
            <button type="submit" disabled={status === "loading"} className="btn-primary w-full sm:w-auto">
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send message <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-ink/80">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-iris-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:border-iris-500"
      />
    </div>
  );
}
