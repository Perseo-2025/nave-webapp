'use client';

import { Banknote, Gauge, PackageSearch, Wrench, Zap } from 'lucide-react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

const STEPS = [
  {
    number: '01',
    icon: PackageSearch,
    title: 'Elige tu modelo',
    description:
      'Te asesoramos según tu local, tu público y tu presupuesto. Compra directa o comodato.',
  },
  {
    number: '02',
    icon: Wrench,
    title: 'Instalamos gratis',
    description:
      'Llevamos, conectamos y configuramos la máquina sin costo de instalación. Lista para vender.',
  },
  {
    number: '03',
    icon: Gauge,
    title: 'Abastece y monitorea',
    description:
      'Tú operas o nosotros reabastecemos. Controla ventas y stock desde la app Naveguz.',
  },
  {
    number: '04',
    icon: Banknote,
    title: 'Cobras 24/7',
    description:
      'Tus clientes pagan con Yape, Plin, tarjeta o efectivo. El dinero llega directo a tu cuenta.',
  },
];

export function HowItWorks() {
  const { ref: headingRef, isInView: isHeadingInView } = useInViewAnimation<HTMLDivElement>();
  const { ref: stepsRef, isInView: isStepsInView } = useInViewAnimation<HTMLDivElement>(0.15);

  return (
    <section id="como-funciona" className="scroll-mt-24 bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          ref={headingRef}
          className={`mx-auto max-w-2xl text-center ${
            isHeadingInView ? 'animate__animated animate__fadeInUp' : 'opacity-0'
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-4 py-1.5 text-xs font-semibold tracking-widest text-amber-700 uppercase">
            <Zap className="size-3.5 fill-amber-700" />
            Sin complicaciones
          </span>

          <h2 className="mt-5 text-2xl font-extrabold leading-tight text-foreground sm:text-3xl md:text-4xl">
            Tu máquina operando en 4 pasos
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Como en una expendedora: seleccionas, confirmas y listo. Nosotros nos encargamos del
            resto.
          </p>
        </div>

        <div ref={stepsRef} className="relative mt-16">
          <div className="absolute top-8 right-[12.5%] left-[12.5%] hidden border-t-2 border-dashed border-border lg:block" />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  style={{ animationDelay: isStepsInView ? `${index * 150}ms` : undefined }}
                  className={isStepsInView ? 'animate__animated animate__fadeInUp' : 'opacity-0'}
                >
                  <div className="relative flex size-16 items-center justify-center rounded-2xl bg-primary text-secondary shadow-lg shadow-primary/20">
                    <Icon className="size-7" />
                    <span className="absolute -top-2.5 -right-2.5 flex size-7 items-center justify-center rounded-full bg-secondary text-xs font-extrabold text-secondary-foreground ring-4 ring-background">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
