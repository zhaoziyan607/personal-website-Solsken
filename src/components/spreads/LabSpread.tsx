import { motion } from 'motion/react';
import { FlaskConical } from 'lucide-react';
import { LAB_PROJECTS } from '@/data/content';
import { ShinyText } from '@/components/effects/ShinyText';
import { SpotlightCard } from '@/components/effects/SpotlightCard';
import { Spread } from '@/components/layout/Spread';

export function LabSpread() {
  return (
    <Spread id="lab">
      <div className="mb-10">
        <p className="chapter-label mb-4">05 / 学习探索</p>
        <h2 className="spread-title mb-4 text-3xl md:text-5xl"><ShinyText>火花</ShinyText></h2>
        <p className="body-copy text-muted">
          这些不是摆在作品集里的装饰，而是我把产品想法、AI 工具和 vibe coding 真正拧到一起的尝试。
        </p>
      </div>

      <div className="magic-bento-grid">
        {LAB_PROJECTS.map((project, index) => (
          <SpotlightCard
            key={project.name}
            className={`magic-bento-card ${index === 0 ? 'is-primary' : ''}`}
            spotlightColor="rgba(242,219,164,0.24)"
            tilt
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center border border-flame/35 bg-flame/10 text-flame">
                  <FlaskConical size={20} />
                </div>
                <div>
                  <p className="caption-copy text-gold">{project.status}</p>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                    {project.name}
                  </h3>
                </div>
              </div>
              <span className="text-sm text-gold">{project.progress}%</span>
            </div>

            <div className="mb-5 h-1 bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${project.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-gold to-flame"
              />
            </div>

            <p className="body-copy font-medium text-text/90">{project.tagline}</p>
            <p className="body-copy mt-3 text-muted">{project.description}</p>
            <p className="caption-copy mt-3 leading-relaxed">{project.painPoint}</p>
          </SpotlightCard>
        ))}
      </div>
    </Spread>
  );
}
