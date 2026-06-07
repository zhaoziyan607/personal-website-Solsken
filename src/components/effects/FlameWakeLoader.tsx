import { motion } from 'motion/react';

export function FlameWakeLoader() {
  return (
    <div className="flame-loader fixed inset-0 z-[80] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <div className="flame-aura absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame/20 blur-3xl" />
        <div className="flame-aura absolute top-1/2 left-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20" />
      </div>

      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg
          viewBox="0 0 120 150"
          className="flame-mark h-28 w-24 text-gold md:h-36 md:w-32"
          aria-hidden="true"
        >
          <path
            className="flame-line"
            d="M62 136C35 128 23 108 28 82c4-22 20-34 28-52 2 22 25 30 30 55 2 13-2 25-12 35 6-20-6-31-20-42 2 17-13 24-11 39 1 9 8 16 19 19Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="flame-line"
            d="M60 121c-10-6-14-14-11-24 2-8 8-13 13-22 2 11 13 16 14 28 1 9-4 15-16 18Z"
            fill="none"
            stroke="#ef8f45"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animationDelay: '0.18s' }}
          />
        </svg>
        <motion.p
          className="mt-6 text-sm text-gold/80"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          小火苗正在点亮
        </motion.p>
      </motion.div>

      <div className="radial-reveal absolute inset-0" />
    </div>
  );
}
