import { projects } from "./data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import styles from "./slug.module.css";
import { AnimatedText, FadeInUp } from "@/components/ui/ui";
import {
  NextProject,
  ParallaxImage,
  ParallaxImages,
  ProjectMarquee,
} from "@/utils";
import { ParallaxHeader } from "@/components";
import Image from "next/image";

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
  const index = projects.findIndex(
    (p) => p.projectUrl.replace("/work/", "") === params.slug
  );
  const fallbackTitle = projects[index !== -1 ? index : 0]?.title ?? "Project";
  return {
    title: project
      ? `${project.title} • Mohssine Chedgane`
      : `${fallbackTitle} • Mohssine Chedgane`,
  };
}

interface ProjectPageProps {
  params: { slug: string };
}

export default async function ProjectSlugPage({ params }: ProjectPageProps) {
  // Await params if you are on Next.js 15
  const { slug } = await params;

  // 1. Find the INDEX first (instead of .find())
  const currentIndex = projects.findIndex(
    (p) => p.projectUrl.replace("/work/", "") === slug
  );

  // 2. If index is -1, the project doesn't exist -> 404
  if (currentIndex === -1) return notFound();

  // 3. Get the CURRENT project
  const project = projects[currentIndex];

  // 4. Calculate the NEXT project (Modulo % loops back to the start)
  const nextIndex = (currentIndex + 1) % projects.length;
  const nextProject = projects[nextIndex];

  return (
    <main className={styles.projectPage}>
      <section className={styles.projectDetails}>
        <div className={styles.content}>
          <div className={styles.col}>
            {/* WRAPPER ADDED FOR ALIGNMENT */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.2em",
              }}
            >
              <AnimatedText
                className={styles.animatedText}
                text={project.title}
              />
              {project.hasCopyright && (
                <FadeInUp delay={0.8}>
                  <sup
                    style={{
                      fontSize: "clamp(14px, 2vw, 24px)",
                      fontWeight: "300",
                      marginTop: "0.1em",
                      display: "block",
                    }}
                  >
                    ©
                  </sup>
                </FadeInUp>
              )}
            </div>

            <FadeInUp delay={1}>
              <h4>
                Project — <span>/{project.title}</span>
              </h4>
            </FadeInUp>
          </div>

          <div className={styles.footerIntro}>
            {/* 3. Description (Fade In Up - Delay 0.4s) */}
            <FadeInUp delay={1}>
              <p> {project.ProjectOverview}</p>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Parallax Header */}
      <ParallaxHeader
        imageUrl={project.introImage}
        title={project.title}
        hasCopyright={project.hasCopyright}
      />

      {/* Project Video Section */}
      <section className={styles.projectVid}>
        {/* Header */}
        <div className={styles.header}>
          {/* LEFT SIDE: VIDEO (Clean & Floating) */}
          <div className={styles.vidProject}>
            <div className={styles.mediaWrapper}>
              <video
                src={project.vid1} // Ensure this links to .webm
                poster={project.showCase1} // Prevents empty flash
                autoPlay
                loop
                muted
                playsInline
                className={styles.mediaItem}
              />
            </div>
          </div>

          {/* RIGHT SIDE: UI IMAGE (Matches Video Style) */}
          <div className={styles.uiKit}>
            <div className={styles.mediaWrapper}>
              <Image
                src={project.showCase1}
                alt={`${project.title} Showcase`}
                fill
                className={styles.mediaItem}
              />
            </div>
          </div>
        </div>
        {/* Content Header */}
        <div className={styles.contentHeader}>
          {/* context */}
          <div className={styles.context}>
            <h4>Project Context</h4>
            <p>{project.projectContext}</p>
          </div>

          {/* mission */}
          <div className={styles.mission}>
            <h4>My Mission</h4>
            <p>{project.missionStatement}</p>
          </div>

          {/* Duration */}
          <div className={styles.role}>
            <h4>Role</h4>
            <p>{project.role}</p>
          </div>
        </div>

        {/* Mid */}
        <div className={styles.midProject}>
          <div className={styles.firstScreen}>
            <video
              src={project.vid2}
              poster={project.showCase1}
              autoPlay
              loop
              muted
              playsInline
              className={styles.mediaItem}
            />
          </div>
        </div>

        <div className={styles.midProjectWhite}>
          <div className={styles.secondScreen}>
            <video
              src={project.vid3}
              poster={project.showCase1}
              autoPlay
              loop
              muted
              playsInline
              className={styles.mediaItem}
            />
          </div>
        </div>
      </section>

      {/* Parallax Image */}
      <ParallaxImage
        parallaxImage={project.parallaxImage ?? ""}
        title={project.title}
      />

      {/* Mobiles */}
      <ParallaxImages
        parallaxImages={project.parallaxImages ?? []}
        title={project.title}
      />

      {/* Project Url */}
      <ProjectMarquee
        ProjectUrl={project.ProjectUrl ?? ""}
        image={project.introImage}
      />

      {/* Next Project Component */}
      <NextProject
        title={nextProject.title}
        image={nextProject.introImage}
        url={nextProject.projectUrl}
      />
    </main>
  );
}
