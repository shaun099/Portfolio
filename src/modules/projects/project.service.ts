
import * as projectRepository from "./project.repository";
import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "./project.schema";

// Create project
export async function createProject(data: CreateProjectInput) {
  return projectRepository.createProject(data);
}

// Get all projects (admin)
export async function getAllProjects() {
  return projectRepository.getAllProjects();
}

// Get published projects (public)
export async function getPublishedProjects() {
  return projectRepository.getPublishedProjects();
}

// Get project by ID
export async function getProjectById(id: string) {
  const project = await projectRepository.getProjectById(id);

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
}

// Update project
export async function updateProject(
  id: string,
  data: UpdateProjectInput
) {
  const existingProject = await projectRepository.getProjectById(id);

  if (!existingProject) {
    throw new Error("Project not found");
  }

  return projectRepository.updateProject(id, data);
}

// Delete project
export async function deleteProject(id: string) {
  const existingProject = await projectRepository.getProjectById(id);

  if (!existingProject) {
    throw new Error("Project not found");
  }

  return projectRepository.deleteProject(id);
}
