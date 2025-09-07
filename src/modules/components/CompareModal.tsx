import React, { useEffect, useRef } from 'react';
import { ElementData } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Props { open: boolean; elements: ElementData[]; onClose: () => void; }

const CompareModal: React.FC<Props> = ({ open, elements, onClose }) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => { if (open) setTimeout(()=>closeRef.current?.focus(),0); }, [open]);
  useEffect(() => {
    if (!open) return; 
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="compare-title" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <div className="absolute inset-0 grid place-items-center p-4">
            <motion.div initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.95,opacity:0}} className="glass-panel w-full max-w-4xl p-6">
              <button ref={closeRef} onClick={onClose} aria-label="Close compare" className="focus-ring absolute right-4 top-4 rounded-md p-2 hover:bg-neutral-200/60 dark:hover:bg-neutral-700/50">
                <XMarkIcon className="h-5 w-5" />
              </button>
              <h2 id="compare-title" className="text-xl font-semibold tracking-tight mb-4">Compare Elements</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {elements.map(el => (
                  <div key={el.atomicNumber} className="rounded-lg border border-white/20 p-4 bg-white/60 dark:bg-neutral-800/60">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold flex items-baseline gap-2"><span>{el.symbol}</span><span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{el.name}</span></div>
                      <span className="h-3 w-3 rounded-full" style={{background: el.color}} />
                    </div>
                    <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div><dt className="text-neutral-500 dark:text-neutral-400">Atomic #</dt><dd className="font-medium">{el.atomicNumber}</dd></div>
                      <div><dt className="text-neutral-500 dark:text-neutral-400">Mass</dt><dd className="font-medium">{el.atomicMass}</dd></div>
                      <div><dt className="text-neutral-500 dark:text-neutral-400">Group</dt><dd className="font-medium">{el.group}</dd></div>
                      <div><dt className="text-neutral-500 dark:text-neutral-400">Period</dt><dd className="font-medium">{el.period}</dd></div>
                      <div><dt className="text-neutral-500 dark:text-neutral-400">Block</dt><dd className="font-medium">{el.block.toUpperCase()}</dd></div>
                      <div><dt className="text-neutral-500 dark:text-neutral-400">Category</dt><dd className="font-medium capitalize">{el.category}</dd></div>
                    </dl>
                    <p className="mt-3 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300 line-clamp-4">{el.summary}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompareModal;
