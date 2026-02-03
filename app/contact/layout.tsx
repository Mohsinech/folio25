import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact • Mohssine Chedgane",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
