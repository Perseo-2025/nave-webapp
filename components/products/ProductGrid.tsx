import { PackageSearch } from 'lucide-react';
import { Product } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-card py-20 text-center ring-1 ring-border">
        <PackageSearch className="size-10 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">No encontramos productos</p>
        <p className="max-w-xs text-sm text-muted-foreground">
          Prueba con otra categoría o cambia tu búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
