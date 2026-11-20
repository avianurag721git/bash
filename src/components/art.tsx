import { AestheticLoveScene } from "./aesthetic-love-scene";

type CakeProps = { lit: boolean };

export function CakeArt({ lit }: CakeProps) {
  const candles = [114, 132, 150, 168, 186];
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
  return <AestheticLoveScene onBunny={onBunny} />;
}

function YearScene({ index }: { index: number }) {
  const scene = index % 6;
  if (scene === 0) {
    return (
      <g>
        <rect width="320" height="180" fill="#3a2748" />
        <circle cx="250" cy="48" r="28" fill="#fff4c8" />
        <circle cx="262" cy="42" r="22" fill="#3a2748" />
        <circle cx="48" cy="36" r="2" fill="#fff" />
        <circle cx="90" cy="58" r="1.6" fill="#fff" />
        <circle cx="140" cy="28" r="2.2" fill="#fff" />
        <circle cx="190" cy="70" r="1.5" fill="#fff" />
        <ellipse cx="160" cy="168" rx="180" ry="46" fill="#5c3a58" />
        <circle cx="132" cy="118" r="14" fill="#ffd8c2" />
        <path d="M118 150 132 124 146 150z" fill="#f48fb1" />
        <circle cx="176" cy="116" r="14" fill="#ffd8c2" />
        <path d="M162 150 176 122 190 150z" fill="#c9b6ff" />
        <path d="M154 36c-6-7-16-2-16 6 0 7 16 13 16 13s16-6 16-13c0-8-10-13-16-6z" fill="#ff8fab" />
      </g>
    );
  }
  if (scene === 1) {
    return (
      <g>
        <rect width="320" height="180" fill="#fff1f4" />
        <rect x="96" y="28" width="128" height="124" rx="16" fill="#fff" />
        <rect x="96" y="28" width="128" height="32" rx="16" fill="#e85a7a" />
        <rect x="96" y="48" width="128" height="12" fill="#e85a7a" />
        <text x="160" y="112" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="42" fontWeight="700" fill="#5c2942">
          7
        </text>
        <path d="M214 46c-5-6-14-1-14 5 0 6 14 11 14 11s14-5 14-11c0-6-9-11-14-5z" fill="#ff8fab" />
        <circle cx="48" cy="48" r="3" fill="#ffd36a" />
        <circle cx="272" cy="64" r="2.5" fill="#ffd36a" />
        <circle cx="40" cy="120" r="2" fill="#ffb7c8" />
        <circle cx="286" cy="130" r="3" fill="#ffb7c8" />
      </g>
    );
  }
  if (scene === 2) {
    return (
      <g>
        <rect width="320" height="180" fill="#ffe8d6" />
        <rect x="0" y="118" width="320" height="62" fill="#f3c7b0" />
        <rect x="36" y="78" width="78" height="46" rx="10" fill="#fff" />
        <path d="M114 88h12a14 14 0 0 1 0 28h-12" fill="none" stroke="#fff" strokeWidth="8" />
        <path d="M62 78c4-16 14-16 16 0" fill="none" stroke="#e7b8a4" strokeWidth="3" />
        <rect x="188" y="86" width="70" height="40" rx="10" fill="#ffd0e0" />
        <path d="M258 94h10a12 12 0 0 1 0 24h-10" fill="none" stroke="#ffd0e0" strokeWidth="7" />
        <path d="M214 86c3-14 12-14 14 0" fill="none" stroke="#e7b8a4" strokeWidth="3" />
        <path d="M150 70c-5-6-14-1-14 5 0 6 14 11 14 11s14-5 14-11c0-6-9-11-14-5z" fill="#e85a7a" />
      </g>
    );
  }
  if (scene === 3) {
    return (
      <g>
        <rect width="320" height="180" fill="#d9e4ff" />
        <ellipse cx="160" cy="168" rx="170" ry="36" fill="#b9c7ee" />
        <path d="M70 92c0-36 180-36 180 0z" fill="#ff8fab" />
        <path d="M70 92c28-10 32-10 60 0 28-10 32-10 60 0 28-10 32-10 60 0" fill="#ffc2a8" />
        <path d="M160 92v48" stroke="#5c2942" strokeWidth="4" strokeLinecap="round" />
        <path d="M160 140c16 0 18 12 6 12" fill="none" stroke="#5c2942" strokeWidth="4" strokeLinecap="round" />
        <circle cx="132" cy="124" r="12" fill="#ffd8c2" />
        <path d="M120 156 132 130 144 156z" fill="#f48fb1" />
        <circle cx="188" cy="124" r="12" fill="#ffd8c2" />
        <path d="M176 156 188 130 200 156z" fill="#c9b6ff" />
        <circle cx="46" cy="40" r="3" fill="#fff" />
        <circle cx="80" cy="64" r="2.4" fill="#fff" />
        <circle cx="250" cy="36" r="2.6" fill="#fff" />
        <circle cx="274" cy="78" r="2" fill="#fff" />
      </g>
    );
  }
  if (scene === 4) {
    return (
      <g>
        <rect width="320" height="180" fill="#ffe3c4" />
        <circle cx="250" cy="40" r="26" fill="#ffd36a" />
        <path d="M40 150c40-20 60 10 100-8 36-16 70 8 140-16" fill="none" stroke="#f7b7c8" strokeWidth="16" strokeLinecap="round" />
        <ellipse cx="90" cy="138" rx="8" ry="4" fill="#e85a7a" />
        <ellipse cx="112" cy="128" rx="8" ry="4" fill="#e85a7a" />
        <ellipse cx="150" cy="142" rx="8" ry="4" fill="#b79adf" />
        <ellipse cx="174" cy="132" rx="8" ry="4" fill="#b79adf" />
        <path d="M214 78c-7-8-18-2-18 7 0 8 18 15 18 15s18-7 18-15c0-9-11-15-18-7z" fill="#e85a7a" />
      </g>
    );
  }
  if (scene === 5) {
    return (
      <g>
        <rect width="320" height="180" fill="#fff1ea" />
        <rect x="28" y="28" width="120" height="100" rx="16" fill="#ffe4f0" />
        <circle cx="88" cy="70" r="28" fill="#fff6c8" />
        <circle cx="100" cy="64" r="22" fill="#ffe4f0" />
        <rect x="190" y="96" width="70" height="54" rx="8" fill="#7d9a62" />
        <ellipse cx="225" cy="96" rx="48" ry="18" fill="#9db87a" />
        <rect x="218" y="78" width="14" height="22" rx="6" fill="#5c8a4a" />
        <circle cx="70" cy="150" r="10" fill="#ffb703" opacity="0.85" />
        <path d="M70 150c18 0 22 16 8 16" fill="none" stroke="#e7a23a" strokeWidth="4" strokeLinecap="round" />
      </g>
    );
  }
  return (
    <g>
      <rect width="320" height="180" fill="#ffe8f2" />
      <ellipse cx="160" cy="168" rx="180" ry="40" fill="#f7c6d6" />
      <path d="M118 150 160 78 202 150z" fill="#fff" />
      <rect x="136" y="110" width="48" height="40" fill="#ffd6e4" />
      <path d="M148 150v-16h16v16" fill="#e85a7a" />
      <circle cx="168" cy="100" r="4" fill="#ffd36a" />
      <rect x="46" y="118" width="10" height="36" fill="#7d9a62" />
      <circle cx="51" cy="108" r="16" fill="#9db87a" />
      <circle cx="248" cy="132" r="8" fill="#ff8fab" />
      <circle cx="266" cy="140" r="7" fill="#ffc2a8" />
      <circle cx="258" cy="148" r="6" fill="#ffd36a" />
      <path d="M250 48c-5-6-14-1-14 5 0 6 14 11 14 11s14-5 14-11c0-6-9-11-14-5z" fill="#e85a7a" />
    </g>
  );
}

export function YearArt({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <YearScene index={index} />
    </svg>
  );
}
