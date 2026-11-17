import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { siteConfig } from "@/config";

type StudioValue = {
  ready: boolean;
  playing: boolean;
  index: number;
  unlocked: boolean;
  notice: string | null;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  playIndex: (index: number) => void;
  unlockAndPlay: () => void;
  confettiId: number;
  popConfetti: () => void;
  fireworksId: number;
  launchFireworks: () => void;
};

const StudioContext = createContext<StudioValue | null>(null);

let apiPromise: Promise<void> | null = null;

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return apiPromise;
}

export function StudioProvider({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const indexRef = useRef(0);
  const unlockedRef = useRef(false);
  const pendingPlay = useRef(false);
  const skips = useRef(0);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [confettiId, setConfettiId] = useState(0);
  const [fireworksId, setFireworksId] = useState(0);
  const songs = siteConfig.songs;

  const go = useCallback(
    (nextIndex: number, autoplay: boolean) => {
      const wrapped = (nextIndex + songs.length) % songs.length;
      indexRef.current = wrapped;
      setIndex(wrapped);
      const player = playerRef.current;
      if (!player) return;
      const id = songs[wrapped].videoId;
      if (autoplay && unlockedRef.current) player.loadVideoById(id);
      else player.cueVideoById(id);
    },
    [songs],
  );

  useEffect(() => {
    if (!unlocked) return;
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    let player: YtPlayer | null = null;
    const mount = document.createElement("div");
    host.appendChild(mount);

    loadYouTubeApi()
      .then(() => {
        if (cancelled || !window.YT) return;
        player = new window.YT.Player(mount, {
          width: "240",
          height: "135",
          videoId: songs[0].videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            fs: 0,
            disablekb: 1,
          },
          events: {
            onReady: () => {
              if (cancelled || !player) return;
              playerRef.current = player;
              setReady(true);
              if (indexRef.current !== 0) {
                player.loadVideoById(songs[indexRef.current].videoId);
              }
              if (pendingPlay.current) {
                player.unMute();
                player.playVideo();
                pendingPlay.current = false;
              }
            },
            onStateChange: (event) => {
              const state = window.YT?.PlayerState;
              if (!state) return;
              if (event.data === state.PLAYING) {
                setPlaying(true);
                skips.current = 0;
                setNotice(null);
              } else if (event.data === state.PAUSED || event.data === state.CUED) {
                setPlaying(false);
              } else if (event.data === state.ENDED) {
                setPlaying(false);
                const next = (indexRef.current + 1) % songs.length;
                indexRef.current = next;
                setIndex(next);
                playerRef.current?.loadVideoById(songs[next].videoId);
              }
            },
            onError: (event) => {
              const code = event.data;
              skips.current += 1;
              if (code === 101 || code === 150 || code === 153 || skips.current >= songs.length) {
                setNotice("This song won't embed here. Try the next one, or swap its video id.");
                setPlaying(false);
                return;
              }
              setNotice("Skipped a song that wouldn't play here.");
              const next = (indexRef.current + 1) % songs.length;
              indexRef.current = next;
              setIndex(next);
              window.setTimeout(() => {
                playerRef.current?.loadVideoById(songs[next].videoId);
              }, 400);
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) setNotice("Music needs a connection to YouTube.");
      });

    return () => {
      cancelled = true;
      try {
        player?.destroy();
      } catch {
        /* The player may not exist yet. */
      }
      playerRef.current = null;
      host.replaceChildren();
    };
  }, [songs, unlocked]);

  const unlockAndPlay = useCallback(() => {
    unlockedRef.current = true;
    setUnlocked(true);
    const player = playerRef.current;
    if (player) {
      player.unMute();
      player.playVideo();
    } else {
      pendingPlay.current = true;
    }
  }, []);

  const toggle = useCallback(() => {
    if (!unlockedRef.current) {
      unlockAndPlay();
      return;
    }
    const player = playerRef.current;
    if (!player) return;
    if (playing) player.pauseVideo();
    else {
      player.unMute();
      player.playVideo();
    }
  }, [playing, unlockAndPlay]);

  const next = useCallback(() => {
    unlockedRef.current = true;
    setUnlocked(true);
    go(indexRef.current + 1, true);
  }, [go]);

  const prev = useCallback(() => {
    unlockedRef.current = true;
    setUnlocked(true);
    go(indexRef.current - 1, true);
  }, [go]);

  const playIndex = useCallback(
    (songIndex: number) => {
      unlockedRef.current = true;
      setUnlocked(true);
      go(songIndex, true);
    },
    [go],
  );

  const popConfetti = useCallback(() => setConfettiId((n) => n + 1), []);
  const launchFireworks = useCallback(() => setFireworksId((n) => n + 1), []);

  const value = useMemo<StudioValue>(
    () => ({
      ready,
      playing,
      index,
      unlocked,
      notice,
      toggle,
      next,
      prev,
      playIndex,
      unlockAndPlay,
      confettiId,
      popConfetti,
      fireworksId,
      launchFireworks,
    }),
    [
      ready,
      playing,
      index,
      unlocked,
      notice,
      toggle,
      next,
      prev,
      playIndex,
      unlockAndPlay,
      confettiId,
      popConfetti,
      fireworksId,
      launchFireworks,
    ],
  );

  return (
    <StudioContext.Provider value={value}>
      {children}
      <div
        ref={hostRef}
        aria-hidden
        className="pointer-events-none fixed top-0 -left-80 h-[135px] w-60 opacity-[0.03]"
      />
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const value = useContext(StudioContext);
  if (!value) throw new Error("useStudio must be used inside StudioProvider");
  return value;
}
