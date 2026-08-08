function LibroReclamacionesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M32 10c-5.5-3.4-12-4.6-18-3.4v27.6c6-1.2 12.5 0 18 3.4 5.5-3.4 12-4.6 18-3.4V6.6c-6-1.2-12.5 0-18 3.4z"
        fill="currentColor"
        fillOpacity={0.12}
      />
      <path
        d="M32 10c-5.5-3.4-12-4.6-18-3.4v27.6c6-1.2 12.5 0 18 3.4m0-27.6c5.5-3.4 12-4.6 18-3.4v27.6c-6-1.2-12.5 0-18 3.4m0-27.6V37.6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 14.5c3.3-.6 6.7-.1 9.5 1.4M17 20c3.3-.6 6.7-.1 9.5 1.4M17 25.5c3.3-.6 6.7-.1 9.5 1.4"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <path
        d="M47 14.5c-3.3-.6-6.7-.1-9.5 1.4M47 20c-3.3-.6-6.7-.1-9.5 1.4M47 25.5c-3.3-.6-6.7-.1-9.5 1.4"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <path
        d="M4 39c7-3 14-1.5 18-.5v3c-4-1-11-2.5-18 .5z"
        fill="currentColor"
        fillOpacity={0.35}
      />
      <path
        d="M60 39c-7-3-14-1.5-18-.5v3c4-1 11-2.5 18 .5z"
        fill="currentColor"
        fillOpacity={0.35}
      />
    </svg>
  );
}

export function LibroReclamacionesBadge({ href = '#' }: { href?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2.5 rounded-xl bg-primary-foreground/5 px-4 py-2.5 text-xs text-primary-foreground/70 ring-1 ring-primary-foreground/10 transition-colors hover:bg-primary-foreground/10"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
        <LibroReclamacionesIcon className="size-6 text-secondary" />
      </span>
      <span>
        <span className="font-semibold text-primary-foreground">Libro de Reclamaciones</span>
        {' '}— Atención al consumidor · Perú
      </span>
    </a>
  );
}
