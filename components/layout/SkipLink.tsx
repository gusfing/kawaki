export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-ink focus:text-ink-inverse focus:font-body focus:font-medium focus:rounded-[2px] focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2 focus:ring-offset-paper"
    >
      Skip to content
    </a>
  );
}
