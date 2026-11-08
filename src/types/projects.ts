export interface Project {
  id: number | string;
  title: string;
  shortDesc: string;
  fullDesc?: string;
  image: string;
  imageAlt: string;
  tag?: string;
  tags?: string[];
  technologies: string[];
  projectLink?: string;
  githubLink?: string;
  gridClass?: string;
  corners?: "tl-br" | "tr-bl";
}

export interface ApiProject {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  thumbnailUrl: string;
  tags: string[];
  techStack: string[];
  githubUrl?: string | null;
  liveProjectUrl?: string | null;
  isPublished?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export function mapApiProjectToProject(apiProject: ApiProject): Project {
  return {
    id: apiProject.id,
    title: apiProject.title || "",
    shortDesc: apiProject.shortDescription || "",
    fullDesc: apiProject.longDescription || "",
    image: apiProject.thumbnailUrl || "",
    imageAlt: apiProject.title || "Project thumbnail",
    tag:
      Array.isArray(apiProject.tags) && apiProject.tags.length > 0
        ? apiProject.tags[0]
        : (typeof apiProject.tags === "string" ? apiProject.tags : ""),
    tags: Array.isArray(apiProject.tags) ? apiProject.tags : [],
    technologies: Array.isArray(apiProject.techStack)
      ? apiProject.techStack
      : [],
    projectLink: apiProject.liveProjectUrl || undefined,
    githubLink: apiProject.githubUrl || undefined,
  };
}

