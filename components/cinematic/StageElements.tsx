"use client";

/**
 * StageElements - everything on the stage that is not the laptop.
 *
 *   DataStreams      thin light trails running through the void
 *   Motes            fine digital particles
 *   AssemblyModules  the components that converge into the finished product
 *   VolumetricLight  a soft shaft raking across the scene
 *   ReflectiveFloor  the dark surface the machine comes to rest on
 *   FloatingOrbs     background geometry drifting at several speeds
 */

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const VIOLET = "#7C3AED";
const VIOLET_SOFT = "#A78BFA";
const GOLD = "#A8842F";

function makeRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

/* ─────────────── Data streams ─────────────── */
export function DataStreams({ count = 26, idle = 1 }: { count?: number; idle?: number }) {
  const group = useRef<THREE.Group>(null!);

  const streams = useMemo(() => {
    const rnd = makeRng(3);
    return Array.from({ length: count }, () => {
      const angle = rnd() * Math.PI * 2;
      const radius = 3.2 + rnd() * 6;
      return {
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        y: (rnd() - 0.5) * 9,
        len: 0.8 + rnd() * 2.6,
        speed: 0.9 + rnd() * 2.4,
        gold: rnd() > 0.82,
      };
    });
  }, [count]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const s = streams[i];
      if (!s) return;
      const y = ((s.y + t * s.speed * idle + 6) % 12) - 6;
      child.position.set(s.x, y, s.z);
    });
  });

  return (
    <group ref={group}>
      {streams.map((s, i) => (
        <mesh key={i}>
          <boxGeometry args={[0.012, s.len, 0.012]} />
          <meshBasicMaterial
            color={s.gold ? GOLD : VIOLET_SOFT}
            transparent
            opacity={s.gold ? 0.55 : 0.38}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────── Digital motes ─────────────── */
export function Motes({ count = 1100, idle = 1 }: { count?: number; idle?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color(VIOLET),
      new THREE.Color(VIOLET_SOFT),
      new THREE.Color(GOLD),
      new THREE.Color("#5B21B6"),
    ];
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 40;
      positions[i3 + 1] = (Math.random() - 0.5) * 26;
      positions[i3 + 2] = (Math.random() - 0.5) * 34 - 4;
      const c = palette[Math.floor(Math.random() * (Math.random() > 0.88 ? 4 : 2))];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.016 * idle;
    ref.current.position.y = Math.sin(t * 0.12) * 0.5 * idle;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─────────────── Converging assembly modules ─────────────── */
const MODULES: Array<{ kind: string; color: string; from: [number, number, number]; to: [number, number, number] }> = [
  { kind: "code", color: VIOLET_SOFT, from: [-7.5, 3.2, -2], to: [-1.5, 0.6, 0.2] },
  { kind: "api", color: "#67E8F9", from: [7.2, 2.4, -3], to: [1.5, 0.75, 0.1] },
  { kind: "ai", color: GOLD, from: [0.5, 6.5, -5], to: [0, 1.15, -0.1] },
  { kind: "ui", color: VIOLET, from: [-6.5, -3.4, 2], to: [-0.9, -0.15, 0.5] },
  { kind: "cloud", color: "#A5B4FC", from: [6.8, -3.8, 1.5], to: [1.0, -0.1, 0.45] },
  { kind: "data", color: VIOLET_SOFT, from: [-3.2, -5.6, -4], to: [-0.4, 0.3, -0.4] },
  { kind: "sec", color: GOLD, from: [3.6, 5.4, 3], to: [0.6, 0.45, 0.35] },
];

export function AssemblyModules({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    group.current.children.forEach((child, i) => {
      const m = MODULES[i];
      if (!m) return;
      // ease the convergence so parts decelerate into place
      const p = progress * progress * (3 - 2 * progress);
      child.position.set(
        m.from[0] + (m.to[0] - m.from[0]) * p,
        m.from[1] + (m.to[1] - m.from[1]) * p + Math.sin(t * 0.8 + i) * 0.08 * (1 - p),
        m.from[2] + (m.to[2] - m.from[2]) * p
      );
      child.rotation.set(
        (1 - p) * (1.2 + i * 0.3) + t * 0.15 * (1 - p),
        (1 - p) * (0.8 + i * 0.4) + t * 0.2 * (1 - p),
        0
      );
      const s = 1 - p * 0.55;
      child.scale.setScalar(s);
      // fade out as they merge into the finished machine
      child.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.material && !Array.isArray(mesh.material)) {
          const mat = mesh.material as THREE.Material & { opacity: number };
          if (mat.transparent) mat.opacity = Math.max(0, 0.85 * (1 - p * 1.15));
        }
      });
    });
  });

  return (
    <group ref={group}>
      {MODULES.map((m, i) => (
        <group key={i}>
          {/* panel */}
          <mesh>
            <boxGeometry args={[0.86, 0.58, 0.05]} />
            <meshStandardMaterial
              color={m.color}
              emissive={m.color}
              emissiveIntensity={0.45}
              metalness={0.6}
              roughness={0.3}
              transparent
              opacity={0.85}
            />
          </mesh>
          {/* edge frame */}
          <mesh>
            <boxGeometry args={[0.92, 0.64, 0.02]} />
            <meshBasicMaterial
              color={m.color}
              wireframe
              transparent
              opacity={0.7}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─────────────── Volumetric shaft ─────────────── */
export function VolumetricLight({ intensity = 1 }: { intensity?: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const m = ref.current.material as THREE.MeshBasicMaterial;
    m.opacity = (0.09 + Math.sin(t * 0.5) * 0.015) * intensity;
    ref.current.rotation.z = Math.sin(t * 0.16) * 0.06;
  });

  return (
    <mesh ref={ref} position={[-1.6, 3.4, -1.4]} rotation={[0, 0, 0.34]}>
      <coneGeometry args={[2.6, 9, 32, 1, true]} />
      <meshBasicMaterial
        color="#C4B5FD"
        transparent
        opacity={0.09}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─────────────── Reflective rest surface ─────────────── */
export function ReflectiveFloor({ opacity = 1 }: { opacity?: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const glow = useRef<THREE.Mesh>(null!);

  // A radial falloff so the plane never shows a hard edge against the void.
  const falloff = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 512;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    const g = ctx.createRadialGradient(256, 256, 20, 256, 256, 250);
    g.addColorStop(0, "rgba(226,218,247,0.95)");
    g.addColorStop(0.55, "rgba(240,236,251,0.6)");
    g.addColorStop(1, "rgba(251,251,253,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 512);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  useFrame(() => {
    if (ref.current) {
      const m = ref.current.material as THREE.MeshStandardMaterial;
      m.opacity = 0.9 * opacity;
    }
    if (glow.current) {
      const m = glow.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.22 * opacity;
    }
  });

  return (
    <group position={[0, -1.32, 0.4]}>
      <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[9, 64]} />
        <meshStandardMaterial
          map={falloff ?? undefined}
          transparent
          opacity={0.9}
          metalness={0.6}
          roughness={0.18}
          color="#EDE9FE"
          depthWrite={false}
        />
      </mesh>
      {/* violet pool under the machine */}
      <mesh ref={glow} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[3.4, 48]} />
        <meshBasicMaterial
          color={VIOLET}
          transparent
          opacity={0.22}
            depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ─────────────── Background orbs, several drift speeds ─────────────── */
export function FloatingOrbs({ count = 16, idle = 1 }: { count?: number; idle?: number }) {
  const orbs = useMemo(() => {
    const rnd = makeRng(19);
    return Array.from({ length: count }, (_, i) => {
      const angle = rnd() * Math.PI * 2;
      const radius = 7 + rnd() * 9;
      return {
        position: [
          Math.cos(angle) * radius,
          (rnd() - 0.5) * 14,
          Math.sin(angle) * radius - 6,
        ] as [number, number, number],
        scale: 0.2 + rnd() * 0.55,
        // three distinct speed bands so the parallax reads as layered depth
        speed: [0.35, 0.8, 1.5][i % 3],
        kind: Math.floor(rnd() * 3),
        gold: rnd() > 0.8,
      };
    });
  }, [count]);

  return (
    <>
      {orbs.map((o, i) => (
        <Float
          key={i}
          speed={o.speed * idle}
          rotationIntensity={1.1 * idle}
          floatIntensity={1.8 * idle}
        >
          <mesh position={o.position} scale={o.scale}>
            {o.kind === 0 ? (
              <sphereGeometry args={[1, 24, 24]} />
            ) : o.kind === 1 ? (
              <octahedronGeometry args={[1.1, 0]} />
            ) : (
              <torusGeometry args={[0.8, 0.16, 12, 40]} />
            )}
            <meshStandardMaterial
              color={o.gold ? GOLD : VIOLET}
              emissive={o.gold ? GOLD : VIOLET}
              emissiveIntensity={0.12}
              metalness={0.5}
              roughness={0.3}
              transparent
              opacity={0.7}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}
