import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth/verify-admin";

export async function GET() {
  try {
    const auth = await verifyAdmin();

    if (!auth.authorized) {
      return NextResponse.json(
        { success: false, message: auth.message },
        { status: auth.status }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: auth.user.id,
        email: auth.user.email,
      },
    });
  } catch (error) {
    console.error("GET /api/auth/me error:", error);
    return NextResponse.json(
      { success: false, message: "Authentication check failed" },
      { status: 500 }
    );
  }
}
