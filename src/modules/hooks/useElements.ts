import elements from '../../data/elements.json';
import { ElementData } from '../types';
import { useMemo } from 'react';

export function useElements(filter: { search?: string; group?: number | null; block?: string | null; category?: string | null }) {
  return useMemo(() => {
    let list = elements as ElementData[];
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(e => e.name.toLowerCase().includes(q) || e.symbol.toLowerCase().includes(q));
    }
    if (filter.group) {
      list = list.filter(e => e.group === filter.group);
    }
    if (filter.block) {
      list = list.filter(e => e.block === filter.block);
    }
    if (filter.category) {
      list = list.filter(e => e.category === filter.category);
    }
    return list;
  }, [filter.search, filter.group, filter.block, filter.category]);
}
