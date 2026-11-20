import { useState } from "react";
import {
  ListMusic,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { siteConfig } from "@/config";
import { useStudio } from "@/context/studio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MusicPlayer() {
  const {
    ready,
    playing,
    index,
    notice,
    unlocked,
    volume,
    muted,
    soundEffects,
    setVolume,
    toggleMute,
    toggleSoundEffects,
    toggle,
    next,
    prev,
    playIndex,
  } = useStudio();

  const [openPlaylist, setOpenPlaylist] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [showVolume, setShowVolume] = useState(false);

  const song = siteConfig.songs[index];
  if (!song) return null;

  return (
    <aside
      className="fixed inset-x-3 z-30 transition-all duration-300 sm:inset-x-auto sm:right-6 sm:w-[410px]"
      style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-label="Birthday Soundtrack Player"
    >
      {/* Playlist Drawer */}
      {openPlaylist && !minimized ? (
        <div className="glass mb-3 max-h-72 overflow-y-auto rounded-3xl p-3 shadow-xl backdrop-blur-xl">
          <div className="mb-2 flex items-center justify-between px-2 pt-1">
            <span className="text-xs font-semibold tracking-wider text-rose-500 uppercase">
              Birthday Playlist ({siteConfig.songs.length})
            </span>
            <button
              type="button"
              onClick={() => setOpenPlaylist(false)}
              className="text-xs text-ink/60 hover:text-ink"
            >
              Close
            </button>
          </div>
          <div className="space-y-1">
            {siteConfig.songs.map((item, songIndex) => (
              <button
                key={item.videoId}
                type="button"
                onClick={() => {
                  playIndex(songIndex);
                  setOpenPlaylist(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left transition-colors",
                  songIndex === index
                    ? "bg-rose-100/90 text-rose-900 font-medium shadow-xs"
                    : "hover:bg-white/60 text-ink/80",
                )}
              >
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold",
                    songIndex === index
                      ? "bg-rose-500 text-white"
                      : "bg-rose-100 text-rose-600",
                  )}
                >
                  {songIndex === index && playing ? (
                    <span className="flex items-end gap-0.5 h-3.5">
                      <span className="w-0.5 bg-white h-full animate-[pulse_0.6s_ease-in-out_infinite]" />
                      <span className="w-0.5 bg-white h-2/3 animate-[pulse_0.8s_ease-in-out_infinite]" />
                      <span className="w-0.5 bg-white h-4/5 animate-[pulse_0.5s_ease-in-out_infinite]" />
                    </span>
                  ) : (
                    songIndex + 1
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="block truncate text-sm font-semibold">{item.title}</span>
                    {"screen" in item && item.screen ? (
                      <span className="shrink-0 rounded-full bg-rose-50 px-2 py-0.5 text-[9px] font-bold text-rose-600 border border-rose-200">
                        {item.screen}
                      </span>
                    ) : null}
                  </span>
                  <span className="block truncate text-xs opacity-75">
                    {item.movie} · {item.artist}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* Main Player Bar */}
      <div className="glass flex items-center gap-2 rounded-full p-2 pr-3 shadow-lg backdrop-blur-xl border border-white/60">
        {/* Animated Vinyl / Equalizer Badge */}
        <button
          type="button"
          onClick={() => setMinimized((m) => !m)}
          title={minimized ? "Expand player" : "Minimize player"}
          className="relative group cursor-pointer"
        >
          <div
            className={cn(
              "vinyl relative grid size-12 shrink-0 place-items-center rounded-full shadow-inner",
              playing && "is-on",
            )}
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #ffd6e4 0 28%, #2b1c24 30% 34%, transparent 36%), repeating-radial-gradient(circle at 50% 50%, #241820 0 2px, #3a2a33 3px 4px)",
            }}
          >
            <span className="size-2.5 rounded-full bg-rose-300 ring-2 ring-rose-400" />
          </div>
          <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-white/90 text-ink/70 shadow-xs text-[10px]">
            {minimized ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </span>
        </button>

        {!minimized && (
          <>
            {/* Song Info & Equalizer */}
            <div className="min-w-0 flex-1 pl-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-semibold text-ink">{song.title}</p>
                {"screen" in song && song.screen ? (
                  <span className="hidden sm:inline-block shrink-0 rounded-full bg-rose-100/90 px-1.5 py-0.5 text-[9px] font-semibold text-rose-600">
                    {song.screen}
                  </span>
                ) : null}
                {playing && (
                  <span className="flex items-end gap-0.5 h-3 shrink-0" aria-hidden>
                    <span className="w-0.5 bg-rose-500 rounded-full h-full animate-[pulse_0.6s_infinite]" />
                    <span className="w-0.5 bg-rose-400 rounded-full h-1/2 animate-[pulse_0.4s_infinite]" />
                    <span className="w-0.5 bg-rose-600 rounded-full h-3/4 animate-[pulse_0.7s_infinite]" />
                  </span>
                )}
              </div>
              <p className="truncate text-xs text-ink/65">
                {!unlocked
                  ? `${song.movie} · Tap play`
                  : ready
                    ? `${song.movie} · ${song.artist}`
                    : "Connecting audio..."}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Previous track"
                onClick={prev}
                className="size-8 rounded-full text-ink hover:bg-white/60"
              >
                <SkipBack className="size-4" />
              </Button>

              <Button
                size="icon"
                aria-label={playing ? "Pause" : "Play"}
                onClick={toggle}
                className="size-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white shadow-md hover:scale-105 transition-transform"
              >
                {playing ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Next track"
                onClick={next}
                className="size-8 rounded-full text-ink hover:bg-white/60"
              >
                <SkipForward className="size-4" />
              </Button>

              {/* Volume / Mute popover trigger */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={muted ? "Unmute" : "Mute"}
                  onClick={() => setShowVolume((v) => !v)}
                  className="size-8 rounded-full text-ink hover:bg-white/60"
                >
                  {muted || volume === 0 ? (
                    <VolumeX className="size-4 text-rose-500" />
                  ) : (
                    <Volume2 className="size-4" />
                  )}
                </Button>

                {showVolume && (
                  <div className="glass absolute bottom-11 right-0 flex items-center gap-2 rounded-2xl px-3 py-2 shadow-lg backdrop-blur-md">
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="text-ink/80 hover:text-ink cursor-pointer"
                      title={muted ? "Unmute" : "Mute"}
                    >
                      {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={muted ? 0 : volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-20 accent-rose-500 h-1.5 cursor-pointer rounded-lg bg-rose-200"
                      aria-label="Soundtrack Volume"
                    />
                    <span className="text-[10px] tabular-nums font-semibold text-ink/70 w-5 text-right">
                      {muted ? 0 : volume}%
                    </span>
                  </div>
                )}
              </div>

              {/* Sound FX Toggle */}
              <Button
                variant="ghost"
                size="icon"
                aria-label={soundEffects ? "Sound effects active" : "Sound effects muted"}
                title={soundEffects ? "Sound effects enabled (Tap to mute FX)" : "Sound effects muted (Tap to enable FX)"}
                onClick={toggleSoundEffects}
                className={cn(
                  "size-8 rounded-full transition-colors",
                  soundEffects ? "text-amber-600 hover:bg-amber-100/50" : "text-ink/40 line-through",
                )}
              >
                <Sparkles className="size-3.5" />
              </Button>

              {/* Playlist button */}
              <Button
                variant="ghost"
                size="icon"
                aria-label={openPlaylist ? "Hide playlist" : "Show playlist"}
                aria-expanded={openPlaylist}
                onClick={() => setOpenPlaylist((v) => !v)}
                className="size-8 rounded-full text-ink hover:bg-white/60"
              >
                <ListMusic className="size-4" />
              </Button>
            </div>
          </>
        )}

        {minimized && (
          <div className="flex items-center gap-2 pr-2">
            <span className="truncate max-w-[150px] text-xs font-medium text-ink">{song.title}</span>
            <Button
              size="icon"
              aria-label={playing ? "Pause" : "Play"}
              onClick={toggle}
              className="size-8 rounded-full bg-rose-500 text-white"
            >
              {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5 ml-0.5" />}
            </Button>
          </div>
        )}
      </div>

      {notice ? (
        <p className="mt-1 px-4 text-center text-xs text-ink/75 bg-white/70 backdrop-blur-xs py-0.5 rounded-full mx-auto w-fit shadow-xs">
          {notice}
        </p>
      ) : null}
    </aside>
  );
}
