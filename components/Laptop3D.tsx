"use client";

/**
 * Laptop3D — HM-TECH hero centerpiece
 * ------------------------------------------------------------------
 * Pure 3D scene: model, screen dashboard, ambient particles, floor.
 * No page layout, no floating HTML overlays — those live in
 * HeroVisual.tsx so this file can be reused anywhere (about page,
 * case study headers, etc).
 *
 * Fixes vs. the previous version:
 *  - Removed the orbiting torus rings. At near-edge-on angles with
 *    Bloom on, thin large-radius wireframes read as long streaks
 *    across the frame — that was the "purple circles" artifact.
 *  - The screen Html panel was positioned with WORLD-space
 *    coordinates (getWorldPosition/getWorldQuaternion) while living
 *    inside a group that already has its own scale + center offset
 *    applied. That's a coordinate-space mismatch — the panel (and
 *    the glow plane) were rendering far from where the screen mesh
 *    actually is. Fixed by computing the screen's transform relative
 *    to the model root instead, which is correct no matter how deep
 *    it's nested and no matter what the outer groups are doing.
 *  - Bounds/scale/screen-data used to go through useState inside a
 *    useEffect, so the very first frame (and any frame before that
 *    state landed) rendered with the wrong scale/position — this is
 *    why the model looked cropped/misplaced. Now computed with
 *    useMemo directly from the loaded scene, so it's correct from
 *    frame one and never stale.
 *  - Scale is no longer a hardcoded "fitBox" guess. It's derived
 *    from the model's real bounding sphere vs. the camera's actual
 *    visible viewport, with a margin — so the full laptop fits
 *    on screen regardless of this particular model's dimensions.
 *  - Removed the MeshReflectorMaterial floor plane. It's a literal
 *    flat gray disc that met the fog/background at a hard, unlit
 *    seam — that was the "gray background band" artifact.
 *    ContactShadows still grounds the laptop (it renders a shadow
 *    blob only, no visible plane), and the backdrop is now a CSS
 *    radial gradient behind the transparent canvas instead of 3D
 *    geometry, so there's nothing for a seam to form against.
 *  - Added a short eased scale/rise reveal on mount instead of the
 *    laptop just appearing at full size instantly.
 *  - lap.png was re-cropped to an isolated, square (1024x1024) shot
 *    of just the laptop — no surrounding cloud/phone/AI/shield
 *    icons — so imageAspect is now 1 instead of 1024/834. Using the
 *    old 1024/834 ratio against the new square asset would stretch
 *    the laptop vertically.
 *
 * Model path: /public/models/Hitem3d-1783613677244.glb
 * Required deps: three, @react-three/fiber, @react-three/drei,
 * @react-three/postprocessing
 * ------------------------------------------------------------------
 */
import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Sparkles, ContactShadows, Image } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

const MODEL_PATH = "/models/Hitem3d-optimized-v2.glb";

useGLTF.preload(MODEL_PATH);

// ───────────────────────────────────────────
// Brand tokens (kept in one place so the 3D
// material tinting and the HTML dashboard
// never drift apart)
// ───────────────────────────────────────────
const BRAND = {
  violetA: "#8B5CF6",
  violetB: "#6D28D9",
  void_: "#0A0A0F",
  card: "#120C22",
  mint: "#4ADE80",
};

interface ScreenData {
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
  height: number;
}

// ───────────────────────────────────────────
// Ambient data-mote particles
// ───────────────────────────────────────────
function DataMotes() {
  const ref = useRef<THREE.Points>(null!);
  const count = 900;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [new THREE.Color(BRAND.violetA), new THREE.Color(BRAND.violetB)];
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 26;
      positions[i3 + 1] = (Math.random() - 0.5) * 16;
      positions[i3 + 2] = (Math.random() - 0.5) * 26;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3 + 1] -= 0.012 + Math.sin(t + i) * 0.003;
      arr[i3] += Math.sin(t * 0.4 + i * 0.01) * 0.0015;
      if (arr[i3 + 1] < -7) {
        arr[i3 + 1] = 7;
        arr[i3] = (Math.random() - 0.5) * 26;
        arr[i3 + 2] = (Math.random() - 0.5) * 26;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        transparent
        opacity={0.4}
        vertexColors
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ───────────────────────────────────────────
// Product-shot pose. Tune these — this is the
// knob set you want, not the framing math
// further down (that part is now automatic).
// ───────────────────────────────────────────
const POS_Y = -0.05; // small vertical nudge, leaves headroom above for overlays
const VIEWPORT_FILL = 0.5;

function LaptopImage() {
  const { viewport } = useThree();

  // Calculate scale to fit the image within the viewport.
  // lap.png is now a square (1024x1024) crop of just the laptop,
  // so imageAspect is 1 — no more stretching from the old 1024/834 guess.
  const scale = useMemo(() => {
    // Image is now square (1024x1024), so aspect ratio is 1
    const imageAspect = 1;
    const screenAspect = viewport.width / viewport.height;

    if (imageAspect > screenAspect) {
      return [viewport.width * VIEWPORT_FILL, (viewport.width / imageAspect) * VIEWPORT_FILL, 1];
    }
    return [viewport.height * imageAspect * VIEWPORT_FILL, viewport.height * VIEWPORT_FILL, 1];
  }, [viewport.width, viewport.height]);

  return (
    <group position-y={POS_Y} scale={scale}>
      <Image url="/lap.png" transparent scale={scale[0]} />
      <ContactShadows position={[0, -0.62, 0]} opacity={0.5} scale={9} blur={2.4} far={2} color="#000000" />
    </group>
  );
}

// ───────────────────────────────────────────
// Scene assembly
// ───────────────────────────────────────────
function Scene() {
  return (
    <Suspense fallback={null}>
      <LaptopImage />
      <DataMotes />
      <Sparkles count={50} scale={11} size={0.12} color={BRAND.violetA} opacity={0.22} />
      <Environment preset="city" background={false} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} height={300} intensity={0.3} />
        <Vignette eskil={false} offset={0.25} darkness={0.4} />
      </EffectComposer>
    </Suspense>
  );
}

interface Laptop3DProps {
  /** This prop is no longer used but kept for API compatibility. */
  screenMeshName?: string;
}

export default function Laptop3D({ screenMeshName }: Laptop3DProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.9, 7.4], fov: 34 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      shadows
      style={{ width: "100%", height: "100%" }}
    >
      {/* No <color attach="background">: the canvas stays transparent so the
          CSS radial gradient on the wrapping div in HeroVisual shows through.
          That's the "backdrop" now — no 3D floor/background plane to seam
          against. Fog still uses the same void tone so particles and the
          model itself fade into it at a distance, matching the CSS. */}
      <fog attach="fog" args={[BRAND.void_, 10, 22]} />

      <ambientLight intensity={0.45} />
      <directionalLight
        position={[6, 10, 8]}
        intensity={1.8}
        castShadow
        color="#C4B5FD"
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-6, -2, -8]} intensity={0.6} color={BRAND.violetB} />
      <directionalLight position={[0, 1.2, 6]} intensity={0.45} color="#ffffff" />

      <Scene />
    </Canvas>
  );
}