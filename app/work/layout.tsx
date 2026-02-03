import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work • Mohssine Chedgane",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
