import type { ReactNode } from 'react';
import { ChapterIndex } from '@/components/nav/ChapterIndex';
import { AmbientLightField } from '@/components/effects/AmbientLightField';

type MagazineShellProps = {
  children: ReactNode;
  activeId: string;
  onNavigate: (id: string) => void;
};

export function MagazineShell({ children, activeId, onNavigate }: MagazineShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-void">
      <AmbientLightField />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[44rem] bg-[radial-gradient(circle_at_50%_0%,rgba(239,143,69,0.18),transparent_58%)]"
      />
      <ChapterIndex activeId={activeId} onNavigate={onNavigate} />
      <main className="relative z-10 pt-16">{children}</main>
    </div>
  );
}
