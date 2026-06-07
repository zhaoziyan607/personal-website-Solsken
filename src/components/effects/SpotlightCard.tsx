import { useRef, type ReactNode } from 'react';

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  tilt?: boolean;
};

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(239, 143, 69, 0.18)',
  tilt = false,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.setProperty('--spotlight-color', spotlightColor);

    if (tilt) {
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -6;
      const rotY = ((x - cx) / cx) * 6;
      card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(1.018)`;
    }
  }

  function handlePointerLeave() {
    const card = cardRef.current;
    if (!card) return;
    if (tilt) card.style.transform = '';
  }

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`spotlight-card ${className}`}
      style={tilt ? { transition: 'transform 0.28s ease-out', willChange: 'transform' } : undefined}
    >
      {children}
    </div>
  );
}
