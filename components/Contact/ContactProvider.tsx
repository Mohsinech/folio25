"use client";

import { createContext, useCallback, useContext, useState } from "react";
import ContactSheet, { type ContactTab } from "./ContactSheet";

type ContactContextValue = {
  isOpen: boolean;
  open: (tab?: ContactTab) => void;
  close: () => void;
};

const ContactContext = createContext<ContactContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export const useContact = () => useContext(ContactContext);

export default function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<ContactTab>("project");

  const open = useCallback((t?: ContactTab) => {
    if (t) setTab(t);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactContext.Provider value={{ isOpen, open, close }}>
      {children}
      <ContactSheet isOpen={isOpen} tab={tab} onTab={setTab} onClose={close} />
    </ContactContext.Provider>
  );
}
