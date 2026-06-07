import type { ReactNode } from 'react';
import { motion } from 'motion/react';

type SpreadProps = {
  id: string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  background?: ReactNode;
  glow?: boolean;
  reveal?: 'scroll' | 'immediate';
};

export function Spread({
  id,
  children,
  className = '',
  fullWidth = false,
  background,
  glow = true,
  reveal = 'scroll',
}: SpreadProps) {
  const motionProps =
    reveal === 'immediate'
      ? {
          initial: { opacity: 1, filter: 'blur(0px)', scale: 1 },
          animate: { opacity: 1, filter: 'blur(0px)', scale: 1 },
        }
      : {
          initial: { opacity: 0, filter: 'blur(18px)', scale: 0.985 },
          whileInView: { opacity: 1, filter: 'blur(0px)', scale: 1 },
          viewport: { once: false, amount: 0.04 },
        };

  return (
    <section
      id={id}
      className={`spread-glow relative flex min-h-screen scroll-mt-[4.75rem] items-center px-6 py-16 text-text md:scroll-mt-[5.5rem] md:px-12 md:py-20 lg:px-20 ${glow ? '' : 'before:hidden'} ${className}`}
    >
      {background}
      <motion.div
        className={`relative z-10 w-full ${fullWidth ? '' : 'mx-auto max-w-5xl'}`}
        {...motionProps}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
