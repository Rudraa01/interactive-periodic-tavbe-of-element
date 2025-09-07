import React, { useCallback, useMemo, useRef } from 'react';
import { ElementData } from '../types';
import { ElementCard } from './ElementCard';
import { getPosition } from '../../modules/layout/positions';

interface Props { elements: ElementData[]; onOpen: (el: ElementData) => void; }

// Minimal layout mapping for first 20 elements using CSS grid column start based on real periodic positions.
// This is easily extendable when adding more elements.
const positionMap: Record<number, { col: number; row: number }> = {
  1: { col: 1, row: 1 }, // H
  2: { col: 18, row: 1 }, // He
  3: { col: 1, row: 2 }, // Li
  4: { col: 2, row: 2 }, // Be
  5: { col: 13, row: 2 }, // B
  6: { col: 14, row: 2 }, // C
  7: { col: 15, row: 2 }, // N
  8: { col: 16, row: 2 }, // O
  9: { col: 17, row: 2 }, // F
  10: { col: 18, row: 2 }, // Ne
  11: { col: 1, row: 3 }, // Na
  12: { col: 2, row: 3 }, // Mg
  13: { col: 13, row: 3 }, // Al
  14: { col: 14, row: 3 }, // Si
  15: { col: 15, row: 3 }, // P
  16: { col: 16, row: 3 }, // S
  17: { col: 17, row: 3 }, // Cl
  18: { col: 18, row: 3 }, // Ar
  19: { col: 1, row: 4 }, // K
  20: { col: 2, row: 4 }, // Ca
};

export function PeriodicGrid({ elements, onOpen }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const sorted = useMemo(() => [...elements].sort((a, b) => a.atomicNumber - b.atomicNumber), [elements]);

  const handleKeyNav = useCallback((e: React.KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (!target || target.tagName !== 'BUTTON') return;
    const order = sorted.map(e => e.atomicNumber);
    const currentAtomic = Number(target.getAttribute('data-atomic-number'));
    const currentIndex = order.indexOf(currentAtomic);
    if (currentIndex === -1) return;
    const move = (delta: number) => {
      const next = order[currentIndex + delta];
      if (next) {
        const btn = containerRef.current?.querySelector(`button[data-atomic-number='${next}']`) as HTMLElement | null;
        if (btn) { btn.focus(); }
      }
    };
    switch (e.key) {
      case 'ArrowRight': e.preventDefault(); move(1); break;
      case 'ArrowLeft': e.preventDefault(); move(-1); break;
      case 'ArrowDown': e.preventDefault(); move(1); break; // simplified vertical nav for early subset
      case 'ArrowUp': e.preventDefault(); move(-1); break;
      default: return;
    }
  }, [sorted]);

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyNav}
      className="relative mx-auto grid w-full max-w-7xl gap-2 p-4 grid-cols-2 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-18 auto-rows-[minmax(4.5rem,5rem)]"
      aria-label="Periodic table"
    >
      {sorted.map(el => {
        // On small screens (below sm), we ignore explicit periodic positioning for a simple 2-col flow
        const isSmall = typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches;
        const pos = !isSmall ? (positionMap[el.atomicNumber] || getPosition(el.atomicNumber)) : undefined;
        const style: React.CSSProperties = pos ? { gridColumnStart: pos.col, gridRowStart: pos.row } : {};
        return (
          <div key={el.id} style={style} className="contents">
            <ElementCard
              el={el}
              onOpen={() => onOpen(el)}
              index={el.atomicNumber}
              // compare removed
            />
          </div>
        );
      })}
    </div>
  );
}
