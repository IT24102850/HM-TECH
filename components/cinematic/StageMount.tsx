"use client";

/**
 * StageMount - client-only mount point for the cinematic WebGL stage.
 * WebGL cannot render on the server, so the canvas loads with ssr:false and
 * a flat off-black ground stands in until it hydrates.
 */

import dynamic from "next/dynamic";

const CinematicStage = dynamic(() => import("./CinematicStage"), {
  ssr: false,
  loading: () => (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-paper">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_18%,rgba(109,40,217,0.2),transparent_62%)]" />
    </div>
  ),
});

export default function StageMount() {
  return <CinematicStage />;
}
