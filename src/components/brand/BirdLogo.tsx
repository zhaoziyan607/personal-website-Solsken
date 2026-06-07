import { motion } from 'motion/react';

type BirdLogoProps = {
  className?: string;
  size?: number;
};

export function BirdLogo({ className = '', size = 28 }: BirdLogoProps) {
  return (
    <motion.img
      src="/brand/solsken-bird.png"
      alt=""
      width={size}
      height={size}
      className={`bird-logo object-contain ${className}`}
      whileHover={{ y: -2, rotate: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      aria-hidden
    />
  );
}
