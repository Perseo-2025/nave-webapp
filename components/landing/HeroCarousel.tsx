'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  ImageOff,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCarouselImages } from '@/hooks/useCarouselImages';

const AUTOPLAY_MS = 6000;

const PAYMENT_METHODS = [
  { label: 'Yape', className: 'text-purple-600' },
  { label: 'Plin', className: 'text-teal-500' },
  { label: 'VISA', className: 'text-primary' },
];

export function HeroCarousel() {
  const { images: slides, isLoading, isError } = useCarouselImages();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [brokenIds, setBrokenIds] = useState<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (next: number) => setIndex((next + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length]);

  if (isLoading) {
    return (
      <section className="relative flex h-svh min-h-160 w-full items-center justify-center bg-primary">
        <Loader2 className="size-8 animate-spin text-primary-foreground/50" />
      </section>
    );
  }

  if (isError || slides.length === 0) {
    return (
      <section className="relative flex h-svh min-h-160 w-full flex-col items-center justify-center gap-3 bg-primary px-4 text-center">
        <ImageOff className="size-10 text-primary-foreground/40" />
        <p className="max-w-sm text-sm text-primary-foreground/70">
          {isError
            ? 'No se pudieron cargar las imágenes del carousel. Intenta nuevamente más tarde.'
            : 'Todavía no hay imágenes activas en el carousel.'}
        </p>
      </section>
    );
  }

  const safeIndex = index < slides.length ? index : 0;
  const slide = slides[safeIndex];
  const isBroken = brokenIds.has(slide.id);

  return (
    <section
      className="relative flex h-svh min-h-160 w-full items-center overflow-hidden bg-primary"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div key={slide.id} className="absolute inset-0 animate-in fade-in duration-700">
        {isBroken ? (
          <div className="flex size-full items-center justify-center bg-primary">
            <ImageOff className="size-12 text-primary-foreground/25" />
          </div>
        ) : (
          <Image
            src={slide.imageUrl}
            alt={slide.title}
            fill
            priority={safeIndex === 0}
            sizes="100vw"
            onError={() =>
              setBrokenIds((prev) => new Set(prev).add(slide.id))
            }
            className="object-cover animate-[carousel-zoom_7s_ease-out_forwards]"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-r from-primary/90 via-primary/60 to-primary/20" />
        <div className="absolute inset-0 bg-linear-to-t from-primary/70 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-20 pb-24 sm:pt-16 sm:pr-6 sm:pb-8 sm:pl-16 lg:pr-8 lg:pl-24">
        <div className="max-w-xl lg:max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-primary-foreground uppercase backdrop-blur-sm">
            <span className="size-2 rounded-full bg-secondary" />
            Máquinas expendedoras inteligentes
          </span>

          <h1
            key={`title-${slide.id}`}
            className="mt-5 text-3xl font-extrabold leading-[1.15] text-primary-foreground sm:text-4xl md:text-5xl xl:text-6xl"
          >
            {slide.title}
          </h1>

          {slide.subtitle && (
            <p
              key={`subtitle-${slide.id}`}
              className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg"
            >
              {slide.subtitle}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-12 justify-center gap-2 rounded-full bg-secondary px-7 text-center text-base text-secondary-foreground hover:bg-secondary/90"
            >
              Quiero una máquina
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-12 justify-center rounded-full border-transparent bg-primary-foreground/10 px-7 text-center text-base text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
            >
              Ver franquicia
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <span className="text-sm text-primary-foreground/70">Tus clientes pagan como quieran:</span>
            <div className="flex items-center gap-2.5">
              {PAYMENT_METHODS.map((method) => (
                <span
                  key={method.label}
                  className={`rounded-lg bg-primary-foreground/95 px-3.5 py-1.5 text-xs font-bold shadow-sm ${method.className}`}
                >
                  {method.label}
                </span>
              ))}
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary-foreground/95 text-secondary shadow-sm">
                <CreditCard className="size-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => goTo(safeIndex - 1)}
            className="absolute left-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/20 sm:flex"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => goTo(safeIndex + 1)}
            className="absolute right-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/20 sm:flex"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-20">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Ir a la imagen ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 cursor-pointer rounded-full transition-all ${
                  i === safeIndex
                    ? 'w-8 bg-secondary'
                    : 'w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60'
                }`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-primary-foreground/70 sm:flex">
        <span className="text-[10px] font-semibold tracking-widest uppercase">Descubre más</span>
        <ChevronDown className="size-4 animate-bounce" />
      </div>
    </section>
  );
}
