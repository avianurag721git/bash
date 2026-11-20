import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCelebrationSound, playPopSound, playSparkleSound } from "@/lib/sound-effects";
import { useStudio } from "@/context/studio";
import { Sparkles, Wine, PartyPopper } from "lucide-react";

type Bestie = {
  id: string;
  name: string;
  role: string;
  tagColor: string;
  badgeBg: string;
  avatarBg: string;
  avatarEmoji: string;
  wish: string;
  favoritePart: string;
};

const BESTIES: Bestie[] = [
  {
    id: "shalini",
    name: "Shalini",
    role: "The Sweetest Soul 💕",
    tagColor: "text-rose-600 bg-rose-100/90 border-rose-200",
    badgeBg: "from-rose-500 to-pink-500",
    avatarBg: "bg-rose-100",
    avatarEmoji: "🎀",
    wish: "Happy Birthday, dearest Jessi! May your day be as sweet, warm, and radiant as your beautiful heart! Save the biggest cake slice for me!",
    favoritePart: "Strawberry Frosting 🍓",
  },
  {
    id: "alka",
    name: "Alka",
    role: "The Sunshine Smile ☀️",
    tagColor: "text-amber-700 bg-amber-100/90 border-amber-200",
    badgeBg: "from-amber-400 to-orange-400",
    avatarBg: "bg-amber-100",
    avatarEmoji: "✨",
    wish: "Happiest Birthday, Jessi! So lucky to have you in our lives. Here's to more laughter, endless memories, and celebrating you today!",
    favoritePart: "Whipped Cream Layer 🍰",
  },
  {
    id: "anushka",
    name: "Anushka",
    role: "The Heart of the Squad 🌸",
    tagColor: "text-purple-700 bg-purple-100/90 border-purple-200",
    badgeBg: "from-purple-500 to-pink-500",
    avatarBg: "bg-purple-100",
    avatarEmoji: "💖",
    wish: "Happy Birthday my sweet Jessi! May all your biggest dreams and quiet wishes come true this year. Love you to the moon and back!",
    favoritePart: "Chocolate Drizzle 🍫",
  },
  {
    id: "sandhya",
    name: "Sandhya",
    role: "The Cheerleader 🎉",
    tagColor: "text-emerald-700 bg-emerald-100/90 border-emerald-200",
    badgeBg: "from-emerald-400 to-teal-500",
    avatarBg: "bg-emerald-100",
    avatarEmoji: "🌟",
    wish: "To our absolute favourite birthday girl! Wishing you a lifetime of joy, silly laughs, and delicious cake. Cheers to you, Jessi!",
    favoritePart: "Cherry on Top 🍒",
  },
];

export function CakeEatingSquad() {
  const { popConfetti, launchFireworks } = useStudio();
  const [eaten, setEaten] = useState<Record<string, boolean>>({
    shalini: false,
    alka: false,
    anushka: false,
    sandhya: false,
  });
  const [toastCheers, setToastCheers] = useState(0);

  const handleBite = (id: string) => {
    playPopSound();
    playSparkleSound();
    popConfetti();
    setEaten((prev) => ({ ...prev, [id]: true }));
  };

  const handleGroupToast = () => {
    playCelebrationSound();
    popConfetti();
    launchFireworks();
    setToastCheers((c) => c + 1);
    setEaten({
      shalini: true,
      alka: true,
      anushka: true,
      sandhya: true,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="my-5 w-full rounded-[32px] bg-gradient-to-b from-white/95 via-rose-50/60 to-pink-50/70 p-4 sm:p-6 shadow-xl border-2 border-rose-200/80"
    >
      {/* Header Banner */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-4 py-1 text-xs font-bold tracking-widest text-rose-600 uppercase">
          <PartyPopper className="size-3.5 text-rose-500" />
          <span>A Slice for the Besties</span>
          <PartyPopper className="size-3.5 text-rose-500" />
        </div>
        <h3 className="font-script text-3xl sm:text-4xl text-ink mt-1.5">
          Sharing the Cake with the Girls! 🍰
        </h3>
        <p className="mx-auto mt-1 max-w-md text-xs sm:text-sm text-ink/75">
          Four delicious slices served for <strong>Shalini</strong>, <strong>Alka</strong>, <strong>Anushka</strong> & <strong>Sandhya</strong>. Tap each plate to share a slice!
        </p>
      </div>

      {/* 4 Elegant Bestie Cards Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {BESTIES.map((bestie) => {
          const isEaten = eaten[bestie.id];

          return (
            <motion.div
              key={bestie.id}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => handleBite(bestie.id)}
              className="group relative flex flex-col justify-between rounded-2xl bg-white/95 p-4 shadow-sm border border-rose-100 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer"
            >
              {/* Top Row: Name, Tag & Avatar */}
              <div>
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-rose-100/60">
                  <div className="flex items-center gap-2">
                    {/* Cute Avatar Badge */}
                    <div
                      className={`flex size-10 items-center justify-center rounded-2xl text-lg shadow-xs ${bestie.avatarBg}`}
                    >
                      <span>{bestie.avatarEmoji}</span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-ink leading-tight">
                        {bestie.name}
                      </h4>
                      <p className="text-[10px] font-semibold text-rose-500">
                        {bestie.role}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-bold border ${bestie.tagColor}`}
                  >
                    Bestie 💕
                  </span>
                </div>

                {/* Heartfelt Birthday Note to Jessi */}
                <div className="my-3 rounded-xl bg-rose-50/50 p-2.5 text-left border border-rose-100/70">
                  <p className="text-xs leading-relaxed text-ink/85 italic">
                    "{bestie.wish}"
                  </p>
                </div>
              </div>

              {/* Bottom Row: Interactive Cake Plate */}
              <div className="pt-2 border-t border-rose-100/60">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-ink/60 font-medium">
                    Favourite: <strong className="text-ink/80">{bestie.favoritePart}</strong>
                  </span>

                  {/* Cake Slice Status Pill */}
                  <motion.div
                    animate={isEaten ? { scale: [0.9, 1.1, 1] } : {}}
                    className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors ${
                      isEaten
                        ? "bg-rose-500 text-white shadow-xs"
                        : "bg-rose-100 text-rose-700 hover:bg-rose-200"
                    }`}
                  >
                    <span>{isEaten ? "Enjoyed! 😋" : "Feed Slice 🍰"}</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Group Toast Action Button */}
      <div className="mt-5 flex flex-col items-center justify-center gap-2">
        <button
          type="button"
          onClick={handleGroupToast}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Wine className="size-4" />
          <span>Raise a Birthday Toast with the Besties! 🥂✨</span>
          <Sparkles className="size-4" />
        </button>

        {toastCheers > 0 && (
          <AnimatePresence>
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-semibold text-rose-600"
            >
              🎉 Cheers to Jessi, Shalini, Alka, Anushka & Sandhya! ({toastCheers} toasts) 💖
            </motion.p>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
