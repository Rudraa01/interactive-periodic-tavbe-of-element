import React from 'react';
import { MagnifyingGlassIcon, FunnelIcon, MoonIcon, SunIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
  search: string; onSearch: (v: string) => void; dark: boolean; toggleDark: () => void;
  group: number | null; setGroup: (g: number | null) => void; block: string | null; setBlock: (b: string | null) => void; clearFilters: () => void; category?: string | null; setCategory?: (c: string | null) => void; chips?: React.ReactNode;
}

const groupOptions = [1,2,13,14,15,16,17,18];
const blockOptions = ['s','p'];

export function Toolbar({ search, onSearch, dark, toggleDark, group, setGroup, block, setBlock, clearFilters, chips }: Props) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-neutral-900/70 border-b border-white/20 dark:border-white/10">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <h1 className="text-lg font-semibold tracking-tight">Periodic Table</h1>
        <div className="relative flex-1 max-w-xs">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search"
            className="w-full rounded-md border border-white/20 bg-white/60 pl-7 pr-2 py-1.5 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-neutral-800/60"
            aria-label="Search elements"
          />
        </div>
        {chips && (
          <div className="hidden lg:flex items-center gap-2 flex-wrap max-w-3xl">
            <FunnelIcon className="h-4 w-4 text-neutral-500" />
            {chips}
            {(group !== null || block) && (
              <button
                onClick={clearFilters}
                aria-label="Clear filters"
                className="rounded-md p-1.5 border border-white/20 bg-white/60 dark:bg-neutral-800/60 hover:bg-white/80 dark:hover:bg-neutral-700/60 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
        <button
          onClick={toggleDark}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          className="rounded-md p-2 border border-white/20 dark:border-white/10 bg-white/60 dark:bg-neutral-800/60 hover:bg-white/80 dark:hover:bg-neutral-700/60 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          {dark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}
