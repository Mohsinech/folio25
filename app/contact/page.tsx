import Home from "../page";
import OpenContact from "@/components/Contact/OpenContact";

// /contact is the home page with the contact sheet already open,
// so old links and shared URLs still land on the form.
export default function ContactPage() {
  return (
    <>
      <Home />
      <OpenContact />
    </>
  );
}
