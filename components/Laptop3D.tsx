"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Html, Environment, Float } from "@react-three/drei";
import { TrendingUp } from "lucide-react";
import * as THREE from "three";

function LaptopScreenContent() {
  return (
    <div className="w-[380px] rounded-lg border border-iris-100 bg-white/90 p-4 shadow-iris backdrop-blur-md">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-iris-500">Dashboard</span>
        <TrendingUp className="h-3.5 w-3.5 text-iris-600" />
      </div>
      <p className="mt-2 font-display text-2xl font-semibold text-ink">$94,540</p>
      <div className="mt-3 flex items-end gap-1.5">
        {[40, 65, 30, 80, 55, 95, 70, 45, 60, 85, 50].map((h, i) => (
          <div
            key={i}
            className="w-3 rounded-full bg-iris-gradient"
            style={{ height: `${h * 0.4}px` }}
          />
        ))}
      </div>
    </div>
  );
}

function Laptop() {
  const { nodes } = useGLTF("/models/low_poly_laptop.glb");

  return (
    <group scale={1.8} position={[0, -1.2, 0]}>
      <primitive object={nodes.Base} />
      <primitive object={nodes.Screen_Bezel} />
      <primitive object={nodes.Keyboard} />
      <primitive object={nodes.Trackpad} />

      <Html
        transform
        occlude
        position={[nodes.Screen_Display.position.x, nodes.Screen_Display.position.y, nodes.Screen_Display.position.z]}
        rotation={nodes.Screen_Display.rotation}
        distanceFactor={1.17}
        className="w-[400px]"
      >
        <LaptopScreenContent />
      </Html>
    </group>
  );
}
useGLTF.preload("/models/low_poly_laptop.glb");

function AmbientCubes() {
  const cubes = useMemo(() => {
    const specs: any[] = [];
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const radius = 2.8 + Math.random() * 1.5;
      specs.push({
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 4,
          Math.sin(angle) * radius - 2,
        ],
        size: 0.4 + Math.random() * 0.9,
        color: ["#6D28D9", "#8B5CF6", "#A78BFA"][i % 3],
      });
    }
    return specs;
  }, []);

  return (
    <>
      {cubes.map((spec, i) => (
        <Float key={i} speed={0.8} rotationIntensity={0.6} floatIntensity={1.5}>
          <mesh position={spec.position}>
            <boxGeometry args={[spec.size, spec.size, spec.size]} />
            <meshStandardMaterial color={spec.color} roughness={0.3} metalness={0.2} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Rig() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const targetY = (state.pointer.x * Math.PI) / 12;
    const targetX = (-state.pointer.y * Math.PI) / 16;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
  });
  return <group ref={group}><Laptop /><AmbientCubes /></group>;
}

export default function Laptop3D() {
  return (
    <Canvas dpr={[1, 1.8]} camera={{ position: [0, 0.5, 8], fov: 40 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#A78BFA" />
      <Suspense fallback={null}>
        <Rig />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}