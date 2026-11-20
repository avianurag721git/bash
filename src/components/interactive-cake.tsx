import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CakeArtAnimated, type CakeStage } from "@/components/cake-art-animated";
import { CakeEatingSquad } from "@/components/cake-eating-squad";
import { useStudio } from "@/context/studio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  playBlowSound,
  playSparkleSound,
  playKnifeEnterSound,
  playCakeCutSound,
  playCelebrationSound,
  playPopSound,
} from "@/lib/sound-effects";
import { Sparkles, Mic, MicOff, RotateCcw, Send } from "lucide-react";

type InteractiveCakeProps = {
  onSequenceComplete?: () => void;
  className?: string;
};

export function InteractiveCake({ onSequenceComplete, className }: InteractiveCakeProps) {
  const [stage, setStage] = useState<CakeStage>("ready_to_blow");
  const [listening, setListening] = useState(false);
  const [micNote, setMicNote] = useState<string | null>(null);
  const [wish, setWish] = useState("");
  const [wishSent, setWishSent] = useState<string | null>(null);

  const stopMicRef = useRef<(() => void) | null>(null);
  const timersRef = useRef<number[]>([]);
  const { popConfetti, launchFireworks, triggerSkyCelebration } = useStudio();

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      stopMicRef.current?.();
      timersRef.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const addTimer = (fn: () => void, ms: number) => {
    const t = window.setTimeout(fn, ms);
    timersRef.current.push(t);
    return t;
  };

  /**
   * Action: Blow candles
   */
  const handleBlow = () => {
    if (stage !== "ready_to_blow") return;

    // Stop mic if listening
    stopMicRef.current?.();
    setListening(false);

    // 1. Enter blowing state
    setStage("blowing");
    playBlowSound();

    // 2. Extinguish after flicker
    addTimer(() => {
      setStage("extinguished");
      playSparkleSound();
      popConfetti();

      // 3. Wait 2.5 seconds, then transition to waiting_for_knife or prompt
      addTimer(() => {
        setStage("waiting_for_knife");
      }, 2400);
    }, 750);
  };

  /**
   * Optional Microphone Blow Detection
   */
  const handleToggleMic = async () => {
    if (stage !== "ready_to_blow") return;

    if (listening) {
      stopMicRef.current?.();
      setListening(false);
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setMicNote("Microphone not supported on this device. Just tap the button!");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      const dataArray = new Uint8Array(analyser.fftSize);

      let animId = 0;
      let isDone = false;

      const cleanup = () => {
        if (isDone) return;
        isDone = true;
        window.cancelAnimationFrame(animId);
        stream.getTracks().forEach((track) => track.stop());
        void audioCtx.close();
        stopMicRef.current = null;
        setListening(false);
      };

      const checkAudio = () => {
        if (isDone) return;
        analyser.getByteTimeDomainData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const val = (dataArray[i] - 128) / 128;
          sum += val * val;
        }
        const rms = Math.sqrt(sum / dataArray.length);

        // Threshold for wind / breath blow
        if (rms > 0.17) {
          cleanup();
          handleBlow();
          return;
        }
        animId = window.requestAnimationFrame(checkAudio);
      };

      stopMicRef.current = cleanup;
      setMicNote(null);
      setListening(true);
      animId = window.requestAnimationFrame(checkAudio);
    } catch {
      setMicNote("Microphone access was denied. Tap 'Blow the Candles' below!");
      setListening(false);
    }
  };

  /**
   * Action: Start Cake-Cutting Sequence (Stage 3)
   */
  const handleStartCutting = () => {
    // 1. Knife Enters
    setStage("knife_entering");
    playKnifeEnterSound();

    // 2. Knife Cuts Through
    addTimer(() => {
      setStage("cutting");
      playCakeCutSound();

      // 3. Cake splits & slice slides out
      addTimer(() => {
        setStage("cake_split");

        // 4. Celebratory fanfare & confetti + Midnight Sky Shots Celebration
        addTimer(() => {
          setStage("cut_celebration");
          playCelebrationSound();
          popConfetti();
          launchFireworks();
          triggerSkyCelebration();
          onSequenceComplete?.();
        }, 500);
      }, 1200);
    }, 1400);
  };

  /**
   * Action: Replay Sequence
   */
  const handleReset = (mode: "all" | "cut") => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
    playPopSound();

    if (mode === "all") {
      setStage("ready_to_blow");
      setWishSent(null);
    } else {
      setStage("waiting_for_knife");
    }
  };

  /**
   * Submit Birthday Wish
   */
  const handleSendWish = (e: FormEvent) => {
    e.preventDefault();
    const finalWish = wish.trim() || "A year filled with endless love, laughter, and soft days";
    setWishSent(finalWish);
    setWish("");
    playSparkleSound();
    popConfetti();
  };

  return (
    <div className={`mx-auto flex w-full max-w-md sm:max-w-xl flex-col items-center ${className ?? ""}`}>
      {/* Interactive Animated Cake Art */}
      <div className="relative w-full cursor-pointer py-2" onClick={() => stage === "ready_to_blow" && handleBlow()}>
        <CakeArtAnimated stage={stage} />
      </div>

      {/* Stage Status and Interactive Controls */}
      <div className="mt-4 w-full">
        <AnimatePresence mode="wait">
          {/* STAGE 2: CANDLE LIT */}
          {stage === "ready_to_blow" && (
            <motion.div
              key="ready_to_blow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div className="rounded-2xl bg-white/70 px-4 py-2.5 shadow-xs border border-rose-100">
                <p className="font-hand text-2xl text-rose-500 font-semibold">
                  Make a wish and blow out your candles! ✨
                </p>
                <p className="text-xs text-ink/70 mt-0.5">
                  Tap the button or cake, or turn on mic blowing.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <Button
                  type="button"
                  onClick={handleBlow}
                  className="h-12 rounded-full px-7 text-base font-medium shadow-md bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:scale-105 transition-transform"
                >
                  Blow the Candles 💨
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleToggleMic}
                  className={`h-12 rounded-full px-5 text-sm font-medium border-rose-200 bg-white/80 ${
                    listening ? "ring-2 ring-rose-400 text-rose-600 animate-pulse" : "text-ink"
                  }`}
                  aria-label="Microphone blow trigger"
                >
                  {listening ? (
                    <>
                      <MicOff className="mr-1.5 size-4 text-rose-500" />
                      Listening... Blow now!
                    </>
                  ) : (
                    <>
                      <Mic className="mr-1.5 size-4 text-rose-500" />
                      Blow into mic
                    </>
                  )}
                </Button>
              </div>

              {micNote && <p className="text-xs text-rose-600 bg-rose-50 px-3 py-1 rounded-full">{micNote}</p>}
            </motion.div>
          )}

          {/* STAGE: BLOWING */}
          {stage === "blowing" && (
            <motion.div
              key="blowing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-3 text-center"
            >
              <p className="font-hand text-3xl text-rose-500 animate-pulse">
                Blowing out the candles... 💨
              </p>
            </motion.div>
          )}

          {/* STAGE: EXTINGUISHED / WISH SENT */}
          {stage === "extinguished" && (
            <motion.div
              key="extinguished"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-2 text-center"
            >
              <p className="font-hand text-3xl text-rose-600 font-bold">
                Your wish is on its way! ✨
              </p>
              <p className="text-xs text-ink/75 mt-1">Get ready for the cake cutting celebration...</p>
            </motion.div>
          )}

          {/* STAGE: WAITING FOR KNIFE / READY TO CUT */}
          {stage === "waiting_for_knife" && (
            <motion.div
              key="waiting_for_knife"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div className="rounded-2xl bg-white/80 px-5 py-3 shadow-sm border border-rose-100">
                <p className="font-hand text-2xl text-rose-600">
                  Candles are out! Now let's cut the cake 🎂
                </p>
                <p className="text-xs text-ink/70 mt-1">
                  A sweet slice of love, made just for you.
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={handleStartCutting}
                  className="h-12 rounded-full px-7 text-base font-medium shadow-md bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white hover:scale-105 transition-transform"
                >
                  Cut the Cake 🍰✨
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleReset("all")}
                  title="Relight Candles"
                  className="size-12 rounded-full bg-white/80 border-rose-200 text-ink/70"
                >
                  <RotateCcw className="size-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STAGE: KNIFE ENTERING & CUTTING */}
          {(stage === "knife_entering" || stage === "cutting") && (
            <motion.div
              key="cutting_stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-3 text-center"
            >
              <p className="font-hand text-3xl text-rose-500 font-semibold animate-pulse">
                {stage === "knife_entering" ? "Here comes the cake knife... 🎀" : "Cutting the cake with love... 🎂"}
              </p>
            </motion.div>
          )}

          {/* STAGE: CELEBRATION AFTER CUT */}
          {(stage === "cake_split" || stage === "cut_celebration") && (
            <motion.div
              key="cut_celebration"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 text-center w-full"
            >
              {/* Four Cartoon Girls Eating the Cake: Shalini, Alka, Anushka & Sandhya */}
              <CakeEatingSquad />

              <div className="rounded-3xl bg-white/90 p-5 shadow-lg border border-rose-100 max-w-sm w-full">
                <div className="flex items-center justify-center gap-1.5 text-rose-500 mb-1">
                  <Sparkles className="size-5" />
                  <span className="font-script text-3xl">Let's cut the cake! 🎂</span>
                  <Sparkles className="size-5" />
                </div>
                <p className="font-hand text-xl text-ink/80 mt-1">
                  "May your year be as sweet as the frosting and as warm as your smile."
                </p>

                {/* Wish Whisper Box */}
                <div className="mt-4 pt-3 border-t border-rose-100">
                  {wishSent ? (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl bg-rose-50/80 p-3"
                    >
                      <p className="font-hand text-2xl text-rose-600">"{wishSent}"</p>
                      <p className="text-xs text-ink/70 mt-1">
                        Caught! The stars and I are on wish duty. ✨
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSendWish} className="flex flex-col gap-2">
                      <label htmlFor="cake-wish" className="text-xs font-medium text-ink/75">
                        Whisper a secret birthday wish to the stars:
                      </label>
                      <div className="flex gap-2">
                        <Input
                          id="cake-wish"
                          value={wish}
                          onChange={(e) => setWish(e.target.value)}
                          placeholder="whisper a wish..."
                          maxLength={120}
                          className="h-10 rounded-full bg-white text-sm"
                        />
                        <Button type="submit" size="sm" className="h-10 rounded-full px-4 bg-rose-500 text-white shrink-0">
                          <Send className="size-3.5 mr-1" /> Send
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Replay Actions */}
              <div className="flex items-center justify-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleReset("cut")}
                  className="rounded-full bg-white/80 border-rose-200 px-5 text-sm text-ink hover:bg-rose-50"
                >
                  <RotateCcw className="mr-1.5 size-3.5 text-rose-500" />
                  Replay Cake Cutting 🍰
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleReset("all")}
                  className="rounded-full bg-white/80 border-rose-200 px-5 text-sm text-ink hover:bg-rose-50"
                >
                  <RotateCcw className="mr-1.5 size-3.5 text-rose-500" />
                  Relight Candles 🕯️
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
