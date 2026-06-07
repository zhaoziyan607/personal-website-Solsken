import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { AI_TOOL_SCENARIOS, AI_TOOLS_META } from '@/data/content';

const TOOL_STARS = [
  'ChatGPT',
  'Codex',
  'Claude',
  'Claude Code',
  'Gemini',
  'AI Studio',
  'Antigravity',
  'Grok',
  'DeepSeek',
  '豆包',
  'Coze',
  'Kimi',
  '千问',
  '文心',
  '智谱清言',
  'Minimax',
  '秘塔 AI',
  'Suno',
  'NotebookLM',
  '…',
];

const PUSH_RADIUS = 88;
const PUSH_MAX = 20;

export function AiToolConstellation() {
  const [activeId, setActiveId] = useState(AI_TOOL_SCENARIOS[0]?.id ?? '');
  const activeScenario = AI_TOOL_SCENARIOS.find((item) => item.id === activeId) ?? AI_TOOL_SCENARIOS[0];
  const starfieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = starfieldRef.current;
    if (!container || window.matchMedia('(hover: none)').matches) return;

    function onMove(e: PointerEvent) {
      const stars = container!.querySelectorAll<HTMLSpanElement>('.tool-star');
      stars.forEach((star) => {
        const r = star.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < PUSH_RADIUS) {
          const t = 1 - dist / PUSH_RADIUS;
          const force = t * t * PUSH_MAX;
          const angle = Math.atan2(dy, dx);
          star.style.transform = `translate(${(-Math.cos(angle) * force).toFixed(1)}px, ${(-Math.sin(angle) * force).toFixed(1)}px)`;
        } else {
          star.style.transform = '';
        }
      });
    }

    function onLeave() {
      const stars = container!.querySelectorAll<HTMLSpanElement>('.tool-star');
      stars.forEach((star) => { star.style.transform = ''; });
    }

    container.addEventListener('pointermove', onMove);
    container.addEventListener('pointerleave', onLeave);
    return () => {
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section className="ai-constellation mt-16 md:mt-20">
      <div className="editorial-rule mb-10" />

      <div className="mb-8">
        <p className="chapter-label mb-3">04-B / AI 工具日常星盘</p>
        <h3 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-text md:text-4xl">
          {AI_TOOLS_META.headline}
        </h3>
        <p className="body-copy mt-3 text-muted">
          10+ 个日常场景、20+ 款工具，描绘我和 AI 真实相处的样子——不只会用，是养成了习惯。
        </p>
      </div>

      <div className="orbit-constellation" data-active={activeId}>
        <div className="orbit-stage">
          <div className="orbit-ring orbit-ring-a" />
          <div className="orbit-ring orbit-ring-b" />
          <div className="orbit-ring orbit-ring-c" />

          <div className="orbit-planet">
            <span>10+</span>
            <p>AI Scenes</p>
            <em>20+ tools in daily use</em>
          </div>
        </div>

        <div className="orbit-scenario-panel">
          <p className="chapter-label mb-3">Hover Scene</p>
          <div className="orbit-scenario-glyph" style={{ '--panel-hue': activeScenario.hue } as CSSProperties}>
            {activeScenario.glyph}
          </div>
          <h4>{activeScenario.scene}</h4>
          <p>{activeScenario.desc}</p>
        </div>
      </div>

      <div className="scenario-star-grid" aria-label="AI 工具应用场景">
        {AI_TOOL_SCENARIOS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`scenario-star-pill${activeId === item.id ? ' is-active' : ''}`}
            style={{ '--star-hue': item.hue } as CSSProperties}
            onMouseEnter={() => setActiveId(item.id)}
            onFocus={() => setActiveId(item.id)}
            onClick={() => setActiveId(item.id)}
          >
            <span>{item.glyph}</span>
            {item.scene}
          </button>
        ))}
      </div>

      <div ref={starfieldRef} className="tool-starfield" aria-label="常用 AI 工具">
        {TOOL_STARS.map((tool, index) => (
          <span
            key={tool}
            className="tool-star"
            style={{ '--tool-index': index } as CSSProperties}
          >
            {tool}
          </span>
        ))}
      </div>
    </section>
  );
}
