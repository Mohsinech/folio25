import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Mohssine Chedgane, freelance designer and developer in Morocco, or get in touch about a role.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
