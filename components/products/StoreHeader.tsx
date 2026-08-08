'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Search, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore, selectCartTotalItems } from '@/store/cart.store';

interface StoreHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  onOpenCart: () => void;
}

export function StoreHeader({ search, onSearchChange, onOpenCart }: StoreHeaderProps) {
  const totalItems = useCartStore(selectCartTotalItems);

  return (
    <header className="sticky top-0 z-40 bg-primary shadow-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-primary-foreground/80 transition-colors hover:text-secondary"
        >
          <ArrowLeft className="size-4" />
          <span className="hidden text-sm font-medium sm:inline">Inicio</span>
        </Link>

        <Link href="/" className="hidden shrink-0 items-center sm:flex">
          <Image
            src="/logo.png"
            alt="Naveguz"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </Link>

        <div className="relative ml-auto flex-1 max-w-md">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Busca gaseosas, snacks, café..."
            className="h-10 rounded-full bg-primary-foreground/95 pl-9 text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <Button
          type="button"
          onClick={onOpenCart}
          className="relative h-11 shrink-0 gap-2 rounded-full bg-secondary px-5 text-secondary-foreground hover:bg-secondary/90"
        >
          <ShoppingCart className="size-4" />
          <span className="hidden sm:inline">Carrito</span>
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {totalItems > 9 ? '9+' : totalItems}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
}
