import { gsap } from 'gsap';
import { SKILL_GROUPS } from '@/data/content';

export function SkillTree() {
  const handleEnter = (el: HTMLElement) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.to(el, { scale: 1.06, boxShadow: '0 0 16px rgba(201,169,110,0.35)', duration: 0.25 });
  };

  const handleLeave = (el: HTMLElement) => {
    gsap.to(el, { scale: 1, boxShadow: '0 0 0px rgba(201,169,110,0)', duration: 0.25 });
  };

  return (
    <>
      <div className="hidden md:block">
        <div className="relative mx-auto max-w-3xl py-8">
          <div className="mx-auto mb-10 w-fit border border-gold/40 bg-gold/10 px-6 py-3 text-center shadow-[0_0_28px_rgba(213,181,111,0.12)]">
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-gold">
              AI 产品经理
            </span>
          </div>
          <div className="editorial-rule mb-10" />
          <div className="grid grid-cols-3 gap-8">
            {SKILL_GROUPS.map((group) => (
              <div key={group.title} className="text-center">
                <h4 className="mb-4 font-[family-name:var(--font-display)] text-sm font-semibold text-gold">
                  {group.title}
                </h4>
                <div className="flex flex-col gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      ref={(node) => {
                        if (node) {
                          node.onmouseenter = () => handleEnter(node);
                          node.onmouseleave = () => handleLeave(node);
                        }
                      }}
                      className="cursor-default border border-gold/15 bg-surface/80 px-3 py-2 text-xs text-text/85"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6 md:hidden">
        {SKILL_GROUPS.map((group) => (
          <div key={group.title} className="editorial-card">
            <h4 className="mb-3 font-[family-name:var(--font-display)] text-base font-semibold text-gold">
              {group.title}
            </h4>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-gold/15 bg-surface px-2.5 py-1 text-xs text-text/85"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
