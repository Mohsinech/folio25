export interface Project {
  id: number;
  title: string;
  slug?: string;
  ProjectOverview?: string;
  imageUrl: string;
  projectUrl: string;
  hasCopyright?: boolean; // Add this

  // Details
  introImage: string;
  parallaxImage?: string;
  parallaxImages?: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Hyne",
    slug: "hyne",
    ProjectOverview: "Online Store for Perfume Brands",
    imageUrl: "/assets/projects/hyneMa.webp",
    projectUrl: "/work/hyne",
    hasCopyright: true, // Enable it for this project

    //
    introImage: "/assets/projects/media/hyne/hyneIntro.webp",
    parallaxImage: "/assets/projects/media/hyne/hyneParallax.webp",
    parallaxImages: [
      "/assets/projects/media/hyne/mobile/hero.webp",
      "/assets/projects/media/hyne/mobile/second.webp",
      "/assets/projects/media/hyne/mobile/third.webp",
    ],
  },
  {
    id: 3,
    title: "Ayourluxe",
    slug: "ayourluxe",
    ProjectOverview: "Watche Brand E-commerce Website",
    imageUrl: "/assets/projects/ayourluxe.webp",
    projectUrl: "/work/ayourluxe",

    introImage: "/assets/projects/media/ayourluxe/ayourIntro.webp",
  },
  // {
  //   id: 2,
  //   title: "2024 Portfolio",
  //   imageUrl: "/assets/projects/portfolio.webp",
  //   projectUrl: "/work/portfolio-2024",
  // },
];
