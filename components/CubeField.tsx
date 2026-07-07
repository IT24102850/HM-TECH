"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

type CubeSpec = {
  position: [number, number, number];
  size: number;
  color: string;
  speed: number;
  rotIntensity: number;
  floatIntensity: number;
};

const PALETTE = ["#6D28D9", "#7C3AED", "#8B5CF6", "#A78BFA", "#0A0A14"];

function buildCubes(count: number): CubeSpec[] {
  const specs: CubeSpec[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 2.1 + Math.random() * 2.4;
    specs.push({
      position: [
        Math.cos(angle) * radius + (Math.random() - 0.5) * 1.2,
        (Math.random() - 0.5) * 3.4,
        Math.sin(angle) * radius * 0.6 - 1,
      ],
      size: 0.35 + Math.random() * 0.85,
      color: PALETTE[i % PALETTE.length],
      speed: 0.6 + Math.random() * 1.2,
      rotIntensity: 0.4 + Math.random() * 0.8,
      floatIntensity: 0.6 + Math.random() * 1.2,
    });
  }
  return specs;
}

function Cube({ spec }: { spec: CubeSpec }) {
  const mesh = useRef<THREE.Mesh>(null);
  return (
    <Float
      speed={spec.speed}
      rotationIntensity={spec.rotIntensity}
      floatIntensity={spec.floatIntensity}
    >
      <RoundedBox
        ref={mesh as any}
        args={[spec.size, spec.size, spec.size]}
        radius={spec.size * 0.14}
        smoothness={4}
        position={spec.position}
      >
        <meshPhysicalMaterial
          color={spec.color}
          roughness={0.25}
          metalness={0.15}
          clearcoat={0.6}
          clearcoatRoughness={0.25}
          envMapIntensity={1.1}
        />
      </RoundedBox>
    </Float>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!group.current) return;
    const targetY = (state.pointer.x * Math.PI) / 10;
    const targetX = (-state.pointer.y * Math.PI) / 14;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
  });

  return (
    <group ref={group} scale={viewport.width < 6 ? 0.72 : 1}>
      {children}
    </group>
  );
}

export default function CubeField() {
  const cubes = useMemo(() => buildCubes(14), []);

  return (
    <div className="relative h-[420px] w-full md:h-[560px]">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 9], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 6]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-6, -3, -4]} intensity={0.5} color="#A78BFA" />
        <Suspense fallback={null}>
          <Rig>
            {cubes.map((c, i) => (
              <Cube key={i} spec={c} />
            ))}
          </Rig>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
