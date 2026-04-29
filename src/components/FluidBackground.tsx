"use client";

import { useEffect, useRef } from "react";

type Metaball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  wobbleFreqX: number;
  wobbleFreqY: number;
  wobbleAmpX: number;
  wobbleAmpY: number;
  phaseX: number;
  phaseY: number;
};

type Disturbance = {
  x: number;
  y: number;
  power: number;
  life: number;
  radius: number;
};

const SECTION_OPACITY: Record<string, number> = {
  top: 1,
  work: 0.5,
  about: 0.3,
  contact: 0.85,
};

const SECTION_IDS = ["top", "work", "about", "contact"] as const;
const FPS_INTERVAL = 1000 / 60;
const FIELD_SCALE = 0.18;
const FIELD_THRESHOLD = 1;
const MAX_DPR = 1.5;
const COLOR_VIOLET = { r: 167, g: 139, b: 250 };

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const cursorTarget = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cursorCurrent = { x: cursorTarget.x, y: cursorTarget.y };
    const lastMouse = { x: cursorTarget.x, y: cursorTarget.y, time: performance.now() };
    const disturbances: Disturbance[] = [];
    const sectionRatios = new Map<string, number>();

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    let lastFrameTime = 0;
    let currentOpacity = SECTION_OPACITY.top;
    let targetOpacity = SECTION_OPACITY.top;
    let bloomCurrent = 0;
    let bloomTarget = 0;
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();

    let fieldWidth = Math.max(160, Math.floor(width * FIELD_SCALE));
    let fieldHeight = Math.max(120, Math.floor(height * FIELD_SCALE));
    let fieldImage = new ImageData(fieldWidth, fieldHeight);

    const fieldCanvas = document.createElement("canvas");
    fieldCanvas.width = fieldWidth;
    fieldCanvas.height = fieldHeight;
    const fieldCtx = fieldCanvas.getContext("2d");
    if (!fieldCtx) return;

    const metaballCount = window.innerWidth < 768 ? 4 : 8;
    const metaballs: Metaball[] = Array.from({ length: metaballCount }, () => ({
      x: randomBetween(0.1, 0.9) * width,
      y: randomBetween(0.1, 0.9) * height,
      vx: randomBetween(-22, 22),
      vy: randomBetween(-18, 18),
      radius: randomBetween(120, 230),
      wobbleFreqX: randomBetween(0.1, 0.28),
      wobbleFreqY: randomBetween(0.1, 0.3),
      wobbleAmpX: randomBetween(14, 42),
      wobbleAmpY: randomBetween(12, 40),
      phaseX: randomBetween(0, Math.PI * 2),
      phaseY: randomBetween(0, Math.PI * 2),
    }));

    const updateCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      fieldWidth = Math.max(160, Math.floor(width * FIELD_SCALE));
      fieldHeight = Math.max(120, Math.floor(height * FIELD_SCALE));
      fieldCanvas.width = fieldWidth;
      fieldCanvas.height = fieldHeight;
      fieldImage = new ImageData(fieldWidth, fieldHeight);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const updateTargetOpacity = () => {
      let weightedOpacity = 0;
      let weightedTotal = 0;

      for (const id of SECTION_IDS) {
        const ratio = sectionRatios.get(id) ?? 0;
        if (ratio <= 0) continue;
        weightedOpacity += SECTION_OPACITY[id] * ratio;
        weightedTotal += ratio;
      }

      if (weightedTotal > 0) {
        targetOpacity = weightedOpacity / weightedTotal;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          if (!SECTION_IDS.includes(id as (typeof SECTION_IDS)[number])) continue;
          sectionRatios.set(id, entry.intersectionRatio);
        }
        updateTargetOpacity();
      },
      {
        threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.7, 0.85, 1],
      },
    );

    for (const id of SECTION_IDS) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }

    const handleMouseMove = (event: MouseEvent) => {
      cursorTarget.x = event.clientX;
      cursorTarget.y = event.clientY;

      const now = performance.now();
      const dt = Math.max(16, now - lastMouse.time);
      const dx = event.clientX - lastMouse.x;
      const dy = event.clientY - lastMouse.y;
      const speed = Math.min(1.2, Math.hypot(dx, dy) / dt);

      disturbances.push({
        x: event.clientX,
        y: event.clientY,
        power: 0.08 + speed * 0.14,
        life: 1,
        radius: randomBetween(70, 130),
      });
      if (disturbances.length > 10) disturbances.shift();

      lastMouse.x = event.clientX;
      lastMouse.y = event.clientY;
      lastMouse.time = now;
    };

    const handleMouseLeave = () => {
      cursorTarget.x = width / 2;
      cursorTarget.y = height / 2;
    };

    const handleScroll = () => {
      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastScrollY);
      const dt = Math.max(16, now - lastScrollTime);
      const speed = dy / dt; // pixels/ms

      // Trigger bloom only on fast scroll bursts, then let it decay.
      if (speed > 0.75) {
        const normalized = Math.min(1, (speed - 0.75) / 2.2);
        bloomTarget = Math.max(bloomTarget, normalized);
      }

      lastScrollY = window.scrollY;
      lastScrollTime = now;
    };

    const animate = (now: number) => {
      rafRef.current = window.requestAnimationFrame(animate);
      const delta = now - lastFrameTime;
      if (delta < FPS_INTERVAL) return;
      lastFrameTime = now;
      const dt = Math.min(delta, 32) / 1000;

      cursorCurrent.x += (cursorTarget.x - cursorCurrent.x) * 0.09;
      cursorCurrent.y += (cursorTarget.y - cursorCurrent.y) * 0.09;
      currentOpacity += (targetOpacity - currentOpacity) * 0.06;
      bloomCurrent += (bloomTarget - bloomCurrent) * 0.16;
      bloomTarget *= 0.9;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = Math.max(0, Math.min(1, currentOpacity * 0.68));

      const centerX = width / 2;
      const centerY = height / 2;
      const elapsed = now * 0.001;
      const data = fieldImage.data;
      const invScaleX = width / fieldWidth;
      const invScaleY = height / fieldHeight;
      const driftX = (cursorCurrent.x - centerX) * 0.004;
      const driftY = (cursorCurrent.y - centerY) * 0.004;

      for (const ball of metaballs) {
        const wobbleX = Math.sin(elapsed * ball.wobbleFreqX + ball.phaseX) * ball.wobbleAmpX;
        const wobbleY = Math.cos(elapsed * ball.wobbleFreqY + ball.phaseY) * ball.wobbleAmpY;

        ball.x += ball.vx * dt + wobbleX * 0.03;
        ball.y += ball.vy * dt + wobbleY * 0.03;
        ball.x += driftX * 0.001;
        ball.y += driftY * 0.001;
        // Keep a continuous autonomous glide; cursor only disturbs the field mask.
        ball.vx += Math.sin(elapsed * (0.14 + ball.wobbleFreqX) + ball.phaseX) * 0.14;
        ball.vy += Math.cos(elapsed * (0.13 + ball.wobbleFreqY) + ball.phaseY) * 0.14;
        ball.vx *= 0.999;
        ball.vy *= 0.999;

        if (ball.x < -ball.radius) ball.x = width + ball.radius;
        if (ball.x > width + ball.radius) ball.x = -ball.radius;
        if (ball.y < -ball.radius) ball.y = height + ball.radius;
        if (ball.y > height + ball.radius) ball.y = -ball.radius;
      }

      for (let i = 0; i < data.length; i += 4) {
        data[i] = COLOR_VIOLET.r;
        data[i + 1] = COLOR_VIOLET.g;
        data[i + 2] = COLOR_VIOLET.b;
        data[i + 3] = 0;
      }

      for (let py = 0; py < fieldHeight; py++) {
        const worldY = py * invScaleY;
        for (let px = 0; px < fieldWidth; px++) {
          const worldX = px * invScaleX;
          let field = 0;

          for (const ball of metaballs) {
            const dx = worldX - ball.x;
            const dy = worldY - ball.y;
            const distSq = dx * dx + dy * dy + 0.0001;
            field += (ball.radius * ball.radius) / distSq;
          }

          for (const disturbance of disturbances) {
            const dx = worldX - disturbance.x;
            const dy = worldY - disturbance.y;
            const distSq = dx * dx + dy * dy + 1;
            const cut = (disturbance.radius * disturbance.radius * disturbance.power) / distSq;
            field -= cut;
          }

          const pixelIndex = (py * fieldWidth + px) * 4 + 3;
          if (field > FIELD_THRESHOLD) {
            // Soft threshold keeps edges fluid instead of hard circles.
            const intensity = Math.min(1, (field - FIELD_THRESHOLD) / 1.9);
            data[pixelIndex] = Math.round(255 * (0.07 + intensity * 0.58));
          }
        }
      }

      for (let i = disturbances.length - 1; i >= 0; i -= 1) {
        disturbances[i].life -= dt * 2.4;
        disturbances[i].power *= 0.94;
        disturbances[i].radius *= 0.986;
        if (disturbances[i].life <= 0.02 || disturbances[i].power <= 0.02) {
          disturbances.splice(i, 1);
        }
      }

      fieldCtx.putImageData(fieldImage, 0, 0);
      const bloomBlur = 24 + bloomCurrent * 14;
      const bloomSaturate = 90 + bloomCurrent * 20;
      const bloomBrightness = 100 + bloomCurrent * 48;
      ctx.filter = `blur(${bloomBlur.toFixed(1)}px) saturate(${bloomSaturate.toFixed(1)}%) brightness(${bloomBrightness.toFixed(1)}%)`;
      ctx.drawImage(fieldCanvas, 0, 0, fieldWidth, fieldHeight, 0, 0, width, height);
      ctx.filter = "none";

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      observer.disconnect();
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}
