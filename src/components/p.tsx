"use client";

import { useState } from "react";
import { PROJECTS } from "@/constants/projects";
import type { Project } from "@/types/projects";
import RetroCard from "@/components/mvpblocks/retro-card";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <main
      id="Projects"
      className="min-h-screen scroll-mt-20 bg-black flex flex-col"
    >
      <section className="flex-1 px-4 sm:px-8 md:px-12 lg:px-20 py-14 sm:py-16 md:py-25">
        <div className="max-w-7xl mx-auto flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="text-5xl font-bold text-red-500">Projects</h1>
          </div>

          <div className="h-px bg-red-500/10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-10">
  {PROJECTS.map((project) => (
    <RetroCard key={project.id} project={project} />
  ))}
</div>
        </div>
      </section>
    </main>
  );
}