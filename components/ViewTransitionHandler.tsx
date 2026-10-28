"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

type DocWithVT = Document & {
  startViewTransition?: (cb: () => Promise<void> | void) => { finished: Promise<void> };
};

const SELECTOR = "a[data-vt], a[view-transition-name]";

const internalHref = (anchor: HTMLAnchorElement) => {
  const href = anchor.getAttribute("href");
  if (!href) return null;
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#"))
    return null;
  if (anchor.target && anchor.target !== "_self") return null;
  return href;
};

/**
 * Runs the site's view transitions (animations live in globals.css).
 *
 * Two things keep it smooth:
 * - It handles the click in the capture phase, so Next's <Link> doesn't also
 *   navigate on its own (that double navigation caused the stall).
 * - The transition waits until the new route has actually rendered before the
 *   browser takes its "after" snapshot, instead of animating the old page and
 *   then jumping when the new one arrives.
 * Routes are also prefetched on hover/focus so most clicks render instantly.
 */
export default function ViewTransitionHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<{ href: string; resolve: () => void } | null>(null);
  const busy = useRef(false);

  // Resolve the waiting transition once the new route has committed to the DOM.
  useLayoutEffect(() => {
    if (pending.current) {
      pending.current.resolve();
      pending.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    const prefetched = new Set<string>();
    const prefetch = (e: Event) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.(SELECTOR) as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = internalHref(anchor);
      if (!href || prefetched.has(href)) return;
      prefetched.add(href);
      router.prefetch(href);
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest(SELECTOR) as HTMLAnchorElement | null;
      if (!anchor) return;
      // A drag on the home gallery must not count as a click.
      if (anchor.closest('[data-suppress-click="true"]')) return;
      const href = internalHref(anchor);
      if (!href) return;

      e.preventDefault();
      e.stopPropagation();

      const target = href.split(/[?#]/)[0] || "/";
      if (target === window.location.pathname || busy.current) return;

      const doc = document as DocWithVT;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!doc.startViewTransition || reduced) {
        router.push(href);
        return;
      }

      try {
        sessionStorage.setItem("vt-active", "1");
      } catch {}

      busy.current = true;
      const vt = doc.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            // Never hold the page frozen if the route doesn't commit (redirect, error).
            const fallback = window.setTimeout(() => {
              pending.current = null;
              resolve();
            }, 2500);
            pending.current = {
              href,
              resolve: () => {
                window.clearTimeout(fallback);
                // One frame so images and layout of the new page are in place.
                requestAnimationFrame(() => resolve());
              },
            };
            router.push(href);
          }),
      );
      vt.finished.finally(() => {
        busy.current = false;
      });
    };

    document.addEventListener("pointerover", prefetch, { passive: true });
    document.addEventListener("focusin", prefetch);
    document.addEventListener("touchstart", prefetch, { passive: true });
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("pointerover", prefetch);
      document.removeEventListener("focusin", prefetch);
      document.removeEventListener("touchstart", prefetch);
      document.removeEventListener("click", onClick, true);
    };
  }, [router]);

  return null;
}
