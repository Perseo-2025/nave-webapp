'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Images,
  Package,
  LogOut,
  Menu,
  Users,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: 'Carousel',
    href: '/admin/carousel',
    icon: <Images size={18} />,
  },
  {
    label: 'Productos',
    href: '/admin/productos',
    icon: <Package size={18} />,
  },
  {
    label: 'Usuarios',
    href: '/admin/usuarios',
    icon: <Users size={18} />,
  },
];

function NavLinks({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 flex justify-center">
        <Image
          src="/logo.png"
          alt="Naveguz"
          width={140}
          height={50}
          priority
        />
      </div>

      <Separator className="bg-white/20" />

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={onClose}>
            <Button
              variant="ghost"
              className={`w-full justify-start gap-3 font-semibold transition-all ${
                pathname === item.href
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      <Separator className="bg-white/20" />

      <div className="p-4">
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start text-white/80 hover:bg-red-500/20 hover:text-white gap-3"
        >
          <LogOut size={18} />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#2a2e6e] flex-col min-h-screen fixed left-0 top-0 z-40">
        <NavLinks />
      </aside>

      {/* Mobile topbar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#2a2e6e] flex items-center justify-between px-4 py-3">
        <Image
          src="/logo.png"
          alt="Naveguz"
          width={100}
          height={35}
          priority
        />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 bg-[#2a2e6e] border-none p-0"
          >
            <NavLinks onClose={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}