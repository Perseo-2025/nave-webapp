'use client';

import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CarouselImage } from '@/types';

interface ConfirmDeleteDialogProps {
  image: CarouselImage | null;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export function ConfirmDeleteDialog({
  image,
  onCancel,
  onConfirm,
  isDeleting,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={Boolean(image)} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Eliminar imagen</DialogTitle>
          <DialogDescription>
            ¿Seguro que deseas eliminar &quot;{image?.title}&quot; del carousel? Esta
            acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="gap-2"
          >
            {isDeleting && <Loader2 className="size-4 animate-spin" />}
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
