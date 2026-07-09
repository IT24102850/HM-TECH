"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Html } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/models/laptop.glb");

function LaptopModel() {
  const { scene, nodes } = useGLTF("/models/laptop.glb") as any;
  const groupRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    console.log("GLTF Nodes:", Object.keys(nodes || {}));
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene, nodes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Smooth 360° rotation + mouse control
    const autoRotation = t * 0.25;                    // Full 360° speed (adjust 0.25)
    const mouseInfluence = state.pointer.x * 0.8;     // Mouse adds extra control

    groupRef.current.rotation.y = autoRotation + mouseInfluence;
    
    // Slight tilt on X for natural feel
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -state.pointer.y * 0.25,
      0.04
    );

    // Gentle floating
    groupRef.current.position.y = -0.4 + Math.sin(t * 1.3) * 0.03;
  });

  return (
    <group ref={groupRef} scale={2.45} position={[0, -0.4, 0]}>
      <primitive object={scene} />

      {/* Screen Overlay - Update mesh name from console if needed */}
      {(nodes.Screen || nodes.screen || nodes.Display || nodes.plane) && (
        <Html
          transform
          occlude
          distanceFactor={1.7}
          position={(nodes.Screen || nodes.screen || nodes.Display || nodes.plane).position.toArray() as [number, number, number]}
          rotation={(nodes.Screen || nodes.screen || nodes.Display || nodes.plane).rotation.toArray() as [number, number, number]}
          style={{
            width: "440px",
            height: "275px",
            pointerEvents: "none",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          <DashboardScreen />
        </Html>
      )}
    </group>
  );
}

function DashboardScreen() {
  return (
    <div style={{
      width: "100%", height: "100%", background: "#0f172a", color: "#fff",
      borderRadius: "6px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      fontFamily: "system-ui, sans-serif"
    }}>
      {/* Top bar */}
      <div style={{ padding: "10px 16px", background: "#1e2937", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{ width: "10px", height: "10px", background: "#ef4444", borderRadius: "50%" }} />
          <div style={{ width: "10px", height: "10px", background: "#facc15", borderRadius: "50%" }} />
          <div style={{ width: "10px", height: "10px", background: "#4ade80", borderRadius: "50%" }} />
        </div>
        <div style={{ fontSize: "13px", fontWeight: 500 }}>HM Tech Dashboard</div>
      </div>

      {/* Dashboard Content */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div>
          <div style={{ fontSize: "13px", opacity: 0.7 }}>TOTAL REVENUE</div>
          <div style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-2px" }}>$248,392</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          {[
            { label: "Projects", value: "42" },
            { label: "Clients", value: "18" },
            { label: "Success", value: "97%" }
          ].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.08)", padding: "14px 8px", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: 600 }}>{s.value}</div>
              <div style={{ fontSize: "11px", opacity: 0.6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Laptop3D() {
  return (
    <div className="relative h-[480px] w-full md:h-[640px]">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.8, 9], fov: 35 }}
        gl={{ alpha: true, antialias: true }}
      >
        <color attach="background" args={["#f1f5f9"]} />

        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 15, 8]} intensity={2.4} castShadow />
        <directionalLight position={[-8, -6, -10]} intensity={0.9} color="#c4b5fd" />

        <Suspense fallback={null}>
          <LaptopModel />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}