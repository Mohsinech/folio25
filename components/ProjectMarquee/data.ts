// data.ts
export interface ProjectMarqueeData {
  id: number;
  img: string;
  title: string; // Added this
}

export const projectMarqueeData: ProjectMarqueeData[] = [
  {
    id: 1,
    img: "/assets/images/media/milcodeStudio.webp",
    title: "In Progress...",
  },
  {
    id: 2,
    img: "/assets/images/media/milcode.webp",
    title: "In Progress...",
  },
  {
    id: 3,
    img: "/assets/images/media/vocaflow.webp",
    title: "Vocaflow App",
  },
  {
    id: 4,
    img: "/assets/images/media/afolki.webp",
    title: "Afolki Beauty",
  },

  {
    id: 7,
    img: "/assets/images/media/hyneShop.webp",
    title: "HYNE SHOP",
  },
];
