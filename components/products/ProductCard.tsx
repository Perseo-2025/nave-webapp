'use client';

import Image from 'next/image';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { useCartStore } from '@/store/cart.store';
import { formatCurrency } from '@/lib/currency';

export function ProductCard({ product }: { product: Product }) {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const setQuantity = useCartStore((state) => state.setQuantity);

  const inCart = items.find((item) => item.product.id === product.id);
  const discountPercent = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border transition-shadow hover:shadow-lg">
      <div className="relative aspect-square w-full bg-white p-4">
        {discountPercent && (
          <span className="absolute top-2.5 left-2.5 z-10 rounded-full bg-destructive px-2.5 py-1 text-xs font-bold text-destructive-foreground">
            -{discountPercent}%
          </span>
        )}
        {product.popular && !discountPercent && (
          <span className="absolute top-2.5 left-2.5 z-10 rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-secondary-foreground">
            Popular
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 45vw"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {product.brand}
        </p>
        <h3 className="text-sm leading-snug font-bold text-foreground">{product.name}</h3>
        <p className="text-xs text-muted-foreground">{product.presentation}</p>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-primary">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="mt-3">
          {inCart ? (
            <div className="flex items-center justify-between gap-2 rounded-full bg-muted p-1">
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                className="rounded-full bg-card"
                onClick={() => setQuantity(product.id, inCart.quantity - 1)}
                aria-label="Quitar una unidad"
              >
                <Minus className="size-3.5" />
              </Button>
              <span className="text-sm font-bold text-foreground">{inCart.quantity}</span>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                className="rounded-full bg-card"
                onClick={() => setQuantity(product.id, inCart.quantity + 1)}
                aria-label="Agregar una unidad"
              >
                <Plus className="size-3.5" />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              onClick={() => addItem(product)}
              className="h-9 w-full gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <ShoppingCart className="size-3.5" />
              Agregar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
