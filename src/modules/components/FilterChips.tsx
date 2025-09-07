import React from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';

interface Chip { label: string; value: string; type: 'group' | 'block' | 'category'; }
interface Props {
  group: number | null; setGroup: (g: number | null) => void;
  block: string | null; setBlock: (b: string | null) => void;
  category: string | null; setCategory: (c: string | null) => void;
}

const groups = [1,2,13,14,15,16,17,18];
const blocks = ['s','p','d','f'];
const categories = ['alkali metal','alkaline earth metal','transition metal','post-transition metal','metalloid','nonmetal','halogen','noble gas','lanthanide','actinide'];

export function FilterChips({ group, setGroup, block, setBlock, category, setCategory }: Props) {
  const renderChip = (chip: Chip) => {
    const active = (chip.type === 'group' && group === Number(chip.value)) || (chip.type === 'block' && block === chip.value) || (chip.type === 'category' && category === chip.value);
    const onClick = () => {
      if (chip.type === 'group') setGroup(active ? null : Number(chip.value));
      if (chip.type === 'block') setBlock(active ? null : chip.value);
      if (chip.type === 'category') setCategory(active ? null : chip.value);
    };
    return (
      <motion.button
        key={chip.type+chip.value}
        layout
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.94 }}
        onClick={onClick}
        aria-pressed={active}
        className={clsx('px-2 py-1 rounded-full text-xs font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500', active ? 'bg-brand-600 text-white border-brand-600 shadow' : 'bg-white/60 dark:bg-neutral-800/60 border-white/20 dark:border-white/10 hover:bg-white/80 dark:hover:bg-neutral-700/60')}
      >
        {chip.label}
      </motion.button>
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {groups.map(g => renderChip({ label: `G${g}`, value: String(g), type: 'group' }))}
      {blocks.map(b => renderChip({ label: b.toUpperCase(), value: b, type: 'block' }))}
      {categories.slice(0,6).map(c => renderChip({ label: c.split(' ')[0], value: c, type: 'category' }))}
    </div>
  );
}
