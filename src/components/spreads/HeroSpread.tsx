import { Download, Flame, Sparkles } from 'lucide-react';
import { GALLERY_IMAGES, HERO_STATEMENT, HERO_TYPEWRITER_LINES } from '@/data/content';
import { PressureText } from '@/components/effects/PressureText';
import { TypewriterLine } from '@/components/effects/TypewriterLine';
import { HeroPhotoDeck } from '@/components/gallery/HeroPhotoDeck';
import { Spread } from '@/components/layout/Spread';

export function HeroSpread() {
  return (
    <Spread
      id="hero"
      fullWidth
      reveal="immediate"
      className="!min-h-[calc(100svh-1rem)] !px-4 !pt-20 !pb-14 md:!px-8 md:!pt-24 md:!pb-20 lg:!px-12"
    >
      <div className="mx-auto grid min-h-[calc(100svh-7rem)] w-full max-w-7xl min-w-0 items-center gap-7 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)]">
        <div className="relative min-w-0 lg:max-w-[34rem] xl:max-w-[38rem]">
          <div className="pointer-events-none absolute -top-8 -left-4 z-10 hidden items-center gap-2 text-gold/70 lg:flex">
            <Sparkles size={16} />
            <span className="text-xs uppercase" style={{ letterSpacing: '0.18em' }}>
              moving archive
            </span>
          </div>
          <HeroPhotoDeck images={GALLERY_IMAGES} />
        </div>

        <div className="relative flex min-w-0 flex-col justify-center lg:py-8">
          <div className="mb-6 inline-flex w-fit items-center gap-2 border border-gold/25 bg-gold/10 px-3 py-1 text-sm text-gold">
            <Flame size={15} />
            {HERO_STATEMENT.eyebrow}
          </div>

          <p className="mb-3 font-[family-name:var(--font-display)] text-3xl text-gold md:text-5xl">
            {HERO_STATEMENT.signature}
          </p>
          <h1 className="spread-title max-w-[12ch] text-[2.45rem] leading-[1.08] break-keep whitespace-normal md:max-w-[12ch] md:text-6xl lg:max-w-[12ch] lg:text-7xl xl:text-[5.7rem]">
            <PressureText text={HERO_STATEMENT.headline} />
          </h1>

          <TypewriterLine lines={HERO_TYPEWRITER_LINES} className="mt-5 max-w-2xl" />

          <div className="editorial-rule my-6 max-w-xl" />
          <p className="body-copy max-w-2xl text-text/92">{HERO_STATEMENT.intro}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {HERO_STATEMENT.badges.map((badge) => (
              <span key={badge} className="route-chip">
                <span className="h-1.5 w-1.5 rounded-full bg-flame shadow-[0_0_10px_rgba(239,143,69,0.8)]" />
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 border border-gold bg-gold px-6 py-3 text-sm font-semibold text-void transition hover:bg-text"
            >
              <Download size={16} />
              下载简历
            </a>
          </div>
        </div>
      </div>
    </Spread>
  );
}
