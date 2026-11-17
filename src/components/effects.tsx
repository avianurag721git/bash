import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useStudio } from "@/context/studio";

const COLORS = ["#e85a7a", "#ffb59a", "#c9b6ff", "#ffd36a", "#ff8fab", "#fff"];

type Bit = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  rot: number;
  vr: number;
  size: number;
  shape: "rect" | "heart";
};

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 16, size / 16);
  ctx.beginPath();
  ctx.moveTo(0, 5);
  ctx.bezierCurveTo(-10, -4, -4, -12, 0, -5);
  ctx.bezierCurveTo(4, -12, 10, -4, 0, 5);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function fitCanvas(canvas: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  const ctx = canvas.getContext("2d");
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

export function Confetti() {
  const { confettiId } = useStudio();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!confettiId || reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = fitCanvas(canvas);
    if (!ctx) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const bits: Bit[] = Array.from({ length: 90 }, () => ({
      x: width * (0.2 + Math.random() * 0.6),
      y: height * 0.28,
      vx: (Math.random() - 0.5) * 9,
      vy: -Math.random() * 10 - 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#fff",
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.2,
      size: 8 + Math.random() * 8,
      shape: Math.random() > 0.45 ? "heart" : "rect",
    }));
    let frame = 0;
    const tick = () => {
      const live = fitCanvas(canvas);
      if (!live) return;
      live.clearRect(0, 0, window.innerWidth, window.innerHeight);
      let alive = false;
      for (const bit of bits) {
        bit.vy += 0.16;
        bit.x += bit.vx;
        bit.y += bit.vy;
        bit.rot += bit.vr;
        if (bit.y < window.innerHeight + 40) alive = true;
        live.save();
        live.translate(bit.x, bit.y);
        live.rotate(bit.rot);
        if (bit.shape === "heart") {
          live.restore();
          drawHeart(live, bit.x, bit.y, bit.size, bit.color);
        } else {
          live.fillStyle = bit.color;
          live.fillRect(-bit.size / 2, -bit.size / 4, bit.size, bit.size / 2);
          live.restore();
        }
      }
      if (alive) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [confettiId, reduce]);

  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-50 h-full w-full" aria-hidden />
  );
}

export function Balloons() {
  const { confettiId } = useStudio();
  const reduce = useReducedMotion();
  const [hiddenId, setHiddenId] = useState(0);
  const show = confettiId > 0 && hiddenId !== confettiId && !reduce;

  useEffect(() => {
    if (!confettiId || reduce) return;
    const timer = window.setTimeout(() => setHiddenId(confettiId), 7200);
    return () => window.clearTimeout(timer);
  }, [confettiId, reduce]);

  if (!show) return null;
  const colors = ["#ff8fab", "#ffc2a8", "#d4c2ff", "#fff", "#ffd36a"];
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden>
      {colors.map((color, index) => (
        <span
          key={color}
          className="balloon"
          style={{
            left: `${8 + index * 18}%`,
            animationDelay: `${index * 0.18}s`,
            ["--balloon" as string]: color,
          }}
        />
      ))}
    </div>
  );
}

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  max: number;
  heart: boolean;
};

export function Fireworks() {
  const { fireworksId } = useStudio();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!fireworksId || reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const sparks: Spark[] = [];
    const started = performance.now();
    const burst = () => {
      const x = window.innerWidth * (0.15 + Math.random() * 0.7);
      const y = window.innerHeight * (0.18 + Math.random() * 0.35);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#fff";
      const count = 18 + Math.floor(Math.random() * 10);
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 1.4 + Math.random() * 2.4;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          life: 0,
          max: 50 + Math.random() * 20,
          heart: Math.random() > 0.72,
        });
      }
    };
    burst();
    let frame = 0;
    let lastBurst = 0;
    const tick = (time: number) => {
      const ctx = fitCanvas(canvas);
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (time - started < 5200 && time - lastBurst > 380) {
        burst();
        lastBurst = time;
      }
      for (const spark of sparks) {
        spark.life += 1;
        spark.vy += 0.025;
        spark.x += spark.vx;
        spark.y += spark.vy;
        const fade = 1 - spark.life / spark.max;
        if (fade <= 0) continue;
        ctx.globalAlpha = fade;
        if (spark.heart) drawHeart(ctx, spark.x, spark.y, 10, spark.color);
        else {
          ctx.fillStyle = spark.color;
          ctx.beginPath();
          ctx.arc(spark.x, spark.y, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      if (time - started < 6200) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [fireworksId, reduce]);

  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[60] h-full w-full" aria-hidden />
  );
}

export function CursorHearts() {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const last = useRef(0);
  const id = useRef(0);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const apply = () => setFine(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!fine || reduce) return;
    const onMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - last.current < 48) return;
      last.current = now;
      const next = { id: id.current++, x: event.clientX, y: event.clientY };
      setHearts((current) => [...current.slice(-16), next]);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [fine, reduce]);

  if (!fine || reduce) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-20" aria-hidden>
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute text-rose-400"
          style={{ left: heart.x, top: heart.y }}
          initial={{ opacity: 0.9, y: 0, scale: 0.7 }}
          animate={{ opacity: 0, y: -28, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onAnimationComplete={() => setHearts((current) => current.filter((item) => item.id !== heart.id))}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
