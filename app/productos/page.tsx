'use client';

import { useMemo, useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { StoreHeader } from '@/components/products/StoreHeader';
import { CategoryNav, CategoryFilter } from '@/components/products/CategoryNav';
import { FiltersBar, SortOption } from '@/components/products/FiltersBar';
import { ProductGrid } from '@/components/products/ProductGrid';
import { CartSheet } from '@/components/products/CartSheet';

export default function ProductosPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('todos');
  const [sort, setSort] = useState<SortOption>('relevancia');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = PRODUCTS.filter((product) => {
      const matchesQuery =
        query.length === 0 ||
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query);

      const matchesCategory =
        category === 'todos' ||
        (category === 'ofertas' ? Boolean(product.originalPrice) : product.category === category);

      return matchesQuery && matchesCategory;
    });

    result = [...result].sort((a, b) => {
      if (sort === 'precio-asc') return a.price - b.price;
      if (sort === 'precio-desc') return b.price - a.price;
      if (sort === 'nombre') return a.name.localeCompare(b.name);
      return Number(b.popular) - Number(a.popular);
    });

    return result;
  }, [search, category, sort]);

  return (
    <main className="min-h-screen bg-background">
      <StoreHeader search={search} onSearchChange={setSearch} onOpenCart={() => setIsCartOpen(true)} />
      <CategoryNav active={category} onChange={setCategory} />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
            Tienda Naveguz
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Arma tu pedido y coordínalo directo por WhatsApp, sin pasarelas de pago.
          </p>
        </div>

        <div className="mb-5">
          <FiltersBar resultCount={filteredProducts.length} sort={sort} onSortChange={setSort} />
        </div>

        <ProductGrid products={filteredProducts} />
      </section>

      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </main>
  );
}
