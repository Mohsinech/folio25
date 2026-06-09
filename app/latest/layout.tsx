import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bentofolio Case Study",
  description:
    "Bentofolio is Mohssine Chedgane's latest project: a minimal portfolio builder for creatives and developers, built with Next.js and refined motion.",
  alternates: {
    canonical: "/latest",
  },
  openGraph: {
    title: "Bentofolio Case Study • Mohssine Chedgane",
    description:
      "A minimal portfolio builder for creatives and developers, designed and built by Mohssine Chedgane.",
    url: "/latest",
  },
};

export default function LatestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
