'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { AdminSidebar } from './components/Sidebar';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#fdf8ee]">
      <AdminSidebar />

      {/* Desktop: margen izquierdo por sidebar fijo */}
      {/* Mobile: padding top por topbar fijo */}
      <main className="lg:ml-64 pt-16 lg:pt-0 p-6 lg:p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}