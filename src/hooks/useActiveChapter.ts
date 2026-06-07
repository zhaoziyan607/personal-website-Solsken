import { useEffect, useState } from 'react';

export function useActiveChapter(chapterIds: readonly string[]) {
  const [activeId, setActiveId] = useState(chapterIds[0]);

  useEffect(() => {
    let rafId = 0;

    const updateActive = () => {
      const viewportAnchor = Math.min(180, window.innerHeight * 0.24);
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

  return activeId;
}
