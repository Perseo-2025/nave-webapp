import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { LibroReclamacionesBadge } from '@/components/landing/LibroReclamacionesBadge';

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const FOOTER_LINKS = {
  Productos: [
    { label: 'Snacks & Bebidas', href: '#maquinas' },
    { label: 'Café Gourmet', href: '#maquinas' },
    { label: 'Dispensadores de agua', href: '#maquinas' },
    { label: 'Mini-markets', href: '#maquinas' },
    { label: 'Ver catálogo completo', href: '/productos' },
  ],
  Empresa: [
    { label: 'Nosotros', href: '#apoyo-social' },
    { label: 'Cómo funciona', href: '#como-funciona' },
    { label: 'Planes de asesoría', href: '#planes' },
    { label: 'Preguntas frecuentes', href: '#preguntas' },
    { label: 'Contacto', href: '#contacto' },
  ],
  Legal: [
    { label: 'Términos y condiciones', href: '#' },
    { label: 'Política de privacidad', href: '#' },
    { label: 'Libro de Reclamaciones', href: '#' },
  ],
};

const SOCIAL_LINKS = [
  { icon: InstagramIcon, label: 'Instagram', href: '#' },
  { icon: FacebookIcon, label: 'Facebook', href: '#' },
  { icon: MessageCircle, label: 'WhatsApp', href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-[#14123a] px-4 pt-16 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/logo.png"
              alt="Naveguz"
              width={140}
              height={48}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/60">
              Máquinas expendedoras inteligentes, mini-markets autoatendidos y franquicias.
              Hecho en Perú 🇵🇪
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/70 transition-colors hover:bg-secondary hover:text-secondary-foreground"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-bold tracking-widest text-primary-foreground/50 uppercase">
                {title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/75 transition-colors hover:text-secondary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-primary-foreground/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Naveguz. Todos los derechos reservados.
          </p>

          <LibroReclamacionesBadge />

          <p className="text-xs text-primary-foreground/50">
            Diseñado con energía para vender 24/7.
          </p>
        </div>
      </div>
    </footer>
  );
}
