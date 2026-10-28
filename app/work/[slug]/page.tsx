import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy/CaseStudy";
import { getProject, projects } from "@/app/data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} Case Study`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} Case Study • Mohssine Chedgane`,
      description: project.summary,
      url: `/work/${project.slug}`,
      images: [project.images[0].src],
    },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return notFound();
  return <CaseStudy key={project.slug} project={project} />;
}
