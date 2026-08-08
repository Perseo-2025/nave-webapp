'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

const INTEREST_OPTIONS = [
  { value: 'maquina', label: 'Comprar una máquina' },
  { value: 'comodato', label: 'Instalación por comodato' },
  { value: 'franquicia', label: 'Franquicia Naveguz' },
  { value: 'asesoria', label: 'Plan de asesoría' },
  { value: 'otro', label: 'Otra consulta' },
];

const contactSchema = z.object({
  nombre: z.string().min(2, 'Ingresa tu nombre completo'),
  telefono: z.string().min(6, 'Ingresa un número válido'),
  ciudad: z.string().optional(),
  interes: z.string().min(1, 'Selecciona una opción'),
  mensaje: z.string().max(500, 'Máximo 500 caracteres').optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

const CONTACT_INFO = [
  { icon: Phone, label: 'WhatsApp', value: '+51 999 000 000' },
  { icon: Mail, label: 'Correo', value: 'hola@naveguz.pe' },
  { icon: MapPin, label: 'Cobertura', value: 'Lima Metropolitana y Callao' },
];

export function Contact() {
  const { ref: sectionRef, isInView } = useInViewAnimation<HTMLDivElement>(0.15);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { interes: '' },
  });

  const onSubmit = async (data: ContactForm) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success('¡Solicitud enviada!', {
      description: `Gracias ${data.nombre.split(' ')[0]}, te contactaremos en menos de 24 horas.`,
    });
    reset();
  };

  return (
    <section id="contacto" className="scroll-mt-24 bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div
        ref={sectionRef}
        className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2 lg:gap-16"
      >
        <div
          className={isInView ? 'animate__animated animate__fadeInLeft' : 'opacity-0'}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-primary uppercase">
            <MessageCircle className="size-3.5" />
            Hablemos
          </span>

          <h2 className="mt-5 text-2xl font-extrabold leading-tight text-foreground sm:text-3xl md:text-4xl">
            Cuéntanos sobre tu proyecto y armamos tu propuesta
          </h2>

          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            Sin compromiso. Un asesor Naveguz revisa tu espacio y te recomienda el equipo, el plan
            de asesoría y la mejor forma de empezar.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            {CONTACT_INFO.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ animationDelay: isInView ? '150ms' : undefined }}
          className={`rounded-3xl bg-card p-6 shadow-xl ring-1 ring-border sm:p-8 ${
            isInView ? 'animate__animated animate__fadeInRight' : 'opacity-0'
          }`}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre*</Label>
              <Input
                id="nombre"
                placeholder="Tu nombre"
                className="h-11"
                {...register('nombre')}
              />
              {errors.nombre && (
                <p className="text-xs text-destructive">{errors.nombre.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">WhatsApp / Teléfono*</Label>
              <Input
                id="telefono"
                placeholder="999 000 000"
                className="h-11"
                {...register('telefono')}
              />
              {errors.telefono && (
                <p className="text-xs text-destructive">{errors.telefono.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ciudad">Ciudad</Label>
              <Input id="ciudad" placeholder="Lima" className="h-11" {...register('ciudad')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interes">Me interesa</Label>
              <Controller
                name="interes"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="interes" className="h-11 w-full">
                      <SelectValue placeholder="Elige una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      {INTEREST_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.interes && (
                <p className="text-xs text-destructive">{errors.interes.message}</p>
              )}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="mensaje">Cuéntanos sobre tu espacio</Label>
              <Textarea
                id="mensaje"
                placeholder="Ej. Tengo un gimnasio con 200 socios y quiero una máquina de bebidas..."
                className="min-h-28"
                {...register('mensaje')}
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="mt-7 h-12 w-full justify-center gap-2 rounded-full bg-secondary text-base text-secondary-foreground shadow-lg shadow-secondary/30 hover:bg-secondary/90"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
            <Send className="size-4" />
          </Button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Te respondemos en menos de 24 h. Sin compromiso.
          </p>
        </form>
      </div>
    </section>
  );
}
