import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config";
import { useNow } from "@/lib/use-now";
import { countdownTo, pad2 } from "@/lib/time";
import { useStudio } from "@/context/studio";
import { playCelebrationSound, playPopSound } from "@/lib/sound-effects";
import { Lock, Sparkles, KeyRound, Clock, Play, Pause, Disc3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LockScreenProps = {
  onUnlock: () => void;
};

let ytApiPromise: Promise<void> | null = null;
function ensureYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return ytApiPromise;
}

export function LockScreen({ onUnlock }: LockScreenProps) {
  const now = useNow(1000);
  const countdown = countdownTo(now, siteConfig.unlockTime);
  const { popConfetti } = useStudio();

  const [tapsOnLock, setTapsOnLock] = useState(0);
  const [showTease, setShowTease] = useState(false);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);

  // Audio Player State for "Tainu Khabar Nahi"
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);

  // Automatically unlock when time reaches 11:59 PM
  useEffect(() => {
    if (countdown.done) {
      try {
        playerRef.current?.pauseVideo();
        playerRef.current?.destroy?.();
      } catch {}
      playCelebrationSound();
      popConfetti();
      onUnlock();
    }
  }, [countdown.done, onUnlock, popConfetti]);

  // Clean up player on unmount
  useEffect(() => {
    return () => {
      try {
        playerRef.current?.pauseVideo();
        playerRef.current?.destroy?.();
      } catch {}
    };
  }, []);

  const handleToggleSong = async () => {
    playPopSound();

    if (isPlaying) {
      playerRef.current?.pauseVideo();
      setIsPlaying(false);
      return;
    }

    if (playerRef.current) {
      try {
        playerRef.current.unMute();
        playerRef.current.playVideo();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    // First time loading YouTube player
    setLoadingAudio(true);
    try {
      await ensureYouTubeApi();
      if (!hostRef.current || !window.YT) {
        setLoadingAudio(false);
        return;
      }

      const mount = document.createElement("div");
      hostRef.current.appendChild(mount);

      const player: YtPlayer = new window.YT.Player(mount, {
        width: "200",
        height: "200",
        videoId: siteConfig.lockSong.videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: siteConfig.lockSong.videoId,
        },
        events: {
          onReady: () => {
            playerRef.current = player;
            player.unMute();
            player.setVolume(85);
            player.playVideo();
            setLoadingAudio(false);
            setIsPlaying(true);
          },
          onStateChange: (event) => {
            const state = window.YT?.PlayerState;
            if (!state) return;
            if (event.data === state.PLAYING) {
              setIsPlaying(true);
              setLoadingAudio(false);
            } else if (event.data === state.PAUSED || event.data === state.ENDED) {
              setIsPlaying(false);
            }
          },
          onError: () => {
            setLoadingAudio(false);
            setIsPlaying(false);
          },
        },
      });
    } catch {
      setLoadingAudio(false);
      setIsPlaying(false);
    }
  };

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
      try {
        playerRef.current?.pauseVideo();
        playerRef.current?.destroy?.();
      } catch {}
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
      {/* Hidden container for YouTube iframe background audio */}
      <div
        ref={hostRef}
        className="pointer-events-none fixed -top-[9999px] -left-[9999px] h-1 w-1 opacity-0"
        aria-hidden="true"
      />

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
        <div className="relative my-5 flex justify-center">
          <motion.button
            type="button"
            onClick={handleLockTap}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92, rotate: [-5, 5, -5, 0] }}
            className="group relative flex size-22 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 text-white shadow-xl shadow-rose-500/25 ring-8 ring-white/60 cursor-pointer"
            aria-label="Locked birthday surprise"
          >
            <Lock className="size-9 transition-transform group-hover:scale-110" />
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
        <div className="my-5">
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-rose-500 uppercase tracking-widest mb-2.5">
            <Clock className="size-3.5" />
            <span>Unlocks in exactly</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
            {/* Hours */}
            <div className="rounded-2xl bg-white/80 p-3 shadow-xs border border-rose-100 flex flex-col items-center">
              <span className="font-hand text-3xl sm:text-4xl font-bold text-rose-600">
                {pad2(countdown.hours + countdown.days * 24)}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-ink/60 uppercase tracking-wider mt-0.5">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="rounded-2xl bg-white/80 p-3 shadow-xs border border-rose-100 flex flex-col items-center">
              <span className="font-hand text-3xl sm:text-4xl font-bold text-rose-600">
                {pad2(countdown.minutes)}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-ink/60 uppercase tracking-wider mt-0.5">
                Minutes
              </span>
            </div>

            {/* Seconds */}
            <div className="rounded-2xl bg-white/80 p-3 shadow-xs border border-rose-100 flex flex-col items-center">
              <span className="font-hand text-3xl sm:text-4xl font-bold text-rose-600 tabular-nums">
                {pad2(countdown.seconds)}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-ink/60 uppercase tracking-wider mt-0.5">
                Seconds
              </span>
            </div>
          </div>
        </div>

        {/* Lock Screen Soundtrack Player: Tainu Khabar Nahi by Arijit Singh */}
        <div className="my-4 rounded-2xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-rose-500/10 p-3 sm:p-3.5 border border-rose-200/80 shadow-xs text-left">
          <div className="flex items-center justify-between gap-2.5 sm:gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              {/* Spinning Vinyl Icon */}
              <motion.div
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                className="relative flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-md"
              >
                <Disc3 className="size-5 sm:size-6" />
                <div className="absolute size-2 sm:size-2.5 rounded-full bg-white ring-2 ring-rose-400" />
              </motion.div>

              {/* Song Information */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-rose-600 bg-rose-100/90 px-2 py-0.2 rounded-full">
                    Special Track 🎵
                  </span>
                  {isPlaying && (
                    <span className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 bg-rose-500 h-full animate-[pulse_0.6s_infinite]" />
                      <span className="w-0.5 bg-rose-500 h-2/3 animate-[pulse_0.4s_infinite]" />
                      <span className="w-0.5 bg-rose-500 h-4/5 animate-[pulse_0.7s_infinite]" />
                    </span>
                  )}
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-ink truncate mt-0.5">
                  {siteConfig.lockSong.title}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-ink/70 truncate">
                  {siteConfig.lockSong.artist} • {siteConfig.lockSong.movie}
                </p>
              </div>
            </div>

            {/* Play/Pause Button */}
            <Button
              type="button"
              onClick={handleToggleSong}
              disabled={loadingAudio}
              className={`h-9 sm:h-10 px-3.5 sm:px-4 rounded-full font-semibold text-xs shadow-md shrink-0 flex items-center gap-1.5 transition-all ${
                isPlaying
                  ? "bg-rose-600 hover:bg-rose-700 text-white scale-102"
                  : "bg-rose-500 hover:bg-rose-600 text-white hover:scale-105"
              }`}
            >
              {loadingAudio ? (
                <span className="text-[11px]">Loading...</span>
              ) : isPlaying ? (
                <>
                  <Pause className="size-3.5 fill-white" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="size-3.5 fill-white ml-0.5" />
                  <span>Play 🎵</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Encouraging message */}
        <div className="rounded-2xl bg-white/60 p-3 text-xs leading-relaxed text-ink/70 border border-white/70">
          <p>
            ✨ Enjoy the song while we wait! The page will magically open at <strong>11:59 PM</strong>.
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
