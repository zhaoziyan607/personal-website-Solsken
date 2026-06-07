import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import './gallery.css';

function wrapIndex(index: number, total: number) {
  return (index + total) % total;
}

function shortestOffset(index: number, active: number, total: number) {
  let offset = index - active;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

const MOUSE_WHEEL_MIN_DELTA = 100;
const MOUSE_WHEEL_MAX_DELTA = 160;
const WHEEL_COOLDOWN_MS = 820;

type HeroPhotoDeckProps = {
  images: string[];
  priorityCount?: number;
};

export function HeroPhotoDeck({ images, priorityCount = 2 }: HeroPhotoDeckProps) {
  const [active, setActive] = useState(0);
  const [manualVersion, setManualVersion] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const lastWheelAtRef = useRef(0);
  const total = images.length;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || hovering || total <= 1) return;

    const timer = window.setInterval(() => {
      setActive((current) => wrapIndex(current + 1, total));
    }, 2800);

    return () => window.clearInterval(timer);
  }, [hovering, manualVersion, total]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || total <= 1) return;

    function handleWheel(event: WheelEvent) {
      const absX = Math.abs(event.deltaX);
      const absY = Math.abs(event.deltaY);
      const isVerticalMouseWheel =
        absX < 1 &&
        (
          event.deltaMode !== WheelEvent.DOM_DELTA_PIXEL ||
          (absY >= MOUSE_WHEEL_MIN_DELTA && absY <= MOUSE_WHEEL_MAX_DELTA)
        );

      if (!isVerticalMouseWheel) return;

      event.preventDefault();

      const now = performance.now();
      if (now - lastWheelAtRef.current < WHEEL_COOLDOWN_MS) return;

      lastWheelAtRef.current = now;
      stepImage(event.deltaY > 0 ? 1 : -1);
    }

    stage.addEventListener('wheel', handleWheel, { passive: false });
    return () => stage.removeEventListener('wheel', handleWheel);
  }, [total]);

  const visible = images
    .map((src, index) => ({ src, index, offset: shortestOffset(index, active, total) }))
    .filter(({ offset }) => Math.abs(offset) <= 2);

  function updateTilt(clientX: number, clientY: number) {
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const px = (clientX - rect.left) / rect.width - 0.5;
    const py = (clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px * 6, y: py * -5 });
  }

  function showImage(index: number) {
    setActive(wrapIndex(index, total));
    setManualVersion((current) => current + 1);
  }

  function stepImage(direction: 1 | -1) {
    setActive((current) => wrapIndex(current + direction, total));
    setManualVersion((current) => current + 1);
  }

  return (
    <div className="hero-photo-deck">
      <p className="hero-photo-deck-kicker">光影档案</p>
      <div
        ref={stageRef}
        className="hero-photo-deck-stage"
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') setHovering(true);
        }}
        onPointerMove={(event) => {
          if (event.pointerType === 'mouse') updateTilt(event.clientX, event.clientY);
        }}
        onPointerLeave={() => {
          setHovering(false);
          setTilt({ x: 0, y: 0 });
        }}
      >
        {visible.map(({ src, index, offset }) => {
          const isActive = offset === 0;
          const distance = Math.abs(offset);
          return (
            <motion.button
              key={src}
              type="button"
              className={`hero-photo-card${isActive ? ' is-active' : ''}`}
              style={{
                zIndex: 10 - distance,
              }}
              animate={{
                x: offset * 108,
                y: distance * 10,
                rotate: offset * -4 + (isActive ? tilt.x * 0.12 : 0),
                rotateX: isActive ? tilt.y : 0,
                rotateY: isActive ? tilt.x : offset * -7,
                scale: isActive ? (hovering ? 1.028 : 1) : 0.84 - distance * 0.05,
                opacity: distance > 1 ? 0.28 : isActive ? 1 : 0.68,
              }}
              transition={{ type: 'spring', stiffness: 130, damping: 22 }}
              onClick={() => showImage(index)}
              aria-label={`查看个人照片 ${index + 1}`}
            >
              <img
                src={src}
                alt={`个人照片 ${index + 1}`}
                width={1600}
                height={1340}
                loading={index < priorityCount ? 'eager' : 'lazy'}
                fetchPriority={index < priorityCount ? 'high' : 'auto'}
                decoding={index < priorityCount ? 'sync' : 'async'}
                draggable={false}
              />
            </motion.button>
          );
        })}
      </div>

      <div className="hero-photo-dots" aria-label="照片切换">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label={`切换到照片 ${index + 1}`}
            className={index === active ? 'is-active' : ''}
            onClick={() => showImage(index)}
          />
        ))}
      </div>
    </div>
  );
}
