'use client';

import { SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type SortOption = 'relevancia' | 'precio-asc' | 'precio-desc' | 'nombre';

const SORT_LABELS: Record<SortOption, string> = {
  relevancia: 'Más relevantes',
  'precio-asc': 'Precio: menor a mayor',
  'precio-desc': 'Precio: mayor a menor',
  nombre: 'Nombre A-Z',
};

interface FiltersBarProps {
  resultCount: number;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function FiltersBar({ resultCount, sort, onSortChange }: FiltersBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{resultCount}</span>{' '}
        {resultCount === 1 ? 'producto' : 'productos'}
      </p>

      <Select value={sort} onValueChange={(value) => onSortChange(value as SortOption)}>
        <SelectTrigger className="h-10 w-56 gap-2 rounded-full bg-card">
          <SlidersHorizontal className="size-3.5 text-muted-foreground" />
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
            <SelectItem key={option} value={option}>
              {SORT_LABELS[option]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
