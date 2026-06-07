import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { JOURNEY_NODES } from '@/data/content';
import { ShinyText } from '@/components/effects/ShinyText';
import { SpotlightCard } from '@/components/effects/SpotlightCard';
import { Spread } from '@/components/layout/Spread';

export function ExperienceSpread() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Spread id="experience">
      <div className="mb-12">
        <p className="chapter-label mb-4">03 / 实习经历</p>
        <h2 className="spread-title mb-4 text-3xl md:text-5xl"><ShinyText>火堆</ShinyText></h2>
        <p className="body-copy text-muted">
          五段实习像一路添柴：从 G 端大模型到 C 端图创，把不同业务场景烧成可复盘的产品经验。
        </p>
      </div>

      <div className="relative">
        <div className="journey-line hidden md:block" />
        <div className="space-y-6">
          {JOURNEY_NODES.map((node, index) => {
            const isOpen = openIndex === index;
            const alignRight = index % 2 === 1;
            const card = (
              <SpotlightCard
                className="map-card journey-card"
                spotlightColor={isOpen ? 'rgba(239,143,69,0.24)' : 'rgba(213,181,111,0.14)'}
                tilt
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full text-left"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="caption-copy mb-2 text-gold">
                        {node.motif} · {node.period}
                      </p>
                      <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                        {node.company}
                      </h3>
                      <p className="body-copy mt-1 text-muted">{node.role}</p>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`mt-2 shrink-0 text-gold transition ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                  <p className="body-copy mt-4 text-text/90">{node.summary}</p>
                </button>

                {isOpen && (
                  <div className="mt-6 space-y-4 border-t border-gold/15 pt-5">
                    {node.projects.map((project) => (
                      <div key={project.title} className="border-l border-gold/35 pl-4">
                        <h4 className="text-base font-semibold text-text">{project.title}</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {project.metrics.map((metric) => (
                            <span key={metric} className="bg-gold/10 px-2 py-1 text-sm text-gold">
                              {metric}
                            </span>
                          ))}
                        </div>
                        <p className="caption-copy mt-2 leading-relaxed">{project.detail}</p>
                      </div>
                    ))}
                  </div>
                )}
              </SpotlightCard>
            );

            return (
              <div
                key={node.company}
                className="journey-node relative grid items-start gap-5 md:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)]"
              >
                <div className={alignRight ? 'hidden md:block' : 'md:col-start-1'}>{!alignRight && card}</div>
                <div className="z-10 hidden justify-center md:flex">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(index)}
                    className={`flex h-12 w-12 items-center justify-center border transition ${
                      isOpen
                        ? 'border-flame bg-flame text-void shadow-[0_0_26px_rgba(239,143,69,0.45)]'
                        : 'border-gold/35 bg-void text-gold hover:border-gold'
                    }`}
                    aria-label={`查看 ${node.company}`}
                  >
                    <MapPin size={20} />
                  </button>
                </div>
                <div className={alignRight ? 'md:col-start-3' : 'hidden md:block'}>{alignRight && card}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Spread>
  );
}
