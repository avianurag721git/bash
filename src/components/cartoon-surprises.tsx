import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config";
import { useStudio } from "@/context/studio";
import { playPopSound, playSparkleSound } from "@/lib/sound-effects";
import { Sparkles, Star } from "lucide-react";

export function CartoonSurprises() {
  const [bunnyGiggles, setBunnyGiggles] = useState(0);
  const [teddyHugs, setTeddyHugs] = useState(0);
  const [giftOpened, setGiftOpened] = useState(false);
  const [stargazeWishes, setStargazeWishes] = useState<number[]>([]);
  const { popConfetti, playScreenSong, playing, index } = useStudio();

  const currentSong = siteConfig.songs[index];
  const isPlayingPeeLoon = playing && currentSong?.title.includes("Pee Loon");

  const handleBunny = () => {
    playPopSound();
    setBunnyGiggles((c) => c + 1);
    if (bunnyGiggles % 3 === 2) {
      popConfetti();
      playSparkleSound();
    }
  };

  const handleTeddy = () => {
    playPopSound();
    setTeddyHugs((c) => c + 1);
    if (teddyHugs % 3 === 2) {
      popConfetti();
      playSparkleSound();
    }
  };

  const handleGift = () => {
    playSparkleSound();
    popConfetti();
    setGiftOpened(true);
  };

  const handleStar = (index: number) => {
    playSparkleSound();
    if (!stargazeWishes.includes(index)) {
      setStargazeWishes((prev) => [...prev, index]);
    }
  };

  const surpriseMessages = [
    "You are the most precious gift this world ever gave me.",
    "Every day with you feels like waking up on my birthday.",
    "Your smile is my favorite scene in the entire movie.",
    "I'd choose you in every universe, in every single lifetime.",
  ];

  return (
    <section id="surprises" className="mx-auto w-full max-w-4xl px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-rose-500 uppercase">
          Playful Little Moments
        </p>
        <h2 className="mt-2 font-script text-4xl text-ink sm:text-5xl">
          Cute Cartoon Surprises
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink/75">
          Tap the cartoon cuties and the secret birthday present to discover little love notes!
        </p>

        {/* Screen Soundtrack Badge */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => playScreenSong("surprises")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all shadow-xs border cursor-pointer ${
              isPlayingPeeLoon
                ? "bg-rose-500 text-white border-rose-600 shadow-md scale-105"
                : "bg-white/80 text-rose-700 border-rose-200/80 hover:bg-white hover:scale-102"
            }`}
            title="Play screen soundtrack: Pee Loon"
          >
            <span className="text-sm">🎵</span>
            <span>
              Screen Track: <strong>Pee Loon</strong> <span className="opacity-75 font-normal">(Mohit Chauhan)</span>
            </span>
            {isPlayingPeeLoon ? (
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
      </div>

      {/* Grid of Interactive Cartoon Toys */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* 1. TICKLISH BUNNY */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBunny}
          className="glass relative flex flex-col items-center justify-between rounded-3xl p-6 shadow-md border border-rose-100 cursor-pointer text-center"
        >
          <span className="text-[10px] font-bold tracking-wider text-rose-400 uppercase">
            {bunnyGiggles === 0 ? "Tickle me!" : `Giggles: ${bunnyGiggles} 🐰`}
          </span>

          {/* Cute Bunny SVG */}
          <div className="my-4 size-32">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              {/* Ears */}
              <motion.ellipse
                cx="42"
                cy="32"
                rx="8"
                ry="22"
                fill="#ffffff"
                stroke="#f8bbd0"
                strokeWidth="1.5"
                animate={bunnyGiggles > 0 ? { rotate: [-5, 5, -5] } : {}}
                transition={{ duration: 0.3 }}
              />
              <ellipse cx="42" cy="34" rx="4.5" ry="14" fill="#ffb7c8" />
              <motion.ellipse
                cx="78"
                cy="32"
                rx="8"
                ry="22"
                fill="#ffffff"
                stroke="#f8bbd0"
                strokeWidth="1.5"
                animate={bunnyGiggles > 0 ? { rotate: [5, -5, 5] } : {}}
                transition={{ duration: 0.3 }}
              />
              <ellipse cx="78" cy="34" rx="4.5" ry="14" fill="#ffb7c8" />

              {/* Body */}
              <ellipse cx="60" cy="85" rx="26" ry="22" fill="#ffffff" stroke="#f8bbd0" strokeWidth="1.5" />
              <ellipse cx="60" cy="88" rx="14" ry="11" fill="#fff0f5" />
              {/* Heart in paws */}
              <path d="M60 84 c-5-4 -10-1 -10 4 c0 5 10 9 10 9 s10-4 10-9 c0-5 -5-8 -10-4 z" fill="#ff4081" />

              {/* Head */}
              <circle cx="60" cy="58" r="22" fill="#ffffff" stroke="#f8bbd0" strokeWidth="1.5" />
              {/* Eyes */}
              {bunnyGiggles % 2 === 1 ? (
                // Happy squint eyes
                <>
                  <path d="M50 56 Q54 52 58 56" fill="none" stroke="#5c2942" strokeWidth="2" strokeLinecap="round" />
                  <path d="M62 56 Q66 52 70 56" fill="none" stroke="#5c2942" strokeWidth="2" strokeLinecap="round" />
                </>
              ) : (
                // Sparkly open eyes
                <>
                  <circle cx="53" cy="56" r="3" fill="#5c2942" />
                  <circle cx="54" cy="55" r="1" fill="#ffffff" />
                  <circle cx="67" cy="56" r="3" fill="#5c2942" />
                  <circle cx="68" cy="55" r="1" fill="#ffffff" />
                </>
              )}
              {/* Cheeks */}
              <circle cx="46" cy="62" r="4" fill="#ff80ab" opacity="0.6" />
              <circle cx="74" cy="62" r="4" fill="#ff80ab" opacity="0.6" />
              {/* Nose & Mouth */}
              <polygon points="58,61 62,61 60,63" fill="#ff4081" />
              <path d="M57 64 Q60 67 63 64" fill="none" stroke="#e91e63" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          <h3 className="font-script text-2xl text-ink">Bubbly Bunny</h3>
          <p className="mt-1 font-hand text-sm text-ink/70">
            {bunnyGiggles === 0
              ? "Tap to tickle! She gives squeaky giggles."
              : `Giggled ${bunnyGiggles} times! "You're the sweetest!"`}
          </p>
        </motion.div>

        {/* 2. HUGGABLE TEDDY BEAR */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTeddy}
          className="glass relative flex flex-col items-center justify-between rounded-3xl p-6 shadow-md border border-rose-100 cursor-pointer text-center"
        >
          <span className="text-[10px] font-bold tracking-wider text-amber-500 uppercase">
            {teddyHugs === 0 ? "Give me a hug!" : `Hugs: ${teddyHugs} 🧸`}
          </span>

          {/* Cute Teddy SVG */}
          <div className="my-4 size-32">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              {/* Ears */}
              <circle cx="38" cy="40" r="11" fill="#d7ccc8" stroke="#bcaaa4" strokeWidth="1.5" />
              <circle cx="38" cy="40" r="6" fill="#f8bbd0" />
              <circle cx="82" cy="40" r="11" fill="#d7ccc8" stroke="#bcaaa4" strokeWidth="1.5" />
              <circle cx="82" cy="40" r="6" fill="#f8bbd0" />

              {/* Body */}
              <ellipse cx="60" cy="85" rx="28" ry="24" fill="#d7ccc8" stroke="#bcaaa4" strokeWidth="1.5" />
              <ellipse cx="60" cy="87" rx="17" ry="14" fill="#efebe9" />

              {/* Big Red Heart Teddy holds */}
              <motion.path
                d="M60 84 c-6-5 -12-1 -12 5 c0 6 12 11 12 11 s12-5 12-11 c0-6 -6-10 -12-5 z"
                fill="#e91e63"
                animate={teddyHugs > 0 ? { scale: [1, 1.25, 1] } : {}}
                transition={{ duration: 0.3 }}
              />

              {/* Head */}
              <circle cx="60" cy="58" r="23" fill="#d7ccc8" stroke="#bcaaa4" strokeWidth="1.5" />
              {/* Snout */}
              <ellipse cx="60" cy="65" rx="10" ry="7" fill="#efebe9" />
              <ellipse cx="60" cy="62" rx="4" ry="2.5" fill="#5d4037" />
              <path d="M60 65 v3 M58 68 Q60 70 62 68" stroke="#5d4037" strokeWidth="1.5" strokeLinecap="round" />

              {/* Eyes */}
              <circle cx="51" cy="54" r="3" fill="#3e2723" />
              <circle cx="52" cy="53" r="1" fill="#ffffff" />
              <circle cx="69" cy="54" r="3" fill="#3e2723" />
              <circle cx="70" cy="53" r="1" fill="#ffffff" />

              {/* Blush */}
              <circle cx="44" cy="62" r="3.5" fill="#f48fb1" opacity="0.6" />
              <circle cx="76" cy="62" r="3.5" fill="#f48fb1" opacity="0.6" />
            </svg>
          </div>

          <h3 className="font-script text-2xl text-ink">Snuggle Bear</h3>
          <p className="mt-1 font-hand text-sm text-ink/70">
            {teddyHugs === 0
              ? "Tap to hug! He loves warm cuddles."
              : `Gave you ${teddyHugs} big hugs! "Main hoon na!"`}
          </p>
        </motion.div>

        {/* 3. SECRET BIRTHDAY PRESENT */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGift}
          className="glass relative flex flex-col items-center justify-between rounded-3xl p-6 shadow-md border border-rose-100 cursor-pointer text-center"
        >
          <span className="text-[10px] font-bold tracking-wider text-purple-500 uppercase">
            {giftOpened ? "Opened with love! ✨" : "Tap to unwrap! 🎁"}
          </span>

          {/* Gift Box SVG */}
          <div className="my-4 size-32 flex items-center justify-center">
            {giftOpened ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center justify-center text-rose-500"
              >
                <div className="rounded-2xl bg-rose-100 p-3 shadow-inner">
                  <Sparkles className="size-10 animate-spin" />
                </div>
                <span className="font-hand text-base font-bold text-rose-600 mt-2">
                  "You're my forever"
                </span>
              </motion.div>
            ) : (
              <svg viewBox="0 0 120 120" className="w-full h-full">
                {/* Gift Box Base */}
                <rect x="25" y="48" width="70" height="52" rx="8" fill="#ff80ab" stroke="#f50057" strokeWidth="1.5" />
                {/* Ribbon Vertical */}
                <rect x="53" y="48" width="14" height="52" fill="#ffd54f" />
                {/* Lid */}
                <rect x="20" y="38" width="80" height="15" rx="5" fill="#ff4081" stroke="#c51162" strokeWidth="1.5" />
                <rect x="53" y="38" width="14" height="15" fill="#ffd54f" />
                {/* Ribbon Bow on top */}
                <path d="M53 38 C40 22 28 35 53 38 Z" fill="#ffd54f" stroke="#ffb300" strokeWidth="1.2" />
                <path d="M67 38 C80 22 92 35 67 38 Z" fill="#ffd54f" stroke="#ffb300" strokeWidth="1.2" />
                <circle cx="60" cy="38" r="4" fill="#ffb300" />
                {/* Sparkle sparkles */}
                <text x="82" y="30" fontSize="16" fill="#ffd54f" className="animate-pulse">
                  ✨
                </text>
              </svg>
            )}
          </div>

          <h3 className="font-script text-2xl text-ink">Mystery Gift</h3>
          <p className="mt-1 font-hand text-sm text-ink/70">
            {giftOpened
              ? surpriseMessages[giftOpened ? 0 : 1]
              : "A surprise wrapped just for the birthday girl."}
          </p>
        </motion.div>
      </div>

      {/* STAR-GAZING CONSTELLATION WISHES */}
      <div className="glass mt-10 rounded-3xl p-6 sm:p-8 text-center border border-rose-100/80">
        <div className="flex items-center justify-center gap-2 text-rose-500">
          <Star className="size-5 fill-amber-400 text-amber-400 animate-pulse" />
          <h3 className="font-script text-3xl text-ink">Twinkle Star Wishes</h3>
          <Star className="size-5 fill-amber-400 text-amber-400 animate-pulse" />
        </div>
        <p className="mt-1 text-xs text-ink/70">
          Tap each glowing star to unlock a sweet birthday whisper.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {[
            "🌟 Joy that lasts all year",
            "✨ Gentle peace in your heart",
            "💫 Sunsets with warm chai",
            "🌙 Laughing until midnight",
            "💖 All your biggest dreams",
          ].map((wish, idx) => {
            const isUnlocked = stargazeWishes.includes(idx);
            return (
              <button
                key={wish}
                type="button"
                onClick={() => handleStar(idx)}
                className={`rounded-full px-4 py-2.5 text-xs font-semibold transition-all ${
                  isUnlocked
                    ? "bg-gradient-to-r from-amber-400 to-rose-400 text-white shadow-md scale-105"
                    : "bg-white/80 text-ink/75 hover:bg-white hover:scale-102 border border-rose-100"
                }`}
              >
                {isUnlocked ? `${wish} ✨` : `Star #${idx + 1} ⭐ Tap to reveal`}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
