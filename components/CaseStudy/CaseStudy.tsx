"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { projects, type Media, type ProjectInfo } from "@/app/data";
import Eyes from "@/components/Eyes/Eyes";
import styles from "./case.module.css";

const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");

/** Put the eyes after the first sentence of the context paragraph. */
function withEyes(text: string) {
  const i = text.indexOf(". ");
  if (i < 0)
    return (
      <>
        {text} <Eyes />
      </>
    );
  return (
    <>
      {text.slice(0, i + 1)} <Eyes /> {text.slice(i + 2)}
    </>
  );
}

function Screen({ item, sizes }: { item: Media; sizes: string }) {
  return (
    <div className={styles.scr}>
      {item.type === "video" ? (
        <video src={item.src} poster={item.poster} autoPlay muted loop playsInline aria-label={item.alt} />
      ) : (
        <Image src={item.src} alt={item.alt} fill sizes={sizes} />
      )}
    </div>
  );
}

/** One wide section, then repeating groups of four: a side-by-side pair, then two wide sections. */
function MediaBlocks({ list }: { list: Media[] }) {
  const blocks: React.ReactNode[] = [];
  for (let k = 0; k < list.length; k += 4) {
    const pair = list.slice(k, k + 2);
    const stack = list.slice(k + 2, k + 4);
    if (pair.length === 2) {
      blocks.push(
        <section key={`p${k}`} className={styles.pair}>
          {pair.map((m) => (
            <div key={m.src} className={styles.cell}>
              <Screen item={m} sizes="(max-width: 900px) 100vw, 45vw" />
            </div>
          ))}
        </section>,
      );
    } else {
      blocks.push(
        <section key={`w${k}`} className={styles.wide}>
          <Screen item={pair[0]} sizes="(max-width: 900px) 100vw, 76rem" />
        </section>,
      );
    }
    stack.forEach((m) =>
      blocks.push(
        <section key={`s${m.src}${k}`} className={styles.wide}>
          <Screen item={m} sizes="(max-width: 900px) 100vw, 76rem" />
        </section>,
      ),
    );
  }
  return <div className={styles.media}>{blocks}</div>;
}

/**
 * Case study. Media follows Dennis Snellenberg (inset title, label/rule/value details,
 * large inset cover, screens in full-width grey sections); text follows Mill3 (big context
 * paragraph with inline eyes, uppercase problem/solution rows). A marquee to the live site
 * and the next case close the page.
 */
export default function CaseStudy({ project }: { project: ProjectInfo }) {
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const [first, ...rest] = project.media;
  const cover = project.images[0];

  const coverRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLAnchorElement>(null);
  const peekRef = useRef<HTMLDivElement>(null);

  // Cover screenshot scrolls inside its frame; next-case preview follows the cursor.
  useEffect(() => {
    const coverEl = coverRef.current;
    const slide = slideRef.current;
    const link = nextRef.current;
    const peek = peekRef.current;
    if (!coverEl || !slide || !link || !peek) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX - peek.offsetWidth / 2;
      ty = e.clientY - peek.offsetHeight - 24;
    };
    const on = () => (peek.dataset.on = "true");
    const off = () => (peek.dataset.on = "false");

    const loop = () => {
      if (!reduced) {
        const vh = window.innerHeight;
        const r = coverEl.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        slide.style.transform = `translate3d(0, ${-p * (slide.offsetHeight - coverEl.offsetHeight)}px, 0)`;
      }
      px += (tx - px) * 0.15;
      py += (ty - py) * 0.15;
      peek.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    link.addEventListener("pointerenter", on);
    link.addEventListener("pointerleave", off);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      link.removeEventListener("pointerenter", on);
      link.removeEventListener("pointerleave", off);
    };
  }, [project.slug]);

  const words = project.preview ? ["Discover", "Website"] : [project.title, "Case study"];
  const thumbs = project.images;
  const group = (hidden: boolean) => (
    <div className={styles.group} aria-hidden={hidden || undefined}>
      {[0, 1, 2, 3].map((k) => (
        <span key={k} className={styles.groupItem}>
          <span className={styles.word}>{words[k % 2]}</span>
          <span className={styles.thumb}>
            <Image src={thumbs[k % thumbs.length].src} alt="" fill sizes="150px" />
          </span>
        </span>
      ))}
    </div>
  );
  const track = (
    <div className={styles.track}>
      {group(false)}
      {group(true)}
    </div>
  );

  return (
    <article className={styles.cs}>
      <header className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.line}>
            <span>{project.title}</span>
          </span>
        </h1>
        <dl className={styles.meta}>
          <div>
            <dt>Role / services</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Client</dt>
            <dd>{project.client}</dd>
          </div>
          <div>
            <dt>Location &amp; year</dt>
            <dd>
              {project.place} © {project.year}
            </dd>
          </div>
        </dl>
      </header>

      <div className={styles.cover} ref={coverRef}>
        <div className={styles.slide} ref={slideRef}>
          <Image src={cover.src} alt={cover.alt} fill priority sizes="(max-width: 900px) 100vw, 84vw" />
        </div>
      </div>

      <section className={styles.context}>
        <p className={styles.label}>Context</p>
        <p className={styles.big}>{withEyes(project.context)}</p>
      </section>

      {first && (
        <div className={styles.media} style={{ marginTop: "clamp(5rem, 10vw, 9rem)" }}>
          <section className={styles.wide}>
            <Screen item={first} sizes="(max-width: 900px) 100vw, 76rem" />
          </section>
        </div>
      )}

      <section className={styles.ps}>
        <div className={styles.row}>
          <div>
            <p className={styles.label}>Problem</p>
            <h2>{project.problem[0]}</h2>
          </div>
          <p className={styles.body}>{project.problem[1]}</p>
        </div>
        <div className={styles.row}>
          <div>
            <p className={styles.label}>Solution</p>
            <h2>{project.solution[0]}</h2>
          </div>
          <div>
            <p className={styles.body}>{project.solution[1]}</p>
            {project.results.length > 0 && (
              <div className={styles.stats}>
                {project.results.map(([value, label]) => (
                  <div key={label} className={styles.stat}>
                    <b>{value}</b>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {rest.length > 0 && (
        <>
          <div style={{ marginTop: "clamp(5rem, 10vw, 9rem)" }}>
            <MediaBlocks list={rest} />
          </div>
          <p className={styles.count}>
            <span>{project.title}</span>
            <span>{project.media.length + 1} images</span>
          </p>
        </>
      )}

      <section className={styles.credits}>
        <p className={styles.label}>Credits</p>
        <ul>
          {project.credits.map(([label, value]) => (
            <li key={label}>
              <span>{label}</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </section>

      {project.preview ? (
        <a
          className={styles.marquee}
          href={project.preview}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${host(project.preview)}`}
        >
          {track}
        </a>
      ) : (
        <div className={styles.marquee} aria-hidden="true">
          {track}
        </div>
      )}

      <nav className={styles.next} aria-label="Next case">
        <p className={styles.label}>Next case</p>
        <Link href={`/work/${next.slug}`} className={styles.nextTitle} ref={nextRef}>
          {next.title}
        </Link>
        <div className={styles.rule}>
          <Link href="/" className={styles.all}>
            All work ({projects.length})
          </Link>
        </div>
        <div className={styles.peek} ref={peekRef} data-on="false" aria-hidden="true">
          <Image src={next.images[0].src} alt="" fill sizes="340px" />
        </div>
      </nav>
    </article>
  );
}
