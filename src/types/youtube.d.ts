interface YtPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (id: string) => void;
  cueVideoById: (id: string) => void;
  unMute: () => void;
  mute: () => void;
  isMuted?: () => boolean;
  setVolume: (volume: number) => void;
  getVolume?: () => number;
  destroy: () => void;
}

interface YtPlayerEvent {
  data: number;
}

interface Window {
  YT?: {
    Player: new (
      element: HTMLElement,
      options: {
        width?: string;
        height?: string;
        videoId?: string;
        playerVars?: Record<string, number | string>;
        events?: {
          onReady?: () => void;
          onStateChange?: (event: YtPlayerEvent) => void;
          onError?: (event: YtPlayerEvent) => void;
        };
      },
    ) => YtPlayer;
    PlayerState: {
      ENDED: number;
      PLAYING: number;
      PAUSED: number;
      BUFFERING: number;
      CUED: number;
    };
  };
  onYouTubeIframeAPIReady?: () => void;
}
