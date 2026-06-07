import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { Download } from 'lucide-react';
import { CHAPTERS } from '@/data/content';
import { FlameLogo } from '@/components/brand/FlameLogo';

type ChapterIndexProps = {
  activeId: string;
  onNavigate: (id: string) => void;
};

const NAV_CHAPTERS = CHAPTERS;

export function ChapterIndex({ activeId, onNavigate }: ChapterIndexProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const activeLink = navRef.current?.querySelector<HTMLAnchorElement>('a[aria-current="page"]');
    activeLink?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [activeId]);

  function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    onNavigate(id);
    section.scrollIntoView({ block: 'start', behavior: 'smooth' });

    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, '', `#${id}`);
    }
  }

  return (
    <header className="glass-nav fixed top-0 right-0 left-0 z-50">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 py-3 md:gap-3 md:px-8">
        <a
          href="#hero"
          onClick={(event) => handleAnchorClick(event, 'hero')}
          className="group flex shrink-0 items-center gap-1.5 md:gap-2.5"
        >
          <FlameLogo size={22} className="text-gold md:h-[26px] md:w-[26px]" />
          <span className="font-[family-name:var(--font-display)] text-sm font-semibold text-text transition group-hover:text-gold md:text-base">
            solsken
          </span>
        </a>

        <nav ref={navRef} className="min-w-0 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="gooey-nav flex items-center justify-start gap-0.5 md:justify-center md:gap-2">
            {NAV_CHAPTERS.map((chapter) => {
              const isActive = chapter.id === activeId;
              return (
                <li key={chapter.id} className="shrink-0">
                  <a
                    href={`#${chapter.id}`}
                    onClick={(event) => handleAnchorClick(event, chapter.id)}
                    className={`gooey-nav-link relative block px-1.5 py-1.5 font-[family-name:var(--font-display)] text-xs whitespace-nowrap transition sm:text-sm md:px-3 md:text-[0.95rem] ${
                      isActive ? 'text-gold drop-shadow-[0_0_10px_rgba(213,181,111,0.45)]' : 'text-muted hover:text-text'
                    }`}
                    data-active={isActive}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {chapter.label}
                    {isActive && (
                      <span className="absolute right-2 bottom-0 left-2 h-px bg-gradient-to-r from-transparent via-gold to-transparent md:right-3 md:left-3" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href="/resume.pdf"
          download
          aria-label="下载简历"
          title="下载简历"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-gold/60 bg-gold/10 text-sm font-medium tracking-wide text-gold transition hover:bg-gold hover:text-void md:w-auto md:gap-2 md:px-4"
        >
          <Download size={14} />
          <span className="hidden md:inline">下载简历</span>
        </a>
      </div>
    </header>
  );
}
