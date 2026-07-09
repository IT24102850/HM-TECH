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
 *
 * Model path: /public/models/Hitem3d-1783613677244.glb
 * Required deps: three, @react-three/fiber, @react-three/drei,
 * @react-three/postprocessing
 * ------------------------------------------------------------------
 */

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Html, Sparkles, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

const MODEL_PATH = "/models/Hitem3d-1783613677244.glb";

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

const SCREEN_KEYWORDS = ["screen", "display", "lcd", "monitor", "glass", "panel"];

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
// Screen dashboard — this is what renders
// inside the <Html> plane on the laptop lid
// ───────────────────────────────────────────
function ScreenDashboard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 4000);
    return () => clearInterval(id);
  }, []);

  const bars = [58, 74, 46, 88, 62, 95, 70, 84, 91];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(160deg, #0d0a1a 0%, #17102c 100%)`,
        color: "#fff",
        fontFamily: "'Inter', -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: "1px solid rgba(139,92,246,0.18)",
      }}
    >
      <div
        style={{
          height: "22px",
          flexShrink: 0,
          padding: "0 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(139,92,246,0.12)",
          background: "rgba(10,8,20,0.6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "3px",
              background: `linear-gradient(135deg, ${BRAND.violetA}, ${BRAND.violetB})`,
              fontSize: "7px",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            H
          </div>
          <span style={{ fontSize: "7px", fontWeight: 600, letterSpacing: "0.6px", opacity: 0.75 }}>
            HM-TECH CONSOLE
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: BRAND.mint,
              boxShadow: `0 0 8px ${BRAND.mint}`,
            }}
          />
          <span style={{ fontSize: "6px", opacity: 0.55 }}>nominal</span>
        </div>
      </div>

      <div style={{ flex: 1, padding: "10px 14px 12px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: "6px", opacity: 0.5, letterSpacing: "1px", textTransform: "uppercase" }}>
              Deploy Success Rate
            </div>
            <div
              style={{
                fontSize: "21px",
                fontWeight: 700,
                background: `linear-gradient(135deg, ${BRAND.violetA}, ${BRAND.violetB})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.1,
              }}
            >
              99.7%
            </div>
          </div>
          <div
            style={{
              fontSize: "6.5px",
              color: BRAND.mint,
              background: "rgba(74,222,128,0.1)",
              border: "1px solid rgba(74,222,128,0.18)",
              borderRadius: "10px",
              padding: "2px 6px",
            }}
          >
            ▲ 2.1%
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "28px" }} key={tick}>
          {bars.map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${h}%`,
                borderRadius: "1px 1px 0 0",
                background: `linear-gradient(to top, ${BRAND.violetB}, ${i % 2 ? BRAND.violetA : "#a78bfa"})`,
                animation: `hmBarGrow ${0.4 + i * 0.05}s ease-out forwards`,
                transformOrigin: "bottom",
              }}
            />
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4px" }}>
          {[
            { label: "Projects", value: "42" },
            { label: "Uptime", value: "99.9%" },
            { label: "Clients", value: "128" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "rgba(139,92,246,0.06)",
                border: "1px solid rgba(139,92,246,0.08)",
                borderRadius: "3px",
                textAlign: "center",
                padding: "4px 2px",
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: 700, color: BRAND.violetA }}>{s.value}</div>
              <div style={{ fontSize: "5.5px", opacity: 0.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes hmBarGrow {
          0% { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

// ───────────────────────────────────────────
// Product-shot pose. Tune these — this is the
// knob set you want, not the framing math
// further down (that part is now automatic).
// ───────────────────────────────────────────
const POSE = {
  rotY: THREE.MathUtils.degToRad(-10), // gentle turn, mostly front-on
  rotX: THREE.MathUtils.degToRad(-3), // slight downward tilt, looking at screen
  swayY: THREE.MathUtils.degToRad(2.5), // idle side-to-side, degrees either way
  swayX: THREE.MathUtils.degToRad(0.8),
  parallax: 0.05, // mouse influence, kept small on purpose
  posY: -0.05, // small vertical nudge, leaves headroom above for overlays
};

// How much of the visible viewport the model's bounding sphere should
// fill. Lower = more margin/whitespace around the laptop. This is what
// replaced the old hardcoded "fitBox" guess and is why nothing gets
// cropped now regardless of this model's actual dimensions.
const VIEWPORT_FILL = 0.82;

function useFitScale(bounds: THREE.Box3) {
  const { viewport } = useThree();
  return useMemo(() => {
    const sphere = bounds.getBoundingSphere(new THREE.Sphere());
    if (!sphere.radius) return 1;
    const limitingDim = Math.min(viewport.width, viewport.height);
    return (limitingDim * VIEWPORT_FILL) / (sphere.radius * 2);
  }, [bounds, viewport.width, viewport.height]);
}

/** Forces the camera to actually look at the origin. Without this, an
 *  elevated camera position (e.g. y > 0) frames the origin below the
 *  vertical center of the canvas instead of dead-center, which is what
 *  was pushing the laptop toward the bottom edge / cropping it. */
function CameraRig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
}

interface LaptopModelProps {
  /** Exact node name of the screen mesh, if the auto-detect below picks
   *  the wrong one. Check the console log on first render — it prints
   *  every mesh name in the model. */
  screenMeshName?: string;
}

// ───────────────────────────────────────────
// Laptop model: load, inspect, center, scale,
// find the screen mesh, mount the Html panel
// ───────────────────────────────────────────
function LaptopModel({ screenMeshName }: LaptopModelProps) {
  const { scene, nodes, materials } = useGLTF(MODEL_PATH) as any;
  const groupRef = useRef<THREE.Group>(null!);
  const centeredGroupRef = useRef<THREE.Group>(null!);
  const materialsTintedRef = useRef(false);
  const introStartRef = useRef<number | null>(null);

  // Log real mesh/material names once — the model will not
  // necessarily use "Base"/"Screen" as names.
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.group("HM-TECH · laptop model inspection");
    console.log("nodes:", Object.keys(nodes || {}));
    console.log("materials:", Object.keys(materials || {}));
    scene.traverse((child: any) => {
      if (child.isMesh) {
        console.log(`mesh "${child.name}" — material "${child.material?.name ?? "unnamed"}"`);
      }
    });
    console.groupEnd();
  }, [scene, nodes, materials]);

  // Bounds computed synchronously from the loaded scene — no state, no
  // stale first frame. `scene` is stable for the lifetime of this GLTF.
  const bounds = useMemo(() => new THREE.Box3().setFromObject(scene), [scene]);

  const scale = useFitScale(bounds);

  const centerOffset = useMemo<[number, number, number]>(() => {
    const c = new THREE.Vector3();
    bounds.getCenter(c);
    return [-c.x, -c.y, -c.z];
  }, [bounds]);

  // Find the screen mesh: exact override > keyword match > geometry
  // heuristic (flattest, most screen-shaped mesh in the model).
  const screenMesh = useMemo<THREE.Mesh | null>(() => {
    if (screenMeshName && nodes?.[screenMeshName]?.isMesh) {
      return nodes[screenMeshName] as THREE.Mesh;
    }
    for (const key of Object.keys(nodes || {})) {
      if (SCREEN_KEYWORDS.some((k) => key.toLowerCase().includes(k)) && nodes[key]?.isMesh) {
        return nodes[key] as THREE.Mesh;
      }
    }
    let best: THREE.Mesh | null = null;
    let bestScore = 0;
    scene.traverse((child: any) => {
      if (!child.isMesh) return;
      const box = new THREE.Box3().setFromObject(child);
      const size = box.getSize(new THREE.Vector3());
      const [w, h] = size.x > size.y ? [size.x, size.y] : [size.y, size.x];
      const isFlat = size.z < Math.min(size.x, size.y) * 0.3;
      if (!isFlat || h === 0) return;
      const area = size.x * size.y;
      const aspectFit = 1 - Math.min(Math.abs(w / h - 1.6) / 1.6, 1);
      const score = area * (0.5 + 0.5 * aspectFit);
      if (score > bestScore) {
        bestScore = score;
        best = child;
      }
    });
    if (!best) {
      // If heuristic fails, try common names as a fallback
      best = (nodes?.Screen || nodes?.display || null) as THREE.Mesh | null;
    }
    if (!best) {
      console.error(
        "HM-TECH: no screen-like mesh found in the model. Check the mesh log above and pass screenMeshName explicitly."
      );
    }
    return best;
  }, [scene, nodes, screenMeshName]);

  // Screen transform relative to the model root (NOT world space) —
  // this is what makes the Html panel land in the right spot, since
  // it's mounted as a sibling of <primitive object={scene} /> inside
  // the same scaled/centered group.
  const screenData = useMemo<ScreenData | null>(() => {
    if (!screenMesh) return null;
    scene.updateMatrixWorld(true);
    const relative = new THREE.Matrix4().copy(scene.matrixWorld).invert().multiply(screenMesh.matrixWorld);
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const meshScale = new THREE.Vector3();
    relative.decompose(position, quaternion, meshScale);
    const euler = new THREE.Euler().setFromQuaternion(quaternion);

    let width = 1;
    let height = 0.6;
    if (screenMesh.geometry) {
      screenMesh.geometry.computeBoundingBox();
      const bb = screenMesh.geometry.boundingBox;
      if (bb) {
        const size = new THREE.Vector3();
        bb.getSize(size);
        const dims = [size.x * meshScale.x, size.y * meshScale.y, size.z * meshScale.z].sort((a, b) => b - a);
        width = dims[0] || 1;
        height = dims[1] || 0.6;
      }
    }

    return {
      position: [position.x, position.y, position.z],
      rotation: [euler.x, euler.y, euler.z],
      width,
      height,
    };
  }, [scene, screenMesh]);

  // Hide the real screen surface — the Html panel replaces it. Separate
  // effect from screenData on purpose: this is a mutation, not derived data.
  useEffect(() => {
    if (screenMesh) screenMesh.visible = false;
  }, [screenMesh]);

  // Shadows + material tint, once.
  useEffect(() => {
    if (materialsTintedRef.current) return;
    materialsTintedRef.current = true;
    scene.traverse((child: any) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;
      if (!child.material) return;
      const name = (child.name || "").toLowerCase();
      if (name.includes("body") || name.includes("case") || name.includes("base") || name.includes("chassis")) {
        child.material.color = new THREE.Color("#15131f");
        child.material.metalness = 0.85;
        child.material.roughness = 0.22;
      } else if (name.includes("key")) {
        child.material.metalness = 0.5;
        child.material.roughness = 0.35;
        child.material.emissive = new THREE.Color(BRAND.violetA);
        child.material.emissiveIntensity = 0.06;
      } else if (name.includes("hinge") || name.includes("logo")) {
        child.material.metalness = 0.9;
        child.material.roughness = 0.15;
      } else {
        child.material.metalness = 0.35;
        child.material.roughness = 0.4;
      }
      child.material.needsUpdate = true;
    });
  }, [scene]);

  // Fixed, mostly front-on pose + a small idle sway and barely-there
  // mouse parallax. A professional product shot holds one considered
  // angle — it doesn't spin, and it doesn't turn far from the viewer.
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const mx = state.pointer.x;
    const my = state.pointer.y;

    // One-time eased reveal: rises and scales up from a slightly
    // smaller/lower start instead of popping in at full size.
    if (introStartRef.current === null) introStartRef.current = t;
    const introElapsed = t - introStartRef.current;
    const introDuration = 1.15;
    const introT = Math.min(introElapsed / introDuration, 1);
    const eased = 1 - Math.pow(1 - introT, 3); // easeOutCubic

    const targetRotY = POSE.rotY + Math.sin(t * 0.22) * POSE.swayY + mx * POSE.parallax;
    const targetRotX = POSE.rotX + Math.sin(t * 0.3) * POSE.swayX + my * POSE.parallax * 0.5;

    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.position.y = POSE.posY + Math.sin(t * 0.5) * 0.015 - (1 - eased) * 0.6;
    groupRef.current.scale.setScalar(scale * (0.88 + 0.12 * eased));
  });

  return (
    <>
      <group ref={groupRef} position={[0, POSE.posY, 0]}>
        <group ref={centeredGroupRef} position={centerOffset}>
          <primitive object={scene} />

          {screenData && (
            <>
              {/* soft glow bleeding from behind the panel, sells the "live" feel */}
              <mesh position={screenData.position} rotation={screenData.rotation}>
                <planeGeometry args={[screenData.width * 1.15, screenData.height * 1.15]} />
                <meshBasicMaterial color={BRAND.violetA} transparent opacity={0.14} depthWrite={false} />
              </mesh>

              <Html
                transform
                occlude
                distanceFactor={1.75}
                position={screenData.position}
                rotation={screenData.rotation}
                style={{
                  width: "340px",
                  height: "212px",
                  pointerEvents: "none",
                  overflow: "hidden",
                  borderRadius: "3px",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
                }}
              >
                <ScreenDashboard />
              </Html>
            </>
          )}
        </group>
      </group>

      <ContactShadows position={[0, -0.62, 0]} opacity={0.5} scale={9} blur={2.4} far={2} color="#000000" />
    </>
  );
}

// ───────────────────────────────────────────
// Scene assembly
// ───────────────────────────────────────────
function Scene({ screenMeshName }: LaptopModelProps) {
  return (
    <Suspense fallback={null}>
      <LaptopModel screenMeshName={screenMeshName} />
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

export default function Laptop3D({ screenMeshName }: LaptopModelProps) {
  return (
    <Canvas
      dpr={[1, 1.8]}
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

      <CameraRig />

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

      <Scene screenMeshName={screenMeshName} />
    </Canvas>
  );
}