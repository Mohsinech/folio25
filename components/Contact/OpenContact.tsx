"use client";

import { useEffect } from "react";
import { useContact } from "./ContactProvider";

/** Opens the contact sheet once on mount (used by the /contact route). */
export default function OpenContact() {
  const { open } = useContact();
  useEffect(() => {
    open("project");
  }, [open]);
  return null;
}
