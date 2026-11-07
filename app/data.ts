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
  /** Case page: shown under the title as "Role / services" and "Location & year". */
  role: string;
  place: string;
  /** Case page: one-line intro, big "Context" paragraph, problem and solution. */
  lede: string;
  context: string;
  problem: [title: string, body: string];
  solution: [title: string, body: string];
  /** Real numbers only; leave empty if there are none yet. */
  results: [value: string, label: string][];
  credits: [label: string, value: string][];
  /**
   * Screens shown after the cover, in order. Add as many as you like; images or looping
   * videos (put files in /public/media/<project>/). Layout: one wide, then repeating
   * groups of a side-by-side pair followed by two full-width sections.
   */
  media: Media[];
}

export type Media =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string; poster?: string };

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
    role: "Product design, frontend",
    place: "Global",
    lede: "A restrained portfolio builder for creatives, shaped around bento sections and quiet motion.",
    context:
      "Bentofolio is a portfolio builder for developers, designers, influencers and founders. It turns a personal site into something closer to a product: structured enough to ship in an afternoon, flexible enough that no two portfolios look alike. Every screen, from sign-in to pricing to the editor, follows the same quiet system, so the work always stays in front.",
    problem: [
      "Portfolios look either generic or take weeks to build.",
      "Templates make everyone look the same, and a custom site means hiring a designer or spending weeks on it. Creatives needed something in between: fast to set up, with real personality.",
    ],
    solution: [
      "Bento sections held together by a strict, quiet system.",
      "Work is arranged in bento sections that can be mixed freely, held together by sharp typography, generous whitespace and compact controls. Motion only reveals hierarchy. Component-first sections, a responsive image system and shared animation timing keep every screen consistent.",
    ],
    results: [],
    credits: [
      ["Design and development", "Mohssine Chedgane"],
      ["Stack", "Next.js, Framer Motion"],
    ],
    media: [
      { type: "image", src: "/media/bentofolio/login.jpg", alt: "Bentofolio sign-in screen" },
      { type: "image", src: "/media/bentofolio/pricing.jpg", alt: "Bentofolio pricing screen" },
      { type: "image", src: "/media/bentofolio/hero.jpg", alt: "Bentofolio dashboard" },
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
    role: "Web development",
    place: "Morocco",
    lede: "A landing page and inventory system for a premium watch brand.",
    context:
      "AYourluxe is a premium watch brand in Morocco that already sold most of its pieces through conversations with customers. The new site had to feel editorial and luxurious, and still be simple for a small team to run every day.",
    problem: [
      "A checkout and a stock list that slowed sales down.",
      "Customers had to go through a multi-step checkout to buy something they would rather ask about, and stock was updated by hand, so sold-out watches stayed on the site.",
    ],
    solution: [
      "A WhatsApp order flow and stock that updates itself.",
      "Checkout was replaced by a WhatsApp order flow, so buyers talk to the seller directly with almost no typing. A custom headless inventory syncs a dashboard with Google Sheets: stock updates in real time and products switch to sold out automatically, with no code changes.",
    ],
    results: [["0", "Code changes to mark a product sold out"]],
    credits: [
      ["Development", "Mohssine Chedgane"],
      ["Stack", "Custom dashboard, Google Sheets, WhatsApp"],
    ],
    media: [
      { type: "image", src: "/media/ayourluxe/content.jpg", alt: "AYourluxe product section" },
      { type: "image", src: "/media/ayourluxe/footer.jpg", alt: "AYourluxe footer" },
      { type: "image", src: "/media/ayourluxe/hero.jpg", alt: "AYourluxe landing page" },
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
    role: "E-commerce development",
    place: "Morocco",
    lede: "A WooCommerce storefront engineered for speed and search.",
    context:
      "Afolki Beauty is a Moroccan cosmetics brand selling online with WordPress and WooCommerce. Beauty stores live on large, detailed product photos, which usually makes them slow, and slow stores rank and sell worse.",
    problem: [
      "Heavy imagery, slow pages, weak search visibility.",
      "Standard e-commerce themes load dozens of scripts and full-size images. For a brand that lives on product photography, that meant slow pages and a store that was hard to find in search.",
    ],
    solution: [
      "A lightweight, SEO-first WooCommerce build.",
      "A lightweight theme, disciplined image handling and a minimal plugin footprint, combined with structured product data and a clean, SEO-first page structure.",
    ],
    results: [
      ["99", "PageSpeed Insights"],
      ["90", "SEO score"],
    ],
    credits: [
      ["Development and SEO", "Mohssine Chedgane"],
      ["Stack", "WordPress, WooCommerce"],
    ],
    media: [
      { type: "image", src: "/media/afolki/content.jpg", alt: "Afolki Beauty product grid" },
      { type: "image", src: "/media/afolki/footer.jpg", alt: "Afolki Beauty footer" },
      { type: "image", src: "/media/afolki/hero.jpg", alt: "Afolki Beauty storefront" },
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
