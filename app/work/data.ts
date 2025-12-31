export interface Project {
  id: number;
  title: string;
  imageUrl: string;
  slug?: string;
  projectUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Hyne",
    slug: "hyne",
    imageUrl: "/assets/projects/hyneMa.webp",
    projectUrl: "/work/hyne",
  },
  // {
  //   id: 2,
  //   title: "2024 Portfolio",
  //   imageUrl: "/assets/projects/portfolio.webp",
  //   projectUrl: "/work/portfolio-2024",
  // },
  {
    id: 3,
    title: "Ayourluxe",
    imageUrl: "/assets/projects/ayourluxe.webp",
    projectUrl: "/work/ayourluxe",
  },
];
