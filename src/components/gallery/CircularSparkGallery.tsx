import type { CSSProperties } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { LIFESTYLE_GALLERY_ITEMS } from '@/data/content';

function shortestOffset(index: number, active: number, total: number) {
  let offset = index - active;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

export function CircularSparkGallery() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<number | null>(null);
  const lastWheelTimeRef = useRef(0);
  const wheelRemainderRef = useRef(0);
  const total = LIFESTYLE_GALLERY_ITEMS.length;
  const activeItem = LIFESTYLE_GALLERY_ITEMS[active];
  const visibleItems = useMemo(
    () =>
      LIFESTYLE_GALLERY_ITEMS.map((item, index) => ({
        item,
        index,
        offset: shortestOffset(index, active, total),
      })).filter(({ offset }) => Math.abs(offset) <= 3),
    [active, total],
  );

  function step(direction: number) {
    setActive((current) => (current + direction + total) % total);
  }

  // 每次 active 变化（含手动切换）都重新计时，避免切图后立刻被自动切走
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || hovering || dragging) return;

    const timer = window.setInterval(() => step(1), 2600);
    return () => window.clearInterval(timer);
  }, [active, dragging, hovering, total]);

  function stepFromWheel(delta: number) {
    const now = window.performance.now();
    wheelRemainderRef.current += delta;

    if (Math.abs(wheelRemainderRef.current) < 46 || now - lastWheelTimeRef.current < 420) return;

    step(wheelRemainderRef.current > 0 ? 1 : -1);
    wheelRemainderRef.current = 0;
    lastWheelTimeRef.current = now;
  }

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onNativeWheel = (event: globalThis.WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const axisDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      stepFromWheel(axisDelta);
    };

    stage.addEventListener('wheel', onNativeWheel, { passive: false });
    return () => stage.removeEventListener('wheel', onNativeWheel);
  });

  function beginDrag(clientX: number) {
    dragStartRef.current = clientX;
    setDragging(true);
  }

  function endDrag(clientX: number) {
    const start = dragStartRef.current;
    dragStartRef.current = null;
    setDragging(false);
    if (start == null) return;
    const delta = clientX - start;
    if (Math.abs(delta) < 34) return;
    step(delta < 0 ? 1 : -1);
  }

  return (
    <div className="circular-gallery">
      {/* 图片舞台 + 左右箭头同层，箭头固定在舞台两侧 */}
      <div className="relative">
        <div
          ref={stageRef}
          className={`circular-gallery-stage ${dragging ? 'is-dragging' : ''}`}
          onPointerDown={(event) => beginDrag(event.clientX)}
          onPointerUp={(event) => endDrag(event.clientX)}
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => {
            setHovering(false);
            dragStartRef.current = null;
            setDragging(false);
          }}
          onPointerCancel={() => {
            dragStartRef.current = null;
            setDragging(false);
          }}
        >
          {visibleItems.map(({ item, index, offset }) => {
            const distance = Math.abs(offset);
            const x = offset * 132;
            const rotate = offset * -8;
            const scale = 1 - distance * 0.09;
            const z = 10 - distance;
            const image = 'image' in item ? (item.image as string | undefined) : undefined;
            return (
              <motion.button
                key={item.title}
                type="button"
                className="circular-gallery-card"
                data-active={offset === 0}
                style={{
                  '--spark-hue': item.hue,
                  zIndex: z,
                } as CSSProperties}
                animate={{
                  x,
                  rotateY: rotate,
                  scale,
                  opacity: distance > 2 ? 0.36 : 1,
                }}
                transition={{ type: 'spring', stiffness: 120, damping: 22 }}
                onClick={() => setActive(index)}
              >
                {image ? (
                  <img src={image} alt={item.title} className="spark-image" draggable={false} />
                ) : (
                  <span className="spark-placeholder" />
                )}
                <span className="circular-gallery-title">{item.title}</span>
              </motion.button>
            );
          })}
        </div>

        {/* 箭头放在舞台两侧，绝对定位，不受舞台 overflow:hidden 影响 */}
        <button
          type="button"
          onClick={() => step(-1)}
          className="gallery-nav-button absolute top-1/2 left-2 z-20 -translate-y-1/2 backdrop-blur-sm"
          aria-label="上一张火星"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          className="gallery-nav-button absolute top-1/2 right-2 z-20 -translate-y-1/2 backdrop-blur-sm"
          aria-label="下一张火星"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* 标题 + 描述，固定高度避免文字变化引起布局跳动 */}
      <div className="mt-5 flex min-h-[4rem] flex-col items-center justify-center gap-1 text-center">
        <p className="circular-gallery-active-title font-[family-name:var(--font-display)] text-2xl font-semibold text-text">
          {activeItem.title}
        </p>
        <p className="caption-copy">{activeItem.note}</p>
      </div>
    </div>
  );
}
