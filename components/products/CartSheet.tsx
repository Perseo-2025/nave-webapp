'use client';

import Image from 'next/image';
import { Minus, MessageCircle, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCartStore, selectCartTotalPrice } from '@/store/cart.store';
import { formatCurrency } from '@/lib/currency';
import { buildOrderWhatsAppUrl } from '@/lib/whatsapp';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);
  const total = useCartStore(selectCartTotalPrice);

  const handleCheckout = () => {
    if (items.length === 0) return;
    window.open(buildOrderWhatsAppUrl(items), '_blank', 'noopener,noreferrer');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-sm gap-0 sm:max-w-md">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <ShoppingCart className="size-5 text-primary" />
            Tu carrito
          </SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? 'Aún no agregaste productos.'
              : 'Revisa tu pedido antes de enviarlo por WhatsApp.'}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-2">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 py-16 text-center">
              <ShoppingCart className="size-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                Explora el catálogo y arma tu pedido.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4 py-2">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-3">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-border">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-contain p-1.5"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm leading-tight font-bold text-foreground">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.product.presentation}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        aria-label={`Quitar ${item.product.name}`}
                        className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 rounded-full bg-muted p-0.5">
                        <Button
                          type="button"
                          size="icon-xs"
                          variant="ghost"
                          className="rounded-full bg-card"
                          onClick={() => setQuantity(item.product.id, item.quantity - 1)}
                          aria-label="Quitar una unidad"
                        >
                          <Minus className="size-3" />
                        </Button>
                        <span className="min-w-4 text-center text-xs font-bold text-foreground">
                          {item.quantity}
                        </span>
                        <Button
                          type="button"
                          size="icon-xs"
                          variant="ghost"
                          className="rounded-full bg-card"
                          onClick={() => setQuantity(item.product.id, item.quantity + 1)}
                          aria-label="Agregar una unidad"
                        >
                          <Plus className="size-3" />
                        </Button>
                      </div>
                      <span className="text-sm font-bold text-primary">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t border-border">
            <div className="flex items-center justify-between py-1">
              <span className="text-sm font-medium text-muted-foreground">Total</span>
              <span className="text-xl font-extrabold text-foreground">
                {formatCurrency(total)}
              </span>
            </div>

            <Button
              type="button"
              onClick={handleCheckout}
              className="h-12 w-full gap-2 rounded-full bg-[#25D366] text-base text-white hover:bg-[#25D366]/90"
            >
              <MessageCircle className="size-4" />
              Pedir por WhatsApp
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={clear}
              className="h-9 w-full text-sm text-muted-foreground hover:text-destructive"
            >
              Vaciar carrito
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
