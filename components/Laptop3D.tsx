"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/models/laptop.glb");
  return <primitive object={scene} scale={1.05} position={[0, -0.6, 0]} />;
}

export default function Laptop3D() {
  return (
    <div className="w-full h-[560px] relative bg-zinc-950">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 42 }}
        gl={{ antialias: true }}
      >
        <Suspense 
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="gray" />
            </mesh>
          }
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.4} />

          <Model />

          <Environment preset="warehouse" />

          <OrbitControls 
            autoRotate 
            autoRotateSpeed={0.4}
            enablePan={false}
            enableZoom={true}
            minDistance={5}
            maxDistance={14}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}