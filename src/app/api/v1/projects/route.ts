
import { NextResponse } from "next/server";
import * as projectService from "@/modules/projects/project.service";
import { createProjectSchema } from "@/modules/projects/project.schema";
import { verifyAdmin } from "@/lib/auth/verify-admin";

// GET /api/v1/projects
// Retrieve all published projects
export async function GET() {
  try {
    const projects = await projectService.getPublishedProjects();

    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("GET projects error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/v1/projects
// Create a new project
export async function POST(request: Request) {
  try {
    const auth = await verifyAdmin();

    if (!auth.authorized) {
      return NextResponse.json(
        {
          success: false,
          message: auth.message,
        },
        { status: auth.status }
      );
    }
    const body = await request.json();

    const validation = createProjectSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project data",
          errors: validation.error.issues,
        },
        { status: 400 }
      );
    }

    const project = await projectService.createProject(
      validation.data
    );

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully",
        data: project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST project error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to create project" },
      { status: 500 }
    );
  }
}
