"use client";

/**
 * Marquee - an endless horizontal ticker. The children are rendered twice and
 * the track slides exactly half its width, so the loop has no visible seam.
 */

export default function Marquee({
  children,
  speed = 28,
  reverse = false,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`mask-fade-x group relative overflow-hidden ${className}`}>
      <div
        className="flex w-max items-center gap-6 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center gap-6">{children}</div>
        <div className="flex shrink-0 items-center gap-6" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
