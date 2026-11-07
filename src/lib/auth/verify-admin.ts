
import { createClient } from "@/lib/supabase/server";

export async function verifyAdmin() {
  const supabase = await createClient();

  // Verify the user's session with Supabase Auth
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // Not logged in or invalid session
  if (error || !user) {
    return {
      authorized: false as const,
      status: 401,
      message: "Authentication required",
    };
  }

  // Check administrator identity
  const adminUserId = process.env.ADMIN_USER_ID;

  if (!adminUserId) {
    throw new Error("ADMIN_USER_ID is not configured");
  }

  if (user.id !== adminUserId) {
    return {
      authorized: false as const,
      status: 403,
      message: "Access denied",
    };
  }

  return {
    authorized: true as const,
    user,
  };
}
