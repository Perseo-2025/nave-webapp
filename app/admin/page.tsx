'use client';

import { useAuthStore } from '@/store/auth.store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Images, Package, Users } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#2a2e6e]">
          Bienvenido, {user?.fullName}
        </h1>
        <p className="text-gray-500 mt-1">
          Panel de administración de Naveguz
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/carousel">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-[#ddd8cc] hover:border-[#2a2e6e]">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-3 bg-[#2a2e6e]/10 rounded-xl">
                <Images className="text-[#2a2e6e]" size={24} />
              </div>
              <CardTitle className="text-[#2a2e6e]">Carousel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm">
                Gestiona las imágenes del carousel de la landing page.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/productos">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-[#ddd8cc] hover:border-[#2a2e6e]">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-3 bg-[#ffc712]/20 rounded-xl">
                <Package className="text-[#ffc712]" size={24} />
              </div>
              <CardTitle className="text-[#2a2e6e]">Productos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm">
                Administra el catálogo de productos visibles en la landing.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Card className="border-[#ddd8cc]">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="p-3 bg-green-100 rounded-xl">
              <Users className="text-green-600" size={24} />
            </div>
            <CardTitle className="text-[#2a2e6e]">Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-sm">
              Gestiona los colaboradores con acceso al panel.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}