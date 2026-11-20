import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Cake, Gift, HeartHandshake } from "lucide-react";
import { playCardOpenSound, playPopSound, playSparkleSound } from "@/lib/sound-effects";
import { useStudio } from "@/context/studio";
import { cn } from "@/lib/utils";

type BirthdayCardProps = {
  onOpened?: () => void;
  className?: string;
};

export function BirthdayCard({ onOpened, className }: BirthdayCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hugCount, setHugCount] = useState(0);
  const reduce = useReducedMotion();
  const { popConfetti } = useStudio();

  const handleOpen = () => {
    if (isOpen) return;
    playCardOpenSound();
    popConfetti();
    setIsOpen(true);
    onOpened?.();
  };

  const handleToggle = () => {
    if (isOpen) {
      playPopSound();
      setIsOpen(false);
    } else {
      handleOpen();
    }
  };

  const handleSendHug = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSparkleSound();
    popConfetti();
    setHugCount((c) => c + 1);
  };

  return (
    <div className={`relative mx-auto flex w-full max-w-lg flex-col items-center select-none ${className ?? ""}`}>
      {/* 3D Card Scene Container */}
      <div
        className="relative min-h-[540px] sm:min-h-[580px] w-[min(94vw,430px)] cursor-pointer"
        style={{ perspective: "1400px" }}
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        aria-label={isOpen ? "Birthday Card is open. Tap to close" : "Birthday Card. Tap to open"}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        {/* Soft Ambient Glow around Card */}
        <div
          className="pointer-events-none absolute -inset-3 rounded-[36px] bg-gradient-to-r from-rose-300/40 via-pink-300/30 to-amber-200/40 blur-xl opacity-70 animate-pulse"
          aria-hidden
        />

        {/* Floating Sparkles around card */}
        <div className="pointer-events-none absolute -top-4 -left-3 text-amber-400 text-lg animate-bounce">✨</div>
        <div className="pointer-events-none absolute -bottom-3 -right-2 text-rose-400 text-lg animate-pulse">💖</div>
        <div
          className="pointer-events-none absolute top-1/2 -right-4 text-pink-400 text-base animate-bounce"
          style={{ animationDelay: "0.7s" }}
        >
          ⭐
        </div>

        {/* INSIDE OF CARD (Rich, expanded heartfelt letter revealed upon opening) */}
        <div
          className={cn(
            "absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#fffcfd] via-[#fff5f8] to-[#ffedf4] p-5 sm:p-6 shadow-2xl border-2 border-rose-200/90 flex flex-col justify-between overflow-y-auto transition-all duration-500",
            isOpen
              ? "opacity-100 visible z-10 pointer-events-auto"
              : "opacity-0 invisible z-0 pointer-events-none"
          )}
        >
          {/* Subtle inside watermark pattern */}
          <div className="pointer-events-none absolute -right-10 -bottom-10 size-52 rounded-full bg-rose-200/30 blur-2xl" />

          {/* Top greeting inside */}
          <div className="relative z-10 text-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-3 py-0.5 text-[10px] font-bold tracking-[0.22em] text-rose-600 uppercase">
              <Sparkles className="size-3 text-rose-500" /> A Birthday Letter For You <Sparkles className="size-3 text-rose-500" />
            </span>
            <h3 className="mt-2 font-script text-3xl sm:text-4xl text-ink">
              Happy Birthday, {siteConfig.herName}!
            </h3>
            <p className="mt-0.5 font-hand text-lg text-rose-500 font-semibold">
              My dearest {siteConfig.herNickname} 💕
            </p>
          </div>

          {/* Expanded Heartfelt Birthday Content */}
          <div className="relative z-10 my-3 flex flex-col gap-3">
            {/* Main Letter Paragraph */}
            <div className="rounded-2xl bg-white/80 p-3.5 sm:p-4 shadow-xs border border-rose-100/80 text-center">
              <p className="font-hand text-base sm:text-lg leading-relaxed text-ink/90">
                "Today is all about celebrating you — your kind heart, your contagious laughter, and the endless warmth you bring into my world."
              </p>
              <p className="mt-2 font-hand text-sm sm:text-base leading-relaxed text-ink/80">
                "Six winters together, and you still make every ordinary day feel like something special. Loving you is the easiest, sweetest thing I have ever known."
              </p>
            </div>

            {/* Three Cherished Reasons / Highlights */}
            <div className="space-y-2">
              <div className="flex items-start gap-2.5 rounded-xl bg-rose-50/70 p-2.5 text-left border border-rose-100">
                <span className="text-base sm:text-lg">🌸</span>
                <div>
                  <h4 className="text-xs font-bold text-rose-700">My Calm & Safe Place</h4>
                  <p className="text-[12px] sm:text-[13px] leading-tight text-ink/80 mt-0.5">
                    You are the first face I look for in every crowd and the peace I return to.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl bg-pink-50/70 p-2.5 text-left border border-pink-100">
                <span className="text-base sm:text-lg">💖</span>
                <div>
                  <h4 className="text-xs font-bold text-pink-700">Your Precious Laugh</h4>
                  <p className="text-[12px] sm:text-[13px] leading-tight text-ink/80 mt-0.5">
                    The way your nose scrunches when you smile is still my favourite thing in the world.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl bg-amber-50/70 p-2.5 text-left border border-amber-100">
                <span className="text-base sm:text-lg">🌟</span>
                <div>
                  <h4 className="text-xs font-bold text-amber-700">My Birthday Wish For You</h4>
                  <p className="text-[12px] sm:text-[13px] leading-tight text-ink/80 mt-0.5">
                    May this year give you all the tenderness, peace, and sweet dreams you deserve.
                  </p>
                </div>
              </div>
            </div>

            {/* Closing & Signature */}
            <div className="text-center pt-1">
              <p className="font-hand text-base text-ink/85">
                Always by your side, through every year and every winter. Main hoon na.
              </p>
              <p className="mt-1 font-script text-xl text-rose-500 font-semibold">
                Forever yours, {siteConfig.hisName} ♥
              </p>
            </div>
          </div>

          {/* Interactive Inside Footer */}
          <div className="relative z-10 flex flex-col items-center gap-2 pt-1 border-t border-rose-200/60">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                onClick={handleSendHug}
                className="h-8 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs px-3 shadow-xs gap-1.5"
              >
                <HeartHandshake className="size-3.5" />
                <span>Send Birthday Hug {hugCount > 0 ? `(${hugCount}) 🤗` : "🤗"}</span>
              </Button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle();
                }}
                className="text-[11px] font-semibold text-rose-600 hover:underline px-2 py-1"
              >
                Fold Card 💌
              </button>
            </div>

            <span className="inline-flex items-center gap-1.5 text-[11px] text-rose-700/80 font-medium">
              <Cake className="size-3 text-rose-500" /> Scroll below to blow your candles!
            </span>
          </div>
        </div>

        {/* FRONT FLAP OF CARD (100% OPAQUE - Zero transparency so inside text NEVER bleeds through) */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-[32px] shadow-2xl overflow-hidden border-2 border-white/80 bg-gradient-to-br from-rose-400 via-pink-400 to-rose-500",
            isOpen ? "pointer-events-none" : "pointer-events-auto"
          )}
          style={{
            transformOrigin: "left center",
            backfaceVisibility: "hidden",
            zIndex: isOpen ? 5 : 20,
          }}
          animate={
            isOpen
              ? { rotateY: reduce ? 0 : -140, opacity: reduce ? 0 : 0 }
              : { rotateY: 0, opacity: 1, y: [0, -6, 0] }
          }
          transition={
            isOpen
              ? { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
              : { y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
          }
        >
          {/* Solid 100% Opaque Base Layer to prevent any hardware bleed-through */}
          <div className="absolute inset-0 bg-[#f472b6]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#fb7185] via-[#f43f5e] to-[#e11d48]" />

          {/* Shimmer Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_65%)]" />

          {/* Gold / White Decorative Embossed Border */}
          <div className="absolute inset-3 rounded-[24px] border-2 border-white/70 p-4 sm:p-5 flex flex-col items-center justify-between text-center shadow-inner">
            {/* Header Badge */}
            <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1 text-[11px] font-bold tracking-widest text-rose-600 uppercase shadow-md">
              <Sparkles className="size-3 text-amber-500 fill-amber-400" />
              <span>Special Delivery For You</span>
              <Sparkles className="size-3 text-amber-500 fill-amber-400" />
            </div>

            {/* Cute Illustrated Cake on the Card Cover */}
            <div className="my-auto flex flex-col items-center">
              <div className="relative size-36 drop-shadow-xl">
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  {/* Plate */}
                  <ellipse cx="60" cy="100" rx="48" ry="8" fill="#ffffff" opacity="0.95" />
                  {/* Bottom tier */}
                  <rect x="25" y="68" width="70" height="26" rx="8" fill="#fda4af" />
                  <path
                    d="M25 76 Q34 82 43 76 Q51 82 60 76 Q69 82 77 76 Q86 82 95 76 L95 86 L25 86 Z"
                    fill="#ffe4e6"
                  />
                  {/* Top tier */}
                  <rect x="36" y="44" width="48" height="25" rx="6" fill="#fef08a" />
                  <path
                    d="M36 52 Q44 57 52 52 Q60 57 68 52 Q76 57 84 52 L84 62 L36 62 Z"
                    fill="#fef9c3"
                  />
                  {/* Strawberries */}
                  <circle cx="48" cy="42" r="4.5" fill="#e11d48" />
                  <circle cx="72" cy="42" r="4.5" fill="#e11d48" />
                  {/* Center Candle */}
                  <rect x="58" y="24" width="4" height="20" rx="1.5" fill="#ffffff" />
                  <line x1="58" y1="28" x2="62" y2="31" stroke="#f43f5e" strokeWidth="1.5" />
                  <line x1="58" y1="34" x2="62" y2="37" stroke="#f43f5e" strokeWidth="1.5" />
                  {/* Flame */}
                  <circle cx="60" cy="17" r="5" fill="#f59e0b" opacity="0.6" className="animate-ping" />
                  <ellipse cx="60" cy="17" rx="3.5" ry="6" fill="#fbbf24" />
                  <ellipse cx="60" cy="18" rx="1.8" ry="3.5" fill="#fffbeb" />
                </svg>
              </div>

              <h2 className="mt-2 font-script text-4xl sm:text-5xl leading-tight text-white drop-shadow-md">
                Happy Birthday
              </h2>
              <p className="font-hand text-2xl sm:text-3xl text-rose-100 font-bold drop-shadow-sm">
                {siteConfig.herName} 💕
              </p>
              <p className="mt-1 text-[11px] font-semibold text-white/90 tracking-wider uppercase">
                A Letter Just For You
              </p>
            </div>

            {/* Tap prompt */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-white px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-transform">
              <Heart className="size-3.5 text-rose-500 fill-rose-500 animate-pulse" />
              <span>Tap to Open Your Card</span>
              <Gift className="size-3.5 text-rose-500" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Button Below Card */}
      <div className="mt-5 flex items-center justify-center">
        <Button
          type="button"
          onClick={handleToggle}
          className="h-11 rounded-full px-6 text-sm font-semibold shadow-md bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:scale-105 transition-transform"
        >
          {isOpen ? "Close Birthday Card 💌" : "Open Your Birthday Surprise 🎁"}
        </Button>
      </div>
    </div>
  );
}
