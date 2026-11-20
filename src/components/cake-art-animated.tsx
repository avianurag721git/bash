import { motion, useReducedMotion } from "framer-motion";

export type CakeStage =
  | "ready_to_blow"
  | "blowing"
  | "extinguished"
  | "waiting_for_knife"
  | "knife_entering"
  | "cutting"
  | "cake_split"
  | "cut_celebration";

type CakeArtProps = {
  stage: CakeStage;
  onTapCake?: () => void;
};

// 5 beautifully arranged candles centered across top tier (x: 100 to 220, center 160)
// Gracefully arched heights with cream frosting dollops at base
const CANDLES = [
  { x: 122, height: 25, color: "#ff7675" },
  { x: 141, height: 28, color: "#74b9ff" },
  { x: 160, height: 32, color: "#a29bfe" },
  { x: 179, height: 28, color: "#ffeaa7" },
  { x: 198, height: 25, color: "#fd79a8" },
];

export function CakeArtAnimated({ stage, onTapCake }: CakeArtProps) {
  const reduce = useReducedMotion();

  const isLit = stage === "ready_to_blow";
  const isBlowing = stage === "blowing";
  const isExtinguishedOrLater = stage !== "ready_to_blow" && stage !== "blowing";
  const showKnife =
    stage === "knife_entering" ||
    stage === "cutting" ||
    stage === "cake_split" ||
    stage === "cut_celebration";
  const isCut = stage === "cake_split" || stage === "cut_celebration";

  return (
    <div className="relative mx-auto w-full max-w-[360px] select-none">
      <svg
        viewBox="0 0 320 280"
        className="h-auto w-full overflow-visible drop-shadow-xl"
        role="img"
        aria-label="Interactive Birthday Cake"
        onClick={onTapCake}
      >
        <defs>
          {/* Flame Glow Filter */}
          <filter id="flame-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Candle Halo Radial Gradient */}
          <radialGradient id="candle-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffda79" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#ff9f43" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ff5252" stopOpacity="0" />
          </radialGradient>

          {/* Knife Blade Gradient */}
          <linearGradient id="knife-metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#e8eaed" />
            <stop offset="55%" stopColor="#d2d7df" />
            <stop offset="100%" stopColor="#f8f9fa" />
          </linearGradient>

          {/* Strawberry filling gradient */}
          <linearGradient id="sponge-layer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffeaa7" />
            <stop offset="50%" stopColor="#fff2cc" />
            <stop offset="100%" stopColor="#ffeaa7" />
          </linearGradient>
        </defs>

        {/* Cake Stand / Plate */}
        <g id="cake-stand">
          {/* Plate Shadow */}
          <ellipse cx="160" cy="242" rx="135" ry="16" fill="#f0b6c6" opacity="0.45" />
          {/* Porcelain Plate Rim */}
          <ellipse cx="160" cy="235" rx="138" ry="15" fill="#ffffff" stroke="#f8bbd0" strokeWidth="2" />
          <ellipse cx="160" cy="233" rx="126" ry="12" fill="#fff9fb" />
          {/* Scalloped decorative dots on plate rim */}
          {[...Array(14)].map((_, i) => (
            <circle
              key={i}
              cx={38 + i * 18.5}
              cy={234 + Math.sin((i / 13) * Math.PI) * 4}
              r="2.2"
              fill="#f48fb1"
              opacity="0.6"
            />
          ))}
        </g>

        {/* Ambient Candle Warm Light on Cake (dims when blown) */}
        <motion.ellipse
          cx="160"
          cy="75"
          rx="80"
          ry="45"
          fill="url(#candle-halo)"
          animate={{
            opacity: isLit ? (reduce ? 0.45 : [0.45, 0.65, 0.45]) : 0,
            scale: isLit ? (reduce ? 1 : [0.98, 1.04, 0.98]) : 0.8,
          }}
          transition={{ duration: 1.6, repeat: isLit ? Infinity : 0, ease: "easeInOut" }}
          pointerEvents="none"
        />

        {/* Main Cake Body & Nested Candles */}
        <g id="cake-layers">
          {/* Left / Base Cake Group (shifts gently when cut) */}
          <motion.g
            animate={
              isCut
                ? { x: -14, rotate: -2, originX: "60px", originY: "200px" }
                : { x: 0, rotate: 0 }
            }
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            {/* Bottom Tier (Strawberry Pink: x=52..268, width 216, center 160) */}
            <rect x="52" y="170" width="216" height="54" rx="14" fill="#ff8fab" />
            {/* Sponge Texture / Ribbon */}
            <rect x="52" y="196" width="216" height="7" fill="#f06292" opacity="0.65" />
            {/* Frosting Drips Bottom Tier */}
            <path
              d="M52 170 c15 12 25 12 36 0 c12 14 24 14 36 0 c12 14 24 14 36 0 c12 14 24 14 36 0 c12 14 24 14 36 0 c12 12 24 12 36 0 v20 H52 Z"
              fill="#ffc2d4"
            />

            {/* Middle Tier (Soft Vanilla Peach: x=76..244, width 168, center 160) */}
            <rect x="76" y="124" width="168" height="48" rx="13" fill="#ffcaa8" />
            <rect x="76" y="148" width="168" height="6" fill="#fca475" opacity="0.5" />
            {/* Middle Tier Frosting Drips */}
            <path
              d="M76 124 c14 10 20 10 28 0 c10 12 20 12 28 0 c10 12 20 12 28 0 c10 12 20 12 28 0 c10 12 20 12 28 0 c10 10 18 10 28 0 v16 H76 Z"
              fill="#ffe4d6"
            />

            {/* Top Tier (Lavender Cream: x=100..220, width 120, center 160) */}
            <rect x="100" y="82" width="120" height="44" rx="12" fill="#d9c3f7" />
            <rect x="100" y="104" width="120" height="5" fill="#bd9ce8" opacity="0.5" />
            {/* Top Tier Frosting Drips */}
            <path
              d="M100 82 c10 8 16 8 24 0 c10 10 18 10 24 0 c10 10 18 10 24 0 c10 10 18 10 24 0 c10 8 16 8 24 0 v16 H100 Z"
              fill="#f1e6ff"
            />

            {/* Decorative Cream Puffs on Top Rim */}
            {[106, 126, 146, 166, 186, 206].map((cx, i) => (
              <circle key={i} cx={cx} cy="82" r="4.5" fill="#ffffff" />
            ))}

            {/* Sprinkles on the Cake */}
            <circle cx="125" cy="188" r="2.6" fill="#ffffff" />
            <circle cx="165" cy="192" r="2.6" fill="#ffd54f" />
            <circle cx="195" cy="186" r="2.6" fill="#81c784" />
            <circle cx="230" cy="194" r="2.6" fill="#ffffff" />
            <circle cx="110" cy="142" r="2.4" fill="#ffffff" />
            <circle cx="150" cy="146" r="2.4" fill="#ba68c8" />
            <circle cx="190" cy="140" r="2.4" fill="#ffffff" />
            <circle cx="215" cy="144" r="2.4" fill="#ff8a80" />
            <circle cx="140" cy="98" r="2.2" fill="#ffffff" />
            <circle cx="178" cy="98" r="2.2" fill="#ffd54f" />

            {/* Fresh Strawberries on tiers */}
            <g transform="translate(62, 174) scale(0.7)">
              <path d="M10 0 C18 0 20 12 10 20 C0 12 2 0 10 0 Z" fill="#e53935" />
              <path d="M6 1 L10 5 L14 1" stroke="#43a047" strokeWidth="2" strokeLinecap="round" />
            </g>
            <g transform="translate(240, 174) scale(0.7)">
              <path d="M10 0 C18 0 20 12 10 20 C0 12 2 0 10 0 Z" fill="#e53935" />
              <path d="M6 1 L10 5 L14 1" stroke="#43a047" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* 5 Beautifully Centered Candles Nested Firmly in Top Tier */}
            <g id="candles-nested-group">
              {CANDLES.map((c, idx) => {
                const yBase = 83; // seated right into cream at top of tier (y=82)
                const yTop = yBase - c.height;

                return (
                  <g key={c.x}>
                    {/* Fluffy whipped cream dollop nestling candle base */}
                    <ellipse cx={c.x} cy={yBase} rx="5" ry="2.6" fill="#ffffff" stroke="#f8bbd0" strokeWidth="0.8" />

                    {/* Candle Stick */}
                    <rect
                      x={c.x - 3.5}
                      y={yTop}
                      width="7"
                      height={c.height}
                      rx="2.5"
                      fill="#ffffff"
                      stroke="#f8bbd0"
                      strokeWidth="0.8"
                    />

                    {/* Striped Diagonal Spirals */}
                    <g clipPath={`url(#candle-clip-${idx})`}>
                      <clipPath id={`candle-clip-${idx}`}>
                        <rect x={c.x - 3.5} y={yTop} width="7" height={c.height} rx="2.5" />
                      </clipPath>
                      <path
                        d={`M${c.x - 4} ${yTop + 5} L${c.x + 4} ${yTop + 9} M${c.x - 4} ${yTop + 12} L${c.x + 4} ${yTop + 16} M${c.x - 4} ${yTop + 19} L${c.x + 4} ${yTop + 23}`}
                        stroke={c.color}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </g>

                    {/* Wick */}
                    <line
                      x1={c.x}
                      y1={yTop}
                      x2={c.x}
                      y2={yTop - 5}
                      stroke="#2d3436"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />

                    {/* Animated Candle Flame */}
                    {isLit && (
                      <motion.g
                        filter="url(#flame-glow)"
                        animate={
                          reduce
                            ? {}
                            : {
                                scaleY: [1, 1.15, 0.94, 1.1, 1],
                                scaleX: [1, 0.9, 1.05, 0.92, 1],
                                skewX: [0, -3, 3, -1, 0],
                                y: [0, -1, 0.5, -0.5, 0],
                              }
                        }
                        transition={{
                          duration: 0.6 + (idx % 3) * 0.15,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        style={{ transformOrigin: `${c.x}px ${yTop - 5}px` }}
                      >
                        {/* Outer Yellow/Orange Flame */}
                        <path
                          d={`M${c.x} ${yTop - 20} C${c.x - 4.5} ${yTop - 13} ${c.x - 4} ${yTop - 5} ${c.x} ${yTop - 4} C${c.x + 4} ${yTop - 5} ${c.x + 4.5} ${yTop - 13} ${c.x} ${yTop - 20} Z`}
                          fill="#ffb703"
                        />
                        {/* Inner Warm White Core */}
                        <path
                          d={`M${c.x} ${yTop - 14} C${c.x - 2.5} ${yTop - 9} ${c.x - 2} ${yTop - 5} ${c.x} ${yTop - 4.2} C${c.x + 2} ${yTop - 5} ${c.x + 2.5} ${yTop - 9} ${c.x} ${yTop - 14} Z`}
                          fill="#fff8e1"
                        />
                      </motion.g>
                    )}

                    {/* Blowing Down Animation */}
                    {isBlowing && (
                      <motion.g
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{
                          scaleY: [1, 1.4, 0.4, 0],
                          scaleX: [1, 0.6, 0.3, 0],
                          x: [0, 5, 10, 14],
                          opacity: [1, 0.8, 0.4, 0],
                        }}
                        transition={{ duration: 0.75, ease: "easeOut" }}
                        style={{ transformOrigin: `${c.x}px ${yTop - 5}px` }}
                      >
                        <path
                          d={`M${c.x} ${yTop - 18} C${c.x - 4} ${yTop - 11} ${c.x - 3.5} ${yTop - 5} ${c.x} ${yTop - 4} C${c.x + 3.5} ${yTop - 5} ${c.x + 4} ${yTop - 11} ${c.x} ${yTop - 18} Z`}
                          fill="#ff9800"
                        />
                        <path
                          d={`M${c.x} ${yTop - 13} C${c.x - 2} ${yTop - 8} ${c.x - 1.5} ${yTop - 5} ${c.x} ${yTop - 4.2} C${c.x + 1.5} ${yTop - 5} ${c.x + 2} ${yTop - 8} ${c.x} ${yTop - 13} Z`}
                          fill="#fff9c4"
                        />
                      </motion.g>
                    )}

                    {/* Extinguished Smoke Wisps */}
                    {isExtinguishedOrLater && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.85, 0.4, 0] }}
                        transition={{ duration: 2.2, delay: idx * 0.12 }}
                      >
                        {/* Glowing Ember dot */}
                        <motion.circle
                          cx={c.x}
                          cy={yTop - 5}
                          r="1.4"
                          fill="#ff5722"
                          animate={{ opacity: [1, 0.7, 0] }}
                          transition={{ duration: 1.5 }}
                        />
                        {/* Smoke path */}
                        <motion.path
                          d={`M${c.x} ${yTop - 5} Q${c.x - 4} ${yTop - 13} ${c.x + 2} ${yTop - 21} T${c.x - 2} ${yTop - 33} T${c.x + 4} ${yTop - 45}`}
                          fill="none"
                          stroke="#b0bec5"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, y: 0 }}
                          animate={{ pathLength: 1, y: -18, opacity: [0.8, 0.4, 0] }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        />
                      </motion.g>
                    )}
                  </g>
                );
              })}
            </g>
          </motion.g>

          {/* When Cake is Cut: The Side Slice separates and slides out onto the side plate */}
          {isCut && (
            <motion.g
              initial={{ opacity: 0, scale: 0.85, x: 0, y: 0 }}
              animate={{ opacity: 1, scale: 1, x: 32, y: 14 }}
              transition={{ type: "spring", stiffness: 110, damping: 13, delay: 0.15 }}
            >
              {/* Separate Plate on the Right Side */}
              <ellipse cx="238" cy="226" rx="42" ry="11" fill="#ffffff" stroke="#f48fb1" strokeWidth="1.8" />
              <ellipse cx="238" cy="225" rx="36" ry="8" fill="#fff5f8" />

              {/* Side Wedge Piece showing inner sponge layers & strawberry jam */}
              <path
                d="M214 176 L258 194 L248 222 L206 208 Z"
                fill="url(#sponge-layer)"
                stroke="#ff8fab"
                strokeWidth="1.5"
              />
              {/* Inner Cream Layer */}
              <path d="M212 188 L254 205" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <path d="M210 198 L250 215" stroke="#f06292" strokeWidth="2.5" strokeLinecap="round" />
              {/* Frosting on Slice Top */}
              <path
                d="M214 176 Q236 170 258 194"
                fill="none"
                stroke="#ffc2d4"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Strawberry on slice top */}
              <g transform="translate(228, 166) scale(0.65)">
                <path d="M10 0 C18 0 20 12 10 20 C0 12 2 0 10 0 Z" fill="#e53935" />
                <path d="M6 1 L10 5 L14 1" stroke="#43a047" strokeWidth="2" strokeLinecap="round" />
              </g>
              {/* Sparkle on slice */}
              <text x="256" y="178" fontSize="14" fill="#ffb703" className="animate-bounce">
                ✨
              </text>
            </motion.g>
          )}

          {/* Cut Line on the Side during cutting */}
          {stage === "cutting" && (
            <motion.path
              d="M216 88 L228 224"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
          )}
        </g>

        {/* Cute Cartoon Cake Knife with "HBD JESSI ♥" (Enters from Side in Stage 3) */}
        {showKnife && (
          <motion.g
            initial={{ x: 310, y: -45, rotate: 42, opacity: 0 }}
            animate={
              stage === "knife_entering"
                ? {
                    x: [310, 240],
                    y: [-40, 32],
                    rotate: [42, 18],
                    opacity: 1,
                  }
                : stage === "cutting"
                  ? {
                      x: [240, 222, 222],
                      y: [32, 95, 202],
                      rotate: [18, 14, 12],
                      opacity: 1,
                    }
                  : isCut
                    ? {
                        x: 272,
                        y: 130,
                        rotate: 35,
                        opacity: 1,
                      }
                    : {}
            }
            transition={{
              duration: stage === "knife_entering" ? 1.4 : 1.2,
              ease: stage === "knife_entering" ? "easeOut" : "easeInOut",
            }}
          >
            {/* Knife Handle (Pastel Pink & Cream Wood) */}
            <rect x="0" y="-48" width="18" height="42" rx="8" fill="#f8bbd0" stroke="#f06292" strokeWidth="1.5" />
            <rect x="3" y="-44" width="12" height="34" rx="5" fill="#fff0f5" />
            {/* Handle Rivets */}
            <circle cx="9" cy="-35" r="1.8" fill="#ec407a" />
            <circle cx="9" cy="-22" r="1.8" fill="#ec407a" />

            {/* Golden Bolster & Satin Ribbon */}
            <rect x="-2" y="-6" width="22" height="7" rx="3.5" fill="#ffd54f" stroke="#ffb300" strokeWidth="1" />
            <path d="M4 -3 Q9 -9 14 -3" stroke="#f06292" strokeWidth="2" fill="none" />

            {/* Friendly Rounded Blade with Space for Text */}
            <path
              d="M0 -1 L0 88 Q9 106 18 88 L18 -1 Z"
              fill="url(#knife-metal)"
              stroke="#b0bec5"
              strokeWidth="1.2"
            />
            {/* Metallic shine reflection */}
            <path d="M2.5 4 L2.5 78" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />

            {/* "HBD JESSI ♥" Engraved on the Knife Blade */}
            <g transform="rotate(90, 9, 46)">
              {/* White outline shadow for crisp visibility */}
              <text
                x="9"
                y="47"
                fill="#ffffff"
                fontSize="8.5"
                fontFamily="Poppins, ui-sans-serif, sans-serif"
                fontWeight="800"
                textAnchor="middle"
                letterSpacing="1px"
              >
                HBD JESSI ♥
              </text>
              {/* Engraved deep pink letters */}
              <text
                x="9"
                y="46"
                fill="#d81b60"
                fontSize="8.5"
                fontFamily="Poppins, ui-sans-serif, sans-serif"
                fontWeight="800"
                textAnchor="middle"
                letterSpacing="1px"
              >
                HBD JESSI ♥
              </text>
            </g>
          </motion.g>
        )}
      </svg>
    </div>
  );
}
