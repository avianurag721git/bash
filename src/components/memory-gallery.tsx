import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config";
import { useStudio } from "@/context/studio";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Heart,
  ZoomIn,
  Calendar,
} from "lucide-react";
import { playPopSound, playSparkleSound } from "@/lib/sound-effects";

type MemoryItem = {
  id: number;
  file: string;
  title: string;
  date: string;
  caption: string;
  category: "favorites" | "smiles" | "adventures" | "moments";
  rotation?: number;
};

// Rich curated memories referencing all 19 personal photos
const PHOTO_MEMORIES: MemoryItem[] = [
  {
    id: 1,
    file: "photo-1.jpeg",
    title: "Where Forever Began",
    date: "Winter 2020",
    caption: "The first season our paths crossed, turning cold winter days into warm memories.",
    category: "favorites",
    rotation: -2,
  },
  {
    id: 2,
    file: "photo-2.jpeg",
    title: "A Day I'll Never Forget",
    date: "7 March 2020",
    caption: "Not just a date on the calendar, but a memory that stays locked in my heart.",
    category: "favorites",
    rotation: 2,
  },
  {
    id: 3,
    file: "photo-3.jpeg",
    title: "Pure Happiness",
    date: "Summer 2021",
    caption: "That effortless laugh of yours that can brighten the darkest of rooms.",
    category: "smiles",
    rotation: -1,
  },
  {
    id: 4,
    file: "photo-4.jpeg",
    title: "Learning You",
    date: "Autumn 2021",
    caption: "Late night talks, your favorite songs, and every little detail I fell in love with.",
    category: "moments",
    rotation: 2.5,
  },
  {
    id: 5,
    file: "photo-5.jpeg",
    title: "Side By Side",
    date: "2022",
    caption: "Walking together through every season, growing in the exact same direction.",
    category: "adventures",
    rotation: -1.5,
  },
  {
    id: 6,
    file: "photo-6.jpeg",
    title: "Golden Hour Glow",
    date: "2022",
    caption: "Golden light, gentle smiles, and a quiet world that felt like ours alone.",
    category: "favorites",
    rotation: 1,
  },
  {
    id: 7,
    file: "photo-7.jpeg",
    title: "Choosing Us",
    date: "2023",
    caption: "Not just falling in love once, but choosing you each and every single day.",
    category: "favorites",
    rotation: -2,
  },
  {
    id: 8,
    file: "photo-8.jpeg",
    title: "Silly Faces & Laughs",
    date: "2023",
    caption: "Nobody makes me laugh quite like you do — pure, unfiltered joy.",
    category: "smiles",
    rotation: 2,
  },
  {
    id: 9,
    file: "photo-9.jpeg",
    title: "Gentle Moments",
    date: "2023",
    caption: "The quiet comfort of having your hand inside mine.",
    category: "moments",
    rotation: -1,
  },
  {
    id: 10,
    file: "photo-10.jpeg",
    title: "In Your Eyes",
    date: "Spring 2024",
    caption: "Still the person I search for first whenever I step into any crowd.",
    category: "favorites",
    rotation: 1.5,
  },
  {
    id: 11,
    file: "photo-11.jpeg",
    title: "Little Adventures",
    date: "Summer 2024",
    caption: "No matter where we go, anywhere feels magical as long as you're beside me.",
    category: "adventures",
    rotation: -2,
  },
  {
    id: 12,
    file: "photo-12.jpeg",
    title: "My Favorite Smile",
    date: "2024",
    caption: "The way you scrunch your nose when something is truly funny.",
    category: "smiles",
    rotation: 2,
  },
  {
    id: 13,
    file: "photo-13.jpeg",
    title: "Comfort & Peace",
    date: "Autumn 2024",
    caption: "How the loudest day sorts itself out when we finally talk.",
    category: "moments",
    rotation: -1.5,
  },
  {
    id: 14,
    file: "photo-14.jpeg",
    title: "Radiant & Beautiful",
    date: "2024",
    caption: "You look effortlessly stunning, today and every single day.",
    category: "favorites",
    rotation: 1.8,
  },
  {
    id: 15,
    file: "photo-15.jpeg",
    title: "Road Trips & Songs",
    date: "2025",
    caption: "Singing Bollywood songs out of tune and laughing until our cheeks hurt.",
    category: "adventures",
    rotation: -2,
  },
  {
    id: 16,
    file: "photo-16.jpeg",
    title: "Sweet Shenanigans",
    date: "2025",
    caption: "Our secret jokes that no one else in the room could ever understand.",
    category: "smiles",
    rotation: 1,
  },
  {
    id: 17,
    file: "photo-17.jpeg",
    title: "Softer Days",
    date: "2025",
    caption: "Loving you has been the softest, most natural thing I have ever known.",
    category: "moments",
    rotation: -1.5,
  },
  {
    id: 18,
    file: "photo-18.jpeg",
    title: "Like Home",
    date: "2025",
    caption: "If home is a person, I have known her name for six beautiful years.",
    category: "favorites",
    rotation: 2,
  },
  {
    id: 19,
    file: "photo-19.jpeg",
    title: "To A Lifetime More",
    date: "Birthday 2026",
    caption: "Happy Birthday, Jessi. Here is to 60 more years with you.",
    category: "favorites",
    rotation: -1,
  },
];

export function MemoryGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Record<number, boolean>>({});
  const [heartAnim, setHeartAnim] = useState<number | null>(null);
  const { playScreenSong, playing, index } = useStudio();

  const currentSong = siteConfig.songs[index];
  const isPlayingIshq = playing && currentSong?.title.includes("Ishq Hularay");

  const categories = [
    { id: "all", label: "All Memories" },
    { id: "favorites", label: "Our Favorites ⭐" },
    { id: "smiles", label: "Sweet Smiles 😊" },
    { id: "adventures", label: "Adventures 🚗" },
    { id: "moments", label: "Quiet Moments 💖" },
  ];

  const filteredMemories =
    activeCategory === "all"
      ? PHOTO_MEMORIES
      : PHOTO_MEMORIES.filter((m) => m.category === activeCategory);

  const openLightbox = (index: number) => {
    playPopSound();
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showNext = useCallback(() => {
    if (selectedIndex === null) return;
    playPopSound();
    setSelectedIndex((selectedIndex + 1) % filteredMemories.length);
  }, [selectedIndex, filteredMemories.length]);

  const showPrev = useCallback(() => {
    if (selectedIndex === null) return;
    playPopSound();
    setSelectedIndex((selectedIndex - 1 + filteredMemories.length) % filteredMemories.length);
  }, [selectedIndex, filteredMemories.length]);

  const toggleLike = (id: number) => {
    playSparkleSound();
    setLikedPhotos((prev) => ({ ...prev, [id]: !prev[id] }));
    setHeartAnim(id);
    setTimeout(() => setHeartAnim(null), 800);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, showNext, showPrev]);

  const selectedMemory = selectedIndex !== null ? filteredMemories[selectedIndex] : null;

  return (
    <section id="memories" className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
      {/* Section Header */}
      <div className="text-center">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-rose-500 uppercase">
          Moments captured in time
        </p>
        <h2 className="mt-2 font-script text-4xl text-ink sm:text-5xl">
          Our Memory Gallery
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink/75">
          Nineteen snapshots of laughter, silly moments, and the sweetest years together. Tap any photo to view in full screen.
        </p>

        {/* Dedicated Screen Soundtrack Badge */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => playScreenSong("memories")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all shadow-xs border cursor-pointer ${
              isPlayingIshq
                ? "bg-rose-500 text-white border-rose-600 shadow-md scale-105"
                : "bg-white/80 text-rose-700 border-rose-200/80 hover:bg-white hover:scale-102"
            }`}
            title="Play gallery soundtrack: Ishq Hularay by Zain Zohaib"
          >
            <span className="text-sm">🎵</span>
            <span>
              Gallery Track: <strong>Ishq Hularay</strong> <span className="opacity-75 font-normal">(Zain Zohaib)</span>
            </span>
            {isPlayingIshq ? (
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

      {/* Category Filter Pills */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => {
              playPopSound();
              setActiveCategory(cat.id);
            }}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${activeCategory === cat.id
                ? "bg-rose-500 text-white shadow-md scale-105"
                : "bg-white/80 text-ink/75 hover:bg-white hover:text-ink shadow-xs border border-rose-100"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Photo Cards Grid (Polaroid Style, preserving original aspect ratio) */}
      <motion.div layout className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {filteredMemories.map((item, index) => {
          const isLiked = likedPhotos[item.id];
          return (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.45, delay: (index % 6) * 0.08 }}
              className="group relative cursor-pointer"
              onClick={() => openLightbox(index)}
              style={{ rotate: `${item.rotation || 0}deg` }}
            >
              {/* Polaroid Frame */}
              <div className="relative overflow-hidden rounded-2xl bg-white p-2.5 pb-4 shadow-md transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:rotate-0 border border-rose-100/60">
                {/* Washi tape decoration */}
                <div
                  className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 h-5 w-16 bg-rose-200/70 backdrop-blur-xs opacity-85 shadow-xs"
                  style={{ transform: "translateX(-50%) rotate(-3deg)" }}
                />

                {/* Photo Container preserving original aspect ratio */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-rose-50/60 flex items-center justify-center">
                  <img
                    src={`${import.meta.env.BASE_URL}photos/${item.file}`}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover Overlay with Zoom Icon */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-between p-3 text-white">
                    <span className="text-xs font-medium truncate max-w-[80%]">{item.title}</span>
                    <ZoomIn className="size-4 shrink-0" />
                  </div>
                </div>

                {/* Polaroid Caption & Date */}
                <div className="mt-2.5 px-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-hand text-lg text-ink font-semibold truncate">
                      {item.title}
                    </h3>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(item.id);
                      }}
                      className="p-1 text-rose-400 hover:text-rose-600 transition-colors"
                      aria-label="Like photo"
                    >
                      <Heart
                        className={`size-4 transition-transform ${isLiked ? "fill-rose-500 text-rose-500 scale-125" : "text-rose-300"
                          }`}
                      />
                    </button>
                  </div>
                  <p className="text-[11px] text-ink/60 flex items-center gap-1 mt-0.5">
                    <Calendar className="size-3 text-rose-400" /> {item.date}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedMemory && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-[92vh] max-w-4xl w-full flex flex-col md:flex-row items-center justify-center overflow-hidden rounded-3xl bg-[#fffafc] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute top-3 right-3 z-20 size-10 rounded-full bg-white/80 p-2 text-ink shadow-md hover:bg-white transition-colors"
                aria-label="Close modal"
              >
                <X className="size-6" />
              </button>

              {/* Navigation: Previous */}
              <button
                type="button"
                onClick={showPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 size-11 rounded-full bg-white/80 p-2 text-ink shadow-lg hover:bg-white hover:scale-105 transition-all"
                aria-label="Previous photo"
              >
                <ChevronLeft className="size-7" />
              </button>

              {/* Navigation: Next */}
              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 size-11 rounded-full bg-white/80 p-2 text-ink shadow-lg hover:bg-white hover:scale-105 transition-all"
                aria-label="Next photo"
              >
                <ChevronRight className="size-7" />
              </button>

              {/* Photo Display (Original aspect ratio, never stretched) */}
              <div className="relative flex h-[55vh] md:h-[75vh] w-full md:w-3/5 items-center justify-center bg-black/5 p-4">
                <img
                  src={`${import.meta.env.BASE_URL}photos/${selectedMemory.file}`}
                  alt={selectedMemory.title}
                  className="max-h-full max-w-full rounded-2xl object-contain shadow-md"
                  onDoubleClick={() => toggleLike(selectedMemory.id)}
                />

                {/* Double-tap Floating Heart Animation */}
                {heartAnim === selectedMemory.id && (
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: [0.4, 1.4, 1.2], opacity: [0, 1, 0] }}
                    transition={{ duration: 0.7 }}
                    className="pointer-events-none absolute text-rose-500"
                  >
                    <Heart className="size-20 fill-rose-500 drop-shadow-lg" />
                  </motion.div>
                )}
              </div>

              {/* Details & Caption Panel */}
              <div className="flex h-full w-full md:w-2/5 flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-widest text-rose-500 uppercase">
                      Memory {selectedIndex + 1} of {filteredMemories.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleLike(selectedMemory.id)}
                      className="flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-100 transition-colors"
                    >
                      <Heart
                        className={`size-4 ${likedPhotos[selectedMemory.id]
                            ? "fill-rose-500 text-rose-500"
                            : "text-rose-400"
                          }`}
                      />
                      <span>{likedPhotos[selectedMemory.id] ? "Loved ♥" : "Love"}</span>
                    </button>
                  </div>

                  <h3 className="mt-3 font-script text-3xl text-ink">
                    {selectedMemory.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-600/80 font-medium">
                    <Calendar className="size-3.5" />
                    <span>{selectedMemory.date}</span>
                  </div>

                  <p className="mt-4 font-hand text-xl leading-relaxed text-ink/80 bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
                    "{selectedMemory.caption}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-rose-100 flex items-center justify-between text-xs text-ink/60">
                  <span>Double-tap photo to send love ♥</span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={showPrev}
                      className="rounded-full h-8 px-3"
                    >
                      Prev
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={showNext}
                      className="rounded-full h-8 px-3"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
