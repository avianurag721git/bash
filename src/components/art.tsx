import type { KeyboardEvent } from "react";

type CakeProps = { lit: boolean };

export function CakeArt({ lit }: CakeProps) {
  const candles = [78, 112, 146, 180, 214];
  return (
    <svg viewBox="0 0 300 250" className="h-auto w-full" role="img" aria-label="Birthday cake">
      <ellipse cx="150" cy="214" rx="108" ry="16" fill="#f3c3d2" opacity="0.7" />
      <rect x="48" y="150" width="204" height="58" rx="18" fill="#ff8fab" />
      <path d="M48 168c12 10 18 10 28 0s16-10 28 0 18 10 28 0 16-10 28 0 18 10 28 0 16-10 28 0 18 10 36 0v40H48z" fill="#ffd0df" />
      <rect x="70" y="112" width="160" height="48" rx="16" fill="#ffc2a8" />
      <path d="M70 128c10 8 16 8 24 0s14-8 24 0 16 8 24 0 14-8 24 0 16 8 24 0 14-8 24 0 12 8 16 0v32H70z" fill="#ffe4d6" />
      <rect x="96" y="78" width="108" height="42" rx="14" fill="#e4d4ff" />
      <path d="M96 92c8 7 14 7 22 0s12-7 22 0 14 7 22 0 12-7 22 0 10 7 20 0v28H96z" fill="#f4ecff" />
      <circle cx="126" cy="168" r="6" fill="#fff" />
      <circle cx="168" cy="176" r="5" fill="#fff6" />
      <circle cx="196" cy="160" r="4" fill="#fff" />
      {candles.map((x) => (
        <g key={x} transform={`translate(${x} 52)`}>
          <rect x="-3" y="18" width="6" height="28" rx="2" fill="#fffaf5" />
          <rect x="-3" y="26" width="6" height="4" fill="#e85a7a" />
          {lit ? (
            <g className="flicker">
              <ellipse cx="0" cy="10" rx="5" ry="8" fill="#ffb703" />
              <ellipse cx="0" cy="12" rx="2.4" ry="4" fill="#fff4c8" />
            </g>
          ) : (
            <g opacity="0.7">
              <circle cx="-2" cy="6" r="3" fill="#d9d0d4" />
              <circle cx="3" cy="0" r="2.4" fill="#e7e0e4" />
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}

export function LoveScene({ onBunny }: { onBunny: () => void }) {
  function onKey(event: KeyboardEvent<SVGGElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onBunny();
    }
  }

  return (
    <svg viewBox="0 0 360 210" className="h-auto w-full" role="img" aria-label="A couple, a teddy, and a bunny">
      <ellipse cx="180" cy="186" rx="148" ry="13" fill="#f7c6d6" />
      <g className="floaty" style={{ transformOrigin: "180px 30px" }}>
        <path d="M176 34c-6-7-16-2-16 6 0 7 16 14 16 14s16-7 16-14c0-8-10-13-16-6z" fill="#ff8fab" />
      </g>

      <g role="button" tabIndex={0} aria-label="a ticklish bunny" className="cursor-pointer" onClick={onBunny} onKeyDown={onKey}>
        <ellipse cx="58" cy="92" rx="9" ry="24" fill="#fff" />
        <ellipse cx="86" cy="92" rx="9" ry="24" fill="#fff" />
        <ellipse cx="58" cy="94" rx="4.2" ry="15" fill="#ffb7c8" />
        <ellipse cx="86" cy="94" rx="4.2" ry="15" fill="#ffb7c8" />
        <ellipse cx="72" cy="158" rx="26" ry="22" fill="#fff" />
        <circle cx="72" cy="118" r="24" fill="#fff" />
        <circle cx="63" cy="116" r="2.5" fill="#5c2942" />
        <circle cx="81" cy="116" r="2.5" fill="#5c2942" />
        <path d="M66 126q6 6 12 0" fill="none" stroke="#e56b86" strokeWidth="1.8" strokeLinecap="round" />
        <ellipse cx="54" cy="124" rx="4" ry="2.3" fill="#ff9bb3" />
        <ellipse cx="90" cy="124" rx="4" ry="2.3" fill="#ff9bb3" />
        <path d="M72 152c-7-5-14-1-14 6 0 7 14 13 14 13s14-6 14-13c0-7-7-11-14-6z" fill="#e85a7a" />
      </g>

      <g>
        <path d="M124 176 156 118 188 176z" fill="#f48fb1" />
        <ellipse cx="156" cy="122" rx="16" ry="10" fill="#ffd6e4" />
        <circle cx="156" cy="86" r="22" fill="#4a2c38" />
        <circle cx="156" cy="92" r="18" fill="#ffd8c2" />
        <path d="M136 90c3-18 36-18 40 2-8-8-32-8-40-2z" fill="#4a2c38" />
        <path d="M156 68l8-10-2 11zM156 68l-8-10 2 11z" fill="#e85a7a" />
        <circle cx="156" cy="68" r="3.2" fill="#ffb3c7" />
        <path d="M147 92q4 4 7 0" fill="none" stroke="#5c2942" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M158 92q4 4 7 0" fill="none" stroke="#5c2942" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M150 102q6 5 12 0" fill="none" stroke="#e56b86" strokeWidth="1.7" strokeLinecap="round" />
        <ellipse cx="142" cy="100" rx="4" ry="2.2" fill="#ff9bb3" />
        <ellipse cx="170" cy="100" rx="4" ry="2.2" fill="#ff9bb3" />
      </g>

      <g>
        <path d="M188 176 220 120 252 176z" fill="#c9b6ff" />
        <ellipse cx="220" cy="124" rx="16" ry="10" fill="#efe7ff" />
        <circle cx="220" cy="86" r="22" fill="#3a2a33" />
        <circle cx="220" cy="92" r="18" fill="#ffd8c2" />
        <path d="M200 88c4-16 34-18 40 2-8-7-32-7-40-2z" fill="#3a2a33" />
        <path d="M211 92q4 4 7 0" fill="none" stroke="#5c2942" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M222 92q4 4 7 0" fill="none" stroke="#5c2942" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M214 102q6 5 12 0" fill="none" stroke="#e56b86" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M186 140c16 4 24-6 30 0" fill="none" stroke="#ffd8c2" strokeWidth="7" strokeLinecap="round" />
      </g>

      <g>
        <ellipse cx="300" cy="150" rx="28" ry="26" fill="#e8b48a" />
        <circle cx="300" cy="108" r="22" fill="#e8b48a" />
        <circle cx="284" cy="92" r="9" fill="#e8b48a" />
        <circle cx="316" cy="92" r="9" fill="#e8b48a" />
        <circle cx="284" cy="92" r="4.5" fill="#f6d7bc" />
        <circle cx="316" cy="92" r="4.5" fill="#f6d7bc" />
        <ellipse cx="300" cy="116" rx="12" ry="9" fill="#f6d7bc" />
        <circle cx="293" cy="104" r="2.4" fill="#5c2942" />
        <circle cx="307" cy="104" r="2.4" fill="#5c2942" />
        <path d="M294 120q6 5 12 0" fill="none" stroke="#c47b62" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M300 146c-7-5-14-1-14 6 0 7 14 12 14 12s14-5 14-12c0-7-7-11-14-6z" fill="#e85a7a" />
        <ellipse cx="276" cy="150" rx="5" ry="3" fill="#f0a0b4" opacity="0.75" />
        <ellipse cx="324" cy="150" rx="5" ry="3" fill="#f0a0b4" opacity="0.75" />
      </g>
    </svg>
  );
}

export function YearArt({ index }: { index: number }) {
  const arts = [
    <g key="moon">
      <circle cx="80" cy="70" r="28" fill="#fff4c8" />
      <circle cx="92" cy="62" r="22" fill="#ffe8f1" />
      <circle cx="40" cy="40" r="3" fill="#fff" />
      <circle cx="120" cy="36" r="2" fill="#fff" />
      <circle cx="110" cy="100" r="2.5" fill="#fff" />
    </g>,
    <g key="cups">
      <rect x="38" y="58" width="34" height="28" rx="6" fill="#fff" />
      <path d="M72 64h8a10 10 0 0 1 0 20h-8" fill="none" stroke="#fff" strokeWidth="4" />
      <rect x="86" y="70" width="28" height="22" rx="6" fill="#ffd6e4" />
      <path d="M48 58c2-10 10-10 12 0" fill="none" stroke="#fff" strokeWidth="2" />
    </g>,
    <g key="umbrella">
      <path d="M30 78c0-28 100-28 100 0z" fill="#ff8fab" />
      <path d="M30 78c16-8 18-8 34 0 16-8 18-8 34 0 16-8 18-8 32 0" fill="#ffc2a8" />
      <path d="M80 78v28" stroke="#5c2942" strokeWidth="3" strokeLinecap="round" />
      <path d="M80 106c10 0 12 8 4 8" fill="none" stroke="#5c2942" strokeWidth="3" strokeLinecap="round" />
    </g>,
    <g key="stars">
      <path d="M80 36l4 12h12l-10 7 4 12-10-7-10 7 4-12-10-7h12z" fill="#ffd36a" />
      <path d="M40 78l3 8h8l-6 5 2 8-7-5-7 5 2-8-6-5h8z" fill="#fff" />
      <path d="M112 84l3 8h8l-6 5 2 8-7-5-7 5 2-8-6-5h8z" fill="#e4d4ff" />
    </g>,
    <g key="camera">
      <rect x="36" y="52" width="88" height="60" rx="12" fill="#5c2942" />
      <circle cx="80" cy="82" r="16" fill="#ffd6e4" />
      <circle cx="80" cy="82" r="8" fill="#5c2942" />
      <rect x="58" y="42" width="22" height="12" rx="3" fill="#e85a7a" />
    </g>,
    <g key="flowers">
      <path d="M70 120c8-24 8-24 0-40" fill="none" stroke="#7d9a62" strokeWidth="3" />
      <circle cx="70" cy="72" r="8" fill="#ff8fab" />
      <circle cx="58" cy="84" r="8" fill="#ffc2a8" />
      <circle cx="82" cy="84" r="8" fill="#e4d4ff" />
      <circle cx="70" cy="90" r="6" fill="#ffd36a" />
      <path d="M96 120c6-18 10-20 4-36" fill="none" stroke="#7d9a62" strokeWidth="3" />
      <circle cx="100" cy="78" r="7" fill="#fff" />
    </g>,
  ];
  return (
    <svg viewBox="0 0 160 140" className="h-full w-full" aria-hidden>
      <rect width="160" height="140" fill="#ffe8f1" />
      {arts[index % arts.length]}
    </svg>
  );
}
