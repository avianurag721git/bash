import { useState } from "react";
import { ListMusic, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { siteConfig } from "@/config";
import { useStudio } from "@/context/studio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MusicPlayer() {
  const { ready, playing, index, notice, unlocked, toggle, next, prev, playIndex } = useStudio();
  const [open, setOpen] = useState(false);
  const song = siteConfig.songs[index];
  if (!song) return null;

  return (
    <div
      className="fixed inset-x-3 z-30 sm:inset-x-auto sm:right-5 sm:w-[390px]"
      style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      {open ? (
        <div className="glass mb-2 max-h-64 overflow-auto rounded-3xl p-2">
          {siteConfig.songs.map((item, songIndex) => (
            <button
              key={item.videoId}
              type="button"
              onClick={() => {
                playIndex(songIndex);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left",
                songIndex === index ? "bg-white/80" : "hover:bg-white/50",
              )}
            >
              <span className="grid size-8 place-items-center rounded-full bg-rose-100 text-xs font-semibold text-rose-600">
                {songIndex + 1}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-ink">{item.title}</span>
                <span className="block truncate text-xs text-ink/60">
                  {item.movie} · {item.artist}
                </span>
              </span>
            </button>
          ))}
        </div>
      ) : null}

      <div className="glass flex items-center gap-3 rounded-full py-2 pr-2 pl-2">
        <div
          className={cn(
            "vinyl relative grid size-14 shrink-0 place-items-center rounded-full",
            playing && "is-on",
          )}
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #ffd6e4 0 28%, #2b1c24 30% 34%, transparent 36%), repeating-radial-gradient(circle at 50% 50%, #241820 0 2px, #3a2a33 3px 4px)",
          }}
          aria-hidden
        >
          <span className="size-3 rounded-full bg-rose-200" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">{song.title}</p>
          <p className="truncate text-xs text-ink/60">
            {!unlocked ? song.movie : ready ? `${song.movie} · YouTube` : "one moment..."}
          </p>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" aria-label="Previous song" onClick={prev} className="rounded-full">
            <SkipBack />
          </Button>
          <Button
            size="icon"
            aria-label={playing ? "Pause" : "Play"}
            onClick={toggle}
            className="size-10 rounded-full"
          >
            {playing ? <Pause /> : <Play />}
          </Button>
          <Button variant="ghost" size="icon" aria-label="Next song" onClick={next} className="rounded-full">
            <SkipForward />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Hide playlist" : "Show playlist"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="rounded-full"
          >
            <ListMusic />
          </Button>
        </div>
      </div>
      {notice ? <p className="mt-1 px-4 text-center text-xs text-ink/70">{notice}</p> : null}
    </div>
  );
}
