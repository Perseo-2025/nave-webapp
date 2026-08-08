'use client';

import Image from 'next/image';
import { ArrowRight, Heart, PawPrint, Soup } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

const STATS = [
  { icon: PawPrint, value: '+3,000', label: 'animales rescatados apoyados' },
  { icon: Soup, value: '+50', label: 'comedores comunitarios beneficiados' },
  { icon: Heart, value: 'S/ 45,000', label: 'donados durante el 2025' },
];

export function ApoyoSocial() {
  const { ref: sectionRef, isInView } = useInViewAnimation<HTMLDivElement>(0.2);

  return (
    <section
      id="apoyo-social"
      className="relative overflow-hidden bg-linear-to-br from-primary via-primary to-[#1a1152] px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute -top-32 -left-24 size-96 rounded-full bg-secondary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-96 rounded-full bg-primary-foreground/10 blur-3xl" />

      <div
        ref={sectionRef}
        className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16"
      >
        <div
          className={`relative mb-28 sm:mb-36 lg:mb-0 ${
            isInView ? 'animate__animated animate__fadeInLeft' : 'opacity-0'
          }`}
        >
          <div className="relative aspect-4/5 w-full max-w-md overflow-hidden rounded-3xl sm:aspect-square lg:mx-0 lg:aspect-4/5">
            <Image
              src="https://images.unsplash.com/photo-1594004844563-536a03a6e532?w=1000&q=80&auto=format&fit=crop"
              alt="Voluntario acariciando a un perro rescatado"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-8 -right-4 w-48 overflow-hidden rounded-2xl border-4 border-primary shadow-xl sm:-right-8 sm:w-56">
            <div className="relative aspect-4/3 w-full">
              <Image
                src="https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=600&q=80&auto=format&fit=crop"
                alt="Voluntarios organizando donaciones de alimentos"
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div
          className={isInView ? 'animate__animated animate__fadeInRight' : 'opacity-0'}
          style={{ animationDelay: isInView ? '150ms' : undefined }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-secondary uppercase backdrop-blur-sm">
            <Heart className="size-3.5 fill-secondary" />
            Apoyo social
          </span>

          <h2 className="mt-5 text-2xl font-extrabold leading-tight text-primary-foreground sm:text-3xl md:text-4xl">
            Por cada compra, ayudas a quienes más lo necesitan
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/80">
            En Naveguz creemos que la tecnología también puede transformar vidas. Parte de lo
            recaudado en nuestras máquinas se destina a refugios de animales y comedores
            comunitarios en todo el Perú, para que cada compra tenga un impacto real más allá del
            snack o la bebida.
          </p>

          <div className="mt-9 grid grid-cols-1 gap-5 border-t border-primary-foreground/15 pt-8 sm:grid-cols-3">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-start gap-3 sm:flex-col sm:gap-2">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-xl font-extrabold text-primary-foreground">{stat.value}</p>
                    <p className="text-xs leading-snug text-primary-foreground/70">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            size="lg"
            className="mt-9 h-12 justify-center gap-2 rounded-full bg-secondary px-7 text-center text-base text-secondary-foreground hover:bg-secondary/90"
          >
            Conoce nuestra labor social
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
