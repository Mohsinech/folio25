"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ContactSheet, { type ContactTab } from "./ContactSheet";
import AboutSheet from "@/components/About/AboutSheet";
import LatestSheet from "@/components/Latest/LatestSheet";

type PanelsContextValue = {
  isOpen: boolean;
  open: (tab?: ContactTab) => void;
  close: () => void;
  aboutOpen: boolean;
  openAbout: () => void;
  closeAbout: () => void;
  latestOpen: boolean;
  openLatest: () => void;
  closeLatest: () => void;
};

const ContactContext = createContext<PanelsContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
  aboutOpen: false,
  openAbout: () => {},
  closeAbout: () => {},
  latestOpen: false,
  openLatest: () => {},
  closeLatest: () => {},
});

export const useContact = () => useContext(ContactContext);

/** Owns the slide-up panels (contact, about, latest project) so any button on the site can open them. */
export default function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [latestOpen, setLatestOpen] = useState(false);
  const [tab, setTab] = useState<ContactTab>("project");

  const open = useCallback((t?: ContactTab) => {
    if (t) setTab(t);
    setAboutOpen(false);
    setLatestOpen(false);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const openAbout = useCallback(() => {
    setIsOpen(false);
    setLatestOpen(false);
    setAboutOpen(true);
  }, []);
  const closeAbout = useCallback(() => setAboutOpen(false), []);
  const openLatest = useCallback(() => {
    setIsOpen(false);
    setAboutOpen(false);
    setLatestOpen(true);
  }, []);
  const closeLatest = useCallback(() => setLatestOpen(false), []);

  // Any navigation closes open panels (e.g. "Read the case study"), but not on first load,
  // so /contact can open its panel on mount.
  const pathname = usePathname();
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    const id = window.setTimeout(() => {
      setIsOpen(false);
      setAboutOpen(false);
      setLatestOpen(false);
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  // From the about panel straight to the contact form, after the first panel starts leaving.
  const aboutToContact = useCallback(() => {
    setAboutOpen(false);
    window.setTimeout(() => open("project"), 250);
  }, [open]);

  return (
    <ContactContext.Provider value={{ isOpen, open, close, aboutOpen, openAbout, closeAbout, latestOpen, openLatest, closeLatest }}>
      {children}
      <AboutSheet isOpen={aboutOpen} onClose={closeAbout} onContact={aboutToContact} />
      <LatestSheet isOpen={latestOpen} onClose={closeLatest} />
      <ContactSheet isOpen={isOpen} tab={tab} onTab={setTab} onClose={close} />
    </ContactContext.Provider>
  );
}
