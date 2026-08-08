'use client';

import { MessageCircleQuestion } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

const FAQS = [
  {
    question: '¿Cuánto tiempo toma instalar una máquina expendedora?',
    answer:
      'Entre 24 y 72 horas desde que confirmas el punto de instalación. Nuestro equipo técnico coordina el traslado, la conexión eléctrica y la configuración de pagos sin costo adicional.',
  },
  {
    question: '¿Necesito invertir en el equipo o Naveguz lo pone?',
    answer:
      'Tú eliges: puedes comprar el equipo directamente o instalarlo bajo comodato, donde nosotros ponemos la máquina y compartimos un porcentaje de las ventas. Te asesoramos según tu flujo de caja y tráfico esperado.',
  },
  {
    question: '¿Qué pasa si un producto se agota o la máquina falla?',
    answer:
      'Monitoreamos el stock y el estado técnico en tiempo real desde la app Naveguz. Si detectamos una falla o un producto por agotarse, coordinamos el reabastecimiento o la visita técnica antes de que afecte tus ventas.',
  },
  {
    question: '¿Qué medios de pago aceptan las máquinas?',
    answer:
      'Yape, Plin, tarjetas de crédito y débito contactless, y efectivo en los modelos que lo incluyen. Todos los pagos digitales se liquidan directamente en tu cuenta.',
  },
  {
    question: '¿Puedo personalizar los productos que se venden?',
    answer:
      'Sí. Te ayudamos a definir el mix de productos según el perfil de tu ubicación (oficina, universidad, gimnasio, etc.) y puedes ajustarlo en cualquier momento con la asesoría de tu plan.',
  },
  {
    question: '¿Cómo funciona el aporte a los albergues de mascotas?',
    answer:
      'Un porcentaje de lo recaudado en cada máquina se destina automáticamente a refugios de animales y comedores comunitarios aliados. No representa un costo adicional para ti ni para tus clientes.',
  },
];

export function Faq() {
  const { ref: headingRef, isInView: isHeadingInView } = useInViewAnimation<HTMLDivElement>();
  const { ref: listRef, isInView: isListInView } = useInViewAnimation<HTMLDivElement>(0.1);

  return (
    <section id="preguntas" className="scroll-mt-24 bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div
          ref={headingRef}
          className={`text-center ${
            isHeadingInView ? 'animate__animated animate__fadeInUp' : 'opacity-0'
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-primary uppercase">
            <MessageCircleQuestion className="size-3.5" />
            Preguntas frecuentes
          </span>

          <h2 className="mt-5 text-2xl font-extrabold leading-tight text-foreground sm:text-3xl md:text-4xl">
            Resolvemos tus dudas antes de empezar
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Si tu pregunta no está aquí, escríbenos por WhatsApp y te respondemos al toque.
          </p>
        </div>

        <div
          ref={listRef}
          className={`mt-12 ${isListInView ? 'animate__animated animate__fadeInUp' : 'opacity-0'}`}
        >
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {FAQS.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="rounded-2xl bg-card px-5 ring-1 ring-border not-last:border-b-0 sm:px-6"
              >
                <AccordionTrigger className="py-5 text-base font-semibold text-foreground hover:no-underline sm:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
