'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { toast } from 'sonner';
import { Eye, EyeOff, ImageOff, Pencil, Plus, Trash2 } from 'lucide-react';
import { carouselService } from '@/services/carousel.service';
import { getApiErrorMessage } from '@/lib/api-error';
import { CarouselImage } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  CarouselFormDialog,
  CarouselFormValues,
} from './components/CarouselFormDialog';
import { ConfirmDeleteDialog } from './components/ConfirmDeleteDialog';

export default function AdminCarouselPage() {
  const queryClient = useQueryClient();
  const { data: images, isLoading } = useQuery({
    queryKey: ['carousel', 'all'],
    queryFn: carouselService.getAll,
  });

  const [formOpen, setFormOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<CarouselImage | null>(null);
  const [deletingImage, setDeletingImage] = useState<CarouselImage | null>(null);
  const [brokenIds, setBrokenIds] = useState<Set<string>>(new Set());

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ['carousel'] });

  const createMutation = useMutation({
    mutationFn: carouselService.create,
    onSuccess: () => {
      toast.success('Imagen creada correctamente');
      invalidate();
      setFormOpen(false);
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, 'No se pudo crear la imagen')),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof carouselService.update>[1];
    }) => carouselService.update(id, data),
    onSuccess: () => {
      toast.success('Imagen actualizada');
      invalidate();
      setFormOpen(false);
      setEditingImage(null);
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, 'No se pudo actualizar la imagen')),
  });

  const removeMutation = useMutation({
    mutationFn: carouselService.remove,
    onSuccess: () => {
      toast.success('Imagen eliminada');
      invalidate();
      setDeletingImage(null);
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, 'No se pudo eliminar la imagen')),
  });

  const toggleActiveMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      carouselService.update(id, { isActive }),
    onSuccess: invalidate,
    onError: (error) =>
      toast.error(
        getApiErrorMessage(error, 'No se pudo cambiar el estado de la imagen'),
      ),
  });

  const openCreateForm = () => {
    setEditingImage(null);
    setFormOpen(true);
  };

  const openEditForm = (image: CarouselImage) => {
    setEditingImage(image);
    setFormOpen(true);
  };

  const handleFormSubmit = async (
    values: CarouselFormValues,
    file: File | null,
  ) => {
    try {
      if (editingImage) {
        await updateMutation.mutateAsync({
          id: editingImage.id,
          data: {
            title: values.title,
            subtitle: values.subtitle,
            sortOrder: values.sortOrder,
            isActive: values.isActive,
          },
        });
        return;
      }

      if (!file) return;
      await createMutation.mutateAsync({
        title: values.title,
        subtitle: values.subtitle,
        sortOrder: values.sortOrder,
        image: file,
      });
    } catch {
      // El toast de error ya se muestra en el onError de cada mutation.
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const sortedImages = images
    ? [...images].sort((a, b) => a.sortOrder - b.sortOrder)
    : [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2a2e6e]">Carousel</h1>
          <p className="mt-1 text-gray-500">
            Gestiona las imágenes que se muestran en la landing page.
          </p>
        </div>
        <Button onClick={openCreateForm} className="gap-2">
          <Plus className="size-4" />
          Nueva imagen
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      ) : sortedImages.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#ddd8cc] py-20 text-center">
          <ImageOff className="size-10 text-gray-400" />
          <p className="text-gray-500">Todavía no hay imágenes en el carousel.</p>
          <Button onClick={openCreateForm} variant="outline" className="gap-2">
            <Plus className="size-4" />
            Agregar la primera imagen
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedImages.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-xl border border-[#ddd8cc] bg-white"
            >
              <div className="relative h-40 w-full bg-muted">
                {image.imageUrl && !brokenIds.has(image.id) ? (
                  <Image
                    src={image.imageUrl}
                    alt={image.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    onError={() =>
                      setBrokenIds((prev) => new Set(prev).add(image.id))
                    }
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageOff className="size-8 text-gray-400" />
                  </div>
                )}
                <Badge
                  variant={image.isActive ? 'default' : 'outline'}
                  className={
                    image.isActive
                      ? 'absolute top-2 right-2 border-0 bg-[#2a2e6e] text-white'
                      : 'absolute top-2 right-2 border-0 bg-white text-gray-500'
                  }
                >
                  {image.isActive ? 'Activa' : 'Inactiva'}
                </Badge>
              </div>

              <div className="p-4">
                <p className="truncate font-semibold text-[#1a1a2e]">
                  {image.title}
                </p>
                {image.subtitle && (
                  <p className="mt-0.5 truncate text-sm text-gray-500">
                    {image.subtitle}
                  </p>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Orden: {image.sortOrder}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      title={image.isActive ? 'Desactivar' : 'Activar'}
                      onClick={() =>
                        toggleActiveMutation.mutate({
                          id: image.id,
                          isActive: !image.isActive,
                        })
                      }
                    >
                      {image.isActive ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      title="Editar"
                      onClick={() => openEditForm(image)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      title="Eliminar"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => setDeletingImage(image)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CarouselFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingImage(null);
        }}
        image={editingImage}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />

      <ConfirmDeleteDialog
        image={deletingImage}
        onCancel={() => setDeletingImage(null)}
        onConfirm={() => deletingImage && removeMutation.mutate(deletingImage.id)}
        isDeleting={removeMutation.isPending}
      />
    </div>
  );
}
