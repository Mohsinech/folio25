"use client";

import { createContext, useCallback, useContext, useState } from "react";
import ContactSheet, { type ContactTab } from "./ContactSheet";
import AboutSheet from "@/components/About/AboutSheet";

type PanelsContextValue = {
  isOpen: boolean;
  open: (tab?: ContactTab) => void;
  close: () => void;
  aboutOpen: boolean;
  openAbout: () => void;
  closeAbout: () => void;
};

const ContactContext = createContext<PanelsContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
  aboutOpen: false,
  openAbout: () => {},
  closeAbout: () => {},
});

export const useContact = () => useContext(ContactContext);

/** Owns the two slide-up panels (contact and about) so any button on the site can open them. */
export default function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [tab, setTab] = useState<ContactTab>("project");

  const open = useCallback((t?: ContactTab) => {
    if (t) setTab(t);
    setAboutOpen(false);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const openAbout = useCallback(() => {
    setIsOpen(false);
    setAboutOpen(true);
  }, []);
  const closeAbout = useCallback(() => setAboutOpen(false), []);

  // From the about panel straight to the contact form, after the first panel starts leaving.
  const aboutToContact = useCallback(() => {
    setAboutOpen(false);
    window.setTimeout(() => open("project"), 250);
  }, [open]);

  return (
    <ContactContext.Provider value={{ isOpen, open, close, aboutOpen, openAbout, closeAbout }}>
      {children}
      <AboutSheet isOpen={aboutOpen} onClose={closeAbout} onContact={aboutToContact} />
      <ContactSheet isOpen={isOpen} tab={tab} onTab={setTab} onClose={close} />
    </ContactContext.Provider>
  );
}
