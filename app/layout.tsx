import type { Metadata } from 'next';
import '@fontsource-variable/nunito';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Naveguz — Soluciones para tu negocio',
  description:
    'Servicios y productos de calidad cerca del aeropuerto. Conoce nuestra historia y contáctanos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}