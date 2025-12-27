import { projects } from "../data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.projectUrl.replace("/work/", ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = projects.find(
    (p) => p.projectUrl.replace("/work/", "") === params.slug
  );
  return {
    title: project ? project.title : `${projects[0].title} | Mohssine Chedgane`,
  };
}

interface ProjectPageProps {
  params: { slug: string };
}

export default async function ProjectSlugPage({ params }: ProjectPageProps) {
  // Await params if you are on Next.js 15 (Good practice anyway)
  const { slug } = await params;

  // FIX: Use the same logic here as you did in generateMetadata
  const project = projects.find(
    (p) => p.projectUrl.replace("/work/", "") === slug
  );

  if (!project) return notFound();

  return (
    <div style={{ padding: 32 }}>
      <h1>{project.title}</h1>
      <Image
        src={project.imageUrl}
        alt={project.title}
        width={600}
        height={400}
        priority // Add priority since this is the main image (LCP)
      />
      <p>Project slug: {slug}</p>
    </div>
  );
}
