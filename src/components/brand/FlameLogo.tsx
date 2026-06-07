import { motion } from 'motion/react';

type FlameLogoProps = {
  className?: string;
  size?: number;
};

export function FlameLogo({ className = '', size = 28 }: FlameLogoProps) {
  return (
    <motion.svg
      viewBox="0 0 64 72"
      width={size}
      height={size}
      className={`flame-logo ${className}`}
      aria-hidden="true"
      focusable="false"
      whileHover={{ y: -2, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
    >
      <path
        d="M34.4 66.2C19.7 61.8 11.2 50.5 12.9 36.9c1.3-10.2 8.9-17.8 14-28.2 1.1 9.8 10.4 14.1 14.4 24.8 2.5 6.6 1.1 14.3-4.1 20.2 1.2-10.3-5.5-15.9-13.2-21.7 1.5 10.2-7.1 14-6.1 22 .7 6 6.2 10.5 16.5 12.2Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.6"
      />
      <path
        d="M32.2 56.5c-5.6-3.5-8-8.2-6.5-13.7 1.2-4.4 4.8-7.4 7.5-12.6 1.3 6.1 7.3 9.2 8 15.6.6 5.1-2.4 8.8-9 10.7Z"
        fill="none"
        stroke="#ef8f45"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.6"
      />
    </motion.svg>
  );
}
