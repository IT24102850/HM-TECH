"use client";

/**
 * Laptop - the hero object, machined from primitives.
 * ------------------------------------------------------------------
 * Brushed titanium shell, violet edge lighting, an emissive display fed by
 * the procedural screen texture, and an instanced keyboard.
 *
 * Every part carries an explode direction. Driving the `explode` prop from
 * 0 to 1 blows the machine apart along those vectors, which is what the
 * assembly act scrubs in reverse as you scroll: the parts converge and the
 * finished interface lights up.
 *
 * Nothing here is downloaded. No GLB, no HDR fetch - the environment is
 * built from lightformers so the metal has something to reflect while
 * staying entirely offline.
 * ------------------------------------------------------------------
 */

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Instance, Instances } from "@react-three/drei";
import * as THREE from "three";
import { createScreenTexture } from "./screenTexture";

const TITANIUM = "#8E93A0";
const TITANIUM_DARK = "#4A4E5A";
const VIOLET = "#8B5CF6";
const GOLD = "#D9B46A";

/** A part and the direction it flies when the machine comes apart. */
type PartProps = {
  explode: number;
  dir: [number, number, number];
  distance?: number;
  children: React.ReactNode;
  position?: [number, number, number];
  rotation?: [number, number, number];
};

function Part({
  explode,
  dir,
  distance = 1,
  children,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: PartProps) {
  const ref = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!ref.current) return;
    const e = explode * distance;
    ref.current.position.set(
      position[0] + dir[0] * e,
      position[1] + dir[1] * e,
      position[2] + dir[2] * e
    );
    // parts tumble slightly while apart, settling square as they converge
    ref.current.rotation.set(
      rotation[0] + dir[1] * e * 0.35,
      rotation[1] + dir[0] * e * 0.35,
      rotation[2] + dir[2] * e * 0.2
    );
  });

  return <group ref={ref}>{children}</group>;
}

function Keyboard({ explode }: { explode: number }) {
  const keys = useMemo(() => {
    const out: Array<[number, number, number]> = [];
    const cols = 15;
    const rows = 5;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        out.push([
          -1.05 + (c * 2.1) / (cols - 1),
          0,
          -0.28 + (r * 0.62) / (rows - 1),
        ]);
      }
    }
    return out;
  }, []);

  return (
    <Part explode={explode} dir={[0, 1, 0.3]} distance={1.1} position={[0, -0.352, 0.5]}>
      <Instances limit={128} castShadow>
        <boxGeometry args={[0.115, 0.022, 0.1]} />
        <meshStandardMaterial
          color="#1A1B24"
          metalness={0.4}
          roughness={0.55}
          emissive={VIOLET}
          emissiveIntensity={0.16}
        />
        {keys.map((p, i) => (
          <Instance key={i} position={p} />
        ))}
      </Instances>
    </Part>
  );
}

export default function Laptop({
  explode = 0,
  screenOn = 1,
}: {
  explode?: number;
  screenOn?: number;
}) {
  const screenTex = useMemo(() => createScreenTexture(), []);
  const screenMat = useRef<THREE.MeshStandardMaterial>(null!);
  const scan = useRef<THREE.Mesh>(null!);
  const rimTop = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (screenMat.current) {
      // the panel breathes, and dims while the machine is in pieces
      screenMat.current.emissiveIntensity =
        (0.95 + Math.sin(t * 1.7) * 0.07) * screenOn;
    }
    if (scan.current) {
      const p = (t * 0.28) % 1;
      scan.current.position.y = 0.78 - p * 1.56;
      const m = scan.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.1 * Math.sin(p * Math.PI) * screenOn;
    }
    if (rimTop.current) {
      const m = rimTop.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.55 + Math.sin(t * 1.1) * 0.15;
    }
  });

  return (
    <group>
      {/* ── lower chassis ── */}
      <Part explode={explode} dir={[0, -1, 0.2]} distance={1.2}>
        <mesh position={[0, -0.44, 0.62]} castShadow receiveShadow>
          <boxGeometry args={[2.92, 0.075, 1.98]} />
          <meshStandardMaterial
            color={TITANIUM_DARK}
            metalness={0.95}
            roughness={0.3}
          />
        </mesh>
        {/* gold underside hairline */}
        <mesh position={[0, -0.479, 0.62]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.6, 1.7]} />
          <meshBasicMaterial color={GOLD} transparent opacity={0.1} />
        </mesh>
      </Part>

      {/* ── deck ── */}
      <Part explode={explode} dir={[0, 0.35, 0.9]} distance={1.0}>
        <mesh position={[0, -0.385, 0.62]} castShadow receiveShadow>
          <boxGeometry args={[2.88, 0.045, 1.94]} />
          <meshStandardMaterial color={TITANIUM} metalness={0.92} roughness={0.26} />
        </mesh>
        {/* keyboard well recess */}
        <mesh position={[0, -0.361, 0.5]}>
          <boxGeometry args={[2.24, 0.01, 0.86]} />
          <meshStandardMaterial color="#14151C" metalness={0.5} roughness={0.7} />
        </mesh>
        {/* trackpad */}
        <mesh position={[0, -0.359, 1.34]}>
          <boxGeometry args={[0.98, 0.012, 0.52]} />
          <meshStandardMaterial color="#2A2C36" metalness={0.75} roughness={0.35} />
        </mesh>
      </Part>

      <Keyboard explode={explode} />

      {/* ── hinge ── */}
      <Part explode={explode} dir={[0, 0, -1]} distance={0.9} position={[0, -0.41, -0.34]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.065, 0.065, 2.86, 24]} />
          <meshStandardMaterial color={TITANIUM_DARK} metalness={0.95} roughness={0.22} />
        </mesh>
      </Part>

      {/* ── lid ── */}
      <Part explode={explode} dir={[0, 0.9, -0.5]} distance={1.35} position={[0, -0.41, -0.34]} rotation={[-0.3, 0, 0]}>
        {/* shell */}
        <mesh position={[0, 0.95, -0.045]} castShadow>
          <boxGeometry args={[2.92, 1.94, 0.07]} />
          <meshStandardMaterial color={TITANIUM} metalness={0.95} roughness={0.28} />
        </mesh>

        {/* bezel */}
        <mesh position={[0, 0.95, 0.0]}>
          <planeGeometry args={[2.84, 1.86]} />
          <meshStandardMaterial color="#0A0A12" metalness={0.3} roughness={0.75} />
        </mesh>

        {/* display */}
        <mesh position={[0, 0.95, 0.006]}>
          <planeGeometry args={[2.66, 1.66]} />
          <meshStandardMaterial
            ref={screenMat}
            map={screenTex ?? undefined}
            emissiveMap={screenTex ?? undefined}
            emissive="#ffffff"
            emissiveIntensity={0.95}
            toneMapped={false}
            roughness={0.2}
            metalness={0}
          />
        </mesh>

        {/* glass sheen */}
        <mesh position={[0, 0.95, 0.009]}>
          <planeGeometry args={[2.66, 1.66]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.035}
            depthWrite={false}
          />
        </mesh>

        {/* scan bar */}
        <mesh ref={scan} position={[0, 0.95, 0.012]}>
          <planeGeometry args={[2.66, 0.4]} />
          <meshBasicMaterial
            color="#C4B5FD"
            transparent
            opacity={0.09}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* violet edge light along the top of the lid */}
        <mesh ref={rimTop} position={[0, 1.9, 0.02]}>
          <planeGeometry args={[2.88, 0.012]} />
          <meshBasicMaterial color={VIOLET} transparent opacity={0.6} />
        </mesh>
        {/* gold hairline at the chin */}
        <mesh position={[0, 0.02, 0.02]}>
          <planeGeometry args={[2.88, 0.008]} />
          <meshBasicMaterial color={GOLD} transparent opacity={0.5} />
        </mesh>
      </Part>
    </group>
  );
}
