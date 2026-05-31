export interface Project {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  imageAlt: string;
  tag: string;
  technologies: string[];
  projectLink?: string;
  githubLink?: string;
  gridClass: string;
  corners: "tl-br" | "tr-bl";
}
