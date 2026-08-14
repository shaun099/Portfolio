import Image from "next/image";
import type { Project } from "@/types/projects";
import { Link } from 'lucide-react';

interface RetroCardProps {
  project: Project;
}

export default function RetroCard({ project }: RetroCardProps) {
  return (
    <article className="bg-background flex h-full w-full flex-col items-start justify-between border-4 border-black p-6 shadow-[8px_8px_0_0_#000] transition-shadow duration-300 hover:shadow-[12px_12px_0_0_#000] dark:border-red-600 dark:shadow-[8px_8px_0_0_#fff] dark:hover:shadow-[12px_12px_0_0_#fff]">
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
        <div className="text-foreground border-2 border-black bg-red-500 px-3 py-1 font-bold dark:border-white">
          {project.tag}
        </div>
        {project.technologies.slice(0, 2).map((tech) => (
          <span
            key={tech}
            className="border-border text-foreground border-2 bg-red-500 px-3 py-1 font-bold"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.image && (
        <div className="relative mt-4 h-40 w-full shrink-0 overflow-hidden border-2 border-white dark:border-white">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="group relative flex-1">
        <h3 className="text-red-500 text-foreground mt-3 text-2xl leading-6 font-black uppercase">
          {project.title}
        </h3>
        <p className="text-md mt-5 line-clamp-3 border-l-4 border-red-500 pl-4 leading-6 text-gray-800 dark:text-gray-100">
          {project.shortDesc}
        </p>
      </div>

      <div className="relative mt-8 flex w-full items-center justify-between gap-x-2">
        {/* <div className="flex flex-wrap gap-1 text-xs font-bold text-gray-700 dark:text-gray-200">
          {project.technologies.slice(2).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div> */}
        {project.projectLink && (
          <a
            href={project.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-black bg-red-500 px-3 py-2 text-xs font-black uppercase tracking-wide text-white transition hover:bg-red-400 dark:border-white"
          >
            <span>Project Link</span>
            <Link size={16} />
          </a>
        )}
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-red-500 transition hover:text-red-400"
          >
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}