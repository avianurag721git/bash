import { useState, useEffect } from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import { playPopSound } from "@/lib/sound-effects";

const STORY_CHAPTERS = [
  { id: "hero", label: "Welcome", icon: "✨" },
  { id: "birthday-card-section", label: "Birthday Card", icon: "💌" },
  { id: "cake-experience-section", label: "Cake & Candles", icon: "🎂" },
  { id: "letter", label: "Love Letter", icon: "📜" },
  { id: "memories", label: "Photo Memories", icon: "📸" },
  { id: "timeline", label: "Our Timeline", icon: "⏳" },
  { id: "surprises", label: "Cute Surprises", icon: "🐰" },
  { id: "reasons", label: "Why I Love You", icon: "💖" },
  { id: "valentine", label: "Grand Finale", icon: "💍" },
];

export function StoryNav() {
  const [activeChapter, setActiveChapter] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = STORY_CHAPTERS.length - 1; i >= 0; i--) {
        const chapter = STORY_CHAPTERS[i];
        const el = document.getElementById(chapter.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveChapter(chapter.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    playPopSound();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentIndex = STORY_CHAPTERS.findIndex((c) => c.id === activeChapter);
  const currentChapter = STORY_CHAPTERS[currentIndex] || STORY_CHAPTERS[0];

  return (
    <nav
      className="sticky top-3 z-30 mx-auto flex w-full max-w-fit items-center justify-center px-4"
      aria-label="Story Chapters Navigation"
    >
      <div className="glass flex items-center gap-1.5 rounded-full p-1.5 pr-3 shadow-lg border border-white/70 backdrop-blur-xl">
        {/* Chapter Indicator Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="flex items-center gap-2 rounded-full bg-rose-500/10 px-3.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-500/20 transition-colors"
        >
          <BookOpen className="size-3.5" />
          <span>
            {currentChapter.icon} {currentChapter.label}
          </span>
          <ChevronDown className={`size-3.5 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Step-by-step Dot Progress */}
        <div className="hidden md:flex items-center gap-1.5 px-2">
          {STORY_CHAPTERS.map((chap) => (
            <button
              key={chap.id}
              type="button"
              onClick={() => scrollToChapter(chap.id)}
              title={chap.label}
              className={`size-2.5 rounded-full transition-all ${
                activeChapter === chap.id
                  ? "w-6 bg-rose-500 shadow-xs"
                  : "bg-rose-200/80 hover:bg-rose-400"
              }`}
            />
          ))}
        </div>

        {/* Next Chapter Quick Button */}
        {currentIndex < STORY_CHAPTERS.length - 1 && (
          <button
            type="button"
            onClick={() => scrollToChapter(STORY_CHAPTERS[currentIndex + 1].id)}
            className="flex items-center gap-1 text-[11px] font-semibold text-rose-500 hover:text-rose-700 pl-1"
          >
            <span>Next</span>
            <span>→</span>
          </button>
        )}
      </div>

      {/* Dropdown Menu of Chapters */}
      {menuOpen && (
        <div className="glass absolute top-12 left-1/2 -translate-x-1/2 w-64 max-h-80 overflow-y-auto rounded-3xl p-2 shadow-2xl backdrop-blur-2xl border border-white/80 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="px-3 py-1.5 text-[10px] font-bold tracking-widest text-rose-500 uppercase">
            Story Chapters
          </div>
          <div className="space-y-0.5">
            {STORY_CHAPTERS.map((chap) => (
              <button
                key={chap.id}
                type="button"
                onClick={() => scrollToChapter(chap.id)}
                className={`flex w-full items-center gap-2.5 rounded-2xl px-3 py-2 text-left text-xs font-medium transition-colors ${
                  activeChapter === chap.id
                    ? "bg-rose-500 text-white font-semibold shadow-xs"
                    : "text-ink/80 hover:bg-white/70"
                }`}
              >
                <span className="text-sm">{chap.icon}</span>
                <span className="flex-1 truncate">{chap.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
