"use client";

/**
 * SceneBackground - client-only mount point for the site-wide 3D layer.
 * WebGL can never render on the server, so the canvas is loaded with
 * ssr:false and a plain gradient stands in until it hydrates.
 */

import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_8%,rgba(109,40,217,0.32),transparent_62%)]" />
  ),
});

export default function SceneBackground() {
  return <Scene3D />;
}
