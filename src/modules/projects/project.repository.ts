
import { eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";

import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "./project.schema";

// Create a project
export async function createProject(data: CreateProjectInput) {
  const [project] = await db
    .insert(projects)
    .values(data)
    .returning();

  return project;
}

// Get all projects (including drafts)
export async function getAllProjects() {
  return db
    .select()
    .from(projects)
    .orderBy(desc(projects.createdAt));
}

// Get only published projects
export async function getPublishedProjects() {
  return db
    .select()
    .from(projects)
    .where(eq(projects.isPublished, true))
    .orderBy(desc(projects.createdAt));
}

// Get a project by ID
export async function getProjectById(id: string) {
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);

  return project ?? null;
}

// Update a project
export async function updateProject(
  id: string,
  data: UpdateProjectInput
) {
  const [project] = await db
    .update(projects)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, id))
    .returning();

  return project ?? null;
}

// Delete a project
export async function deleteProject(id: string) {
  const [project] = await db
    .delete(projects)
    .where(eq(projects.id, id))
    .returning({ id: projects.id });

  return project ?? null;
}
