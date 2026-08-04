import api from './api';
import { ApiResponse, CarouselImage } from '@/types';

interface CreateCarouselData {
  title: string;
  subtitle?: string;
  sortOrder?: number;
  image: File;
}

interface UpdateCarouselData {
  title?: string;
  subtitle?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export const carouselService = {
  getActive: async (): Promise<CarouselImage[]> => {
    const response = await api.get<ApiResponse<CarouselImage[]>>('/carousel');
    return response.data.data;
  },

  getAll: async (): Promise<CarouselImage[]> => {
    const response = await api.get<ApiResponse<CarouselImage[]>>(
      '/carousel/all',
    );
    return response.data.data;
  },

  create: async (data: CreateCarouselData): Promise<CarouselImage> => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('image', data.image);
    if (data.subtitle) formData.append('subtitle', data.subtitle);
    if (data.sortOrder !== undefined) {
      formData.append('sortOrder', String(data.sortOrder));
    }

    const response = await api.post<ApiResponse<CarouselImage>>(
      '/carousel',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return response.data.data;
  },

  update: async (
    id: string,
    data: UpdateCarouselData,
  ): Promise<CarouselImage> => {
    const response = await api.patch<ApiResponse<CarouselImage>>(
      `/carousel/${id}`,
      data,
    );
    return response.data.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/carousel/${id}`);
  },
};