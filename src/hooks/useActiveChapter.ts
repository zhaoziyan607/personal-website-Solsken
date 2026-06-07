import { useCallback, useEffect, useRef, useState } from 'react';

export function useActiveChapter(chapterIds: readonly string[]) {
  const [activeId, setActiveId] = useState(chapterIds[0]);
  const lockedTargetRef = useRef<string | null>(null);
  const lockExpiresAtRef = useRef(0);

  const setManualActive = useCallback((id: string) => {
    if (!chapterIds.includes(id)) return;

    lockedTargetRef.current = id;
    lockExpiresAtRef.current = performance.now() + 1400;
    setActiveId(id);
  }, [chapterIds]);

  useEffect(() => {
    let rafId = 0;

    const updateActive = () => {
      const viewportAnchor = Math.min(180, window.innerHeight * 0.24);
      const lockedTarget = lockedTargetRef.current;
      if (lockedTarget) {
        const targetSection = document.getElementById(lockedTarget);
        const targetRect = targetSection?.getBoundingClientRect();
        const reachedTarget = Boolean(
          targetRect && targetRect.top <= viewportAnchor && targetRect.bottom > viewportAnchor,
        );
        const lockExpired = performance.now() > lockExpiresAtRef.current;

        if (!reachedTarget && !lockExpired) {
          setActiveId((current) => (current === lockedTarget ? current : lockedTarget));
          return;
        }

        lockedTargetRef.current = null;
      }

      let nextId = chapterIds[0];

      chapterIds.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportAnchor && rect.bottom > viewportAnchor) {
          nextId = id;
        }
      });

      setActiveId((current) => (current === nextId ? current : nextId));
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActive);
    };

    const scheduleHashUpdate = () => {
      scheduleUpdate();
      window.setTimeout(scheduleUpdate, 120);
      window.setTimeout(scheduleUpdate, 360);
    };

    updateActive();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('hashchange', scheduleHashUpdate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('hashchange', scheduleHashUpdate);
    };
  }, [chapterIds]);

  return { activeId, setManualActive };
}
