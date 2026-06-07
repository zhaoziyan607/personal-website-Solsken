import { ShinyText } from '@/components/effects/ShinyText';
import { CircularSparkGallery } from '@/components/gallery/CircularSparkGallery';
import { Spread } from '@/components/layout/Spread';

export function LifestyleSpread() {
  return (
    <Spread id="lifestyle">
      <div className="mb-10">
        <p className="chapter-label mb-4">06 / 生活体验</p>
        <h2 className="spread-title mb-4 text-3xl md:text-5xl"><ShinyText>火星</ShinyText></h2>
        <p className="body-copy text-muted">
          一些让生活保持温度的侧面：社交、审美、内观、食物、音乐和路上的风。
        </p>
      </div>

      <CircularSparkGallery />
    </Spread>
  );
}
