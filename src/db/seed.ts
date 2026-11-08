import { eq } from "drizzle-orm";
import { db } from "./index";
import { projects } from "./schema";
import { PROJECTS } from "../constants/projects";

async function seed() {
  console.log(`Starting to seed ${PROJECTS.length} projects...`);

  for (const project of PROJECTS) {
    const existing = await db
      .select({ id: projects.id })
      .from(projects)
      .where(eq(projects.title, project.title))
      .limit(1);

    const projectData = {
      title: project.title,
      shortDescription: project.shortDesc,
      longDescription: project.fullDesc || "",
      thumbnailUrl: project.image,
      tags: project.tag ? [project.tag] : [],
      techStack: project.technologies || [],
      githubUrl: project.githubLink || null,
      liveProjectUrl: project.projectLink || null,
      isPublished: true,
    };

    if (existing.length > 0) {
      console.log(`Updating existing project: "${project.title}"`);
      await db
        .update(projects)
        .set({
          ...projectData,
          updatedAt: new Date(),
        })
        .where(eq(projects.id, existing[0].id));
    } else {
      console.log(`Inserting new project: "${project.title}"`);
      await db.insert(projects).values(projectData);
    }
  }

  console.log("Seeding completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
