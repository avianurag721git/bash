import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config";
import { useNow } from "@/lib/use-now";
import { countdownTo, pad2 } from "@/lib/time";
import { useStudio } from "@/context/studio";
import { playCelebrationSound, playPopSound } from "@/lib/sound-effects";
import { Lock, Sparkles, KeyRound, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LockScreenProps = {
  onUnlock: () => void;
};

export function LockScreen({ onUnlock }: LockScreenProps) {
  const now = useNow(1000);
  const countdown = countdownTo(now, siteConfig.unlockTime);
  const { popConfetti } = useStudio();

  const [tapsOnLock, setTapsOnLock] = useState(0);
  const [showTease, setShowTease] = useState(false);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);

  // Automatically unlock when time reaches 11:59 PM
  useEffect(() => {
    if (countdown.done) {
      playCelebrationSound();
      popConfetti();
      onUnlock();
    }
  }, [countdown.done, onUnlock, popConfetti]);

  const handleLockTap = () => {
    playPopSound();
    setTapsOnLock((t) => t + 1);
    setShowTease(true);
    window.setTimeout(() => setShowTease(false), 3000);

    // If tapped 5 times, reveal secret developer bypass modal
    if (tapsOnLock >= 4) {
      setShowPasscodeModal(true);
    }
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passcode.trim().toLowerCase();
    if (clean === "jessi" || clean === "1159" || clean === "love" || clean === "admin") {
      sessionStorage.setItem("birthday_preview_unlocked", "true");
      playCelebrationSound();
      popConfetti();
      onUnlock();
    } else {
      playPopSound();
      setPasscodeError(true);
      window.setTimeout(() => setPasscodeError(false), 2000);
    }
  };

  const teaseMessages = [
    "Nice try! No peeking before 11:59 PM 💕",
    "Patience, gorgeous! The best gifts take time ✨",
    "Still locked! Shh... it's worth the wait 🤫",
    "Almost there! Just watch the countdown tick ⏳",
    "Okay curious cat, you found the secret pass door! 🗝️",
  ];

  const currentTease = teaseMessages[Math.min(tapsOnLock, teaseMessages.length - 1)];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#fff0f5] via-[#ffe4ec] to-[#ffd1df] px-4 text-ink select-none overflow-y-auto py-8">
      {/* Decorative ambient glow circles */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 size-80 rounded-full bg-rose-300/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/4 size-72 rounded-full bg-pink-300/30 blur-3xl" />

      {/* Main Lock Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass relative mx-auto w-full max-w-md rounded-[36px] border border-white/80 p-6 sm:p-8 text-center shadow-2xl backdrop-blur-2xl"
      >
        {/* Kicker badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-4 py-1 text-xs font-bold tracking-widest text-rose-600 uppercase">
          <Sparkles className="size-3 text-rose-500" />
          <span>{siteConfig.lockKicker}</span>
          <Sparkles className="size-3 text-rose-500" />
        </div>

        {/* Animated Padlock Icon with Interactive Tap */}
        <div className="relative my-6 flex justify-center">
          <motion.button
            type="button"
            onClick={handleLockTap}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92, rotate: [-5, 5, -5, 0] }}
            className="group relative flex size-24 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 text-white shadow-xl shadow-rose-500/25 ring-8 ring-white/60 cursor-pointer"
            aria-label="Locked birthday surprise"
          >
            <Lock className="size-10 transition-transform group-hover:scale-110" />
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-2 rounded-full border-2 border-rose-300/60"
            />
          </motion.button>
        </div>

        {/* Tease tooltip when padlock is clicked */}
        <AnimatePresence>
          {showTease && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              className="mb-3 inline-block rounded-full bg-rose-500 text-white px-4 py-1.5 text-xs font-semibold shadow-md"
            >
              {currentTease}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Headings */}
        <h1 className="font-script text-4xl sm:text-5xl text-ink">
          {siteConfig.lockTitle}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink/75 sm:text-base">
          {siteConfig.lockSub}
        </p>

        {/* Live Countdown Clock Blocks */}
        <div className="my-6">
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-rose-500 uppercase tracking-widest mb-3">
            <Clock className="size-3.5" />
            <span>Unlocks in exactly</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
            {/* Hours */}
            <div className="rounded-2xl bg-white/80 p-3 sm:p-4 shadow-sm border border-rose-100 flex flex-col items-center">
              <span className="font-hand text-3xl sm:text-4xl font-bold text-rose-600">
                {pad2(countdown.hours + countdown.days * 24)}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-ink/60 uppercase tracking-wider mt-0.5">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="rounded-2xl bg-white/80 p-3 sm:p-4 shadow-sm border border-rose-100 flex flex-col items-center">
              <span className="font-hand text-3xl sm:text-4xl font-bold text-rose-600">
                {pad2(countdown.minutes)}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-ink/60 uppercase tracking-wider mt-0.5">
                Minutes
              </span>
            </div>

            {/* Seconds */}
            <div className="rounded-2xl bg-white/80 p-3 sm:p-4 shadow-sm border border-rose-100 flex flex-col items-center">
              <span className="font-hand text-3xl sm:text-4xl font-bold text-rose-600 tabular-nums">
                {pad2(countdown.seconds)}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-ink/60 uppercase tracking-wider mt-0.5">
                Seconds
              </span>
            </div>
          </div>
        </div>

        {/* Encouraging message */}
        <div className="rounded-2xl bg-white/60 p-3 text-xs leading-relaxed text-ink/70 border border-white/70">
          <p>
            ✨ Keep this tab open. The page will magically open the moment the clock strikes <strong>11:59 PM</strong>!
          </p>
        </div>

        {/* Secret Passcode modal / preview access */}
        <AnimatePresence>
          {showPasscodeModal && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handlePasscodeSubmit}
              className="mt-4 pt-4 border-t border-rose-200/80 flex flex-col gap-2.5 overflow-hidden"
            >
              <p className="text-xs font-semibold text-rose-600 flex items-center justify-center gap-1">
                <KeyRound className="size-3.5" /> Early Preview Passcode
              </p>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter passcode (e.g. jessi)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="h-10 text-xs bg-white/90 rounded-full text-center"
                  autoFocus
                />
                <Button
                  type="submit"
                  size="sm"
                  className="h-10 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs px-4"
                >
                  Unlock
                </Button>
              </div>
              {passcodeError && (
                <span className="text-[11px] font-bold text-rose-500 animate-shake">
                  Incorrect passcode! Try "jessi" or wait for 11:59 PM 💕
                </span>
              )}
            </motion.form>
          )}
        </AnimatePresence>

        {/* Discreet creator preview trigger button */}
        {!showPasscodeModal && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setShowPasscodeModal(true)}
              className="text-[11px] text-ink/40 hover:text-rose-500 hover:underline transition-colors cursor-pointer"
            >
              Creator preview / secret key 🗝️
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
