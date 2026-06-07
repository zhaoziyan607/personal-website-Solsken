import { useState, useEffect } from 'react';
import { CHAPTERS } from '@/data/content';
import { useActiveChapter } from '@/hooks/useActiveChapter';
import { MagazineShell } from '@/components/layout/MagazineShell';
import { FlameWakeLoader } from '@/components/effects/FlameWakeLoader';
import { HeroSpread } from '@/components/spreads/HeroSpread';
import { StrengthsSpread } from '@/components/spreads/StrengthsSpread';
import { EducationSpread } from '@/components/spreads/EducationSpread';
import { ExperienceSpread } from '@/components/spreads/ExperienceSpread';
import { SkillsSpread } from '@/components/spreads/SkillsSpread';
import { LabSpread } from '@/components/spreads/LabSpread';
import { LifestyleSpread } from '@/components/spreads/LifestyleSpread';
import { ContactSpread } from '@/components/spreads/ContactSpread';

const CHAPTER_IDS = CHAPTERS.map((c) => c.id);
const MIN_LOADER_MS = 1450;

export default function App() {
  const [loading, setLoading] = useState(true);
  const { activeId, setManualActive } = useActiveChapter(CHAPTER_IDS);

  useEffect(() => {
    const start = Date.now();
    let timeoutId = 0;
    let didHide = false;

    const hide = () => {
      if (didHide) return;
      didHide = true;
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
      timeoutId = window.setTimeout(() => setLoading(false), remaining);
    };

    const fallbackId = window.setTimeout(hide, MIN_LOADER_MS);

    if (document.readyState === 'complete') {
      hide();
    } else {
      window.addEventListener('load', hide, { once: true });
    }

    return () => {
      window.clearTimeout(fallbackId);
      window.clearTimeout(timeoutId);
      window.removeEventListener('load', hide);
    };
  }, []);

  return (
    <div className="min-h-screen bg-void text-text">
      {loading && <FlameWakeLoader />}

      <div
        className={loading ? 'pointer-events-none opacity-0' : 'opacity-100'}
        style={{
          transition: 'opacity 900ms cubic-bezier(0.22, 1, 0.36, 1)',
          transitionDelay: loading ? '0ms' : '50ms',
        }}
      >
        <MagazineShell activeId={activeId} onNavigate={setManualActive}>
          <HeroSpread />
          <StrengthsSpread />
          <EducationSpread />
          <ExperienceSpread />
          <SkillsSpread />
          <LabSpread />
          <LifestyleSpread />
          <ContactSpread />
        </MagazineShell>
      </div>
    </div>
  );
}
