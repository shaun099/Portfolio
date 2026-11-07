
import { NextResponse } from "next/server";
import * as projectService from "@/modules/projects/project.service";
import { updateProjectSchema } from "@/modules/projects/project.schema";
import { verifyAdmin } from "@/lib/auth/verify-admin";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// GET /api/v1/projects/[id]

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const project = await projectService.getProjectById(id);

    if (!project.isPublished) {
      const auth = await verifyAdmin();

      if (!auth.authorized) {
        return NextResponse.json(
          {
            success: false,
            message: "Project not found",
          },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Project not found") {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    console.error("GET project error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch project" },
      { status: 500 }
    );
  }
}


// PATCH /api/v1/projects/[id]
export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
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
    const { id } = await params;
    const body = await request.json();

    const validation = updateProjectSchema.safeParse(body);

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

    const project = await projectService.updateProject(
      id,
      validation.data
    );

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Project not found") {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    console.error("PATCH project error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE /api/v1/projects/[id]
export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
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
    const { id } = await params;
    const project = await projectService.deleteProject(id);

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
      data: project,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Project not found") {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    console.error("DELETE project error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete project" },
      { status: 500 }
    );
  }
}
