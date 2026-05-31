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
    id: 4,

    title: "04 Vortex Portal",
    client: "Aether Corp",
    category: "Creative Coding",
    location: "London",
    year: "2024",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse orem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse!",
    preview: "https://aether.uk/vortex",
    images: ["/imageone", "/imagetwo", "/imagethree"],
  },
  {
    id: 5,

    title: "05 Silver Lining",
    client: "Nimbus Media",
    category: "Motion Graphics",
    location: "San Francisco",
    year: "2022",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse orem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse!",
    preview: "https://nimbus.com/silver",
    images: ["/imageone", "/imagetwo", "/imagethree"],
  },
  {
    id: 6,

    title: "06 Deep Roots",
    client: "Terraform",
    category: "E-Commerce",
    location: "Stockholm",
    year: "2023",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse orem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse!",

    preview: "https://terra.form/roots",
    images: ["/imageone", "/imagetwo", "/imagethree"],
  },
  {
    id: 7,

    title: "07 Prism Flow",
    client: "Spectrum Art",
    category: "Web Development",
    location: "Paris",
    year: "2022",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse orem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse!",

    preview: "https://spectrum.fr/prism",
    images: ["/imageone", "/imagetwo", "/imagethree"],
  },
  {
    id: 8,

    title: "08 Orbit Engine",
    client: "SpaceXpress",
    category: "Product Design",
    location: "Austin",
    year: "2024",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse orem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse!",

    preview: "https://spacex.press/orbit",
    images: ["/imageone", "/imagetwo", "/imagethree"],
  },
  {
    id: 9,

    title: "09 Silent Cinema",
    client: "Noir Films",
    category: "Cinematography",
    location: "Los Angeles",
    year: "2021",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse orem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse!",

    preview: "https://noir.la/silent",
    images: ["/imageone", "/imagetwo", "/imagethree"],
  },
  {
    id: 10,

    title: "10 Gilded Cage",
    client: "Luxury Collective",
    category: "Visual Design",
    location: "Milan",
    year: "2023",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse orem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse!",

    preview: "https://lux.it/gilded",
    images: ["/imageone", "/imagetwo", "/imagethree"],
  },
  {
    id: 11,

    title: "11 Paper Planes",
    client: "Origin Studio",
    category: "Branding",
    location: "Montreal",
    year: "2022",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse orem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse!",
    preview: "https://origin.ca/paper",
    images: ["/imageone", "/imagetwo", "/imagethree"],
  },
  {
    id: 12,

    title: "12 Electric Sheep",
    client: "Android Dreams",
    category: "Creative Coding",
    location: "Seoul",
    year: "2024",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse orem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse!",
    preview: "https://adreams.kr/sheep",
    images: ["/imageone", "/imagetwo", "/imagethree"],
  },
  {
    id: 13,

    title: "13 Iron Works",
    client: "Forge & Fire",
    category: "Industrial Design",
    location: "Chicago",
    year: "2020",

    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse orem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse!",
    preview: "https://forgefire.com/iron",
    images: ["/imageone", "/imagetwo", "/imagethree"],
  },
  {
    id: 14,

    title: "14 Velvet Sky",
    client: "Cosmos Inc",
    category: "Web Development",
    location: "Amsterdam",
    year: "2023",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse orem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse!",
    preview: "https://cosmos.nl/velvet",
    images: ["/imageone", "/imagetwo", "/imagethree"],
  },
  {
    id: 15,

    title: "15 Liquid Gold",
    client: "Alchemy Lab",
    category: "Product Design",
    location: "Zurich",
    year: "2022",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse orem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse!",
    preview: "https://alchemy.ch/gold",
    images: ["/imageone", "/imagetwo", "/imagethree"],
  },
  {
    id: 16,

    title: "16 Urban Jungle",
    client: "Wildscape",
    category: "UI/UX Design",
    location: "Sydney",
    year: "2024",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse orem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse!",
    preview: "https://wildscape.au/urban",
    images: ["/imageone", "/imagetwo", "/imagethree"],
  },
  {
    id: 17,

    title: "17 Night Owl",
    client: "Midnight Co",
    category: "Motion Graphics",
    location: "Barcelona",
    year: "2021",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse orem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse!",
    preview: "https://midnight.es/owl",
    images: ["/imageone", "/imagetwo", "/imagethree"],
  },
  {
    id: 18,

    title: "18 Frozen Tundra",
    client: "Arctic Dev",
    category: "Web Development",
    location: "Oslo",
    year: "2023",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse orem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse!",
    preview: "https://arctic.no/tundra",
    images: ["/imageone", "/imagetwo", "/imagethree"],
  },
  {
    id: 19,

    title: "19 Copper Wire",
    client: "Link Systems",
    category: "Brand Identity",
    location: "Singapore",
    year: "2022",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse orem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse!",
    preview: "https://link.sg/copper",
    images: ["/imageone", "/imagetwo", "/imagethree"],
  },
  {
    id: 20,

    title: "20 Solar Flare",
    client: "Helios Energy",
    category: "Creative Coding",
    location: "Denver",
    year: "2024",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse orem ipsum dolor sit amet consectetur adipisicing elit. Quasi consectetur incidunt facilis, dicta ipsa libero quos cum maxime. Labore, esse!",
    preview: "https://helios.co/flare",
    images: ["/imageone", "/imagetwo", "/imagethree"],
  },
];
