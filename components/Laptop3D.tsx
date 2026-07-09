"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Html } from "@react-three/drei";
import * as THREE from "three";

// Preload the model early
useGLTF.preload("/models/Hitem3d-1783613677244.glb");

function LaptopModel() {
  const { scene, nodes, materials } = useGLTF("/models/Hitem3d-1783613677244.glb") as any;
  const groupRef = useRef<THREE.Group>(null!);
  const [screenMesh, setScreenMesh] = useState<any>(null);
  const [screenPosition, setScreenPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [screenRotation, setScreenRotation] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    // Log all nodes to help identify the screen mesh
    console.log("GLTF Nodes:", Object.keys(nodes || {}));
    console.log("GLTF Materials:", Object.keys(materials || {}));
    
    // Log all mesh names and their positions
    scene.traverse((child: any) => {
      if (child.isMesh) {
        console.log(`Mesh: ${child.name}, Position:`, child.position.toArray());
      }
    });

    // Find the screen mesh - try common names
    let screen = null;
    const screenNames = ['Screen', 'Display', 'LCD', 'screen', 'display', 'lcd', 'Monitor', 'monitor', 'plane', 'Plane'];
    
    for (const name of screenNames) {
      if (nodes[name]) {
        screen = nodes[name];
        break;
      }
    }
    
    // If not found by name, try to find a flat mesh that could be the screen
    if (!screen) {
      scene.traverse((child: any) => {
        if (child.isMesh && !screen) {
          // Look for a mesh with a flat shape (could be the screen)
          const box = new THREE.Box3().setFromObject(child);
          const size = box.getSize(new THREE.Vector3());
          // Screen is typically wider than it is deep
          if (size.x > size.z * 2 && size.y > size.z * 1.5) {
            screen = child;
            console.log(`Found potential screen mesh: ${child.name}`);
          }
        }
      });
    }

    if (screen) {
      // Get world position and rotation of the screen
      const worldPos = new THREE.Vector3();
      const worldQuat = new THREE.Quaternion();
      screen.getWorldPosition(worldPos);
      screen.getWorldQuaternion(worldQuat);
      const euler = new THREE.Euler().setFromQuaternion(worldQuat);
      
      setScreenMesh(screen);
      setScreenPosition(worldPos.toArray() as [number, number, number]);
      setScreenRotation(euler.toArray() as [number, number, number]);
      
      // Hide the original screen mesh
      screen.visible = false;
    }

    // Setup shadows and materials
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Ensure materials render correctly
        if (child.material) {
          child.material.needsUpdate = true;
          // Make materials responsive to lighting
          if (Array.isArray(child.material)) {
            child.material.forEach((mat: any) => {
              mat.needsUpdate = true;
            });
          }
        }
      }
    });
  }, [scene, nodes, materials]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Smooth 360° rotation + mouse control
    const autoRotation = t * 0.2;
    const mouseInfluence = state.pointer.x * 0.6;

    groupRef.current.rotation.y = autoRotation + mouseInfluence;
    
    // Slight tilt on X for natural feel
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -state.pointer.y * 0.2,
      0.04
    );

    // Gentle floating
    groupRef.current.position.y = -0.2 + Math.sin(t * 1.2) * 0.02;
  });

  return (
    <group ref={groupRef} scale={2.7} position={[0, -0.2, 0]}>
      <primitive object={scene} />

      {/* Screen Overlay */}
      {screenMesh && (
        <Html
          transform
          occlude
          distanceFactor={2.2}
          position={screenPosition}
          rotation={screenRotation}
          style={{
            width: "320px",
            height: "200px",
            pointerEvents: "none",
            borderRadius: "3px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
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
      width: "100%",
      height: "100%", // Ensure it fills the HTML overlay
      background: "linear-gradient(145deg, #0f172a 0%, #1e293b 100%)",
      color: "#fff",
      borderRadius: "3px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* Top bar */}
      <div style={{
        padding: "6px 12px",
        background: "#1a202c", // Slightly lighter dark for the top bar
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        flexShrink: 0,
        height: "30px", // Slightly taller top bar
      }}>
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={{ width: "7px", height: "7px", background: "#ef4444", borderRadius: "50%" }} />
          <div style={{ width: "7px", height: "7px", background: "#facc15", borderRadius: "50%" }} />
          <div style={{ width: "7px", height: "7px", background: "#4ade80", borderRadius: "50%" }} />
        </div>
        <div style={{ fontSize: "8px", fontWeight: 600, letterSpacing: "0.5px", opacity: 0.8 }}>
          HM Tech Analytics
        </div>
        <div style={{ width: "21px" }} /> {/* Spacer */}
      </div>

      {/* Dashboard Content */}
      <div style={{
        padding: "8px 12px 12px 12px",
        flex: 1,
        display: "flex", // Use flex for vertical layout
        flexDirection: "column",
        gap: "8px",
      }}>
        <div>
          <div style={{ fontSize: "8px", opacity: 0.6, fontWeight: 600, letterSpacing: "0.8px", textTransform: "uppercase" }}>
            Total Revenue
          </div>
          <div style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-1px", background: "linear-gradient(135deg, #8B5CF6, #6D28D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            $248,392
          </div>
        </div>

        {/* Mini bar chart */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "3px",
          height: "40px", // Slightly taller bar chart
          paddingBottom: "2px",
        }}>
          {[65, 45, 80, 55, 70, 60, 90].map((height, i) => (
            <div key={i} style={{
              flex: 1,
              height: `${height}%`,
              background: `linear-gradient(to top, #6D28D9, ${i % 2 === 0 ? '#8B5CF6' : '#7C3AED'})`,
              borderRadius: "2px 2px 0 0",
              opacity: 0.7 + (height / 100) * 0.3,
            }} />
          ))}
        </div>

        {/* Stats cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "6px", // Increased gap for stats cards
        }}>
          {[
            { label: "Projects", value: "42", change: "+12%" },
            { label: "Clients", value: "18", change: "+8%" },
            { label: "Success", value: "97%", change: "+3%" }
          ].map((s, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.08)", // Slightly more opaque background
              padding: "6px 4px", // Increased padding
              borderRadius: "3px",
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.1)", // More visible border
            }}>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#A78BFA" }}> {/* Brighter iris color */}
                {s.value}
              </div>
              <div style={{ fontSize: "7px", opacity: 0.7, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {s.label}
              </div>
              <div style={{ fontSize: "7px", color: "#4ade80", marginTop: "2px", fontWeight: 600 }}>
                {s.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Laptop3D() {
  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0.4, 5.0], fov: 35 }} // Set camera z-position to 5
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }} // preserveDrawingBuffer for potential screenshots
        shadows
      >
        <color attach="background" args={["transparent"]} /> {/* Make canvas background transparent */}

        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[8, 12, 10]} 
          intensity={2.0} 
          castShadow 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight 
          position={[-6, -4, -8]} 
          intensity={0.6} 
          color="#c4b5fd" 
        />
        <directionalLight 
          position={[0, -2, 4]} 
          intensity={0.3} 
          color="#8B5CF6" 
        />

        <Suspense fallback={null}>
          <LaptopModel />
          <Environment preset="city" background={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}