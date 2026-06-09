import type { Metadata } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/layouts";
import { SmoothScroll } from "@/utils/index";
import ViewTransitionHandler from "@/components/ViewTransitionHandler";
import MobileHeader from "@/components/screen/Header/MobileHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://mohssinechedgane.me"),
  title: {
    default: "Mohssine Chedgane • Full-Stack Creative Developer in Morocco",
    template: "%s • Mohssine Chedgane",
  },
  description:
    "Mohssine Chedgane is a Morocco-based full-stack creative developer building fast, polished websites, portfolios, e-commerce experiences, and product interfaces.",
  applicationName: "Mohssine Chedgane Portfolio",
  authors: [{ name: "Mohssine Chedgane", url: "https://mohssinechedgane.me" }],
  creator: "Mohssine Chedgane",
  publisher: "Mohssine Chedgane",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Mohssine Chedgane",
    "Mohssine developer",
    "Morocco developer",
    "full stack developer Morocco",
    "creative developer Morocco",
    "web developer Morocco",
    "Next.js developer Morocco",
    "portfolio developer Morocco",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohssinechedgane.me",
    siteName: "Mohssine Chedgane",
    title: "Mohssine Chedgane • Full-Stack Creative Developer in Morocco",
    description:
      "Morocco-based full-stack creative developer building fast, polished websites, e-commerce experiences, portfolios, and product interfaces.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohssine Chedgane • Full-Stack Creative Developer in Morocco",
    description:
      "Morocco-based full-stack creative developer building fast, polished websites, portfolios, and product interfaces.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" type="icon/icon-x" href="/favicon.ico" />
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohssine Chedgane",
              url: "https://mohssinechedgane.me",
              jobTitle: "Full-Stack Creative Developer",
              address: {
                "@type": "PostalAddress",
                addressCountry: "MA",
              },
              knowsAbout: [
                "Full-stack development",
                "Creative development",
                "Next.js",
                "React",
                "Web performance",
                "SEO",
                "E-commerce websites",
              ],
            }),
          }}
        />
        <header>
          {/* Logic: Hide on mobile, show on desktop */}
          <div className="hidden md:block">
            <Header />
          </div>

          {/* Logic: Show on mobile, hide on desktop */}
          <div className="block md:hidden">
            <MobileHeader />
          </div>
        </header>

        <ViewTransitionHandler />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
