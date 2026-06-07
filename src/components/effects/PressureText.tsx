import { useEffect, useRef } from 'react';

type Props = {
  text: string;
  className?: string;
  maxScale?: number;
  radius?: number;
};

// text color ≈ rgb(248,245,237), gold = rgb(213,181,111)
const TEXT_RGB = [248, 245, 237] as const;
const GOLD_RGB = [213, 181, 111] as const;

export function PressureText({ text, className = '', maxScale = 1.28, radius = 120 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || window.matchMedia('(hover: none)').matches) return;

    const chars = Array.from(container.querySelectorAll<HTMLSpanElement>('[data-ch]'));

    function onMove(e: MouseEvent) {
      chars.forEach((span) => {
        const r = span.getBoundingClientRect();
        const dist = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
        const raw = Math.max(0, 1 - dist / radius);
        const t = raw * raw * (3 - 2 * raw); // smoothstep
        const s = 1 + (maxScale - 1) * t;
        span.style.transform = `scale(${s.toFixed(3)})`;
        const rr = Math.round(TEXT_RGB[0] + (GOLD_RGB[0] - TEXT_RGB[0]) * t);
        const gg = Math.round(TEXT_RGB[1] + (GOLD_RGB[1] - TEXT_RGB[1]) * t);
        const bb = Math.round(TEXT_RGB[2] + (GOLD_RGB[2] - TEXT_RGB[2]) * t);
        span.style.color = `rgb(${rr},${gg},${bb})`;
      });
    }

    function onLeave() {
      chars.forEach((span) => {
        span.style.transform = '';
        span.style.color = '';
      });
    }

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [maxScale, radius]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          data-ch=""
          aria-hidden="true"
          style={{ display: 'inline-block', transition: 'transform 0.14s ease-out, color 0.16s ease-out' }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  );
}
