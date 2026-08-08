'use client';

import { useState } from 'react';
import { WHATSAPP_NUMBER } from '@/lib/whatsapp';

const GREETING_MESSAGE =
  '¡Hola Naveguz! 👋 Estoy interesado(a) en sus máquinas expendedoras / mini-markets y me gustaría recibir más información. ¡Gracias!';

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
      <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.677 4.522 1.85 6.362L4 29l7.84-1.803A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.7a9.62 9.62 0 0 1-4.94-1.36l-.354-.21-4.653 1.07 1.087-4.53-.232-.372A9.63 9.63 0 0 1 5.4 15c0-5.85 4.756-10.6 10.604-10.6 5.847 0 10.596 4.75 10.596 10.6 0 5.85-4.75 10.7-10.596 10.7z" />
      <path d="M21.61 17.68c-.297-.15-1.758-.868-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.174.198-.347.223-.644.074-.297-.148-1.255-.463-2.39-1.475-.883-.788-1.48-1.762-1.653-2.06-.174-.297-.019-.458.13-.606.134-.133.297-.347.446-.52.148-.174.198-.298.297-.496.099-.198.05-.372-.025-.52-.074-.149-.67-1.613-.918-2.21-.242-.581-.487-.503-.67-.512l-.57-.01c-.198 0-.52.075-.792.372-.273.297-1.04 1.016-1.04 2.48 0 1.462 1.065 2.876 1.213 3.074.148.198 2.096 3.2 5.079 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.174-1.412-.074-.124-.272-.198-.57-.347z" />
    </svg>
  );
}

export function WhatsAppFloatingButton() {
  const [isHovered, setIsHovered] = useState(false);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(GREETING_MESSAGE)}`;

  return (
    <div className="fixed right-5 bottom-5 z-50 flex items-center gap-3 sm:right-6 sm:bottom-6">
      <span
        role="status"
        className={`hidden rounded-full bg-card px-4 py-2 text-sm font-medium text-foreground shadow-lg ring-1 ring-border transition-all duration-200 sm:block ${
          isHovered ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-2 opacity-0'
        }`}
      >
        ¿Hablamos por WhatsApp?
      </span>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 group-hover:animate-ping" />
        <WhatsAppIcon className="relative size-7" />
      </a>
    </div>
  );
}
