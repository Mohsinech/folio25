export interface Project {
  id: number;
  title: string;
  imageUrl: string;
  projectUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Hyne",
    imageUrl: "/assets/projects/hyne.webp",
    projectUrl: "/work/hyne",
  },
];
