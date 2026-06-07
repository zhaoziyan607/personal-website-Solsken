import { useEffect, useRef } from 'react';
import './gallery.css';

const AUTO_SPEED = 0.3;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function lerp(current: number, target: number, ease: number) {
  return current + (target - current) * ease;
}

type ParallaxGalleryProps = {
  images: string[];
  priorityCount?: number;
};

export function ParallaxGallery({ images, priorityCount = 2 }: ParallaxGalleryProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef({
    current: 0,
    target: 0,
    limit: 0,
    ease: 0.07,
    direction: 1 as 1 | -1,
  });
  const rafRef = useRef(0);
  const hoveringRef = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setLimit = () => {
      const scroll = scrollRef.current;
      scroll.limit = Math.max(0, container.scrollWidth - wrapper.clientWidth);
      scroll.target = clamp(scroll.target, 0, scroll.limit);
      scroll.current = clamp(scroll.current, 0, scroll.limit);
    };

    const applyParallax = () => {
      const imgs = container.querySelectorAll<HTMLImageElement>('.gallery__media__image');
      const vw = window.innerWidth;
      const viewportCenter = vw * 0.5;

      imgs.forEach((image) => {
        const parent = image.parentElement as HTMLElement;
        if (!parent) return;

        const rect = parent.getBoundingClientRect();
        const elementCenter = rect.left + rect.width * 0.5;
        const t = clamp((elementCenter - viewportCenter) / viewportCenter, -1, 1);
        const shift = reducedMotion ? 0 : -t * 10;
        image.style.transform = `translate3d(${shift}%, 0, 0)`;
      });
    };

    const tickAutoplay = () => {
      if (hoveringRef.current || reducedMotion) return;

      const scroll = scrollRef.current;
      if (scroll.limit <= 0) return;

      scroll.target += AUTO_SPEED * scroll.direction;

      if (scroll.target >= scroll.limit) {
        scroll.target = scroll.limit;
        scroll.direction = -1;
      } else if (scroll.target <= 0) {
        scroll.target = 0;
        scroll.direction = 1;
      }
    };

    const render = () => {
      const scroll = scrollRef.current;
      tickAutoplay();
      scroll.target = clamp(scroll.target, 0, scroll.limit);
      scroll.current = reducedMotion
        ? scroll.target
        : lerp(scroll.current, scroll.target, scroll.ease);
      container.style.transform = `translateX(${scroll.current < 0.01 ? 0 : -scroll.current}px)`;
      applyParallax();
      rafRef.current = requestAnimationFrame(render);
    };

    const onWheel = (e: WheelEvent) => {
      if (!hoveringRef.current || reducedMotion) return;
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      scrollRef.current.target += delta;
    };

    const onEnter = () => {
      hoveringRef.current = true;
    };
    const onLeave = () => {
      hoveringRef.current = false;
    };

    setLimit();
    wrapper.addEventListener('wheel', onWheel, { passive: false });
    wrapper.addEventListener('mouseenter', onEnter);
    wrapper.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', setLimit);

    const resizeObserver = new ResizeObserver(setLimit);
    resizeObserver.observe(container);

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      wrapper.removeEventListener('wheel', onWheel);
      wrapper.removeEventListener('mouseenter', onEnter);
      wrapper.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', setLimit);
    };
  }, [images]);

  return (
    <div ref={wrapperRef} className="gallery__wrapper min-h-[30vh] lg:min-h-[398px]">
      <p className="mb-3 text-xs text-muted" style={{ letterSpacing: '0.18em' }}>
        沿着画廊慢慢点亮
      </p>
      <div ref={containerRef} className="gallery__image__container">
        {images.map((src, index) => (
          <div key={src} className="gallery__media">
            <img
              src={src}
              alt={`个人照片 ${index + 1}`}
              className="gallery__media__image"
              width={1600}
              height={1340}
              loading={index < priorityCount ? 'eager' : 'lazy'}
              fetchPriority={index < priorityCount ? 'high' : 'auto'}
              decoding={index < priorityCount ? 'sync' : 'async'}
              sizes="(min-width: 1024px) 360px, 78vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
