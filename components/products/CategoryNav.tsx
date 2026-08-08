'use client';

import { Candy, Coffee, CupSoda, LayoutGrid, Percent, Popcorn } from 'lucide-react';
import { PRODUCT_CATEGORIES, ProductCategoryId } from '@/data/products';

export type CategoryFilter = ProductCategoryId | 'todos' | 'ofertas';

const CATEGORY_ICONS: Record<ProductCategoryId, typeof CupSoda> = {
  bebidas: CupSoda,
  'snacks-salados': Popcorn,
  'dulces-galletas': Candy,
  'cafe-infusiones': Coffee,
};

interface CategoryNavProps {
  active: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
}

export function CategoryNav({ active, onChange }: CategoryNavProps) {
  return (
    <nav className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur-sm lg:top-20">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        <CategoryPill
          label="Todos"
          Icon={LayoutGrid}
          isActive={active === 'todos'}
          onClick={() => onChange('todos')}
        />

        {PRODUCT_CATEGORIES.map((category) => (
          <CategoryPill
            key={category.id}
            label={category.label}
            Icon={CATEGORY_ICONS[category.id]}
            isActive={active === category.id}
            onClick={() => onChange(category.id)}
          />
        ))}

        <CategoryPill
          label="Ofertas"
          Icon={Percent}
          isActive={active === 'ofertas'}
          onClick={() => onChange('ofertas')}
        />
      </div>
    </nav>
  );
}

function CategoryPill({
  label,
  Icon,
  isActive,
  onClick,
}: {
  label: string;
  Icon: typeof CupSoda;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
        isActive
          ? 'border-transparent bg-primary text-primary-foreground shadow-sm'
          : 'border-border bg-card text-foreground hover:border-primary/40 hover:text-primary'
      }`}
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
}
