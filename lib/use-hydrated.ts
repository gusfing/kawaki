import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/*
 * True once hydrated on the client; false during SSR and the first client
 * render. Gate Framer Motion `initial` on this so hidden states never ship
 * in the server HTML (no-JS visitors see content, not a blank page).
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
