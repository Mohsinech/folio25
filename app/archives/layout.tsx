import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archives • Mohssine Chedgane",
};

export default function ArchivesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
