'use client';

import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  isFeatured?: boolean;
  features: string[];
}

const PLANS: Plan[] = [
  {
    id: 'lite',
    name: 'Lite',
    description: 'Para quienes recién empiezan con su primera máquina.',
    price: 'S/ 149',
    features: [
      '1 máquina monitoreada',
      'Reporte mensual de ventas',
      'Soporte por WhatsApp en horario de oficina',
      'Recomendaciones básicas de surtido',
    ],
  },
  {
    id: 'basic',
    name: 'Basic',
    description: 'El plan más elegido por emprendedores con 2 a 5 equipos.',
    price: 'S/ 299',
    isFeatured: true,
    features: [
      'Hasta 5 máquinas monitoreadas',
      'Reporte quincenal + alertas de stock bajo',
      'Soporte prioritario 7 días a la semana',
      'Asesoría de precios y mezcla de productos',
      'Visita técnica preventiva trimestral',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Para franquiciados y rutas con varios puntos de venta.',
    price: 'S/ 599',
    features: [
      'Hasta 15 máquinas monitoreadas',
      'Dashboard financiero en tiempo real',
      'Asesor dedicado + reunión mensual',
      'Optimización de rutas de reabastecimiento',
      'Soporte técnico 24/7 con prioridad máxima',
    ],
  },
];

export function Pricing() {
  const { ref: headingRef, isInView: isHeadingInView } = useInViewAnimation<HTMLDivElement>();
  const { ref: cardsRef, isInView: areCardsInView } = useInViewAnimation<HTMLDivElement>(0.1);

  return (
    <section id="planes" className="scroll-mt-24 bg-muted/40 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          ref={headingRef}
          className={`mx-auto max-w-2xl text-center ${
            isHeadingInView ? 'animate__animated animate__fadeInUp' : 'opacity-0'
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-primary uppercase">
            <Sparkles className="size-3.5" />
            Asesoría Naveguz
          </span>

          <h2 className="mt-5 text-2xl font-extrabold leading-tight text-foreground sm:text-3xl md:text-4xl">
            Un plan de acompañamiento para cada etapa de tu negocio
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Elige el nivel de asesoría que necesitas. Puedes subir o bajar de plan cuando quieras,
            sin permanencia forzosa.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="mt-14 grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-3"
        >
          {PLANS.map((plan, index) => (
            <div
              key={plan.id}
              style={{ animationDelay: areCardsInView ? `${index * 130}ms` : undefined }}
              className={`relative flex h-full flex-col rounded-3xl bg-card p-8 ${
                plan.isFeatured
                  ? 'ring-2 ring-primary shadow-xl lg:-my-4 lg:py-12'
                  : 'ring-1 ring-border shadow-sm'
              } ${areCardsInView ? 'animate__animated animate__fadeInUp' : 'opacity-0'}`}
            >
              {plan.isFeatured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1.5 text-xs font-bold tracking-wide text-primary-foreground uppercase shadow-md">
                  Más elegido
                </span>
              )}

              <h3 className="text-lg font-extrabold text-foreground">{plan.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {plan.description}
              </p>

              <p className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                <span className="text-sm font-medium text-muted-foreground">/mes</span>
              </p>

              <ul className="mt-7 flex flex-1 flex-col gap-3.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span
                      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                        plan.isFeatured
                          ? 'bg-primary/10 text-primary'
                          : 'bg-secondary/20 text-amber-700'
                      }`}
                    >
                      <Check className="size-3.5" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                variant={plan.isFeatured ? 'default' : 'outline'}
                className={`mt-8 h-12 justify-center rounded-full text-base ${
                  plan.isFeatured
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border-border text-foreground hover:bg-muted'
                }`}
              >
                Elegir plan {plan.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
