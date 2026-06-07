import { useEffect, useMemo, useState } from 'react';

type TypewriterLineProps = {
  lines: string[];
  className?: string;
};

export function TypewriterLine({ lines, className = '' }: TypewriterLineProps) {
  const safeLines = useMemo(() => lines.filter(Boolean), [lines]);
  const [text, setText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (safeLines.length === 0) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || safeLines.length === 1) {
      setText(safeLines[0]);
      return;
    }

    const currentLine = safeLines[lineIndex] ?? safeLines[0];
    const pauseAtEnd = !deleting && charIndex === currentLine.length;
    const pauseAtStart = deleting && charIndex === 0;
    const delay = pauseAtEnd ? 1250 : pauseAtStart ? 260 : deleting ? 34 : 58;

    const timer = window.setTimeout(() => {
      if (pauseAtEnd) {
        setDeleting(true);
        return;
      }

      if (pauseAtStart) {
        setDeleting(false);
        setLineIndex((index) => (index + 1) % safeLines.length);
        return;
      }

      const nextIndex = deleting ? charIndex - 1 : charIndex + 1;
      setCharIndex(nextIndex);
      setText(currentLine.slice(0, nextIndex));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charIndex, deleting, lineIndex, safeLines]);

  return (
    <p className={`typewriter-line ${className}`} aria-label={safeLines.join('；')}>
      <span>{text || '\u00a0'}</span>
      <span className="typewriter-caret" aria-hidden="true" />
    </p>
  );
}
