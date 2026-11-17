import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config";

export function Envelope({ opening, onOpen }: { opening: boolean; onOpen: () => void }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center px-5"
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: reduce ? 0.01 : 0.45 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.78),transparent_68%)]" />
      <button
        type="button"
        onClick={onOpen}
        disabled={opening}
        className="relative z-10 flex w-full max-w-sm flex-col items-center text-center outline-none disabled:opacity-100"
      >
        <p className="text-[11px] font-semibold tracking-[0.32em] text-rose-500 uppercase">
          {siteConfig.envelopeKicker}
        </p>
        <h1 className="mt-3 font-script text-[2.4rem] leading-tight text-ink sm:text-5xl">
          {siteConfig.envelopeTitle}
        </h1>
        <p className="mt-2 font-script text-2xl text-rose-500">{siteConfig.herNickname}</p>
        <EnvelopeCard opening={opening} />
        <span className="mt-6 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-ink/75 shadow-sm">
          {opening ? "just a second..." : siteConfig.envelopeHint}
        </span>
      </button>
    </motion.div>
  );
}

function EnvelopeCard({ opening }: { opening: boolean }) {
  return (
    <div className="relative mt-8 h-[210px] w-[min(86vw,320px)]" style={{ perspective: "900px" }}>
      <div className="absolute inset-0 rounded-[24px] bg-[#ffd3e2] shadow-[0_24px_60px_rgba(214,120,150,0.28)]" />
      <motion.div
        className="absolute top-5 right-4 left-4 rounded-xl bg-[#fffaf7] px-4 py-5 text-center shadow-sm"
        animate={opening ? { y: -88, rotate: -3 } : { y: 18, rotate: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
      >
        <motion.div animate={opening ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.35 }}>
          <p className="font-hand text-3xl leading-none text-rose-500">For you</p>
          <p className="mt-1 font-hand text-2xl text-ink/75">{siteConfig.herName}</p>
        </motion.div>
      </motion.div>
      <div
        className="absolute inset-x-0 bottom-0 z-10 h-[128px] rounded-b-[24px]"
        style={{
          background: "linear-gradient(180deg, #ffb4cb 0%, #ff8eab 100%)",
          clipPath: "polygon(0 24%, 50% 74%, 100% 24%, 100% 100%, 0 100%)",
        }}
      />
      <motion.div
        className="absolute inset-x-0 top-0 z-20 h-[124px] origin-top"
        style={{
          background: "linear-gradient(180deg, #ffc6d8, #ffa3be)",
          clipPath: "polygon(0 0, 100% 0, 50% 100%)",
          transformOrigin: "top center",
        }}
        animate={opening ? { rotateX: 188, y: -8 } : { rotateX: 0, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute top-[86px] left-1/2 z-30 grid size-14 -translate-x-1/2 place-items-center rounded-full bg-[#e85a7a] text-2xl text-white shadow-lg"
        animate={opening ? { scale: 0, opacity: 0 } : { scale: [1, 1.08, 1] }}
        transition={opening ? { duration: 0.25 } : { duration: 1.5, repeat: Infinity }}
        aria-hidden
      >
        ♥
      </motion.div>
    </div>
  );
}
