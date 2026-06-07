import { BookOpen, GraduationCap, Landmark, PenLine, Users } from 'lucide-react';
import { CAMPUS_LANDMARKS, EDUCATION } from '@/data/content';
import { ShinyText } from '@/components/effects/ShinyText';
import { SpotlightCard } from '@/components/effects/SpotlightCard';
import { Spread } from '@/components/layout/Spread';

export function EducationSpread() {
  return (
    <Spread id="education">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="chapter-label mb-4">02 / 教育背景</p>
          <h2 className="spread-title mb-4 text-3xl md:text-5xl"><ShinyText>火种</ShinyText></h2>
          <p className="body-copy text-muted">
            武大的社会科学训练是我的底层火种：理解人、制度和公共问题，再把理解落到产品功能、流程与指标里。
          </p>

          <div className="map-card mt-8">
            <div className="mb-5 flex items-start gap-4">
              <GraduationCap size={30} className="shrink-0 text-gold" />
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                  {EDUCATION.school}
                </h3>
                <p className="mt-1 text-muted">{EDUCATION.college}</p>
                <p className="caption-copy mt-1">{EDUCATION.period}</p>
              </div>
            </div>
            <div className="grid gap-3">
              {EDUCATION.bridge.map((item) => (
                <div key={item.title} className="border-l border-gold/35 pl-4">
                  <p className="text-sm font-semibold text-gold">{item.title}</p>
                  <p className="caption-copy mt-1 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {CAMPUS_LANDMARKS.map((item, index) => (
            <SpotlightCard key={item.title} className="map-card" spotlightColor="rgba(213,181,111,0.18)" tilt>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/35 bg-gold/10 text-gold">
                  {index === 0 ? <Landmark size={20} /> : index === 1 ? <Users size={20} /> : <BookOpen size={20} />}
                </div>
                <div>
                  <div className="mb-1 flex flex-wrap items-baseline gap-3">
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                      {item.title}
                    </h3>
                    <span className="caption-copy text-gold">{item.badge}</span>
                  </div>
                  <p className="body-copy text-muted">{item.detail}</p>
                </div>
              </div>
            </SpotlightCard>
          ))}

          <div className="border border-white/10 bg-surface/60 p-4">
            <div className="mb-3 flex items-center gap-2 text-gold">
              <PenLine size={17} />
              <p className="chapter-label">Campus Practice</p>
            </div>
            <p className="caption-copy leading-relaxed">{EDUCATION.campus.join(' · ')}</p>
          </div>
        </div>
      </div>
    </Spread>
  );
}
