interface projectInfo {
  id: number;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  description: string;
  preview: string;
  images: string[];
}

export const projectData: projectInfo[] = [
  {
    id: 3,
    title: "03 Bentofolio",
    category: "Design & Developement",
    client: "Bentofolio",
    location: "Global",
    year: "2026",
    description:
      "Bentofolio is a next-generation portfolio builder designed for modern creatives. Combining elegant bento-grid layouts with powerful customization, it enables developers, designers, influencers, and founders to create memorable portfolio websites that showcase their work with personality and clarity.",
    preview: "https://bentofolio.dev/",
    images: [
      "/media/bentofolio/hero.jpg",
      "/media/bentofolio/login.jpg",
      "/media/bentofolio/pricing.jpg",
    ],
  },
  {
    id: 1,
    title: "01  AYourluxe",
    category: "Web developement",
    client: "Zakaria EM",
    location: "Morocco",
    year: "2025",
    description:
      "Developed a high-performance landing page for a premium watch brand, bridging the gap between editorial design and operational efficiency. I replaced traditional, high-friction checkout flows with a streamlined WhatsApp-integrated gateway, increasing conversion potential by reducing user input. The site is powered by a custom headless inventory system that syncs a bespoke management dashboard with Google Sheets, enabling real-time stock tracking and automatic 'Sold Out' UI transitions without manual code updates.",
    preview: "https://www.ayourluxe.com/",
    images: [
      "/media/ayourluxe/hero.jpg",
      "/media/ayourluxe/content.jpg",
      "/media/ayourluxe/footer.jpg",
    ],
  },
  {
    id: 2,
    title: "02 Afolki Beauty",
    category: "Branding",
    client: "Hamid Fysnoop",
    location: "Morocco",
    year: "2025",
    description:
      "For Afolki Beauty, I pushed the limits of WordPress and WooCommerce to achieve a near-perfect 99 PageSpeed Insight score and 90 SEO rating. While many cosmetic sites suffer from slow load times due to heavy imagery, I architected a lightweight, SEO-optimized storefront that doesn't compromise on the premium aesthetic. This project demonstrates my ability to take a standard e-commerce platform and engineer it for maximum visibility and elite performance.",
    preview: "www.preview.com",
    images: [
      "/media/afolki/hero.jpg",
      "/media/afolki/content.jpg",
      "/media/afolki/footer.jpg",
    ],
  },
];
