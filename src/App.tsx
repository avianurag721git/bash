import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config";
import { useStudio } from "@/context/studio";
import { Envelope } from "@/components/envelope";
import { Balloons, Confetti, CursorHearts, Fireworks, Snow } from "@/components/effects";
import { SkyShotsCelebration } from "@/components/sky-shots-celebration";
import { LovePage } from "@/components/page";
import { MusicPlayer } from "@/components/music-player";
import { LockScreen } from "@/components/lock-screen";
import { playCardOpenSound } from "@/lib/sound-effects";

type Phase = "sealed" | "opening" | "open";

function isInitiallyLocked() {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  if (params.has("preview") || params.has("unlock")) return false;
  if (window.sessionStorage.getItem("birthday_preview_unlocked") === "true") return false;
  return new Date().getTime() < new Date(siteConfig.unlockTime).getTime();
}

function Experience() {
  const reduce = useReducedMotion();
  const skip = new URLSearchParams(window.location.search).has("open");
  const [phase, setPhase] = useState<Phase>(skip ? "open" : "sealed");
  const [isLocked, setIsLocked] = useState(isInitiallyLocked);
  const { unlockAndPlay, popConfetti, skyCelebrationActive, stopSkyCelebration } = useStudio();

  useEffect(() => {
    document.title = `Happy Birthday, ${siteConfig.herName}`;
  }, []);

  function open() {
    if (phase !== "sealed") return;
    playCardOpenSound();
    unlockAndPlay();
    popConfetti();
    setPhase("opening");
    window.setTimeout(() => setPhase("open"), reduce ? 200 : 1500);
  }

  if (isLocked) {
    return (
      <div className="relative min-h-dvh text-ink">
        <Snow />
        <CursorHearts />
        <LockScreen onUnlock={() => setIsLocked(false)} />
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh text-ink">
      <Snow />
      <Confetti />
      <Balloons />
      <Fireworks />
      <CursorHearts />
      <SkyShotsCelebration isActive={skyCelebrationActive} onComplete={stopSkyCelebration} />
      <AnimatePresence>{phase !== "open" ? <Envelope key="envelope" opening={phase === "opening"} onOpen={open} /> : null}</AnimatePresence>
      {phase === "open" ? (
        <>
          <LovePage />
          <MusicPlayer />
        </>
      ) : null}
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Experience />
    </MotionConfig>
  );
}
