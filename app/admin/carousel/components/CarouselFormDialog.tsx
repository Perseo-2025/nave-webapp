'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ImagePlus, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CarouselImage } from '@/types';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_FILE_SIZE_LABEL = '5MB';

const formSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  subtitle: z.string().optional(),
  sortOrder: z.string().optional(),
  isActive: z.boolean().optional(),
});

type FormFields = z.infer<typeof formSchema>;

export interface CarouselFormValues {
  title: string;
  subtitle?: string;
  sortOrder?: number;
  isActive?: boolean;
}

interface CarouselFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: CarouselImage | null;
  onSubmit: (values: CarouselFormValues, file: File | null) => Promise<void>;
  isSubmitting: boolean;
}

export function CarouselFormDialog({
  open,
  onOpenChange,
  image,
  onSubmit,
  isSubmitting,
}: CarouselFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {open && (
          <CarouselForm
            key={image?.id ?? 'create'}
            image={image}
            onSubmit={onSubmit}
            onCancel={() => onOpenChange(false)}
            isSubmitting={isSubmitting}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

interface CarouselFormProps {
  image: CarouselImage | null;
  onSubmit: (values: CarouselFormValues, file: File | null) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

function CarouselForm({
  image,
  onSubmit,
  onCancel,
  isSubmitting,
}: CarouselFormProps) {
  const isEditMode = Boolean(image);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    image?.imageUrl ?? null,
  );
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: image?.title ?? '',
      subtitle: image?.subtitle ?? '',
      sortOrder: String(image?.sortOrder ?? 0),
      isActive: image?.isActive ?? true,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (file && file.size > MAX_FILE_SIZE_BYTES) {
      setFileError(
        `La imagen pesa ${(file.size / (1024 * 1024)).toFixed(1)}MB. El máximo permitido es ${MAX_FILE_SIZE_LABEL}.`,
      );
      setSelectedFile(null);
      event.target.value = '';
      return;
    }

    setFileError(null);
    setSelectedFile(file);
    setPreview(file ? URL.createObjectURL(file) : (image?.imageUrl ?? null));
  };

  const onFormSubmit = async (values: FormFields) => {
    if (!isEditMode && !selectedFile) {
      setFileError('Selecciona una imagen JPG o PNG');
      return;
    }
    await onSubmit(
      {
        title: values.title,
        subtitle: values.subtitle,
        sortOrder: values.sortOrder ? Number(values.sortOrder) : undefined,
        isActive: values.isActive,
      },
      selectedFile,
    );
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isEditMode ? 'Editar imagen' : 'Nueva imagen'}</DialogTitle>
        <DialogDescription>
          {isEditMode
            ? 'Actualiza el título, subtítulo, orden o el estado de la imagen.'
            : 'Sube una imagen y define su información para el carousel.'}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-4">
        {!isEditMode && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="carousel-image">Imagen</Label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-32 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-input bg-muted/40 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="Vista previa"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex flex-col items-center gap-1 text-sm">
                  <ImagePlus className="size-6" />
                  Seleccionar imagen JPG o PNG
                </span>
              )}
            </button>
            <input
              ref={fileInputRef}
              id="carousel-image"
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
            {fileError ? (
              <p className="text-xs text-destructive">{fileError}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Formatos JPG o PNG, máximo {MAX_FILE_SIZE_LABEL}.
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" placeholder="Bienvenidos" {...register('title')} />
          {errors.title && (
            <p className="text-xs text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="subtitle">Subtítulo</Label>
          <Input
            id="subtitle"
            placeholder="La mejor experiencia"
            {...register('subtitle')}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="sortOrder">Orden</Label>
          <Input id="sortOrder" type="number" min={0} {...register('sortOrder')} />
        </div>

        {isEditMode && (
          <label
            htmlFor="isActive"
            className="flex cursor-pointer items-center justify-between rounded-lg border border-input px-3 py-2.5"
          >
            <span className="text-sm font-medium">Imagen activa en el carousel</span>
            <input
              id="isActive"
              type="checkbox"
              className="size-4 accent-primary"
              {...register('isActive')}
            />
          </label>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting} className="gap-2">
            {isSubmitting && <Loader2 className="size-4 animate-spin" />}
            {isEditMode ? 'Guardar cambios' : 'Subir imagen'}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
