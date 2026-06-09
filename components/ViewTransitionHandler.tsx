"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ViewTransitionHandler() {
  const router = useRouter();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      // only handle anchors explicitly marked for view-transition
      // either with `data-vt` or with `view-transition-name` (shared element)
      const anchor = target.closest(
        "a[data-vt], a[view-transition-name]",
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      // ignore external links and hashes and targets
      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("#")
      )
        return;
      if (anchor.target && anchor.target !== "") return;

      e.preventDefault();

      const navigate = () => router.push(href);

      if (
        typeof document !== "undefined" &&
        (
          document as unknown as {
            startViewTransition?: (cb: () => unknown) => unknown;
          }
        ).startViewTransition
      ) {
        try {
          // mark that a view transition is being used so the destination
          // page can disable its own entrance animations
          try {
            sessionStorage.setItem("vt-active", "1");
          } catch {}
          (
            document as unknown as {
              startViewTransition: (cb: () => void) => void;
            }
          ).startViewTransition(() => {
            navigate();
          });
        } catch {
          navigate();
        }
      } else {
        navigate();
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return null;
}
