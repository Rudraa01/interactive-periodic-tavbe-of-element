import React from 'react';

interface SocialLink { href: string; label: string; }

const socials: SocialLink[] = [
  { href: 'https://instagram.com/_rudra.aaaaa', label: 'Instagram' },
  { href: 'https://www.linkedin.com/in/rudra-vishwakarma-272326378', label: 'LinkedIn' },
  { href: 'https://github.com/rudraa01', label: 'GitHub' },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-8 border-t border-black/5 dark:border-white/10 py-6 text-xs text-neutral-600 dark:text-neutral-400 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="tracking-tight">© {year} AtomGrid. All rights reserved.</p>
        <nav aria-label="Social links" className="flex gap-4">
          {socials.map(s => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-sm"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
