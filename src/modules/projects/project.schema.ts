
import { z } from "zod";

// Create project validation
export const createProjectSchema = z.object({
  title: z.string().trim().min(1).max(255),

  shortDescription: z.string().trim().min(1),

  longDescription: z.string().trim().min(1),

  thumbnailUrl: z.string().trim().min(1),

  tags: z.array(z.string().trim().min(1)).default([]),

  techStack: z.array(z.string().trim().min(1)).default([]),

  githubUrl: z.url().nullable().optional(),

  liveProjectUrl: z.url().nullable().optional(),

  isPublished: z.boolean().default(false),
});

// Update project validation
export const updateProjectSchema =
  createProjectSchema.partial();

// Export inferred TypeScript types
export type CreateProjectInput =
  z.infer<typeof createProjectSchema>;

export type UpdateProjectInput =
  z.infer<typeof updateProjectSchema>;
