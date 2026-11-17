import { useEffect, useRef, useState, type FormEvent, type PointerEvent, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config";
import { formatIndiaDate, pad2, countdownTo, timeTogether } from "@/lib/time";
import { useNow } from "@/lib/use-now";
import { useStudio } from "@/context/studio";
import { CakeArt, LoveScene, YearArt } from "@/components/art";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
      <p className="mt-4 text-center text-sm text-ink/65">
        Until midnight on {formatIndiaDate(siteConfig.birthday)}, India time.
      </p>
    </Block>
  );
}

function Together() {
  const now = useNow();
  const elapsed = timeTogether(now, siteConfig.relationshipStart);
  const reached = elapsed.years >= siteConfig.milestoneYears;
  const units = [
    { label: "years", value: String(elapsed.years) },
    { label: "days", value: String(elapsed.days) },
    { label: "hours", value: pad2(elapsed.hours) },
    { label: "mins", value: pad2(elapsed.minutes) },
    { label: "secs", value: pad2(elapsed.seconds) },
  ];
  return (
    <Block
      id="together"
      kicker="since the beginning"
      title={siteConfig.togetherHeadline}
      intro={reached ? siteConfig.togetherNow : siteConfig.togetherAlmost}
    >
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
        {units.map((unit, index) => (
          <div
            key={unit.label}
            className={cn(
              "glass rounded-3xl px-3 py-4 text-center",
              index === 0 && "col-span-2 sm:col-span-1",
            )}
          >
            <div className="text-3xl font-semibold tabular-nums text-ink">{unit.value}</div>
            <div className="mt-1 text-[10px] tracking-[0.16em] text-rose-700/70 uppercase">{unit.label}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-ink/65">
        Counting from {formatIndiaDate(siteConfig.relationshipStart)}.
      </p>
    </Block>
  );
}

function Characters() {
  const [taps, setTaps] = useState(0);
  const found = taps >= siteConfig.easterTaps;
  return (
    <Block id="scene" kicker="our little crowd" title="You, me, and the soft toys">
      <div className="glass mx-auto max-w-xl rounded-[32px] px-3 py-4 sm:px-6">
        <LoveScene
          onBunny={() => {
            setTaps((count) => count + 1);
          }}
        />
        <p className="pb-2 text-center text-xs text-ink/45">{found ? "" : siteConfig.sceneHint}</p>
        {found ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-3 max-w-sm rounded-2xl bg-white/80 px-4 py-3 text-center font-hand text-2xl leading-snug text-ink"
          >
            {siteConfig.easterEgg}
          </motion.p>
        ) : null}
      </div>
    </Block>
  );
}

function Cake() {
  const litRef = useRef(true);
  const [lit, setLit] = useState(true);
  const [listening, setListening] = useState(false);
  const [micNote, setMicNote] = useState<string | null>(null);
  const [wish, setWish] = useState("");
  const [sent, setSent] = useState<string | null>(null);
  const stopRef = useRef<(() => void) | null>(null);
  const { popConfetti } = useStudio();

  useEffect(() => () => stopRef.current?.(), []);

  function blow() {
    if (!litRef.current) return;
    litRef.current = false;
    setLit(false);
    setListening(false);
    stopRef.current?.();
    popConfetti();
  }

  async function listen() {
    if (!litRef.current) return;
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicNote(siteConfig.cakeMicDenied);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audio = new AudioContext();
      const source = audio.createMediaStreamSource(stream);
      const analyser = audio.createAnalyser();
      analyser.fftSize = 1024;
      source.connect(analyser);
      const bins = new Uint8Array(analyser.fftSize);
      let frame = 0;
      let stopped = false;
      const cleanup = () => {
        if (stopped) return;
        stopped = true;
        window.cancelAnimationFrame(frame);
        stream.getTracks().forEach((track) => track.stop());
        void audio.close();
        stopRef.current = null;
        setListening(false);
      };
      const tick = () => {
        if (stopped) return;
        analyser.getByteTimeDomainData(bins);
        let sum = 0;
        for (const value of bins) {
          const sample = (value - 128) / 128;
          sum += sample * sample;
        }
        if (Math.sqrt(sum / bins.length) > 0.16) {
          cleanup();
          blow();
          return;
        }
        frame = window.requestAnimationFrame(tick);
      };
      stopRef.current = cleanup;
      setMicNote(null);
      setListening(true);
      frame = window.requestAnimationFrame(tick);
    } catch {
      setMicNote(siteConfig.cakeMicDenied);
    }
  }

  function sendWish(event: FormEvent) {
    event.preventDefault();
    setSent(wish.trim() || "a soft, happy year");
    setWish("");
  }

  return (
    <Block id="cake" kicker={siteConfig.cakeKicker} title={siteConfig.cakeTitle} intro={siteConfig.cakeLead}>
      <div className="mx-auto max-w-sm">
        <button
          type="button"
          onClick={blow}
          disabled={!lit}
          className="block w-full rounded-[32px] outline-none focus-visible:ring-3 focus-visible:ring-rose-300"
          aria-label={lit ? "Blow out the candles" : "The candles are out"}
        >
          <CakeArt lit={lit} />
        </button>
        {lit ? (
          <div className="mt-2 flex flex-col items-center gap-2">
            <Button type="button" onClick={() => void listen()} disabled={listening} className="h-11 rounded-full px-6">
              {listening ? siteConfig.cakeListening : siteConfig.cakeMic}
            </Button>
            {micNote ? <p className="text-center text-sm text-ink/70">{micNote}</p> : null}
          </div>
        ) : (
          <div className="glass rounded-[28px] p-4">
            {sent ? (
              <div className="text-center">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: -8 }}
                  className="font-hand text-3xl text-rose-500"
                >
                  {sent}
                </motion.p>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{siteConfig.wishDone}</p>
              </div>
            ) : (
              <form onSubmit={sendWish} className="flex flex-col gap-3">
                <label className="text-sm font-medium text-ink" htmlFor="wish">
                  Your wish
                </label>
                <Input
                  id="wish"
                  value={wish}
                  onChange={(event) => setWish(event.target.value)}
                  placeholder={siteConfig.wishPlaceholder}
                  maxLength={140}
                  className="h-12 rounded-full bg-white/80 px-4 text-base"
                />
                <Button type="submit" className="h-11 rounded-full">
                  {siteConfig.wishButton}
                </Button>
              </form>
            )}
          </div>
        )}
      </div>
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
    <img
      src={`${import.meta.env.BASE_URL}photos/${file}`}
      alt={label}
      className="h-full w-full object-cover"
      onError={() => setMissing(true)}
    />
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
                <div className="aspect-[16/9] bg-rose-50">
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
  const { launchFireworks, popConfetti } = useStudio();
  return (
    <Block id="finale" kicker={siteConfig.finaleKicker} title={siteConfig.finaleTitle} intro={siteConfig.finaleBody}>
      <div className="flex justify-center">
        <Button
          type="button"
          className="h-12 rounded-full px-6"
          onClick={() => {
            popConfetti();
            launchFireworks();
          }}
        >
          {siteConfig.finaleReplay}
        </Button>
      </div>
      <p className="mt-16 text-center text-sm text-ink/55">{siteConfig.footer}</p>
      <p className="mt-2 text-center font-script text-xl text-rose-400">— {siteConfig.hisName}</p>
    </Block>
  );
}

export function LovePage() {
  return (
    <main className="relative z-10 pb-40">
      <Hero />
      <Countdown />
      <Together />
      <Characters />
      <Cake />
      <Wishes />
      <Reasons />
      <Timeline />
      <Letter />
      <Valentine />
      <Finale />
    </main>
  );
}
