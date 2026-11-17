import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config";
import { useStudio } from "@/context/studio";
import { Envelope } from "@/components/envelope";
import { Balloons, Confetti, CursorHearts, Fireworks, Snow } from "@/components/effects";
import { LovePage } from "@/components/page";
import { MusicPlayer } from "@/components/music-player";

type Phase = "sealed" | "opening" | "open";

function Experience() {
  const reduce = useReducedMotion();
  const skip = new URLSearchParams(window.location.search).has("open");
  const [phase, setPhase] = useState<Phase>(skip ? "open" : "sealed");
  const { unlockAndPlay, popConfetti } = useStudio();

  useEffect(() => {
    document.title = `Happy Birthday, ${siteConfig.herName}`;
  }, []);

  function open() {
    if (phase !== "sealed") return;
    unlockAndPlay();
    popConfetti();
    setPhase("opening");
    window.setTimeout(() => setPhase("open"), reduce ? 200 : 1500);
  }

  return (
    <div className="relative min-h-dvh text-ink">
      <Snow />
      <Confetti />
      <Balloons />
      <Fireworks />
      <CursorHearts />
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
