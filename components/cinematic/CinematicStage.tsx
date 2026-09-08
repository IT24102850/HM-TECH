"use client";

/**
 * CinematicStage - one WebGL canvas, four acts, driven entirely by scroll.
 * ------------------------------------------------------------------
 * Rather than four separate canvases (four GL contexts, four times the
 * cost), the whole film is a single fixed canvas whose camera, model and
 * lighting are re-posed each frame from the scroll position:
 *
 *   ACT 0  ORBIT       turntable - scrolling rotates the laptop a full 360
 *   ACT 1  MACRO       camera dives to the glass and glides across the panel
 *   ACT 2  ASSEMBLY    the machine flies apart, then converges back together
 *                      as modules stream in and the interface lights up
 *   ACT 3  ATMOSPHERE  it comes to rest on a reflective surface in haze
 *
 * This is the Apple scroll-scrub effect done with live geometry instead of
 * a pre-rendered image sequence: the same "scrolling rotates the product"
 * result, but resolution independent and with no frames to download.
 *
 * Once the film has scrolled past, the machine recedes and the background
 * geometry carries the remaining DOM sections.
 * ------------------------------------------------------------------
 */

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, Environment, Lightformer } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

import Laptop from "./Laptop";
import {
  AssemblyModules,
  DataStreams,
  FloatingOrbs,
  Motes,
  ReflectiveFloor,
  VolumetricLight,
} from "./StageElements";
import { measureFilm, publishStage, sampleScroll, smoothstep, stage } from "./stageStore";

/* The display plane in world space, derived from the lid's transform
   (lid group at y -0.41, z -0.34, pitched back 0.3rad; panel at local
   y 0.95). The macro act flies along these axes. */
const PITCH = 0.3;
const SCREEN_CENTER = new THREE.Vector3(0, 0.4993, -0.615);
const SCREEN_NORMAL = new THREE.Vector3(0, Math.sin(PITCH), Math.cos(PITCH));
const SCREEN_RIGHT = new THREE.Vector3(1, 0, 0);
const SCREEN_UP = new THREE.Vector3(0, Math.cos(PITCH), -Math.sin(PITCH));

function lerpV(out: THREE.Vector3, a: THREE.Vector3, b: THREE.Vector3, t: number) {
  out.set(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
  return out;
}

/* ─────────────── Scroll sampler ─────────────── */
function ScrollSampler() {
  useEffect(() => {
    const remeasure = () => measureFilm(document.getElementById("film"));

    remeasure();
    sampleScroll();
    publishStage();

    window.addEventListener("resize", remeasure);
    // Late-loading images and fonts can shift the film's offset, so re-measure
    // a few times after boot rather than trusting the first reading.
    const timers = [200, 800, 2000, 4000].map((d) =>
      window.setTimeout(remeasure, d)
    );

    return () => {
      window.removeEventListener("resize", remeasure);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  // Sample every frame: Lenis eases between real scroll events, and during
  // that glide no scroll event necessarily fires.
  useFrame(() => {
    sampleScroll();
  });

  return null;
}

/* ─────────────── The director ─────────────── */
function Director({ quality, idle }: { quality: "high" | "low"; idle: number }) {
  const { camera } = useThree();

  const laptop = useRef<THREE.Group>(null!);
  const modules = useRef<THREE.Group>(null!);
  const floor = useRef<THREE.Group>(null!);

  const pointer = useRef({ x: 0, y: 0 });
  const camPos = useRef(new THREE.Vector3(0, 0.9, 7.2));
  const camLook = useRef(new THREE.Vector3(0, 0.15, 0));
  const tmpA = useRef(new THREE.Vector3());
  const tmpB = useRef(new THREE.Vector3());

  const [explode, setExplode] = useState(0);
  const [assembly, setAssembly] = useState(0);
  const [floorOpacity, setFloorOpacity] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [screenOn, setScreenOn] = useState(1);
  const [showModules, setShowModules] = useState(false);

  /* mouse-move parallax on the stage */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const fpsAccum = useRef({ frames: 0, last: performance.now() });

  useFrame((state, delta) => {
    const p = stage.filmProgress;
    const act = stage.act;
    const ap = stage.actProgress;

    /* ---------- fps ---------- */
    const fa = fpsAccum.current;
    fa.frames += 1;
    const now = performance.now();
    if (now - fa.last >= 500) {
      stage.fps = Math.round((fa.frames * 1000) / (now - fa.last));
      fa.frames = 0;
      fa.last = now;
    }
    stage.ready = true;

    /* ---------- pose targets per act ---------- */
    const target = tmpA.current;
    const look = tmpB.current;
    let rotY = 0;
    let nextExplode = 0;
    let nextAssembly = 0;
    let nextScreenOn = 1;

    if (act === 0) {
      /* ORBIT: a full, even turntable. Scroll IS the rotation. */
      rotY = ap * Math.PI * 2;
      const push = smoothstep(0, 1, ap);
      target.set(0, 0.95 + push * 0.12, 7.4 - push * 0.9);
      look.set(0, 0.15, 0);
    } else if (act === 1) {
      /* MACRO: dive to the glass, then glide across the panel. */
      rotY = Math.PI * 2;
      const dive = smoothstep(0, 0.42, ap);
      const dist = 6.6 - dive * 5.95; // 6.6 -> 0.65
      const panX = (ap - 0.5) * 1.9;
      const panY = 0.42 - ap * 0.78;

      target
        .copy(SCREEN_CENTER)
        .addScaledVector(SCREEN_NORMAL, dist)
        .addScaledVector(SCREEN_RIGHT, panX)
        .addScaledVector(SCREEN_UP, panY);

      look
        .copy(SCREEN_CENTER)
        .addScaledVector(SCREEN_RIGHT, panX * 0.86)
        .addScaledVector(SCREEN_UP, panY * 0.86);
    } else if (act === 2) {
      /* ASSEMBLY: pull back, blow apart, converge. */
      rotY = Math.PI * 2 + smoothstep(0, 1, ap) * 0.4;
      const back = smoothstep(0, 0.3, ap);
      target.set(
        1.1 * back,
        0.9 + back * 0.7,
        1.1 + back * 6.2
      );
      look.set(0, 0.2, 0);

      // fly apart quickly, hold, then converge into the finished machine
      nextExplode =
        ap < 0.24 ? smoothstep(0, 0.24, ap) : 1 - smoothstep(0.3, 0.98, ap);
      nextAssembly = smoothstep(0.28, 0.95, ap);
      nextScreenOn = 1 - nextExplode * 0.8;
    } else {
      /* ATMOSPHERE: low, quiet, resting on the reflective surface. */
      rotY = Math.PI * 2 + 0.4 - smoothstep(0, 1, ap) * 0.26;
      const settle = smoothstep(0, 0.7, ap);
      target.set(
        1.1 - settle * 1.1,
        1.6 - settle * 1.05,
        7.3 - settle * 1.9
      );
      look.set(0, 0.1 - settle * 0.18, 0);
    }

    /* ---------- mouse parallax, strongest in the wide acts ---------- */
    const parallaxAmount = act === 1 ? 0.12 : 0.55;
    target.x += pointer.current.x * parallaxAmount;
    target.y += pointer.current.y * parallaxAmount * 0.6;

    /* ---------- ease the camera ---------- */
    // Frame-rate independent smoothing; tight enough to feel scrubbed, soft
    // enough that a flick of the wheel does not snap.
    const k = 1 - Math.pow(0.0000015, delta);
    lerpV(camPos.current, camPos.current, target, k);
    lerpV(camLook.current, camLook.current, look, k);
    camera.position.copy(camPos.current);
    camera.lookAt(camLook.current);

    /* ---------- model state ---------- */
    if (laptop.current) {
      laptop.current.rotation.y = rotY;
      // hand the stage over to the DOM sections once the film is done
      const post = stage.postFilm;
      laptop.current.position.z = -post * 16;
      laptop.current.scale.setScalar(Math.max(0.02, 1 - post * 0.55));
      laptop.current.visible = post < 0.985;
    }
    stage.rotationY = rotY;

    if (modules.current) modules.current.visible = act === 2;

    /* React state only changes when a value actually moves enough to matter,
       so scrolling does not thrash the reconciler. */
    if (Math.abs(nextExplode - explode) > 0.004) setExplode(nextExplode);
    if (Math.abs(nextAssembly - assembly) > 0.004) setAssembly(nextAssembly);
    if (Math.abs(nextScreenOn - screenOn) > 0.006) setScreenOn(nextScreenOn);
    if (showModules !== (act === 2)) setShowModules(act === 2);

    const nextFloor = smoothstep(0.7, 0.86, p) * (1 - stage.postFilm);
    if (Math.abs(nextFloor - floorOpacity) > 0.01) setFloorOpacity(nextFloor);

    const nextVolume = 0.3 + smoothstep(0.55, 0.92, p) * 0.85;
    if (Math.abs(nextVolume - volume) > 0.01) setVolume(nextVolume);
  });

  return (
    <>
      <group ref={laptop}>
        <Laptop explode={explode} screenOn={screenOn} />
      </group>

      <group ref={modules} visible={showModules}>
        <AssemblyModules progress={assembly} />
      </group>

      <group ref={floor}>
        <ReflectiveFloor opacity={floorOpacity} />
      </group>

      <VolumetricLight intensity={volume} />
      <DataStreams count={quality === "high" ? 18 : 10} idle={idle} />
      <Motes count={quality === "high" ? 600 : 280} idle={idle} />
      <FloatingOrbs count={quality === "high" ? 11 : 7} idle={idle} />
    </>
  );
}

/* ─────────────── Canvas ─────────────── */
export default function CinematicStage() {
  const [quality, setQuality] = useState<"high" | "low">("high");
  /* 1 = full idle motion, 0.12 = damped for people who asked for less.
     Reduced motion damps the AUTONOMOUS loops (drifting orbs, streams,
     particles). It does not switch the film off: everything the camera does
     is driven by the reader's own scrolling, which is not autoplay, and
     killing it would leave the page blank rather than calmer. */
  const [idle, setIdle] = useState(1);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 900px)");
    const update = () => {
      setIdle(reduce.matches ? 0.12 : 1);
      setQuality(
        small.matches || (navigator.hardwareConcurrency ?? 8) <= 2 ? "low" : "high"
      );
    };
    update();
    reduce.addEventListener("change", update);
    small.addEventListener("change", update);
    publishStage();
    return () => {
      reduce.removeEventListener("change", update);
      small.removeEventListener("change", update);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-paper">
      <Canvas
        dpr={quality === "high" ? [1, 1.35] : [1, 1]}
        camera={{ position: [0, 0.95, 7.4], fov: 38, near: 0.05, far: 90 }}
        gl={{
          // The bloom pass already softens edges; MSAA on top of it is pure
          // cost on integrated graphics.
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
        shadows={false}
        performance={{ min: 0.55 }}
        style={{ width: "100%", height: "100%" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#07070B", 1);
          stage.ready = true;
        }}
      >
        <fog attach="fog" args={["#07070B", 9, 34]} />

        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 7, 6]} intensity={1.5} color="#EDE9FE" />
        <directionalLight position={[-6, 2, -4]} intensity={0.7} color="#8B5CF6" />
        <pointLight position={[0, 1.2, 3.2]} intensity={16} color="#C4B5FD" distance={16} />
        <pointLight position={[3.4, -1, 2]} intensity={9} color="#D9B46A" distance={14} />

        {/* Studio reflections built in-scene, so the titanium has something to
            catch without fetching an HDR from the network. */}
        <Environment resolution={128} frames={1}>
          <Lightformer
            intensity={2.2}
            position={[0, 4, -6]}
            scale={[12, 6, 1]}
            color="#8B5CF6"
          />
          <Lightformer
            intensity={1.6}
            position={[-6, 1, 3]}
            scale={[8, 8, 1]}
            color="#ffffff"
          />
          <Lightformer
            intensity={1.1}
            position={[6, -2, 2]}
            scale={[8, 6, 1]}
            color="#D9B46A"
          />
          <Lightformer
            intensity={0.8}
            position={[0, -5, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[14, 14, 1]}
            color="#1B1630"
          />
        </Environment>

        <ScrollSampler />
        <Director quality={quality} idle={idle} />
        {/* drops resolution automatically if frames start to slip */}
        <AdaptiveDpr pixelated={false} />

        {/* Two passes, both cheap. Bloom runs at half resolution, which is
            invisible on a glow and roughly halves its cost. The film-grain
            pass was a third full-screen draw for very little, so it is gone. */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.85}
            intensity={0.85}
            mipmapBlur
            resolutionScale={0.5}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.82} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
