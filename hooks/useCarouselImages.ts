import { useQuery } from '@tanstack/react-query';
import { carouselService } from '@/services/carousel.service';

export function useCarouselImages() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['carousel', 'active'],
    queryFn: carouselService.getActive,
  });

  return {
    images: data ?? [],
    isLoading,
    isError,
  };
}
