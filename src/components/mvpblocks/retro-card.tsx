import Image from "next/image";
import type { Project } from "@/types/projects";

interface RetroCardProps {
  project: Project;
}

export default function RetroCard({ project }: RetroCardProps) {
  return (
    <article className="bg-background flex h-full w-full flex-col items-start justify-between border-4 border-black p-6 shadow-[8px_8px_0_0_#000] transition-shadow duration-300 hover:shadow-[12px_12px_0_0_#000] dark:border-red-600 dark:shadow-[8px_8px_0_0_#fff] dark:hover:shadow-[12px_12px_0_0_#fff]">
      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
        <div className="text-foreground border-2 border-black bg-red-500 px-3 py-1 font-bold dark:border-red-600">
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
        <div className="relative mt-4 h-40 w-full shrink-0 overflow-hidden border-2 border-black dark:border-red-600">
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
          <a
            href={project.projectLink || project.githubLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="absolute inset-0 max-w-xs" />
            {project.title}
          </a>
        </h3>
        <p className="text-md mt-5 line-clamp-3 border-l-4 border-red-500 pl-4 leading-6 text-gray-800 dark:text-gray-100">
          {project.shortDesc}
        </p>
      </div>

      <div className="relative mt-8 flex w-full items-center justify-between gap-x-2">
        <div className="flex flex-wrap gap-1 text-xs font-bold text-gray-700 dark:text-gray-200">
          {project.technologies.slice(2).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 text-sm font-black underline hover:text-red-500"
          >
            GitHub →
          </a>
        )}
      </div>
    </article>
  );
}