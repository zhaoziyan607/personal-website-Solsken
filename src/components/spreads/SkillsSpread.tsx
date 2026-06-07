import type { CSSProperties } from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { SKILL_FLAME_LAYERS } from '@/data/content';
import { AiToolConstellation } from '@/components/skills/AiToolConstellation';
import { ShinyText } from '@/components/effects/ShinyText';
import { Spread } from '@/components/layout/Spread';

export function SkillsSpread() {
  return (
    <Spread id="skills" className="overflow-hidden">
      <div className="mb-10">
        <p className="chapter-label mb-4">04 / 技能拆解</p>
        <h2 className="spread-title mb-3 text-3xl md:text-5xl"><ShinyText>火焰</ShinyText></h2>
        <p className="body-copy text-muted">
          三层火焰拆解我的 AI 产品能力；日常星盘展示我如何把 AI 工具自然放进学习、创作、编码和思考。
        </p>
      </div>

      <div className="grid min-w-0 gap-10 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:items-center xl:gap-14">
        <div className="skill-flame-stage">
          <motion.div
            className="skill-flame"
            animate={{ scale: [1, 1.018, 0.996, 1], filter: ['brightness(1)', 'brightness(1.08)', 'brightness(0.98)', 'brightness(1)'] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            {SKILL_FLAME_LAYERS.map((layer, index) => (
              <div key={layer.id} className={`flame-layer flame-layer-${layer.intensity}`}>
                <motion.div
                  className="flame-layer-inner"
                  animate={{ opacity: [0.86, 1, 0.9], y: [0, -4, 0] }}
                  transition={{ duration: 3.2 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <p>{layer.title}</p>
                  <span>{layer.subtitle}</span>
                  <div className="flame-layer-tags">
                    {layer.skills.slice(0, 4).map((skill) => (
                      <em key={skill}>{skill}</em>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="skill-layer-deck min-w-0">
          {SKILL_FLAME_LAYERS.map((layer) => (
            <section
              key={layer.id}
              className={`map-card skill-layer-card skill-layer-card-${layer.intensity}`}
              style={{ '--layer-accent': layer.accent } as CSSProperties}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="chapter-label mb-2">{layer.subtitle}</p>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-text">
                    {layer.title}
                  </h3>
                </div>
                <Sparkles className="shrink-0 text-gold" size={20} />
              </div>
              <div className="flex flex-wrap gap-2">
                {layer.skills.map((skill) => (
                  <span key={skill} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <AiToolConstellation />
    </Spread>
  );
}
