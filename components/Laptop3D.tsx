"use client";

import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Html,
  Environment,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";

const MODEL_PATH = "/models/source/MacBook Ultra.glb";

/**
 * The GLB is a Sketchfab/FBX export, so the meshes are NOT named
 * "Base" / "Screen" — they come through as generic "Cube.00N_Material..."
 * names. Inspecting the file's node graph shows:
 *   - Cube.001_Material.001_0 / Cube.001_Material_0  -> the laptop base/chassis
 *   - Cube.002_Material_0                            -> the screen's outer shell/bezel
 *   - Cube.002_Material.001_0                         -> the flat display glass
 * (confirmed by dumping accessor bounding boxes — the base is a wide, thin
 * horizontal slab, the "Cube.002" pair is a tall vertical panel offset to
 * one edge of the base, exactly where a laptop screen would hinge).
 */
type GLTFResult = GLTF & {
  // The nodes and materials will be different for the new model.
  // We can use a generic type and inspect the model in the console.
  nodes: { [name: string]: THREE.Object3D };
  materials: { [name: string]: THREE.Material };
};

const DISPLAY_MESH_NAME = "Screen"; // Placeholder: update this after inspecting the new model's nodes

function DashboardScreen() {
  return (
    <div
      style={{
        width: 340,
        height: 232,
        borderRadius: 6,
        overflow: "hidden",
        background: "#ffffff",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
      }}
    >
      {/* header bar */}
      <div
        style={{
          height: 34,
          flexShrink: 0,
          background: "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 12px",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: "rgba(255,255,255,0.9)",
          }}
        />
        <span
          style={{
            color: "#fff",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 0.3,
          }}
        >
          HM Tech Dashboard
        </span>
      </div>

      <div style={{ padding: "12px 14px", flex: 1 }}>
        {/* total revenue + bar chart */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 9, color: "#8a8a99", fontWeight: 600 }}>
            TOTAL REVENUE
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#1f1f2e" }}>
            $128,420
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 5,
            height: 46,
            marginBottom: 12,
          }}
        >
          {[40, 65, 50, 80, 60, 95, 72].map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${h}%`,
                borderRadius: 3,
                background:
                  i === 5
                    ? "linear-gradient(180deg, #8B5CF6 0%, #6D28D9 100%)"
                    : "#EDE7FB",
              }}
            />
          ))}
        </div>

        {/* stat cards */}
        <div style={{ display: "flex", gap: 6 }}>
          {[
            { label: "Projects", value: "48" },
            { label: "Clients", value: "32" },
            { label: "Success", value: "99%" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                background: "#F5F2FE",
                borderRadius: 5,
                padding: "6px 4px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: "#6D28D9" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 7.5, color: "#8a8a99", fontWeight: 600 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials, scene } = useGLTF(MODEL_PATH) as unknown as GLTFResult;

  // Log the real node/material names + a measured bounding box once, so the
  // scale/rotation/position below can be sanity-checked or re-tuned live
  // (values here were derived by parsing the GLB's accessor bounding boxes
  // offline, not guessed).
  useEffect(() => {
    console.log("[Laptop3D] GLB nodes:", nodes);
    console.log("[Laptop3D] GLB materials:", materials);
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    console.log("[Laptop3D] raw bounding box size:", size, "center:", center);
  }, [nodes, materials, scene]);

  useEffect(() => {
    // Hide the flat display-glass mesh — the <Html> dashboard below sits in
    // its place. Everything else (chassis, screen bezel) stays visible and
    // shadow-casting.
    const display = scene.getObjectByName(DISPLAY_MESH_NAME);
    if (display) display.visible = false;

    scene.traverse((obj) => {
      obj.castShadow = true;
      obj.receiveShadow = true;
    });
  }, [nodes, scene]);

  return (
    <group
      // Scale/rotation/position derived from the model's measured world
      // bounding box (~15 x 15 x 19 units) so it lands centered near the
      // origin inside a ~3.5 unit box, matching the camera at
      // [0, 0.6, 7.2] / fov 38. The -90° Y rotation turns the screen
      // (whose face normal comes in along this frame's X axis) to face
      // the camera along +Z. If the laptop renders back-to-front, flip
      // this to +Math.PI / 2.
      rotation={[0, -Math.PI / 2, 0]}
      scale={5} // Increased scale to make the laptop larger
      position={[0, -1.6, 0]} // Adjusted position to keep it on the shadow
      {...props}
    >
      <primitive object={scene} />

      {/* Dashboard overlay, positioned at the measured center of the
          display-glass mesh in this same (pre-group-scale) local frame. */}
      <Html
        transform
        occlude
        position={[0, 0.15, -1.4]} // Placeholder position for the screen content
        rotation-x={-0.256} // Placeholder rotation for the screen content
        distanceFactor={1.17}
        style={{ pointerEvents: "none" }}
      >
        <DashboardScreen />
      </Html>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

export default function Laptop3D() {
  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.8]}
        camera={{ position: [0, 0.6, 7.2], fov: 38 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[4, 6, 4]}
            intensity={1.4}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-5, 3, -4]} intensity={0.5} />

          <Model />

          <ContactShadows
            position={[0, -1.45, 0]}
            opacity={0.35}
            scale={8}
            blur={2.4}
            far={2.2}
          />

          <Environment preset="warehouse" />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate
            autoRotateSpeed={0.4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}