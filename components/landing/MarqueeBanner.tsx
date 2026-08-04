import { Sparkle } from 'lucide-react';

const MARQUEE_PHRASES = [
  'El negocio que nunca duerme',
  'Ingresos pasivos las 24 horas',
  'Tu futuro empieza hoy',
  'Franquicias en todo el Perú',
  'Vende mientras duermes',
  'Tecnología que trabaja por ti',
];

function MarqueePhraseList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {MARQUEE_PHRASES.map((phrase, index) => (
        <li
          key={index}
          className="flex shrink-0 items-center gap-6 px-6 text-sm font-semibold tracking-widest whitespace-nowrap text-white uppercase sm:text-base"
        >
          {phrase}
          <Sparkle className="size-4 shrink-0 fill-secondary text-secondary" />
        </li>
      ))}
    </ul>
  );
}

export function MarqueeBanner() {
  return (
    <section className="overflow-hidden bg-black py-4">
      <div className="flex w-max animate-[marquee-left_32s_linear_infinite] hover:[animation-play-state:paused]">
        <MarqueePhraseList />
        <MarqueePhraseList hidden />
      </div>
    </section>
  );
}
