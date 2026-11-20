import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  playSkyShotLaunchSound,
  playSkyShotBurstSound,
  playSparkleSound,
} from "@/lib/sound-effects";

type SkyShotsCelebrationProps = {
  isActive: boolean;
  onComplete: () => void;
};

// Vivid firework palette
const SKY_COLORS = [
  "#ff1744", // Ruby Red
  "#ff4081", // Hot Pink
  "#f50057", // Rose
  "#e040fb", // Bright Purple
  "#7c4dff", // Deep Violet
  "#00e5ff", // Turquoise Cyan
  "#ffd700", // Imperial Gold
  "#ff9100", // Neon Sunset Orange
  "#00e676", // Emerald Lime
  "#ffffff", // Diamond White
];

interface Rocket {
  id: number;
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  burstType: "sphere" | "heart" | "willow" | "ring" | "crackle";
  trail: Array<{ x: number; y: number; alpha: number; size: number }>;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
  friction: number;
  size: number;
  isSparkle?: boolean;
  isCrackle?: boolean;
}

interface SkyLantern {
  id: number;
  x: number;
  y: number;
  speed: number;
  sway: number;
  swayOffset: number;
  size: number;
  alpha: number;
}

export function SkyShotsCelebration({ isActive, onComplete }: SkyShotsCelebrationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const animationFrameRef = useRef<number | null>(null);

  // References to simulation state
  const rocketsRef = useRef<Rocket[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lanternsRef = useRef<SkyLantern[]>([]);
  const nextRocketId = useRef(0);
  const nextLanternId = useRef(0);
  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  // Add/remove dark-sky-active class to body
  useEffect(() => {
    if (isActive) {
      document.body.classList.add("dark-sky-active");
      document.documentElement.classList.add("dark");
      playSparkleSound();
    } else {
      document.body.classList.remove("dark-sky-active");
      document.documentElement.classList.remove("dark");
    }

    return () => {
      document.body.classList.remove("dark-sky-active");
      document.documentElement.classList.remove("dark");
    };
  }, [isActive]);

  // 10-second countdown timer
  useEffect(() => {
    if (!isActive) return;

    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          onComplete();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
      setSecondsLeft(10);
    };
  }, [isActive, onComplete]);

  // Launch a sky shot rocket
  const launchRocket = useCallback((customX?: number, customTargetY?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    const startX = customX ?? width * (0.12 + Math.random() * 0.76);
    const targetY = customTargetY ?? height * (0.15 + Math.random() * 0.35);

    // Aim slightly towards center
    const targetX = width * 0.5 + (Math.random() - 0.5) * width * 0.6;
    const distanceY = height - targetY;
    const speed = 12 + Math.random() * 4;
    const steps = distanceY / speed;
    const vx = (targetX - startX) / steps;
    const vy = -speed;

    const burstTypes: Array<Rocket["burstType"]> = ["heart", "sphere", "willow", "ring", "crackle"];
    const burstType = burstTypes[Math.floor(Math.random() * burstTypes.length)];
    const color = SKY_COLORS[Math.floor(Math.random() * SKY_COLORS.length)];

    rocketsRef.current.push({
      id: nextRocketId.current++,
      x: startX,
      y: height,
      targetY,
      vx,
      vy,
      color,
      burstType,
      trail: [],
    });

    playSkyShotLaunchSound();
  }, []);

  // Burst explosion
  const createBurst = useCallback(
    (x: number, y: number, color: string, burstType: Rocket["burstType"]) => {
      playSkyShotBurstSound(burstType === "heart" || burstType === "willow");

      const particles: Particle[] = [];

      if (burstType === "heart") {
        // Romantic mathematical Heart burst
        const count = 75;
        const heartColors = ["#ff4081", "#ff1744", "#ffd700", "#ffffff"];
        for (let i = 0; i < count; i++) {
          const t = (Math.PI * 2 * i) / count;
          // Parametric heart formula
          const hx = 16 * Math.pow(Math.sin(t), 3);
          const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
          const scale = 0.22 + Math.random() * 0.05;
          particles.push({
            x,
            y,
            vx: hx * scale * (0.85 + Math.random() * 0.3),
            vy: hy * scale * (0.85 + Math.random() * 0.3),
            color: heartColors[i % heartColors.length],
            alpha: 1,
            decay: 0.012 + Math.random() * 0.008,
            gravity: 0.02,
            friction: 0.96,
            size: 2.8 + Math.random() * 1.5,
          });
        }
      } else if (burstType === "ring") {
        // Double ring
        const count = 70;
        const altColor = SKY_COLORS[Math.floor(Math.random() * SKY_COLORS.length)];
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count;
          const isOuter = i % 2 === 0;
          const speed = isOuter ? 4.2 + Math.random() * 0.4 : 2.5 + Math.random() * 0.3;
          particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: isOuter ? color : altColor,
            alpha: 1,
            decay: 0.014 + Math.random() * 0.006,
            gravity: 0.03,
            friction: 0.95,
            size: 2.6,
          });
        }
      } else if (burstType === "willow") {
        // Weeping golden/silver willow waterfall
        const count = 85;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 1.2 + Math.random() * 3.8;
          particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed * 0.6,
            color: Math.random() > 0.3 ? "#ffd700" : "#ffffff",
            alpha: 1,
            decay: 0.007 + Math.random() * 0.005, // Slower decay
            gravity: 0.055, // Stronger downward waterfall
            friction: 0.94,
            size: 2.4 + Math.random() * 1.2,
          });
        }
      } else {
        // Vibrant Spherical Peony or Crackle
        const count = 80;
        const isCrackle = burstType === "crackle";
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 1.5 + Math.random() * 4.5;
          particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: isCrackle && Math.random() > 0.6 ? "#ffffff" : color,
            alpha: 1,
            decay: 0.015 + Math.random() * 0.01,
            gravity: 0.035,
            friction: 0.955,
            size: 2.5 + Math.random() * 1.5,
            isCrackle,
          });
        }
      }

      // Add central luminous sparkle burst
      for (let s = 0; s < 15; s++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          color: "#ffffff",
          alpha: 1,
          decay: 0.03,
          gravity: 0.01,
          friction: 0.92,
          size: 3.5,
          isSparkle: true,
        });
      }

      particlesRef.current.push(...particles);
    },
    [],
  );

  // Initialize floating lanterns
  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const initialLanterns: SkyLantern[] = Array.from({ length: 18 }, () => ({
      id: nextLanternId.current++,
      x: Math.random() * width,
      y: height * 0.3 + Math.random() * height * 0.8,
      speed: 0.4 + Math.random() * 0.6,
      sway: Math.random() * 20,
      swayOffset: Math.random() * Math.PI * 2,
      size: 14 + Math.random() * 12,
      alpha: 0.5 + Math.random() * 0.45,
    }));

    lanternsRef.current = initialLanterns;
  }, [isActive]);

  // Orchestrated sky shot launch schedule over 10 seconds
  useEffect(() => {
    if (!isActive) return;

    // Opening 3-rocket salvo
    launchRocket(window.innerWidth * 0.25, window.innerHeight * 0.28);
    const t1 = setTimeout(() => launchRocket(window.innerWidth * 0.75, window.innerHeight * 0.25), 250);
    const t2 = setTimeout(() => launchRocket(window.innerWidth * 0.5, window.innerHeight * 0.2), 550);

    // Continuous salvo every 400-600ms
    const interval = window.setInterval(() => {
      if (!isActiveRef.current) return;
      launchRocket();
      // Occasionally launch pairs
      if (Math.random() > 0.5) {
        window.setTimeout(() => {
          if (isActiveRef.current) launchRocket();
        }, 180);
      }
    }, 450);

    // Grand finale barrage at seconds 7.5 to 9.5
    const finaleTimer = setTimeout(() => {
      if (!isActiveRef.current) return;
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          if (isActiveRef.current) launchRocket();
        }, i * 200);
      }
    }, 7500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(finaleTimer);
      clearInterval(interval);
    };
  }, [isActive, launchRocket]);

  // Main Canvas Render Loop
  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    let animationTime = 0;

    const render = () => {
      animationTime += 0.02;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Clear with slight trailing blend for glowing trails
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Floating Warm Sky Lanterns in Background
      lanternsRef.current.forEach((lantern) => {
        lantern.y -= lantern.speed;
        if (lantern.y < -40) {
          lantern.y = height + 20;
          lantern.x = Math.random() * width;
        }

        const swayX = lantern.x + Math.sin(animationTime + lantern.swayOffset) * 15;

        // Lantern Warm Amber Glow
        const gradient = ctx.createRadialGradient(
          swayX,
          lantern.y,
          lantern.size * 0.2,
          swayX,
          lantern.y,
          lantern.size * 1.8,
        );
        gradient.addColorStop(0, `rgba(255, 235, 150, ${lantern.alpha})`);
        gradient.addColorStop(0.4, `rgba(255, 140, 50, ${lantern.alpha * 0.7})`);
        gradient.addColorStop(1, "rgba(255, 100, 50, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(swayX, lantern.y, lantern.size * 1.6, 0, Math.PI * 2);
        ctx.fill();

        // Lantern Body
        ctx.fillStyle = `rgba(255, 240, 180, ${lantern.alpha * 0.9})`;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(swayX - lantern.size * 0.35, lantern.y - lantern.size * 0.45, lantern.size * 0.7, lantern.size * 0.9, 3);
        } else {
          ctx.rect(swayX - lantern.size * 0.35, lantern.y - lantern.size * 0.45, lantern.size * 0.7, lantern.size * 0.9);
        }
        ctx.fill();
      });

      // 2. Update and Draw Rockets Ascending
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        r.x += r.vx;
        r.y += r.vy;

        // Add trail spark
        r.trail.push({ x: r.x, y: r.y, alpha: 1, size: 2.2 + Math.random() });
        if (r.trail.length > 14) r.trail.shift();

        // Draw trail sparks
        r.trail.forEach((t) => {
          t.alpha *= 0.88;
          ctx.fillStyle = `rgba(255, 200, 100, ${t.alpha})`;
          ctx.beginPath();
          ctx.arc(t.x + (Math.random() - 0.5) * 3, t.y, t.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Rocket Head
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Check if reached apex target
        if (r.y <= r.targetY || r.vy >= 0) {
          createBurst(r.x, r.y, r.color, r.burstType);
          rocketsRef.current.splice(i, 1);
        }
      }

      // 3. Update and Draw Firecracker Burst Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);

        if (p.isSparkle) {
          // Draw 4-point glittering star sparkle
          ctx.fillStyle = "#ffffff";
          ctx.translate(p.x, p.y);
          ctx.beginPath();
          const s = p.size * (1 + Math.sin(animationTime * 10) * 0.3);
          ctx.moveTo(0, -s * 2);
          ctx.lineTo(s * 0.4, -s * 0.4);
          ctx.lineTo(s * 2, 0);
          ctx.lineTo(s * 0.4, s * 0.4);
          ctx.lineTo(0, s * 2);
          ctx.lineTo(-s * 0.4, s * 0.4);
          ctx.lineTo(-s * 2, 0);
          ctx.lineTo(-s * 0.4, -s * 0.4);
          ctx.closePath();
          ctx.fill();
        } else {
          // Glow halo
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Bright center
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isActive, createBurst]);

  // Tap on canvas to fire custom sky shot
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    launchRocket(clickX, clickY);
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[70] pointer-events-auto overflow-hidden select-none">
      {/* 1. Deep Midnight Cosmic Sky Background Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-b from-[#0a0314]/90 via-[#130722]/85 to-[#08020d]/90 backdrop-blur-[2px]"
      />

      {/* 2. Twinkling Sky Stars Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-80" aria-hidden>
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${(i * 19) % 95}%`,
              left: `${(i * 29) % 98}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              boxShadow: `0 0 6px ${(i % 2 === 0 ? "#ff80ab" : "#ffd54f")}`,
              animation: `twinkle ${2 + (i % 4)}s ease-in-out infinite ${(i * 0.3) % 2}s`,
            }}
          />
        ))}
      </div>

      {/* 3. Interactive Firecrackers & Sky Shots Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0 h-full w-full cursor-crosshair"
        title="Tap anywhere in the sky to blast a firecracker rocket!"
      />

      {/* 4. Grand Celebratory Sky Banner */}
      <motion.div
        initial={{ opacity: 0, y: -25, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="pointer-events-none absolute top-12 left-0 right-0 mx-auto flex flex-col items-center px-4 text-center"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-400/40 bg-pink-950/60 px-4 py-1 text-xs font-semibold tracking-widest text-pink-200 shadow-lg backdrop-blur-md">
          ✨ MIDNIGHT SKY CELEBRATION ✨
        </span>

        <h2 className="mt-3 font-script text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 drop-shadow-[0_0_25px_rgba(255,105,180,0.85)] sm:text-6xl">
          Happy Birthday, Jessi!
        </h2>

        <p className="mt-2 max-w-md font-hand text-xl text-pink-100/90 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] sm:text-2xl">
          Lighting the entire sky with love, fireworks & sparkles for you!
        </p>

        <p className="mt-1 text-[11px] text-pink-300/70">
          (Tap anywhere in the sky to launch more sky shots! 🎆)
        </p>
      </motion.div>

      {/* 5. Sleek Countdown & Control Dock */}
      <div className="absolute bottom-8 left-0 right-0 mx-auto flex justify-center gap-3 px-4">
        <div className="flex items-center gap-3 rounded-full border border-pink-500/40 bg-black/60 px-5 py-2.5 shadow-2xl backdrop-blur-md">
          <span className="flex items-center gap-1.5 text-xs font-bold text-pink-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pink-500" />
            </span>
            Sky Shots: <strong>{secondsLeft}s</strong>
          </span>

          <span className="h-4 w-px bg-pink-500/30" />

          {/* Quick manual re-fire rocket button */}
          <button
            type="button"
            onClick={() => launchRocket()}
            className="rounded-full bg-pink-600/80 hover:bg-pink-500 px-3 py-1 text-xs font-semibold text-white transition-all shadow-sm cursor-pointer"
          >
            Fire Rocket 🚀
          </button>

          {/* Close/Done button */}
          <button
            type="button"
            onClick={onComplete}
            className="rounded-full bg-white/20 hover:bg-white/30 px-3 py-1 text-xs font-medium text-white transition-all cursor-pointer"
            title="Return to daytime"
          >
            Close ✕
          </button>
        </div>
      </div>
    </div>
  );
}
