"use client";

/**
 * Scene3D - the persistent WebGL layer that sits behind the entire site.
 * ------------------------------------------------------------------
 * Tuned for a LIGHT page, which changes the rules from a dark scene:
 *
 *   - no bloom, no vignette, no additive blending. On white those either
 *     vanish or turn the page grey, so depth comes from soft shading and
 *     real shadows instead of glow.
 *   - fog is white, so distant geometry melts into the page rather than
 *     ending on a hard silhouette.
 *   - the palette stays pastel violet and the big shapes sit out at the
 *     edges, so headline copy never has a saturated mass behind it.
 *
 * Everything is procedural, so nothing is downloaded and the scene paints
 * on the first frame.
 *
 * The camera answers to two inputs: pointer position (parallax) and page
 * scroll progress (dolly + drift), which is what makes the page feel like a
 * space you travel through rather than a flat document.
 * ------------------------------------------------------------------
 */

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const BRAND = {
  violet: "#8B5CF6",
  soft: "#BDA5F6",
  pale: "#D8CBFB",
  deep: "#7C3AED",
  paper: "#FFFFFF",
};

/* Shared scroll progress (0..1), read every frame, never re-renders React. */
function useScrollRef() {
  const scroll = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scroll;
}

/* Normalised pointer (-1..1) taken from the window, not the canvas.
   The canvas sits under the page with pointer-events disabled so it never
   swallows clicks, which also means r3f's own pointer state stays at zero.
   Listening on the window is what keeps the parallax alive. */
function usePointerRef() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return pointer;
}

/* Camera rig: pointer parallax + scroll dolly */
function CameraRig({ scroll }: { scroll: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const pointer = usePointerRef();
  const target = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const s = scroll.current;
    const k = 1 - Math.pow(0.0015, delta); // frame-rate independent easing

    target.current.set(
      pointer.current.x * 1.1,
      1.0 + pointer.current.y * 0.7 - s * 2.6,
      10 - s * 2.6
    );
    camera.position.lerp(target.current, k);
    camera.lookAt(0, -s * 1.8, 0);
  });

  return null;
}

/* The soft morphing core, parked off-centre so copy stays readable */
function Core({ scroll }: { scroll: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null!);
  const ring = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.14 + scroll.current * 2;
      group.current.rotation.x = Math.sin(t * 0.2) * 0.14;
      group.current.position.y = Math.sin(t * 0.5) * 0.16;
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.25;
      ring.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group position={[3.6, 0.4, -1.5]}>
      <group ref={group}>
        <mesh castShadow>
          <icosahedronGeometry args={[1.5, 24]} />
          <MeshDistortMaterial
            color={BRAND.soft}
            roughness={0.32}
            metalness={0.12}
            distort={0.34}
            speed={1.4}
          />
        </mesh>
      </group>

      <mesh ref={ring}>
        <torusGeometry args={[2.5, 0.016, 12, 140]} />
        <meshStandardMaterial color={BRAND.violet} roughness={0.5} metalness={0} />
      </mesh>
    </group>
  );
}

/* A second, smaller cluster on the opposite side for balance */
function Satellite({ scroll }: { scroll: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = -t * 0.2 - scroll.current * 1.6;
      group.current.rotation.z = Math.sin(t * 0.25) * 0.2;
    }
  });

  return (
    <group ref={group} position={[-4.4, -1.4, -2.5]}>
      <mesh castShadow>
        <torusKnotGeometry args={[0.72, 0.22, 128, 24]} />
        <meshStandardMaterial color={BRAND.pale} roughness={0.35} metalness={0.15} />
      </mesh>
    </group>
  );
}

/* Floating pastel shapes */
type Shape = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  kind: number;
  speed: number;
};

function Shapes({ count = 18 }: { count?: number }) {
  const shapes = useMemo<Shape[]>(() => {
    // Deterministic pseudo-random so every reload composes the same frame.
    let seed = 11;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    return Array.from({ length: count }, () => {
      const angle = rnd() * Math.PI * 2;
      const radius = 5.5 + rnd() * 6;
      return {
        position: [
          Math.cos(angle) * radius,
          (rnd() - 0.5) * 11,
          Math.sin(angle) * radius - 3,
        ] as [number, number, number],
        rotation: [rnd() * Math.PI, rnd() * Math.PI, rnd() * Math.PI] as [
          number,
          number,
          number
        ],
        scale: 0.18 + rnd() * 0.4,
        kind: Math.floor(rnd() * 3),
        speed: 0.4 + rnd() * 1.1,
      };
    });
  }, [count]);

  return (
    <>
      {shapes.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={1.2} floatIntensity={1.5}>
          <mesh position={s.position} rotation={s.rotation} scale={s.scale} castShadow>
            {s.kind === 0 ? (
              <sphereGeometry args={[1, 32, 32]} />
            ) : s.kind === 1 ? (
              <boxGeometry args={[1.25, 1.25, 1.25]} />
            ) : (
              <octahedronGeometry args={[1.15, 0]} />
            )}
            <meshStandardMaterial
              color={i % 3 === 0 ? BRAND.violet : i % 3 === 1 ? BRAND.soft : BRAND.pale}
              roughness={0.34}
              metalness={0.12}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/* Soft drifting motes. Normal blending, not additive, so they stay visible
   against white instead of washing out. */
function Motes({ count = 500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3] = (Math.random() - 0.5) * 34;
      arr[i3 + 1] = (Math.random() - 0.5) * 26;
      arr[i3 + 2] = (Math.random() - 0.5) * 26 - 4;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.02;
    ref.current.position.y = Math.sin(t * 0.15) * 0.4;
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
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color={BRAND.violet}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* Blueprint grid travelling toward the camera */
function FloorGrid({ scroll }: { scroll: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.GridHelper>(null!);

  const grid = useMemo(() => {
    const g = new THREE.GridHelper(70, 50, BRAND.violet, BRAND.pale);
    const mat = g.material as THREE.Material | THREE.Material[];
    const apply = (m: THREE.Material) => {
      m.transparent = true;
      m.opacity = 0.16;
      m.depthWrite = false;
    };
    if (Array.isArray(mat)) {
      mat.forEach(apply);
    } else {
      apply(mat);
    }
    return g;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    // Pull the grid toward the camera for a sense of travel.
    ref.current.position.z = ((t * 1.1 + scroll.current * 36) % 7) - 11;
  });

  return <primitive ref={ref} object={grid} position={[0, -5.5, -11]} />;
}

/* Scene assembly */
function SceneContents({ light }: { light: boolean }) {
  const scroll = useScrollRef();

  return (
    <>
      {/* White fog so nothing ends on a hard edge against the page */}
      <fog attach="fog" args={[BRAND.paper, 13, 30]} />

      <ambientLight intensity={1.15} />
      <directionalLight
        position={[5, 9, 6]}
        intensity={1.9}
        color="#ffffff"
        castShadow={!light}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-6, 2, 4]} intensity={0.6} color={BRAND.soft} />
      <hemisphereLight args={["#ffffff", BRAND.pale, 0.7]} />

      <CameraRig scroll={scroll} />
      <Core scroll={scroll} />
      <Satellite scroll={scroll} />
      <Shapes count={light ? 9 : 18} />
      <Motes count={light ? 220 : 500} />
      <FloorGrid scroll={scroll} />

      {!light && (
        <ContactShadows
          position={[0, -5.4, -4]}
          opacity={0.16}
          scale={26}
          blur={3}
          far={9}
          color={BRAND.deep}
        />
      )}
    </>
  );
}

export default function Scene3D() {
  const [enabled, setEnabled] = useState(true);
  // Phones and small laptops get a thinner scene: same composition, fewer
  // objects and a lower pixel ceiling, so the frame budget survives.
  const [light, setLight] = useState(false);

  useEffect(() => {
    // Respect reduced motion: skip the canvas entirely for people who asked
    // for less animation, and fall back to a static wash.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 900px)");
    const update = () => {
      setEnabled(!mq.matches);
      setLight(small.matches || (navigator.hardwareConcurrency ?? 8) <= 4);
    };
    update();
    mq.addEventListener("change", update);
    small.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      small.removeEventListener("change", update);
    };
  }, []);

  if (!enabled) {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10 bg-white bg-[radial-gradient(120%_90%_at_50%_8%,rgba(167,139,250,0.22),transparent_60%)]" />
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-white">
      {/* soft aurora wash under the geometry */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_15%_10%,rgba(167,139,250,0.22),transparent_60%),radial-gradient(60%_55%_at_85%_25%,rgba(139,92,246,0.14),transparent_62%)]" />

      <Canvas
        dpr={light ? [1, 1.2] : [1, 1.6]}
        camera={{ position: [0, 1, 10], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows={!light}
        style={{ width: "100%", height: "100%" }}
      >
        <SceneContents light={light} />
      </Canvas>

      {/* Readability scrim: lifts the middle of the page back toward white so
          body copy always has contrast, while the edges keep their colour. */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_45%,rgba(255,255,255,0.82)_20%,rgba(255,255,255,0.45)_60%,transparent_100%)]" />
    </div>
  );
}
