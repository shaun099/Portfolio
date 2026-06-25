"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PROJECTS } from "@/constants/projects";
import type { Project } from "@/types/projects";

function cornerClasses(variant: "tl-br" | "tr-bl"): string {
  const all = "rounded-[20px]";
  if (variant === "tl-br") {
    return `${all} sm:rounded-tl-[20px] sm:rounded-br-[20px] sm:rounded-tr-[0px] sm:rounded-bl-[0px]`;
  }
  return `${all} sm:rounded-tr-[20px] sm:rounded-bl-[20px] sm:rounded-tl-[0px] sm:rounded-br-[0px]`;
}

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden bg-zinc-950 ${project.gridClass} ${cornerClasses(project.corners)} h-[260px] sm:h-[280px] lg:h-[300px] text-left border border-white/[0.06] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-red-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50`}
      aria-label={`View project: ${project.title}`}
    >
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover brightness-[1] saturate-[0.4] transition-all duration-700 ease-out group-hover:brightness-[0.35] group-hover:scale-105"
      />

      <div
        className="absolute inset-0 bg-red-950/20 mix-blend-multiply transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
        <span className="self-start font-mono text-[9px] tracking-[0.18em] uppercase px-3 py-[5px] rounded-full border border-red-500/30 text-red-white bg-red-500">
          {project.tag}
        </span>

        <div className="flex flex-col gap-1.5">
          <h2 className="font-serif text-white font-normal leading-tight text-xl md:text-[1.4rem]">
            {project.title}
          </h2>
          <p className="text-white/40 text-xs leading-relaxed font-light max-w-xs">
            {project.shortDesc}
          </p>
          <div className="flex items-center gap-1.5 mt-3 text-red-400 text-[11px] font-mono opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            View project
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-5 bg-black/85 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="relative w-full sm:max-w-xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto [&::-webkit-scrollbar]:w-0 bg-zinc-950 sm:rounded-3xl rounded-t-3xl border border-white/[0.07] animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300">
        <div className="relative h-44 sm:h-52 sm:rounded-t-3xl rounded-t-3xl overflow-hidden flex-shrink-0">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            className="object-cover brightness-[0.3]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-white/10 text-white/70 text-sm flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/30 hover:text-white transition-all"
            aria-label="Close modal"
          >
            ✕
          </button>
          <div className="absolute bottom-3 left-5">
            <span className="font-mono text-[9px] tracking-[0.18em] uppercase px-3 py-[5px] rounded-full border border-red-500/40 text-red-400 bg-red-500/10">
              {project.tag}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-7 flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-col gap-1.5">
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white leading-tight">
              {project.title}
            </h3>
            <p className="text-sm text-white/40 leading-relaxed">
              {project.shortDesc}
            </p>
          </div>

          <p className="text-[13px] sm:text-[13.5px] text-white/60 leading-[1.8]">
            {project.fullDesc}
          </p>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-[9px] tracking-widest uppercase text-red-500/40">
              Technologies
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-red-500/[0.07] border border-red-500/20 text-red-300/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/[0.05]" />

          <div className="flex gap-2.5">
            {project.projectLink && (
              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-red-500 text-white text-xs font-mono font-medium hover:bg-red-400 transition-colors"
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live site
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/70 text-xs font-mono hover:bg-white/[0.09] hover:text-white transition-all"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selected]);

  return (
    <>
      <main id="Projects" className="min-h-screen scroll-mt-20 bg-black flex flex-col">
        <section className="flex-1 px-4 sm:px-8 md:px-12 lg:px-20 py-14 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto flex flex-col gap-8 sm:gap-10">
            <div className="flex flex-col gap-2.5">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] text-white/30">
                Things I&apos;ve{" "}
                <em className="not-italic text-red-500">built</em>
              </h1>
            </div>

            <div className="h-px bg-red-500/10" />

            <div className="grid grid-cols-12 gap-3 md:gap-4">
              {PROJECTS.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelected(project)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
