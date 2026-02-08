import { revalidatePath } from "next/cache";
import { timingSafeEqual } from "crypto";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const getBearerToken = (request) => {
  const authHeader = request.headers.get("authorization") || "";
  const [scheme, token] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return "";
  }
  return token;
};

const safeEqual = (left, right) => {
  if (typeof left !== "string" || typeof right !== "string") {
    return false;
  }
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }
  return timingSafeEqual(leftBuffer, rightBuffer);
};

const isAdminToken = async (request) => {
  const token = getBearerToken(request);
  if (!token) {
    return false;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return false;
  }

  const adminClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  const { data: userData, error: userError } = await adminClient.auth.getUser(token);
  if (userError || !userData?.user) {
    return false;
  }

  const { data: isAdmin, error: adminError } = await adminClient.rpc("is_admin");
  if (adminError) {
    return false;
  }
  return Boolean(isAdmin);
};

export async function POST(request) {
  const secret = process.env.REVALIDATE_SECRET;
  const body = await request.json().catch(() => ({}));
  const bySecret = Boolean(secret) && safeEqual(body?.secret, secret);
  const byAdminToken = await isAdminToken(request);

  if (!bySecret && !byAdminToken) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const paths = Array.isArray(body?.paths) ? body.paths : [];
  if (!paths.length) {
    return new Response(JSON.stringify({ message: "No paths provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    paths.forEach((path) => revalidatePath(path));
    return new Response(JSON.stringify({ revalidated: true, paths }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error?.message || "Revalidate failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
