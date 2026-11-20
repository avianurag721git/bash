import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { playPopSound, playSparkleSound } from "@/lib/sound-effects";

type AestheticLoveSceneProps = {
  onBunny: () => void;
};

export function AestheticLoveScene({ onBunny }: AestheticLoveSceneProps) {
  const reduce = useReducedMotion();
  const [bunnyHop, setBunnyHop] = useState(0);
  const [coupleHeart, setCoupleHeart] = useState(false);
  const [teddyWave, setTeddyWave] = useState(false);

  const handleBunnyClick = () => {
    playPopSound();
    setBunnyHop((h) => h + 1);
    onBunny();
  };

  const handleCoupleClick = () => {
    playSparkleSound();
    setCoupleHeart(true);
    setTimeout(() => setCoupleHeart(false), 1400);
  };

  const handleTeddyClick = () => {
    playPopSound();
    setTeddyWave(true);
    setTimeout(() => setTeddyWave(false), 1200);
  };

  return (
    <div className="relative mx-auto w-full select-none">
      <svg
        viewBox="0 0 460 270"
        className="h-auto w-full overflow-visible drop-shadow-md"
        role="img"
        aria-label="Cute Cartoon Couple, Fluffy Bunny and Teddy Bear"
      >
        <defs>
          {/* Soft Gradients */}
          <linearGradient id="girl-hair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d2331" />
            <stop offset="100%" stopColor="#24141d" />
          </linearGradient>

          <linearGradient id="boy-hair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#33242c" />
            <stop offset="100%" stopColor="#1a1217" />
          </linearGradient>

          <linearGradient id="skin-tone" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff4ed" />
            <stop offset="100%" stopColor="#ffe7dc" />
          </linearGradient>

          <linearGradient id="girl-dress" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9ebb" />
            <stop offset="100%" stopColor="#f06292" />
          </linearGradient>

          <linearGradient id="boy-sweater" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d5c6ff" />
            <stop offset="100%" stopColor="#b39ddb" />
          </linearGradient>

          <linearGradient id="teddy-fur" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2ad82" />
            <stop offset="100%" stopColor="#c88b5c" />
          </linearGradient>

          <linearGradient id="soft-ground" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffd3e2" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ffb3cc" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffd3e2" stopOpacity="0.4" />
          </linearGradient>

          <filter id="soft-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dreamy Fairy Light Garland */}
        <g id="fairy-lights" opacity="0.85">
          <path
            d="M 30 20 Q 130 45 230 25 Q 330 48 430 22"
            fill="none"
            stroke="#f8bbd0"
            strokeWidth="1.2"
            strokeDasharray="3,3"
          />
          {[
            { cx: 70, cy: 30, color: "#ffd54f" },
            { cx: 125, cy: 36, color: "#ff80ab" },
            { cx: 180, cy: 30, color: "#80deea" },
            { cx: 235, cy: 26, color: "#ffd54f" },
            { cx: 290, cy: 34, color: "#b39ddb" },
            { cx: 345, cy: 37, color: "#ff80ab" },
            { cx: 395, cy: 26, color: "#ffd54f" },
          ].map((light, i) => (
            <motion.circle
              key={i}
              cx={light.cx}
              cy={light.cy}
              r="3.5"
              fill={light.color}
              filter="url(#soft-glow)"
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.2, 0.9] }}
              transition={{ duration: 1.8 + (i % 3) * 0.4, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </g>

        {/* Soft Cozy Pastel Hill Ground */}
        <g id="ground">
          <ellipse cx="230" cy="236" rx="205" ry="20" fill="url(#soft-ground)" />
          <ellipse cx="230" cy="235" rx="185" ry="14" fill="#ffffff" opacity="0.35" />

          {/* Dainty Daisies and Petals on Ground */}
          {[
            { cx: 85, cy: 234 },
            { cx: 135, cy: 242 },
            { cx: 230, cy: 244 },
            { cx: 325, cy: 240 },
            { cx: 380, cy: 233 },
          ].map((flower, idx) => (
            <g key={idx} transform={`translate(${flower.cx}, ${flower.cy}) scale(0.6)`}>
              <circle cx="-4" cy="0" r="3" fill="#ffffff" />
              <circle cx="4" cy="0" r="3" fill="#ffffff" />
              <circle cx="0" cy="-4" r="3" fill="#ffffff" />
              <circle cx="0" cy="4" r="3" fill="#ffffff" />
              <circle cx="0" cy="0" r="2.2" fill="#ffd54f" />
            </g>
          ))}
        </g>

        {/* Floating Pulsing Main Love Heart */}
        <motion.g
          animate={
            reduce
              ? {}
              : {
                  y: [0, -7, 0],
                  scale: coupleHeart ? [1, 1.35, 1.1] : [1, 1.08, 1],
                }
          }
          transition={{ duration: coupleHeart ? 0.6 : 3, repeat: coupleHeart ? 2 : Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "230px 65px" }}
        >
          <path
            d="M 230 68 C 220 50 196 56 196 74 C 196 90 230 108 230 108 C 230 108 264 90 264 74 C 264 56 240 50 230 68 Z"
            fill="#ff4081"
            filter="url(#soft-glow)"
          />
          <path
            d="M 224 64 C 217 56 205 60 205 68 C 205 75 224 86 224 86 C 224 86 243 75 243 68 C 243 60 231 56 224 64 Z"
            fill="#ff80ab"
            opacity="0.8"
          />
          {/* Little Star Twinkle */}
          <circle cx="204" cy="64" r="1.8" fill="#ffffff" />
        </motion.g>

        {/* Burst of floating heart bubbles on couple click */}
        {coupleHeart && (
          <motion.g
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: -30 }}
            transition={{ duration: 1.2 }}
          >
            <text x="210" y="45" fontSize="16" fill="#ff4081">💖</text>
            <text x="240" y="40" fontSize="14" fill="#e91e63">💕</text>
            <text x="225" y="30" fontSize="12" fill="#ff80ab">✨</text>
          </motion.g>
        )}

        {/* 1. ADORABLE KAWAII FLUFFY BUNNY (Left) */}
        <motion.g
          id="kawaii-bunny"
          className="cursor-pointer"
          onClick={handleBunnyClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={
            bunnyHop > 0
              ? {
                  y: [0, -18, 0],
                  rotate: [0, -4, 4, 0],
                }
              : reduce
                ? {}
                : { y: [0, -3, 0] }
          }
          transition={{ duration: bunnyHop > 0 ? 0.45 : 3.2, repeat: bunnyHop > 0 ? 1 : Infinity }}
          style={{ transformOrigin: "90px 210px" }}
        >
          {/* Bunny Ears with Soft Inner Blush */}
          <motion.g
            animate={
              reduce
                ? {}
                : { rotate: [-2, 3, -2] }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "90px 115px" }}
          >
            {/* Left Ear */}
            <path
              d="M 72 115 C 64 80 72 50 82 50 C 92 50 88 80 82 115 Z"
              fill="#ffffff"
              stroke="#fce4ec"
              strokeWidth="1.5"
            />
            <path d="M 75 110 C 69 82 75 60 81 60 C 87 60 84 82 81 110 Z" fill="#ffc1e3" opacity="0.85" />

            {/* Right Ear (slightly tilted cutely) */}
            <path
              d="M 98 115 C 96 78 108 52 118 55 C 128 58 118 84 108 115 Z"
              fill="#ffffff"
              stroke="#fce4ec"
              strokeWidth="1.5"
            />
            <path d="M 101 110 C 100 82 108 63 115 65 C 122 67 115 85 107 110 Z" fill="#ffc1e3" opacity="0.85" />
          </motion.g>

          {/* Chubby Round Bunny Body */}
          <ellipse cx="90" cy="180" rx="34" ry="32" fill="#ffffff" stroke="#f8bbd0" strokeWidth="1.5" />
          <ellipse cx="90" cy="185" rx="20" ry="17" fill="#fff5f8" />

          {/* Round Bunny Head */}
          <circle cx="90" cy="132" r="30" fill="#ffffff" stroke="#f8bbd0" strokeWidth="1.5" />

          {/* Big Sparkling Anime Eyes */}
          <circle cx="78" cy="128" r="4.2" fill="#2d1527" />
          <circle cx="76.5" cy="126" r="1.6" fill="#ffffff" />
          <circle cx="79.5" cy="129.5" r="0.8" fill="#ffffff" />

          <circle cx="102" cy="128" r="4.2" fill="#2d1527" />
          <circle cx="100.5" cy="126" r="1.6" fill="#ffffff" />
          <circle cx="103.5" cy="129.5" r="0.8" fill="#ffffff" />

          {/* Rosy Blushing Cheeks */}
          <ellipse cx="70" cy="138" rx="6" ry="3.5" fill="#ff80ab" opacity="0.65" />
          <ellipse cx="110" cy="138" rx="6" ry="3.5" fill="#ff80ab" opacity="0.65" />

          {/* Kawaii ':3' Mouth & Pink Nose */}
          <ellipse cx="90" cy="134" rx="2.5" ry="1.8" fill="#ff4081" />
          <path
            d="M 85 137 Q 87.5 141 90 137 Q 92.5 141 95 137"
            fill="none"
            stroke="#c2185b"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Plush Pink Heart held in little bunny paws */}
          <g transform="translate(90, 182) scale(0.85)">
            <path
              d="M 0 -8 C -7 -16 -18 -8 -18 3 C -18 13 0 24 0 24 C 0 24 18 13 18 3 C 18 -8 7 -16 0 -8 Z"
              fill="#ff4081"
            />
            {/* White stitching lines on plush heart */}
            <path
              d="M -11 0 L -8 2 M -4 6 L -1 9 M 4 6 L 8 2 M 11 0 L 8 -3"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>

          {/* Tiny Cute Bunny Paws */}
          <ellipse cx="76" cy="180" rx="5" ry="4" fill="#ffffff" stroke="#f8bbd0" strokeWidth="1.2" />
          <ellipse cx="104" cy="180" rx="5" ry="4" fill="#ffffff" stroke="#f8bbd0" strokeWidth="1.2" />

          {/* Little Feet */}
          <ellipse cx="76" cy="208" rx="7" ry="4.5" fill="#ffffff" stroke="#f8bbd0" strokeWidth="1.2" />
          <ellipse cx="104" cy="208" rx="7" ry="4.5" fill="#ffffff" stroke="#f8bbd0" strokeWidth="1.2" />

          {/* Little Floating Hint Heart when hopped */}
          {bunnyHop > 0 && (
            <motion.text
              x="98"
              y="95"
              fontSize="14"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 0], y: -15 }}
              transition={{ duration: 0.8 }}
            >
              💕
            </motion.text>
          )}
        </motion.g>

        {/* 2. SWEET CHIBI GIRL (JESSI) */}
        <motion.g
          id="chibi-girl"
          className="cursor-pointer"
          onClick={handleCoupleClick}
          animate={
            reduce
              ? {}
              : {
                  y: [0, -3.5, 0],
                  rotate: [0, 1, 0],
                }
          }
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "195px 220px" }}
        >
          {/* Pretty Back Hair / Bun */}
          <circle cx="195" cy="98" r="28" fill="url(#girl-hair)" />
          {/* Hair Bun with cute pink bow ribbon */}
          <circle cx="195" cy="74" r="13" fill="url(#girl-hair)" />
          {/* Bow on bun */}
          <path d="M 187 73 C 182 66 182 80 188 74 Z" fill="#ff4081" />
          <path d="M 203 73 C 208 66 208 80 202 74 Z" fill="#ff4081" />
          <circle cx="195" cy="74" r="3.5" fill="#ffd54f" />

          {/* Cozy Pastel Dress with Ruffles */}
          <path
            d="M 172 165 Q 195 155 218 165 L 226 226 C 212 232 178 232 164 226 Z"
            fill="url(#girl-dress)"
          />
          {/* Cream scalloped apron / ruffle trim */}
          <path
            d="M 166 224 Q 176 228 186 224 Q 196 228 206 224 Q 216 228 224 224"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Cozy Fluffy White Shawl / Collar */}
          <ellipse cx="195" cy="162" rx="21" ry="10" fill="#ffffff" stroke="#f8bbd0" strokeWidth="1.2" />

          {/* Cute Chibi Head */}
          <ellipse cx="195" cy="116" rx="24" ry="22" fill="url(#skin-tone)" />

          {/* Front Hair Bangs with shine */}
          <path
            d="M 171 110 C 172 88 218 88 219 110 C 213 103 205 105 195 102 C 185 105 177 103 171 110 Z"
            fill="url(#girl-hair)"
          />
          {/* Hair Shine Highlight */}
          <path
            d="M 178 98 Q 195 93 212 98"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.45"
          />

          {/* Sweet Happy Crescent Eyes */}
          <path
            d="M 183 117 Q 188 123 193 117"
            fill="none"
            stroke="#4a2233"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 197 117 Q 202 123 207 117"
            fill="none"
            stroke="#4a2233"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Cute Eyelashes */}
          <path d="M 192 118 L 194 115" stroke="#4a2233" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 206 118 L 208 115" stroke="#4a2233" strokeWidth="1.5" strokeLinecap="round" />

          {/* Big Rosy Blushing Cheeks with Heart Tints */}
          <ellipse cx="180" cy="125" rx="5" ry="3" fill="#ff4081" opacity="0.6" />
          <ellipse cx="210" cy="125" rx="5" ry="3" fill="#ff4081" opacity="0.6" />

          {/* Sweet Loving Smile */}
          <path
            d="M 191 126 Q 195 130 199 126"
            fill="none"
            stroke="#c2185b"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Cute hands reaching out lovingly toward him */}
          <ellipse cx="215" cy="178" rx="4.5" ry="4" fill="url(#skin-tone)" />
        </motion.g>

        {/* 3. LOVING CHIBI BOY (YOURS) */}
        <motion.g
          id="chibi-boy"
          className="cursor-pointer"
          onClick={handleCoupleClick}
          animate={
            reduce
              ? {}
              : {
                  y: [0, -3.5, 0],
                  rotate: [0, -1, 0],
                }
          }
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          style={{ transformOrigin: "265px 220px" }}
        >
          {/* Back Hair */}
          <circle cx="265" cy="98" r="28" fill="url(#boy-hair)" />

          {/* Cozy Lavender Knit Sweater */}
          <path
            d="M 242 165 Q 265 155 288 165 L 296 226 C 282 232 248 232 234 226 Z"
            fill="url(#boy-sweater)"
          />
          {/* White shirt collar under sweater */}
          <polygon points="257,157 265,166 273,157 265,159" fill="#ffffff" />

          {/* Cute Chibi Head */}
          <ellipse cx="265" cy="116" rx="24" ry="22" fill="url(#skin-tone)" />

          {/* Textured Modern Ruffled Hair */}
          <path
            d="M 241 110 C 241 85 289 85 289 110 C 281 100 273 103 265 101 C 257 103 249 100 241 110 Z"
            fill="url(#boy-hair)"
          />
          {/* Cute Hair Locks */}
          <path d="M 252 97 Q 256 104 250 108" fill="none" stroke="url(#boy-hair)" strokeWidth="3" />
          <path d="M 276 96 Q 272 104 278 108" fill="none" stroke="url(#boy-hair)" strokeWidth="3" />

          {/* Happy Warm Loving Eyes looking at her */}
          <path
            d="M 253 117 Q 258 123 263 117"
            fill="none"
            stroke="#33242c"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 267 117 Q 272 123 277 117"
            fill="none"
            stroke="#33242c"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Shy Blushing Cheeks */}
          <ellipse cx="250" cy="125" rx="5" ry="3" fill="#ff80ab" opacity="0.6" />
          <ellipse cx="280" cy="125" rx="5" ry="3" fill="#ff80ab" opacity="0.6" />

          {/* Warm Grateful Smile */}
          <path
            d="M 261 126 Q 265 130 269 126"
            fill="none"
            stroke="#c2185b"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Arms holding out a Steaming Warm Chai / Hot Cocoa Mug for Jessi */}
          <g transform="translate(230, 168)">
            {/* Ceramic Mug */}
            <rect x="0" y="6" width="16" height="15" rx="3.5" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" />
            <rect x="1.5" y="8" width="13" height="4" rx="1.5" fill="#c7926b" />
            {/* Heart on mug */}
            <path
              d="M 8 13 C 6 11 4 13 4 14.5 C 4 16.5 8 18.5 8 18.5 C 8 18.5 12 16.5 12 14.5 C 12 13 10 11 8 13 Z"
              fill="#ff4081"
            />
            {/* Mug Handle */}
            <path d="M 16 10 C 20 10 20 17 16 17" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

            {/* Rising Heart Steam Animation */}
            <motion.path
              d="M 8 4 Q 6 0 8 -4 T 8 -10"
              fill="none"
              stroke="#ff80ab"
              strokeWidth="1.4"
              strokeLinecap="round"
              animate={reduce ? {} : { y: [0, -8], opacity: [0.8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.text
              x="5"
              y="-12"
              fontSize="8"
              fill="#ff4081"
              animate={reduce ? {} : { y: [0, -6], opacity: [0.9, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
            >
              ♥
            </motion.text>
          </g>

          {/* Boy's Hands holding the mug */}
          <ellipse cx="232" cy="178" rx="4.5" ry="4" fill="url(#skin-tone)" />
          <ellipse cx="248" cy="178" rx="4.5" ry="4" fill="url(#skin-tone)" />
        </motion.g>

        {/* 4. ADORABLE PLUSH TEDDY BEAR (Right) */}
        <motion.g
          id="fluffy-teddy"
          className="cursor-pointer"
          onClick={handleTeddyClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={
            teddyWave
              ? {
                  rotate: [0, -5, 5, 0],
                  y: [0, -8, 0],
                }
              : reduce
                ? {}
                : { y: [0, -2.5, 0] }
          }
          transition={{ duration: teddyWave ? 0.4 : 3.4, repeat: teddyWave ? 2 : Infinity, delay: 0.3 }}
          style={{ transformOrigin: "370px 210px" }}
        >
          {/* Round Plush Ears with Pink Inner */}
          <circle cx="348" cy="112" r="11" fill="url(#teddy-fur)" stroke="#b57a4e" strokeWidth="1.2" />
          <circle cx="348" cy="112" r="6" fill="#f8bbd0" />
          <circle cx="392" cy="112" r="11" fill="url(#teddy-fur)" stroke="#b57a4e" strokeWidth="1.2" />
          <circle cx="392" cy="112" r="6" fill="#f8bbd0" />

          {/* Chubby Round Bear Body */}
          <ellipse cx="370" cy="178" rx="33" ry="30" fill="url(#teddy-fur)" stroke="#b57a4e" strokeWidth="1.5" />
          {/* Cream Tummy Patch with stitch effect */}
          <ellipse cx="370" cy="182" rx="20" ry="17" fill="#fbe9e7" />

          {/* Round Bear Head */}
          <circle cx="370" cy="132" r="29" fill="url(#teddy-fur)" stroke="#b57a4e" strokeWidth="1.5" />

          {/* Snout with sweet nose */}
          <ellipse cx="370" cy="138" rx="13" ry="10" fill="#fbe9e7" />
          <ellipse cx="370" cy="134" rx="4.5" ry="3" fill="#4e342e" />
          <path
            d="M 370 137 L 370 142 M 366 142 Q 370 145 374 142"
            stroke="#4e342e"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Friendly Sparkly Button Eyes */}
          <circle cx="357" cy="127" r="3.5" fill="#3e2723" />
          <circle cx="356" cy="125.5" r="1.3" fill="#ffffff" />
          <circle cx="383" cy="127" r="3.5" fill="#3e2723" />
          <circle cx="382" cy="125.5" r="1.3" fill="#ffffff" />

          {/* Teddy Rosy Blush */}
          <ellipse cx="350" cy="135" rx="5" ry="3" fill="#f48fb1" opacity="0.65" />
          <ellipse cx="390" cy="135" rx="5" ry="3" fill="#f48fb1" opacity="0.65" />

          {/* Big Plush Strawberry Heart Teddy is Hugging */}
          <g transform="translate(370, 182) scale(0.85)">
            <path
              d="M 0 -8 C -7 -16 -18 -8 -18 3 C -18 13 0 24 0 24 C 0 24 18 13 18 3 C 18 -8 7 -16 0 -8 Z"
              fill="#e91e63"
            />
            {/* White stitching lines */}
            <path
              d="M -11 0 L -8 2 M -4 6 L -1 9 M 4 6 L 8 2 M 11 0 L 8 -3"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>

          {/* Teddy Paws holding the heart */}
          <ellipse cx="355" cy="180" rx="6" ry="5" fill="url(#teddy-fur)" stroke="#b57a4e" strokeWidth="1.2" />
          {/* Animated Waving Right Paw */}
          <motion.g
            animate={
              teddyWave
                ? { rotate: [0, -25, 20, -25, 0] }
                : { rotate: [0, 8, 0] }
            }
            transition={{ duration: teddyWave ? 0.6 : 2.8, repeat: teddyWave ? 2 : Infinity }}
            style={{ transformOrigin: "385px 175px" }}
          >
            <ellipse cx="387" cy="177" rx="6" ry="5" fill="url(#teddy-fur)" stroke="#b57a4e" strokeWidth="1.2" />
            <circle cx="387" cy="177" r="2.5" fill="#f8bbd0" />
          </motion.g>

          {/* Teddy Little Feet with paw pads */}
          <g>
            <ellipse cx="355" cy="207" rx="8" ry="5.5" fill="url(#teddy-fur)" stroke="#b57a4e" strokeWidth="1.2" />
            <circle cx="355" cy="207" r="3.2" fill="#f8bbd0" />
          </g>
          <g>
            <ellipse cx="385" cy="207" rx="8" ry="5.5" fill="url(#teddy-fur)" stroke="#b57a4e" strokeWidth="1.2" />
            <circle cx="385" cy="207" r="3.2" fill="#f8bbd0" />
          </g>

          {/* Floating Sparkle when waved */}
          {teddyWave && (
            <motion.text
              x="395"
              y="110"
              fontSize="14"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], y: -15 }}
              transition={{ duration: 0.8 }}
            >
              ⭐
            </motion.text>
          )}
        </motion.g>
      </svg>
    </div>
  );
}
