import { motion } from 'motion/react';
import { ElementData } from '../types';
import React from 'react';

interface Props { el: ElementData; onOpen: () => void; index: number; }

export const ElementCard = React.forwardRef<HTMLButtonElement, Props>(function ElementCard({ el, onOpen }, ref) {
  return (
    <motion.button
      ref={ref}
      layout
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); }}}
  className="glass-panel focus-ring group relative flex flex-col justify-between p-2 text-left text-xs transition-shadow hover:shadow-lg"
      aria-label={`${el.name} details`}
      data-atomic-number={el.atomicNumber}
    >
      <div className="flex items-start justify-between">
        <span className="font-medium text-neutral-600 dark:text-neutral-300 text-[10px] leading-none">{el.atomicNumber}</span>
        <span className="h-2 w-2 rounded-full shadow" style={{ background: el.color }} />
      </div>
      <div>
        <div className="mt-1 text-center text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 select-none">{el.symbol}</div>
        <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate text-center">{el.name}</div>
      </div>
  {/* compare UI removed */}
    </motion.button>
  );
});
