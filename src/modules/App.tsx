import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useElements } from './hooks/useElements';
import { PeriodicGrid } from './components/PeriodicGrid';
import { ElementData } from './types';
import { Toolbar } from './components/Toolbar';
import { FilterChips } from './components/FilterChips';
import { Footer } from './components/Footer';

const ElementModal = lazy(() => import('./components/ElementModal').then(m => ({ default: m.ElementModal })));

export function App() {
  const [search, setSearch] = useState('');
  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') return true; if (stored === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [selected, setSelected] = useState<ElementData | null>(null);
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState<number | null>(null);
  const [block, setBlock] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const elements = useElements({ search, group, block, category });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) { root.classList.add('dark'); localStorage.setItem('theme','dark'); }
    else { root.classList.remove('dark'); localStorage.setItem('theme','light'); }
  }, [dark]);

  const handleOpen = useCallback((el: ElementData) => { setSelected(el); setOpen(true); }, []);
  const handleClose = useCallback(() => { setOpen(false); setTimeout(() => setSelected(null), 200); }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col flex-1" data-app-container aria-hidden={open ? 'true' : undefined}>
        <Toolbar 
          search={search} 
          onSearch={setSearch} 
          dark={dark} 
          toggleDark={() => setDark(d => !d)} 
          group={group} 
          setGroup={setGroup} 
          block={block} 
          setBlock={setBlock} 
          clearFilters={() => { setGroup(null); setBlock(null); setCategory(null); }}
          chips={<FilterChips group={group} setGroup={setGroup} block={block} setBlock={setBlock} category={category} setCategory={setCategory} />}
        />
        <main className="flex-1">
          <PeriodicGrid elements={elements} onOpen={handleOpen} />
        </main>
  <Footer />
      </div>
      <Suspense fallback={<div className="p-6 text-sm">Loading details…</div>}>
        <ElementModal open={open} element={selected} onClose={handleClose} />
      </Suspense>
    </div>
  );
}
