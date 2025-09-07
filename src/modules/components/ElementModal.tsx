import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ElementData } from '../types';

interface Props { open: boolean; element: ElementData | null; onClose: () => void; }

export function ElementModal({ open, element, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // focus trapping
  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement as HTMLElement;
      setTimeout(() => closeButtonRef.current?.focus(), 0);
      // Mark underlying app container inert via pointer-events none
  const appContainer = document.querySelector('[data-app-container]') as HTMLElement | null;
  if (appContainer) appContainer.setAttribute('inert','');
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') { onClose(); }
        if (e.key === 'Tab') {
          const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusable || focusable.length === 0) return;
          const first = focusable[0];
            const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      };
      document.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
      return () => { 
        document.removeEventListener('keydown', handler); 
        document.body.style.overflow='';
  if (appContainer) appContainer.removeAttribute('inert');
      };
    } else if (previouslyFocused.current) {
      previouslyFocused.current.focus();
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="element-title"
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <div className="absolute inset-0 grid place-items-center p-4">
            <motion.div
              ref={panelRef}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { type: 'spring', damping: 24, stiffness: 280 } }}
              exit={{ y: 24, opacity: 0 }}
              className="glass-panel relative w-full max-w-lg p-6 shadow-2xl"
            >
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="focus-ring absolute right-3 top-3 rounded-md p-2 text-neutral-600 hover:bg-neutral-200/70 dark:text-neutral-300 dark:hover:bg-neutral-700/50"
                aria-label="Close"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
              {element && (
                <div>
                  <h2 id="element-title" className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                    <span>{element.symbol}</span>
                    <span className="text-base font-medium text-neutral-500 dark:text-neutral-400">{element.name}</span>
                  </h2>
                  <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div><dt className="text-neutral-500 dark:text-neutral-400">Atomic #</dt><dd className="font-medium">{element.atomicNumber}</dd></div>
                    <div><dt className="text-neutral-500 dark:text-neutral-400">Atomic Mass</dt><dd className="font-medium">{element.atomicMass}</dd></div>
                    <div><dt className="text-neutral-500 dark:text-neutral-400">Group</dt><dd className="font-medium">{element.group}</dd></div>
                    <div><dt className="text-neutral-500 dark:text-neutral-400">Period</dt><dd className="font-medium">{element.period}</dd></div>
                    <div><dt className="text-neutral-500 dark:text-neutral-400">Block</dt><dd className="font-medium">{element.block}</dd></div>
                    <div><dt className="text-neutral-500 dark:text-neutral-400">Category</dt><dd className="font-medium capitalize">{element.category}</dd></div>
                  </dl>
                  <p className="mt-4 text-neutral-700 dark:text-neutral-200 text-sm leading-relaxed">{element.summary}</p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
