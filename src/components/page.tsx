import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config";
import { formatIndiaDate, pad2, countdownTo } from "@/lib/time";
import { useNow } from "@/lib/use-now";
import { useStudio } from "@/context/studio";
import { YearArt } from "@/components/art";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BirthdayCard } from "@/components/birthday-card";
import { InteractiveCake } from "@/components/interactive-cake";
import { MemoryGallery } from "@/components/memory-gallery";
import { CartoonSurprises } from "@/components/cartoon-surprises";
import { StoryNav } from "@/components/story-nav";
import { AestheticLoveScene } from "@/components/aesthetic-love-scene";

function Block({
  id,
  kicker,
  title,
  intro,
  titleClassName,
  children,
}: {
  id?: string;
  kicker: string;
  title: string;
  intro?: string;
  titleClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-3xl px-5 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <p className="text-center text-[11px] font-semibold tracking-[0.28em] text-rose-500 uppercase">{kicker}</p>
        <h2 className={cn("mt-2 text-center font-script text-4xl text-balance text-ink sm:text-5xl", titleClassName)}>{title}</h2>
        {intro ? (
          <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-ink/75">{intro}</p>
        ) : null}
        <div className="mt-8">{children}</div>
      </motion.div>
    </section>
  );
}

function Hero() {
  const hearts = [
    { left: "6%", top: "18%", delay: "0s", size: "1.4rem" },
    { left: "84%", top: "12%", delay: "0.6s", size: "1.1rem" },
    { left: "78%", top: "62%", delay: "1.1s", size: "1.6rem" },
    { left: "10%", top: "70%", delay: "0.3s", size: "1rem" },
  ];
  return (
    <header id="hero" className="relative mx-auto flex min-h-[88dvh] w-full max-w-3xl flex-col items-center justify-center px-5 pt-16 text-center">
      <div className="pointer-events-none absolute inset-x-6 top-3 h-8" aria-hidden>
        <div className="absolute top-2 right-2 left-2 h-px bg-rose-300/70" />
        {["#ffd36a", "#ffb7c8", "#fff", "#ffd36a", "#c9b6ff", "#ffb7c8", "#ffd36a"].map((color, index) => (
          <span
            key={color + index}
            className="fairy"
            style={{ left: `${8 + index * 14}%`, background: color, color, animationDelay: `${index * 0.25}s` }}
          />
        ))}
      </div>
      {hearts.map((heart) => (
        <span
          key={`${heart.left}-${heart.top}`}
          className="floaty pointer-events-none absolute text-rose-400/80"
          style={{ left: heart.left, top: heart.top, animationDelay: heart.delay, fontSize: heart.size }}
          aria-hidden
        >
          ♥
        </span>
      ))}
      <p className="text-[11px] font-semibold tracking-[0.32em] text-rose-500 uppercase">{siteConfig.heroKicker}</p>
      <h1 className="mt-4 font-script text-5xl leading-none text-balance text-ink sm:text-7xl">
        <span className="block bg-gradient-to-r from-[#e85a7a] via-[#f08a5d] to-[#b07be0] bg-clip-text text-[2.65rem] leading-[1.05] text-transparent sm:text-7xl">
          {siteConfig.heroGreeting}
        </span>
        <span className="mt-3 block text-[2.7rem] leading-[1.05] break-words sm:text-7xl">{siteConfig.herName}</span>
      </h1>
      <p className="mt-4 font-script text-2xl text-rose-500">{siteConfig.herNickname}</p>
      <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/75 sm:text-base">{siteConfig.heroSub}</p>
      <p className="mt-10 text-xs tracking-[0.2em] text-ink/50 uppercase">scroll a little</p>
    </header>
  );
}

function Countdown() {
  const now = useNow();
  const left = countdownTo(now, siteConfig.birthday);
  if (left.done) {
    return (
      <Block id="countdown" kicker={siteConfig.celebrationKicker} title={siteConfig.celebrationTitle} intro={siteConfig.celebrationBody}>
        <div className="glass mx-auto flex max-w-md flex-col items-center rounded-[32px] px-6 py-8">
          <p className="font-script text-3xl text-rose-500">{formatIndiaDate(siteConfig.birthday)}</p>
          <p className="mt-2 text-sm text-ink/70">India time, from the first minute of the day.</p>
        </div>
      </Block>
    );
  }
  const units = [
    { label: "days", value: String(left.days) },
    { label: "hours", value: pad2(left.hours) },
    { label: "mins", value: pad2(left.minutes) },
    { label: "secs", value: pad2(left.seconds) },
  ];
  return (
    <Block id="countdown" kicker={siteConfig.countdownKicker} title={siteConfig.countdownTitle}>
      <div className="glass mx-auto grid max-w-lg grid-cols-4 gap-2 rounded-[28px] p-3 sm:gap-3 sm:p-4">
        {units.map((unit) => (
          <div key={unit.label} className="rounded-2xl bg-white/70 py-3 text-center sm:py-4">
            <div className="text-2xl font-semibold tabular-nums text-ink sm:text-4xl">{unit.value}</div>
            <div className="mt-1 text-[10px] tracking-[0.16em] text-rose-700/70 uppercase">{unit.label}</div>
          </div>
        ))}
      </div>

    </Block>
  );
}

function Snowflake({ lit }: { lit: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("h-11 w-11 transition-all duration-500", lit ? "scale-100 opacity-100" : "scale-75 opacity-30")} aria-hidden>
      <g fill="none" stroke={lit ? "#7aa2d6" : "#d7c6d4"} strokeWidth="2" strokeLinecap="round">
        <path d="M24 6v36M8 14l32 20M8 34l32-20" />
        <path d="M24 12l-4-4M24 12l4-4M24 36l-4 4M24 36l4 4M14 18l-6-2M14 18l-2 6M34 18l6-2M34 18l2 6M14 30l-6 2M14 30l-2-6M34 30l6 2M34 30l2-6" />
      </g>
    </svg>
  );
}

function Together() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const total = siteConfig.wintersTogether;
  const [count, setCount] = useState(0);
  const shown = reduce ? total : count;

  useEffect(() => {
    if (!inView || reduce || count >= total) return;
    const timer = window.setTimeout(() => setCount((current) => current + 1), 420);
    return () => window.clearTimeout(timer);
  }, [count, inView, reduce, total]);

  return (
    <Block id="together" kicker="how it began" title={siteConfig.togetherHeadline} intro={siteConfig.togetherNote}>
      <div ref={ref} className="mx-auto max-w-md">
        <div className="flex flex-wrap justify-center gap-3" aria-label={`${shown} of ${total} winters`}>
          {Array.from({ length: total }, (_, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <Snowflake lit={index < shown} />
              <span className={cn("text-[10px] tracking-widest", index < shown ? "text-sky-700/80" : "text-ink/30")}>{index + 1}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-sm text-ink/65">Met in {siteConfig.metIn}. The exact day never got written down.</p>
      </div>
    </Block>
  );
}

function Characters() {
  const [taps, setTaps] = useState(0);
  const found = taps >= siteConfig.easterTaps;
  return (
    <Block id="scene" kicker="our little crowd" title="You, me, and the soft toys">
      <div className="glass mx-auto max-w-xl rounded-[32px] px-3 py-5 sm:px-6 shadow-xl border border-rose-100">
        <AestheticLoveScene
          onBunny={() => {
            setTaps((count) => count + 1);
          }}
        />
        <p className="pb-2 text-center text-xs text-ink/60 font-medium">
          {found ? "" : "psst — tap the bunny to tickle, or tap us & teddy for sweet surprises ✨"}
        </p>
        {found ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-3 max-w-sm rounded-2xl bg-white/90 px-4 py-3 text-center font-hand text-2xl leading-snug text-rose-600 shadow-md border border-rose-100"
          >
            {siteConfig.easterEgg}
          </motion.p>
        ) : null}
      </div>
    </Block>
  );
}



function ScreenSoundtrackBadge({
  screenId,
  songTitle,
  subtitle,
}: {
  screenId: string;
  songTitle: string;
  subtitle?: string;
}) {
  const { playScreenSong, playing, index } = useStudio();
  const currentSong = siteConfig.songs[index];
  const isThisSongPlaying =
    playing && currentSong?.title.toLowerCase().includes(songTitle.toLowerCase().slice(0, 6));

  return (
    <div className="mb-4 flex justify-center">
      <button
        type="button"
        onClick={() => playScreenSong(screenId)}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all shadow-xs border cursor-pointer ${isThisSongPlaying
          ? "bg-rose-500 text-white border-rose-600 shadow-md scale-105"
          : "bg-white/80 text-rose-700 border-rose-200/80 hover:bg-white hover:scale-102"
          }`}
        title={`Play screen soundtrack: ${songTitle}`}
      >
        <span className="text-sm">🎵</span>
        <span>
          Screen Track: <strong>{songTitle}</strong>
          {subtitle ? <span className="opacity-75 font-normal ml-1">({subtitle})</span> : null}
        </span>
        {isThisSongPlaying ? (
          <span className="flex items-center gap-0.5 ml-1 h-3">
            <span className="w-0.5 bg-white h-full animate-[pulse_0.6s_infinite]" />
            <span className="w-0.5 bg-white h-2/3 animate-[pulse_0.4s_infinite]" />
            <span className="w-0.5 bg-white h-4/5 animate-[pulse_0.7s_infinite]" />
          </span>
        ) : (
          <span className="text-[10px] bg-rose-100 text-rose-600 rounded-full px-1.5 py-0.2 ml-0.5 font-bold">
            Play ▶
          </span>
        )}
      </button>
    </div>
  );
}

function BirthdayCardSection() {
  return (
    <Block
      id="birthday-card-section"
      kicker="a gift for you"
      title="Your Birthday Card"
      intro="Touch the card to open your 3D unfolding birthday surprise."
    >
      <ScreenSoundtrackBadge
        screenId="birthday-card-section"
        songTitle="Alfaaz (Akhiyan De Samne)"
        subtitle="Tu Baithe Rahe Der Tak"
      />
      <BirthdayCard />
    </Block>
  );
}

function CakeExperienceSection() {
  return (
    <Block
      id="cake-experience-section"
      kicker={siteConfig.cakeKicker}
      title={siteConfig.cakeTitle}
      intro={siteConfig.cakeLead}
    >
      <ScreenSoundtrackBadge
        screenId="cake-experience-section"
        songTitle="Tum Se Hi"
        subtitle="Jab We Met"
      />
      <InteractiveCake />
    </Block>
  );
}

function Wishes() {
  const wishes = siteConfig.wishes;
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const palettes = [
    "bg-[#fff0f4]",
    "bg-[#fff4ec]",
    "bg-[#f6f0ff]",
    "bg-[#fff8ef]",
    "bg-[#fdeff6]",
  ];

  function shift(direction: number) {
    setIndex((current) => (current + direction + wishes.length) % wishes.length);
  }

  return (
    <Block id="wishes" kicker={siteConfig.wishesKicker} title={siteConfig.wishesTitle}>
      <div className="relative mx-auto h-72 max-w-md">
        {[2, 1, 0].map((depth) => {
          const wishIndex = (index + depth) % wishes.length;
          const text = wishes[wishIndex];
          const top = depth === 0;
          return (
            <motion.article
              key={wishIndex}
              drag={top && !reduce ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70 || info.velocity.x < -500) shift(1);
                else if (info.offset.x > 70 || info.velocity.x > 500) shift(-1);
              }}
              className={cn(
                "absolute inset-x-4 top-0 flex h-56 flex-col justify-between rounded-[28px] p-6 shadow-[0_16px_40px_rgba(214,120,150,0.16)]",
                palettes[wishIndex % palettes.length],
              )}
              style={{ zIndex: 10 - depth }}
              animate={{ y: depth * 16, scale: 1 - depth * 0.045, rotate: top ? 0 : depth === 1 ? -2 : 2 }}
            >
              <p className="font-hand text-[1.85rem] leading-snug text-ink">{text}</p>
              <p className="text-xs tracking-[0.18em] text-ink/45 uppercase">
                {wishIndex + 1} / {wishes.length}
                {top ? " · swipe" : ""}
              </p>
            </motion.article>
          );
        })}
      </div>
      <div className="mt-2 flex justify-center gap-3">
        <Button type="button" variant="outline" className="h-11 rounded-full bg-white/70 px-5" onClick={() => shift(-1)}>
          Previous
        </Button>
        <Button type="button" className="h-11 rounded-full px-5" onClick={() => shift(1)}>
          Next note
        </Button>
      </div>
    </Block>
  );
}

function ScratchCard({ text }: { text: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || revealed) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const paint = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.dataset.dpr = String(dpr);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, "#ffb3c9");
      gradient.addColorStop(1, "#ddc6ff");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.font = "600 13px Poppins, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("scratch me ♥", rect.width / 2, rect.height / 2);
    };

    paint();
    const observer = new ResizeObserver(paint);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [reduce, revealed]);

  function erase(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Number(canvas.dataset.dpr || 1);
    const rect = canvas.getBoundingClientRect();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(event.clientX - rect.left, event.clientY - rect.top, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    let total = 0;
    for (let i = 3; i < pixels.length; i += 64) {
      total += 1;
      if (pixels[i] < 28) clear += 1;
    }
    if (total > 0 && clear / total > 0.5) setRevealed(true);
  }

  return (
    <div ref={wrapRef} className="relative min-h-36 overflow-hidden rounded-3xl bg-white/75 p-4 shadow-sm">
      <p className="text-sm leading-relaxed font-medium text-ink">{text}</p>
      {!revealed && reduce ? (
        <button
          type="button"
          className="absolute inset-0 bg-gradient-to-br from-[#ffb3c9] to-[#ddc6ff] text-sm font-semibold text-white"
          onClick={() => setRevealed(true)}
        >
          tap to reveal
        </button>
      ) : null}
      {!revealed && !reduce ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full touch-none"
          onPointerDown={(event) => {
            drawing.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            erase(event);
          }}
          onPointerMove={(event) => {
            if (drawing.current) erase(event);
          }}
          onPointerUp={() => {
            drawing.current = false;
          }}
          aria-label={`Scratch to reveal: hidden note`}
        />
      ) : null}
    </div>
  );
}

function Reasons() {
  return (
    <Block id="reasons" kicker={siteConfig.reasonsKicker} title={siteConfig.reasonsTitle} intro={siteConfig.reasonsHint}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {siteConfig.reasons.map((reason) => (
          <ScratchCard key={reason} text={reason} />
        ))}
      </div>
    </Block>
  );
}

function PhotoFrame({ file, index, label }: { file: string | null; index: number; label: string }) {
  const [missing, setMissing] = useState(false);
  if (!file || missing) return <YearArt index={index} />;
  return (
    <div className="flex h-full w-full items-center justify-center p-2 bg-rose-50/40">
      <img
        src={`${import.meta.env.BASE_URL}photos/${file}`}
        alt={label}
        className="max-h-full max-w-full rounded-xl object-contain shadow-xs transition-transform duration-300 hover:scale-102"
        onError={() => setMissing(true)}
      />
    </div>
  );
}

function Timeline() {
  return (
    <Block id="timeline" kicker={siteConfig.timelineKicker} title={siteConfig.timelineTitle} intro={siteConfig.timelineIntro}>
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-[15px] w-px bg-gradient-to-b from-rose-200 via-violet-200 to-transparent md:left-1/2" />
        <ol className="space-y-6">
          {siteConfig.milestones.map((item, index) => (
            <li key={item.year} className="relative md:grid md:grid-cols-2 md:gap-12">
              <span className="absolute top-8 left-[9px] size-3.5 rounded-full border-2 border-white bg-rose-400 shadow md:left-1/2 md:-translate-x-1/2" />
              <article
                className={cn(
                  "glass ml-10 overflow-hidden rounded-[28px] md:ml-0",
                  index % 2 === 1 && "md:col-start-2",
                )}
              >
                <div className="aspect-[4/3] sm:aspect-[16/9] bg-rose-50/30 overflow-hidden">
                  <PhotoFrame key={item.photo ?? "drawing"} file={item.photo} index={index} label={`${item.year}, ${item.title}`} />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold tracking-[0.2em] text-rose-500">{item.year}</p>
                  <h3 className="mt-1 font-script text-3xl text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75">{item.text}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Block>
  );
}

function Letter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const full = siteConfig.letter.join("\n\n");
  const [count, setCount] = useState(0);
  const shown = reduce ? full.length : count;
  const done = shown >= full.length;

  useEffect(() => {
    if (!inView || reduce || count >= full.length) return;
    const timer = window.setTimeout(() => setCount((current) => current + 1), 16);
    return () => window.clearTimeout(timer);
  }, [count, full.length, inView, reduce]);

  return (
    <Block id="letter" kicker={siteConfig.letterKicker} title={siteConfig.letterTitle}>
      <ScreenSoundtrackBadge
        screenId="letter"
        songTitle="Rog Jaane"
        subtitle="Rahat Fateh Ali Khan"
      />
      <div
        ref={ref}
        className="glass mx-auto max-w-xl cursor-pointer rounded-[32px] px-6 py-8 sm:px-10"
        onClick={() => setCount(full.length)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") setCount(full.length);
        }}
        role="button"
        tabIndex={0}
        aria-label="Letter. Activate to show the whole thing."
      >
        <p className="font-hand text-[1.75rem] leading-snug whitespace-pre-wrap text-ink sm:text-4xl">
          {full.slice(0, shown)}
          {!done ? <span className="ml-0.5 inline-block h-6 w-0.5 animate-pulse bg-rose-400 align-middle" /> : null}
        </p>
      </div>
    </Block>
  );
}

function Valentine() {
  const areaRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [escapes, setEscapes] = useState(0);
  const [answer, setAnswer] = useState<"yes" | "shy" | null>(null);
  const reduce = useReducedMotion();
  const { launchFireworks, popConfetti } = useStudio();
  const caught = escapes >= 6;

  function sayYes() {
    setAnswer("yes");
    popConfetti();
    launchFireworks();
  }

  function flee(event: PointerEvent<HTMLButtonElement>) {
    if (reduce || caught) return;
    event.preventDefault();
    const area = areaRef.current?.getBoundingClientRect();
    if (!area) return;
    setPos({
      x: Math.random() * Math.max(8, area.width - 140),
      y: Math.random() * Math.max(8, area.height - 52),
    });
    setEscapes((count) => count + 1);
  }

  return (
    <Block
      id="valentine"
      kicker={siteConfig.valentineKicker}
      title={siteConfig.valentineQuestion}
      titleClassName="text-[2rem] leading-tight sm:text-5xl"
    >
      <ScreenSoundtrackBadge
        screenId="valentine"
        songTitle="Kesariya"
        subtitle="Arijit Singh"
      />
      <div ref={areaRef} className="relative mx-auto h-64 max-w-lg">
        <Button type="button" onClick={sayYes} className="absolute top-6 left-1/2 z-20 h-12 -translate-x-1/2 rounded-full px-6 text-base">
          {siteConfig.yesLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="absolute z-10 h-12 rounded-full bg-white/80 px-5"
          style={pos ? { left: pos.x, top: pos.y } : { right: 16, bottom: 18 }}
          onPointerEnter={flee}
          onPointerDown={flee}
          onClick={() => {
            if (reduce) setAnswer("shy");
            else if (caught) sayYes();
          }}
        >
          {caught && !reduce ? siteConfig.caughtLabel : siteConfig.noLabel}
        </Button>
      </div>
      {answer === "yes" ? (
        <p className="mx-auto max-w-md text-center font-hand text-3xl leading-snug text-ink">{siteConfig.yesReply}</p>
      ) : null}
      {answer === "shy" ? (
        <p className="mx-auto max-w-md text-center text-sm text-ink/75">{siteConfig.noReply}</p>
      ) : null}
    </Block>
  );
}

function Finale() {
  const { launchFireworks, popConfetti, triggerSkyCelebration, skyCelebrationActive } = useStudio();
  return (
    <Block id="finale" kicker={siteConfig.finaleKicker} title={siteConfig.finaleTitle} intro={siteConfig.finaleBody}>
      <div className="flex flex-col items-center justify-center gap-3">
        <Button
          type="button"
          className="h-14 rounded-full px-8 text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white border-none"
          onClick={() => {
            popConfetti();
            launchFireworks();
            triggerSkyCelebration();
          }}
        >
          {skyCelebrationActive ? "✨ Sky Shots Blasting... (10s) 🎆" : `🎆 ${siteConfig.finaleReplay}`}
        </Button>
        <p className="text-xs text-ink/60">
          Tap to turn into dark mode with sky shot fireworks & sparkles for 10s ✨
        </p>
      </div>
      <p className="mt-16 text-center text-sm text-ink/55">{siteConfig.footer}</p>
      <p className="mt-2 text-center font-script text-xl text-rose-400">— {siteConfig.hisName}</p>
    </Block>
  );
}

export function LovePage() {
  return (
    <main className="relative z-10 pb-40">
      <StoryNav />
      <Hero />
      <BirthdayCardSection />
      <Countdown />
      <Together />
      <CakeExperienceSection />
      <Letter />
      <MemoryGallery />
      <Timeline />
      <Characters />
      <CartoonSurprises />
      <Wishes />
      <Reasons />
      <Valentine />
      <Finale />
    </main>
  );
}
