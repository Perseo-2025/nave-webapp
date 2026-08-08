'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const NAV_LINKS = [
  { label: 'Máquinas', href: '#maquinas' },
  { label: 'Productos', href: '/productos' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Franquicia', href: '#franquicia' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-primary shadow-md' : 'bg-primary/95 backdrop-blur-sm'
      }`}
    >
      <nav className="mx-auto grid h-18 w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-5 sm:px-8 lg:h-20 lg:px-12">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt="Naveguz"
            width={140}
            height={48}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <ul className="hidden items-center justify-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative inline-block cursor-pointer py-1 text-sm font-medium text-primary-foreground/90 transition-colors hover:text-secondary"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-secondary transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-4">
          <div className="hidden items-center gap-3 lg:flex">
            <Button
              variant="ghost"
              className="h-12 min-w-36 justify-center rounded-full border-transparent bg-primary-foreground/10 px-7 text-center text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
            >
              Quiero invertir
            </Button>
            <Button className="h-12 min-w-32 justify-center gap-2 rounded-full bg-secondary px-7 text-center text-secondary-foreground hover:bg-secondary/90">
              <MessageCircle className="size-4" />
              Cotizar
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menú"
                className="flex size-10 cursor-pointer items-center justify-center rounded-lg text-primary-foreground lg:hidden"
              >
                <Menu className="size-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm gap-0 border-l-0 bg-primary text-primary-foreground">
              <div className="flex flex-col gap-8 px-8 pt-14">
                <ul className="flex flex-col divide-y divide-primary-foreground/10">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <SheetClose asChild>
                        <Link
                          href={link.href}
                          className="flex cursor-pointer items-center py-4 text-base font-medium text-primary-foreground/90 transition-all duration-200 hover:pl-2 hover:text-secondary"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-4 border-t border-primary-foreground/10 pt-8">
                  <Button
                    variant="ghost"
                    className="h-12 justify-center rounded-full border-transparent bg-primary-foreground/10 px-6 text-center text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                  >
                    Quiero invertir
                  </Button>
                  <Button className="h-12 justify-center gap-2 rounded-full bg-secondary px-6 text-center text-secondary-foreground hover:bg-secondary/90">
                    <MessageCircle className="size-4" />
                    Cotizar
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
