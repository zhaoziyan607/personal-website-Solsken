import { Flame, Sparkle } from 'lucide-react';
import { FIRE_ABILITIES } from '@/data/content';
import { ShinyText } from '@/components/effects/ShinyText';
import { SpotlightCard } from '@/components/effects/SpotlightCard';
import { Spread } from '@/components/layout/Spread';

export function StrengthsSpread() {
  return (
    <Spread id="strengths">
      <div className="mb-10">
        <p className="chapter-label mb-4">01 / 能力优势</p>
        <h2 className="spread-title mb-4 text-3xl md:text-5xl"><ShinyText>火光</ShinyText></h2>
        <p className="body-copy text-muted">
          用五束火光解释我的核心优势：理解 AI、落地产品、评估效果、推进协作，也保留人的敏感度。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {FIRE_ABILITIES.map((item, index) => (
          <SpotlightCard
            key={item.title}
            className={`map-card ${index === 0 ? 'md:col-span-2' : ''}`}
            spotlightColor="rgba(239,143,69,0.22)"
            tilt
          >
            <div className="relative h-full pr-0 md:pr-28">
              <div className="absolute top-0 right-0 hidden rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold md:block">
                {item.label}
              </div>
              <div className="min-w-0">
                <div className="mb-3 flex items-center gap-2 text-gold">
                  <Flame size={16} />
                  <span className="text-sm uppercase" style={{ letterSpacing: '0.14em' }}>
                    ember {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-text">
                  {item.title}
                </h3>
                <span className="mt-3 inline-flex rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold md:hidden">
                  {item.label}
                </span>
                <p className="body-copy mt-3 text-text/88">{item.summary}</p>
                <p className="caption-copy mt-3 leading-relaxed">{item.detail}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.evidence.map((evidence) => (
                    <span key={evidence} className="route-chip border-flame/25 bg-flame/10 text-paper">
                      <Sparkle size={13} />
                      {evidence}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </Spread>
  );
}
