"use client";

/**
 * Laptop3D - the hero centrepiece, built as real 3D geometry.
 * ------------------------------------------------------------------
 * The old version drew a flat PNG on a plane inside a Canvas, so it read as
 * a picture rather than an object. This is a procedural machine: a milled
 * aluminium base, a hinged lid, and a live screen whose dashboard is painted
 * into a canvas texture at runtime, so nothing is downloaded and nothing can
 * 404.
 *
 * Tuned for a LIGHT page: a pale aluminium shell, white key lighting and a
 * soft contact shadow to ground it. No bloom or vignette, which on white
 * would only wash the page out. Contrast comes from the dark screen against
 * the light body, the way a real laptop looks on a white desk.
 *
 * Interaction:
 *   - drag to orbit within a clamped range (PresentationControls)
 *   - idle auto-float and a slow hover bob
 *   - a scan bar sweeps the display and the screen brightness breathes
 *   - pastel shards trace a slow ring around the device
 * ------------------------------------------------------------------
 */

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Float,
  PresentationControls,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

const BRAND = {
  violet: "#8B5CF6",
  deep: "#6D28D9",
  soft: "#BDA5F6",
  pale: "#D8CBFB",
  mint: "#4ADE80",
  cyan: "#22D3EE",
  shell: "#E6E1F4", // pale aluminium
  shellDark: "#CFC6E8",
  bezel: "#2A2440",
};

/* Screen content, painted once into a canvas texture */
function useScreenTexture() {
  return useMemo(() => {
    const w = 1024;
    const h = 640;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // backdrop
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, "#140F2E");
    bg.addColorStop(0.55, "#1D1442");
    bg.addColorStop(1, "#120E28");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // faint grid
    ctx.strokeStyle = "rgba(167,139,250,0.16)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += 48) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // window chrome
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(0, 0, w, 56);
    const dots = ["#FF5F57", "#FEBC2E", "#28C840"];
    dots.forEach((c, i) => {
      ctx.beginPath();
      ctx.arc(38 + i * 30, 28, 9, 0, Math.PI * 2);
      ctx.fillStyle = c;
      ctx.fill();
    });
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "500 22px ui-monospace, Menlo, monospace";
    ctx.fillText("hmtech / build.ts", 150, 36);

    // sidebar
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fillRect(0, 56, 190, h - 56);
    for (let i = 0; i < 7; i++) {
      ctx.fillStyle = i === 1 ? "rgba(167,139,250,0.85)" : "rgba(255,255,255,0.18)";
      ctx.fillRect(28, 104 + i * 46, 12, 12);
      ctx.fillStyle = i === 1 ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.3)";
      ctx.fillRect(56, 106 + i * 46, 92 - (i % 3) * 18, 9);
    }

    // code lines
    const palette = [
      "rgba(167,139,250,0.95)",
      "rgba(34,211,238,0.85)",
      "rgba(255,255,255,0.6)",
      "rgba(74,222,128,0.85)",
    ];
    let y = 112;
    for (let i = 0; i < 9; i++) {
      let x = 226;
      const chunks = 2 + (i % 4);
      for (let c = 0; c < chunks; c++) {
        const len = 60 + ((i * 37 + c * 53) % 150);
        ctx.fillStyle = palette[(i + c) % palette.length];
        ctx.fillRect(x, y, len, 10);
        x += len + 18;
      }
      y += 30;
    }

    // metric cards
    const cards = [
      { label: "UPTIME", value: "99.98%", color: BRAND.mint },
      { label: "BUILD", value: "PASSING", color: BRAND.cyan },
      { label: "DEPLOYS", value: "142", color: BRAND.soft },
    ];
    cards.forEach((card, i) => {
      const cx = 226 + i * 258;
      const cy = 400;
      ctx.fillStyle = "rgba(255,255,255,0.07)";
      ctx.strokeStyle = "rgba(255,255,255,0.14)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cx, cy, 232, 160, 18);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "500 18px ui-monospace, Menlo, monospace";
      ctx.fillText(card.label, cx + 22, cy + 42);

      ctx.fillStyle = card.color;
      ctx.font = "700 44px Inter, system-ui, sans-serif";
      ctx.fillText(card.value, cx + 22, cy + 100);

      // sparkline
      ctx.strokeStyle = card.color;
      ctx.globalAlpha = 0.75;
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let p = 0; p <= 8; p++) {
        const px = cx + 22 + p * 24;
        const py = cy + 138 - Math.abs(Math.sin(p * 1.3 + i)) * 26;
        if (p === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, []);
}

/* The device */
function Device() {
  const screenTex = useScreenTexture();
  const root = useRef<THREE.Group>(null!);
  const scan = useRef<THREE.Mesh>(null!);
  const screenMat = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (root.current) {
      root.current.position.y = Math.sin(t * 0.7) * 0.05;
    }
    if (scan.current) {
      // sweep the scan bar down the display, then wrap
      const p = (t * 0.35) % 1;
      scan.current.position.y = 0.62 - p * 1.24;
      const m = scan.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.14 * Math.sin(p * Math.PI);
    }
    if (screenMat.current) {
      screenMat.current.emissiveIntensity = 0.72 + Math.sin(t * 1.6) * 0.06;
    }
  });

  return (
    <group ref={root} rotation={[0.06, 0, 0]}>
      {/* base */}
      <mesh position={[0, -0.42, 0.62]} castShadow receiveShadow>
        <boxGeometry args={[2.9, 0.1, 1.95]} />
        <meshStandardMaterial color={BRAND.shell} metalness={0.55} roughness={0.34} />
      </mesh>

      {/* keyboard well */}
      <mesh position={[0, -0.365, 0.55]} receiveShadow>
        <boxGeometry args={[2.5, 0.02, 1.32]} />
        <meshStandardMaterial color={BRAND.shellDark} metalness={0.35} roughness={0.6} />
      </mesh>

      {/* trackpad */}
      <mesh position={[0, -0.362, 1.33]}>
        <boxGeometry args={[0.95, 0.02, 0.5]} />
        <meshStandardMaterial color="#DDD5F0" metalness={0.3} roughness={0.45} />
      </mesh>

      {/* hinge */}
      <mesh position={[0, -0.4, -0.32]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 2.85, 24]} />
        <meshStandardMaterial color={BRAND.shellDark} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* lid */}
      <group position={[0, -0.4, -0.32]} rotation={[-0.32, 0, 0]}>
        {/* lid shell */}
        <mesh position={[0, 0.92, -0.05]} castShadow>
          <boxGeometry args={[2.9, 1.88, 0.08]} />
          <meshStandardMaterial color={BRAND.shell} metalness={0.55} roughness={0.32} />
        </mesh>

        {/* bezel */}
        <mesh position={[0, 0.92, 0.001]}>
          <planeGeometry args={[2.78, 1.78]} />
          <meshStandardMaterial color={BRAND.bezel} roughness={0.6} metalness={0.2} />
        </mesh>

        {/* display */}
        <mesh position={[0, 0.92, 0.006]}>
          <planeGeometry args={[2.62, 1.62]} />
          <meshStandardMaterial
            ref={screenMat}
            map={screenTex ?? undefined}
            emissiveMap={screenTex ?? undefined}
            emissive="#ffffff"
            emissiveIntensity={0.75}
            toneMapped={false}
            roughness={0.28}
            metalness={0}
          />
        </mesh>

        {/* scan bar */}
        <mesh ref={scan} position={[0, 0.92, 0.012]}>
          <planeGeometry args={[2.62, 0.34]} />
          <meshBasicMaterial
            color={BRAND.soft}
            transparent
            opacity={0.1}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

/* Shards orbiting the device */
function OrbitShards() {
  const ring = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (ring.current) ring.current.rotation.y = state.clock.getElapsedTime() * 0.28;
  });

  const items = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2;
        return {
          position: [Math.cos(a) * 2.9, Math.sin(a * 2) * 0.6 + 0.2, Math.sin(a) * 2.9] as [
            number,
            number,
            number
          ],
          scale: 0.11 + (i % 3) * 0.05,
        };
      }),
    []
  );

  return (
    <group ref={ring}>
      {items.map((it, i) => (
        <Float key={i} speed={1.2} rotationIntensity={2} floatIntensity={1.2}>
          <mesh position={it.position} scale={it.scale} castShadow>
            {i % 3 === 0 ? (
              <sphereGeometry args={[1, 24, 24]} />
            ) : i % 3 === 1 ? (
              <octahedronGeometry args={[1.1, 0]} />
            ) : (
              <boxGeometry args={[1.3, 1.3, 1.3]} />
            )}
            <meshStandardMaterial
              color={i % 2 === 0 ? BRAND.violet : BRAND.pale}
              roughness={0.32}
              metalness={0.15}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <Suspense fallback={null}>
      <PresentationControls
        global
        cursor
        snap
        speed={1.2}
        zoom={1}
        rotation={[0.08, -0.25, 0]}
        polar={[-0.25, 0.35]}
        azimuth={[-0.7, 0.7]}
        config={{ mass: 1.1, tension: 180, friction: 26 }}
      >
        <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.55}>
          <group scale={1.02}>
            <Device />
            <OrbitShards />
          </group>
        </Float>
      </PresentationControls>

      <ContactShadows
        position={[0, -0.98, 0.4]}
        opacity={0.32}
        scale={11}
        blur={2.8}
        far={3}
        color={BRAND.deep}
      />
      <Sparkles count={40} scale={8} size={1.4} speed={0.35} color={BRAND.violet} opacity={0.35} />
    </Suspense>
  );
}

export default function Laptop3D() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.55, 5.6], fov: 36 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      shadows
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight
        position={[5, 8, 6]}
        intensity={2.4}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 2, 4]} intensity={0.8} color={BRAND.soft} />
      <hemisphereLight args={["#ffffff", BRAND.pale, 0.8]} />

      <Scene />
    </Canvas>
  );
}
