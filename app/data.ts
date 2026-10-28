export interface ProjectInfo {
  slug: string;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  /** Short summary shown beside the title on the case page. */
  summary: string;
  /** Longer paragraph for the case page statement. */
  description: string;
  preview: string | null;
  images: { src: string; alt: string }[];
  details: [label: string, value: string][];
  notes: [label: string, text: string][];
}

export const projects: ProjectInfo[] = [
  {
    slug: "bentofolio",
    title: "Bentofolio",
    category: "Design & development",
    client: "Bentofolio",
    location: "Global",
    year: "2026",
    summary:
      "A restrained portfolio builder shaped around bento sections, quiet motion, and clean product screens for creatives who want their work to feel curated without feeling over-designed.",
    description:
      "Bentofolio was built to make a personal site feel like a product: structured enough to ship fast, flexible enough to make each portfolio distinct, and minimal enough that the work stays in front.",
    preview: "https://bentofolio.dev/",
    images: [
      { src: "/media/bentofolio/hero.jpg", alt: "Bentofolio hero dashboard" },
      { src: "/media/bentofolio/login.jpg", alt: "Bentofolio login screen" },
      { src: "/media/bentofolio/pricing.jpg", alt: "Bentofolio pricing screen" },
    ],
    details: [
      ["Role", "Product design, frontend"],
      ["Stack", "Next.js, Framer Motion, modular UI"],
      ["Focus", "Minimal portfolio publishing"],
      ["Year", "2026"],
    ],
    notes: [
      [
        "Design direction",
        "Sharp typography, generous whitespace, compact controls, and motion that reveals hierarchy instead of decorating it.",
      ],
      [
        "Build direction",
        "Component-first sections, responsive image systems, and reusable animation timing so the experience feels consistent across the app.",
      ],
    ],
  },
  {
    slug: "ayourluxe",
    title: "AYourluxe",
    category: "Web development",
    client: "Zakaria EM",
    location: "Morocco",
    year: "2025",
    summary:
      "A high-performance landing page for a premium watch brand, bridging editorial design and day-to-day operations.",
    description:
      "Traditional checkout was replaced by a WhatsApp-integrated order flow that asks less of the customer. A custom headless inventory syncs a management dashboard with Google Sheets, so stock updates in real time and products switch to sold out without code changes.",
    preview: "https://www.ayourluxe.com/",
    images: [
      { src: "/media/ayourluxe/hero.jpg", alt: "AYourluxe landing page hero" },
      { src: "/media/ayourluxe/content.jpg", alt: "AYourluxe product section" },
      { src: "/media/ayourluxe/footer.jpg", alt: "AYourluxe footer" },
    ],
    details: [
      ["Role", "Web development"],
      ["Client", "Zakaria EM"],
      ["Focus", "WhatsApp checkout, inventory sync"],
      ["Year", "2025"],
    ],
    notes: [
      [
        "Checkout",
        "A WhatsApp gateway instead of a multi-step checkout, so buyers talk to the seller directly with almost no typing.",
      ],
      [
        "Inventory",
        "A bespoke dashboard synced with Google Sheets drives live stock and automatic sold-out states across the site.",
      ],
    ],
  },
  {
    slug: "afolki-beauty",
    title: "Afolki Beauty",
    category: "E-commerce",
    client: "Hamid Fysnoop",
    location: "Morocco",
    year: "2025",
    summary:
      "A WordPress and WooCommerce storefront engineered for speed and search without losing its premium look.",
    description:
      "Cosmetics stores are usually slow because of heavy imagery. Afolki Beauty reached a 99 PageSpeed Insights score and a 90 SEO rating with a lightweight, SEO-first storefront built on a standard e-commerce platform.",
    preview: null,
    images: [
      { src: "/media/afolki/hero.jpg", alt: "Afolki Beauty storefront hero" },
      { src: "/media/afolki/content.jpg", alt: "Afolki Beauty product grid" },
      { src: "/media/afolki/footer.jpg", alt: "Afolki Beauty footer" },
    ],
    details: [
      ["Role", "E-commerce development"],
      ["Stack", "WordPress, WooCommerce"],
      ["Results", "99 PageSpeed, 90 SEO"],
      ["Year", "2025"],
    ],
    notes: [
      [
        "Performance",
        "A lightweight theme, disciplined image handling and a minimal plugin footprint kept the store close to a perfect score.",
      ],
      [
        "Search",
        "Structured product data and clean, SEO-first page structure give every product page a fair chance to rank.",
      ],
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const site = {
  email: "chedganemouhssine@gmail.com",
  phone: "+212 713 086047",
  call: "https://cal.com/muhsench/45minconsultation?duration=45&overlayCalendar=true",
  socials: [
    { label: "LinkedIn", tag: "Work", href: "https://www.linkedin.com/in/mohssine-chedgane/" },
    { label: "GitHub", tag: "Code", href: "https://github.com/Mohsinech" },
    { label: "Instagram", tag: "Studio", href: "https://www.instagram.com/milcodestudio/" },
    { label: "X", tag: "Notes", href: "https://x.com/muhsench" },
  ],
};
