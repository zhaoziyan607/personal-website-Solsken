import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

type SwipeDirection = 1 | -1;

type SwipeNavigationOptions<T extends HTMLElement> = {
  ref: RefObject<T | null>;
  onSwipe: (direction: SwipeDirection) => void;
  minDistance?: number;
  axisLockRatio?: number;
  cooldownMs?: number;
};

type SwipeStart = {
  pointerId: number;
  x: number;
  y: number;
  lockedAxis: 'horizontal' | 'vertical' | null;
};

export function useSwipeNavigation<T extends HTMLElement>({
  ref,
  onSwipe,
  minDistance = 48,
  axisLockRatio = 1.25,
  cooldownMs = 820,
}: SwipeNavigationOptions<T>) {
  const onSwipeRef = useRef(onSwipe);
  const startRef = useRef<SwipeStart | null>(null);
  const lastSwipeAtRef = useRef(0);
  const suppressClickUntilRef = useRef(0);

  useEffect(() => {
    onSwipeRef.current = onSwipe;
  }, [onSwipe]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const target = element;

    function resetSwipe() {
      startRef.current = null;
    }

    function handlePointerDown(event: PointerEvent) {
      if (event.pointerType === 'mouse') return;
      startRef.current = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        lockedAxis: null,
      };
      target.setPointerCapture?.(event.pointerId);
    }

    function handlePointerMove(event: PointerEvent) {
      const start = startRef.current;
      if (!start || start.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - start.x;
      const deltaY = event.clientY - start.y;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (!start.lockedAxis && (absX > 8 || absY > 8)) {
        start.lockedAxis = absX > absY * axisLockRatio ? 'horizontal' : 'vertical';
      }

      if (start.lockedAxis === 'horizontal') {
        event.preventDefault();
      }
    }

    function handlePointerUp(event: PointerEvent) {
      const start = startRef.current;
      if (!start || start.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - start.x;
      const deltaY = event.clientY - start.y;
      const isHorizontalSwipe =
        start.lockedAxis === 'horizontal' &&
        Math.abs(deltaX) >= minDistance &&
        Math.abs(deltaX) > Math.abs(deltaY) * axisLockRatio;

      resetSwipe();

      if (!isHorizontalSwipe) return;

      const now = performance.now();
      if (now - lastSwipeAtRef.current < cooldownMs) return;

      lastSwipeAtRef.current = now;
      suppressClickUntilRef.current = now + 350;
      event.preventDefault();
      onSwipeRef.current(deltaX < 0 ? 1 : -1);
    }

    function handleClick(event: MouseEvent) {
      if (performance.now() > suppressClickUntilRef.current) return;
      event.preventDefault();
      event.stopPropagation();
    }

    target.addEventListener('pointerdown', handlePointerDown);
    target.addEventListener('pointermove', handlePointerMove);
    target.addEventListener('pointerup', handlePointerUp);
    target.addEventListener('pointercancel', resetSwipe);
    target.addEventListener('click', handleClick, true);

    return () => {
      target.removeEventListener('pointerdown', handlePointerDown);
      target.removeEventListener('pointermove', handlePointerMove);
      target.removeEventListener('pointerup', handlePointerUp);
      target.removeEventListener('pointercancel', resetSwipe);
      target.removeEventListener('click', handleClick, true);
    };
  }, [axisLockRatio, cooldownMs, minDistance, ref]);
}
