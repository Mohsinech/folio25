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
  ProjectUrl?: string;
  vid1: string;
  vide1Backup?: string;
  showCase1: string;
  projectContext?: string;
  missionStatement?: string;
  role: string;

  //
  vid2?: string;
  vid3?: string | null;
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
    parallaxImage: "/assets/projects/media/hyne/HyneParallaxM.webp",
    parallaxImages: [
      "/assets/projects/media/hyne/mobile/hero.webp",
      "/assets/projects/media/hyne/mobile/second.webp",
      "/assets/projects/media/hyne/mobile/third.webp",
    ],
    ProjectUrl: "https://hyne.com/",
    vid1: "/assets/projects/media/hyne/vids/hyneVid.webm",
    vide1Backup: "/assets/projects/media/hyne/vids/hyneVidBackup.mp4",
    showCase1: "/assets/projects/media/hyne/HyneShowcase1.webp",
    projectContext:
      "Hyne is a niche perfume brand that required a digital presence as elegant and refined as its scents. In an e-commerce landscape often cluttered with unnecessary complexity, the goal was to create a minimalist platform that prioritizes product visuals and brand atmosphere. The project demanded a departure from traditional, multi-step shopping carts in favor of a direct and personal purchasing experience.",
    missionStatement:
      "My core objective was to eliminate the friction caused by complex checkout forms. I aimed to streamline the path to purchase by integrating a seamless 'Order via WhatsApp' gateway. This approach facilitates immediate, direct communication between the brand and the client, ensuring that the technology enhances the customer relationship rather than creating barriers. The design philosophy focused on simplicity to let the product speak for itself",
    role: "DESIGN & DEVELOPMENT Responsible for the full lifecycle of the project, from UI/UX design focused on minimalism to the technical implementation of the WhatsApp ordering logic.",

    //
    vid2: "/assets/projects/media/hyne/vids/hyneVid2.webm",
    vid3: "/assets/projects/media/hyne/vids/hyneVid3.webm",
  },

  {
    id: 2,
    title: "Ayourluxe",
    slug: "ayourluxe",
    ProjectOverview: "Watche Brand E-commerce Website",
    imageUrl: "/assets/projects/ayourluxe.webp",
    projectUrl: "/work/ayourluxe",

    hasCopyright: false, // Disable it for this project

    //
    introImage: "/assets/projects/media/ayourluxe/AyourIntro.webp",
    parallaxImage: "/assets/projects/media/ayourluxe/AyourluxeParallaxM.webp",
    parallaxImages: [
      "/assets/projects/media/ayourluxe/mobile/hero.webp",
      "/assets/projects/media/ayourluxe/mobile/second.webp",
      "/assets/projects/media/ayourluxe/mobile/third.webp",
    ],
    ProjectUrl: "https://ayourluxe.com/",
    vid1: "/assets/projects/media/ayourluxe/vids/ayourluxeVid.webm",
    vide1Backup: "/assets/projects/media/ayourluxe/vids/ayourluxeVidBackup.mp4",
    showCase1: "/assets/projects/media/ayourluxe/AyourluxeShowcase1.webp",
    projectContext:
      "Hyne is a niche perfume brand that required a digital presence as elegant and refined as its scents. In an e-commerce landscape often cluttered with unnecessary complexity, the goal was to create a minimalist platform that prioritizes product visuals and brand atmosphere. The project demanded a departure from traditional, multi-step shopping carts in favor of a direct and personal purchasing experience.",
    missionStatement:
      "My core objective was to eliminate the friction caused by complex checkout forms. I aimed to streamline the path to purchase by integrating a seamless 'Order via WhatsApp' gateway. This approach facilitates immediate, direct communication between the brand and the client, ensuring that the technology enhances the customer relationship rather than creating barriers. The design philosophy focused on simplicity to let the product speak for itself",
    role: "DESIGN & DEVELOPMENT Responsible for the full lifecycle of the project, from UI/UX design focused on minimalism to the technical implementation of the WhatsApp ordering logic.",

    //
    vid2: "/assets/projects/media/ayourluxe/vids/ayourluxeVid2.webm",
    vid3: "/assets/projects/media/ayourluxe/vids/ayourluxeVid3.webm",
  },
];
