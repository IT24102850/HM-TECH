"use client";

/**
 * stageStore - the single source of truth for where the film is.
 * ------------------------------------------------------------------
 * Scroll position is sampled once per frame and written here as plain
 * mutable numbers. Nothing subscribes through React state, so scrolling
 * never triggers a re-render; the WebGL stage and any DOM readout just read
 * the current values inside their own animation frames.
 *
 * The same object is published on `window.__HMTECH_STAGE__` so the state of
 * the film is observable from outside (used by the browser verification
 * pass to prove the laptop is actually rotating with scroll).
 * ------------------------------------------------------------------
 */

export type StageState = {
  /** 0..1 across the whole film region (the pinned cinematic sections). */
  filmProgress: number;
  /** 0..1 across the entire document. */
  pageProgress: number;
  /** Which act is on screen: 0 orbit, 1 macro, 2 assembly, 3 atmosphere. */
  act: number;
  /** 0..1 within the current act. */
  actProgress: number;
  /** Laptop turntable rotation in radians, for verification and readouts. */
  rotationY: number;
  /** Smoothed frames per second. */
  fps: number;
  /** 0 while the film fills the viewport, 1 once it has scrolled fully past. */
  postFilm: number;
  /** Document offset of the film's top edge. Published for tooling. */
  filmTop: number;
  /** How many pixels of scroll the film spans. Published for tooling. */
  filmScrollable: number;
  /** True once the WebGL stage has rendered at least one frame. */
  ready: boolean;
};

export const stage: StageState = {
  filmProgress: 0,
  pageProgress: 0,
  act: 0,
  actProgress: 0,
  rotationY: 0,
  fps: 0,
  postFilm: 0,
  filmTop: 0,
  filmScrollable: 0,
  ready: false,
};

/** Act boundaries as fractions of the film region. */
export const ACTS: Array<{ name: string; start: number; end: number }> = [
  { name: "orbit", start: 0.0, end: 0.28 },
  { name: "macro", start: 0.28, end: 0.52 },
  { name: "assembly", start: 0.52, end: 0.78 },
  { name: "atmosphere", start: 0.78, end: 1.0 },
];

export function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/** Maps a global 0..1 to 0..1 inside [start, end], clamped outside. */
export function subProgress(p: number, start: number, end: number) {
  return clamp01((p - start) / (end - start));
}

/** Smoothstep, for eases that do not need a spring. */
export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Measures the film's position in the document. Call on mount and on resize,
 * never per frame: getBoundingClientRect forces layout, and doing that inside
 * the render loop is what turns a smooth scroll into a stuttering one.
 */
export function measureFilm(filmEl: HTMLElement | null) {
  if (!filmEl) {
    stage.filmTop = 0;
    stage.filmScrollable = 0;
    return;
  }
  const rect = filmEl.getBoundingClientRect();
  stage.filmTop = rect.top + window.scrollY;
  stage.filmScrollable = Math.max(1, rect.height - window.innerHeight);
}

/**
 * Reads scroll and updates the store. Pure arithmetic against the cached
 * measurements, so it is safe to run every frame.
 */
export function sampleScroll() {
  const doc = document.documentElement;
  const maxPage = doc.scrollHeight - window.innerHeight;
  const y = window.scrollY;
  stage.pageProgress = maxPage > 0 ? clamp01(y / maxPage) : 0;

  if (stage.filmScrollable > 1) {
    stage.filmProgress = clamp01((y - stage.filmTop) / stage.filmScrollable);
    // How far the film has travelled past the bottom of the viewport, over one
    // viewport height. Drives the stage handing off to the DOM sections.
    const filmBottomDoc = stage.filmTop + stage.filmScrollable + window.innerHeight;
    stage.postFilm = clamp01(
      (y + window.innerHeight - filmBottomDoc) / window.innerHeight
    );
  } else {
    stage.filmProgress = stage.pageProgress;
    stage.postFilm = 0;
  }

  const p = stage.filmProgress;
  let act = 0;
  for (let i = 0; i < ACTS.length; i++) {
    if (p >= ACTS[i].start) act = i;
  }
  stage.act = act;
  stage.actProgress = subProgress(p, ACTS[act].start, ACTS[act].end);
}

export function publishStage() {
  if (typeof window !== "undefined") {
    (window as unknown as Record<string, unknown>).__HMTECH_STAGE__ = stage;
  }
}
