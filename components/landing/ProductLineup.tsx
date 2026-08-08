'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Coffee, Droplets, Package, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

const AUTOPLAY_MS = 5500;

interface Product {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  icon: typeof Package;
  color: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'expendedoras',
    title: 'Máquinas Expendedoras',
    tagline: 'Snacks y bebidas, disponibles 24/7',
    description:
      'Instalamos máquinas expendedoras inteligentes que aceptan pagos con Yape, Plin y tarjeta, llevando snacks, bebidas y productos de conveniencia a oficinas, universidades y espacios públicos sin necesidad de personal.',
    features: [
      'Pago con Yape, Plin y tarjeta contactless',
      'Monitoreo remoto de stock en tiempo real',
      'Refrigeración y control de temperatura',
      'Diseño compacto para cualquier espacio',
    ],
    image:
      'https://images.unsplash.com/photo-1767127961707-d8e1a717d31b?w=1200&q=80&auto=format&fit=crop',
    icon: Package,
    color: '#0d9488',
  },
  {
    id: 'vmarket',
    title: 'VMarket',
    tagline: 'Tu minimarket autoatendido',
    description:
      'VMarket transforma cualquier espacio en una tienda de conveniencia sin cajero: góndolas abiertas, refrigeradoras y un punto de pago autoatendido para que tus colaboradores compren en segundos.',
    features: [
      'Autoservicio sin filas ni cajero',
      'Amplio surtido: snacks, bebidas, higiene y más',
      'Reposición y control de inventario incluidos',
      'Ideal para oficinas y edificios corporativos',
    ],
    image:
      'https://images.unsplash.com/photo-1758445037219-b991718b06a6?w=1200&q=80&auto=format&fit=crop',
    icon: ShoppingCart,
    color: '#16a34a',
  },
  {
    id: 'office-coffee',
    title: 'Office Coffee Service',
    tagline: 'Café de grano recién molido en tu oficina',
    description:
      'Equipos profesionales que preparan espresso, capuchino y bebidas calientes al instante, con insumos de calidad y mantenimiento incluido para que tu equipo disfrute un buen café sin salir de la oficina.',
    features: [
      'Café en grano molido al momento',
      'Variedad de bebidas: espresso, capuchino, chocolate',
      'Mantenimiento y reposición de insumos incluidos',
      'Pantalla táctil intuitiva',
    ],
    image:
      'https://images.unsplash.com/photo-1560885521-4e61e9bc1631?w=1200&q=80&auto=format&fit=crop',
    icon: Coffee,
    color: '#b45309',
  },
  {
    id: 'agua',
    title: 'Dispensadores de Agua',
    tagline: 'Agua fría, caliente y al tiempo, al instante',
    description:
      'Dispensadores de agua purificada pensados para mantener hidratado a tu equipo con agua fría, caliente y al tiempo, todos los días, con filtrado certificado y bajo consumo energético.',
    features: [
      'Agua fría, caliente y al tiempo',
      'Filtrado y purificación certificados',
      'Bajo consumo energético',
      'Instalación y mantenimiento incluidos',
    ],
    image:
      'https://images.unsplash.com/photo-1780590107737-9381035b8265?w=1200&q=80&auto=format&fit=crop',
    icon: Droplets,
    color: '#2563eb',
  },
];

export function ProductLineup() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  const { ref: headingRef, isInView: isHeadingInView } = useInViewAnimation<HTMLDivElement>();
  const { ref: gridRef, isInView: isGridInView } = useInViewAnimation<HTMLDivElement>(0.15);

  const active = PRODUCTS[activeIndex];

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % PRODUCTS.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    if (window.innerWidth < 1024) {
      requestAnimationFrame(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  };

  return (
    <section id="maquinas" className="scroll-mt-24 bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          ref={headingRef}
          className={`mx-auto max-w-3xl text-center ${
            isHeadingInView ? 'animate__animated animate__fadeInUp' : 'opacity-0'
          }`}
        >
          <h2 className="text-2xl font-extrabold leading-tight text-foreground sm:text-3xl md:text-4xl">
            Nuestras soluciones autoatendidas{' '}
            <span className="text-primary">se adaptan a tus necesidades</span>
          </h2>
        </div>

        <div onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <div ref={gridRef} className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {PRODUCTS.map((product, index) => {
              const Icon = product.icon;
              const isActive = index === activeIndex;

              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleSelect(index)}
                  aria-pressed={isActive}
                  style={{
                    ...(isActive ? { boxShadow: `0 0 0 2px ${product.color}` } : undefined),
                    animationDelay: isGridInView ? `${index * 120}ms` : undefined,
                  }}
                  className={`group flex flex-col overflow-hidden rounded-2xl bg-card text-left ring-1 transition-all hover:-translate-y-1 hover:shadow-xl ${
                    isActive ? 'shadow-xl ring-2' : 'ring-border shadow-sm'
                  } ${isGridInView ? 'animate__animated animate__fadeInUp' : 'opacity-0'}`}
                >
                  <div className="h-1 w-full" style={{ backgroundColor: product.color }} />
                  <div className="flex items-center gap-2.5 px-4 pt-3.5 pb-2.5 sm:px-5 sm:pt-4">
                    <span
                      className="flex size-7 shrink-0 items-center justify-center rounded-lg sm:size-8"
                      style={{ backgroundColor: `${product.color}17`, color: product.color }}
                    >
                      <Icon className="size-3.5 sm:size-4" />
                    </span>
                    <h3 className="text-xs font-bold leading-tight tracking-wide text-foreground uppercase sm:text-sm">
                      {product.title}
                    </h3>
                  </div>

                  <div className="relative aspect-4/5 w-full">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 45vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
                  </div>
                </button>
              );
            })}
          </div>

          <div
            key={active.id}
            ref={detailRef}
            className="mt-12 grid animate__animated animate__fadeIn items-center gap-8 rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-12"
          >
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl lg:aspect-square">
              <Image
                src={active.image}
                alt={active.title}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>

            <div>
              <div className="flex items-center justify-between gap-4">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
                  style={{ backgroundColor: `${active.color}1a`, color: active.color }}
                >
                  <span className="size-2 rounded-full" style={{ backgroundColor: active.color }} />
                  {active.title}
                </span>

                <div className="hidden items-center gap-1.5 sm:flex">
                  {PRODUCTS.map((product, index) => (
                    <span
                      key={product.id}
                      className="relative h-1 w-6 overflow-hidden rounded-full bg-border"
                    >
                      {index === activeIndex && (
                        <span
                          key={`${product.id}-${isPaused}`}
                          className={`absolute inset-0 origin-left rounded-full ${
                            isPaused ? '' : 'animate-[progress-fill_5500ms_linear_forwards]'
                          }`}
                          style={{ backgroundColor: active.color }}
                        />
                      )}
                      {index < activeIndex && (
                        <span
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: active.color }}
                        />
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="mt-4 text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">
                {active.tagline}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {active.description}
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {active.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span
                      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${active.color}1a`, color: active.color }}
                    >
                      <Check className="size-3.5" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className="mt-8 h-12 justify-center gap-2 rounded-full bg-secondary px-7 text-center text-base text-secondary-foreground hover:bg-secondary/90"
              >
                Cotizar {active.title}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
