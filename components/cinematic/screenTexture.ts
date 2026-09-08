"use client";

/**
 * screenTexture - the laptop display, painted procedurally at high
 * resolution so the macro fly-through can push the camera right up against
 * the glass without the panel turning to mush.
 *
 * The layout is deliberately zoned, because the macro camera glides across
 * it: a live code editor on the left, a neural network in the middle,
 * telemetry dashboards on the right, and circuit traces along the bottom.
 * Wherever the camera lands there is something worth looking at.
 */

import * as THREE from "three";

const VIOLET = "#8B5CF6";
const VIOLET_SOFT = "#C4B5FD";
const GOLD = "#D9B46A";
const CYAN = "#67E8F9";
const MINT = "#4ADE80";

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Deterministic pseudo-random so the panel is identical on every reload. */
function makeRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

export function createScreenTexture(): THREE.CanvasTexture | null {
  const W = 2048;
  const H = 1280;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const rnd = makeRng(7);

  /* ---- ground ---- */
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#07060F");
  bg.addColorStop(0.5, "#0E0B22");
  bg.addColorStop(1, "#080714");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  /* ---- title bar ---- */
  ctx.fillStyle = "rgba(255,255,255,0.045)";
  ctx.fillRect(0, 0, W, 64);
  ctx.fillStyle = "rgba(139,92,246,0.55)";
  ctx.fillRect(0, 63, W, 1);
  ["#FF5F57", "#FEBC2E", "#28C840"].forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(44 + i * 32, 32, 8, 0, Math.PI * 2);
    ctx.fillStyle = c;
    ctx.fill();
  });
  ctx.fillStyle = "rgba(236,234,244,0.62)";
  ctx.font = "500 20px ui-monospace, Menlo, monospace";
  ctx.fillText("hmtech — core/pipeline.ts", 160, 39);
  ctx.fillStyle = GOLD;
  ctx.fillText("● live", W - 140, 39);

  /* ---- left column: code editor ---- */
  const codeX = 56;
  const codeW = 700;
  ctx.fillStyle = "rgba(255,255,255,0.02)";
  ctx.fillRect(codeX - 24, 92, codeW + 48, H - 300);

  const codeColors = [
    "rgba(167,139,250,0.95)",
    "rgba(103,232,249,0.85)",
    "rgba(236,234,244,0.55)",
    "rgba(74,222,128,0.85)",
    "rgba(217,180,106,0.8)",
  ];
  let y = 132;
  for (let line = 0; line < 26; line++) {
    // gutter number
    ctx.fillStyle = "rgba(236,234,244,0.18)";
    ctx.font = "400 15px ui-monospace, Menlo, monospace";
    ctx.fillText(String(line + 1).padStart(2, "0"), codeX - 12, y + 10);

    const indent = (line % 5 === 0 ? 0 : line % 3 === 0 ? 1 : 2) * 26;
    let x = codeX + 34 + indent;
    const chunks = 2 + Math.floor(rnd() * 4);
    for (let c = 0; c < chunks; c++) {
      const len = 40 + rnd() * 150;
      if (x + len > codeX + codeW) break;
      ctx.fillStyle = codeColors[Math.floor(rnd() * codeColors.length)];
      ctx.globalAlpha = 0.9;
      roundRect(ctx, x, y, len, 9, 4);
      ctx.fill();
      x += len + 16;
    }
    ctx.globalAlpha = 1;
    y += 30;
  }

  // caret
  ctx.fillStyle = VIOLET_SOFT;
  ctx.fillRect(codeX + 220, y - 26, 3, 18);

  /* ---- middle: neural network ---- */
  const netX = 820;
  const netY = 150;
  const netW = 560;
  const netH = 520;

  ctx.strokeStyle = "rgba(255,255,255,0.09)";
  ctx.lineWidth = 2;
  roundRect(ctx, netX - 24, netY - 40, netW + 48, netH + 96, 20);
  ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.022)";
  ctx.fill();

  ctx.fillStyle = "rgba(236,234,244,0.5)";
  ctx.font = "500 17px ui-monospace, Menlo, monospace";
  ctx.fillText("INFERENCE GRAPH", netX, netY - 8);

  const layers = [5, 7, 7, 4];
  const nodes: Array<Array<{ x: number; y: number }>> = [];
  layers.forEach((count, li) => {
    const col: Array<{ x: number; y: number }> = [];
    const lx = netX + 40 + (li * (netW - 80)) / (layers.length - 1);
    for (let n = 0; n < count; n++) {
      const ly = netY + 40 + ((n + 0.5) * (netH - 80)) / count;
      col.push({ x: lx, y: ly });
    }
    nodes.push(col);
  });

  // edges
  for (let li = 0; li < nodes.length - 1; li++) {
    for (const a of nodes[li]) {
      for (const b of nodes[li + 1]) {
        const hot = rnd() > 0.72;
        ctx.strokeStyle = hot
          ? "rgba(167,139,250,0.55)"
          : "rgba(167,139,250,0.12)";
        ctx.lineWidth = hot ? 1.8 : 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  // nodes
  nodes.forEach((col, li) => {
    col.forEach((n) => {
      const active = rnd() > 0.6;
      const r = active ? 9 : 6;
      const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3);
      glow.addColorStop(0, active ? "rgba(167,139,250,0.85)" : "rgba(167,139,250,0.4)");
      glow.addColorStop(1, "rgba(167,139,250,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = li === nodes.length - 1 ? GOLD : active ? "#E0D5FF" : "#8B5CF6";
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  /* ---- right: telemetry dashboards ---- */
  const dashX = 1440;
  const cards = [
    { label: "UPTIME", value: "99.98%", color: MINT },
    { label: "P95 LATENCY", value: "84ms", color: CYAN },
    { label: "DEPLOYS / WK", value: "142", color: VIOLET_SOFT },
  ];
  cards.forEach((card, i) => {
    const cy = 120 + i * 190;
    ctx.strokeStyle = "rgba(255,255,255,0.09)";
    ctx.lineWidth = 2;
    roundRect(ctx, dashX, cy, 540, 160, 18);
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(236,234,244,0.42)";
    ctx.font = "500 16px ui-monospace, Menlo, monospace";
    ctx.fillText(card.label, dashX + 26, cy + 38);

    ctx.fillStyle = card.color;
    ctx.font = "700 48px Inter, system-ui, sans-serif";
    ctx.fillText(card.value, dashX + 26, cy + 96);

    // bar chart
    for (let b = 0; b < 14; b++) {
      const bh = 12 + Math.abs(Math.sin(b * 0.9 + i * 2)) * 40;
      ctx.fillStyle = card.color;
      ctx.globalAlpha = 0.25 + (b / 14) * 0.55;
      ctx.fillRect(dashX + 300 + b * 16, cy + 120 - bh, 9, bh);
    }
    ctx.globalAlpha = 1;
  });

  // area chart under the cards
  const chartY = 700;
  ctx.strokeStyle = "rgba(255,255,255,0.09)";
  roundRect(ctx, dashX, chartY, 540, 240, 18);
  ctx.fillStyle = "rgba(255,255,255,0.03)";
  ctx.fill();
  ctx.stroke();

  const pts: Array<[number, number]> = [];
  for (let i = 0; i <= 20; i++) {
    const px = dashX + 24 + (i * (540 - 48)) / 20;
    const py = chartY + 190 - (Math.sin(i * 0.55) * 0.5 + 0.5) * 130 - rnd() * 18;
    pts.push([px, py]);
  }
  const area = ctx.createLinearGradient(0, chartY, 0, chartY + 240);
  area.addColorStop(0, "rgba(139,92,246,0.45)");
  area.addColorStop(1, "rgba(139,92,246,0)");
  ctx.beginPath();
  ctx.moveTo(pts[0][0], chartY + 216);
  pts.forEach(([px, py]) => ctx.lineTo(px, py));
  ctx.lineTo(pts[pts.length - 1][0], chartY + 216);
  ctx.closePath();
  ctx.fillStyle = area;
  ctx.fill();

  ctx.beginPath();
  pts.forEach(([px, py], i) => (i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)));
  ctx.strokeStyle = VIOLET_SOFT;
  ctx.lineWidth = 3;
  ctx.stroke();

  /* ---- bottom band: circuit traces under glass ---- */
  const circuitTop = H - 190;
  ctx.fillStyle = "rgba(255,255,255,0.02)";
  ctx.fillRect(0, circuitTop, W, 190);
  ctx.strokeStyle = "rgba(103,232,249,0.28)";
  ctx.lineWidth = 2;
  for (let t = 0; t < 26; t++) {
    let cx = 20 + t * 80;
    let cy = circuitTop + 20 + rnd() * 30;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    const segs = 3 + Math.floor(rnd() * 3);
    for (let s = 0; s < segs; s++) {
      if (rnd() > 0.5) {
        cx += 30 + rnd() * 50;
        ctx.lineTo(cx, cy);
      } else {
        cy += (rnd() > 0.5 ? 1 : -1) * (20 + rnd() * 40);
        cy = Math.max(circuitTop + 12, Math.min(H - 14, cy));
        ctx.lineTo(cx, cy);
      }
    }
    ctx.stroke();
    // pad
    ctx.fillStyle = "rgba(217,180,106,0.7)";
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(103,232,249,0.28)";
  }

  /* ---- scanline sheen over everything ---- */
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = "#ffffff";
  for (let sy = 0; sy < H; sy += 4) {
    ctx.fillRect(0, sy, W, 1);
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}
