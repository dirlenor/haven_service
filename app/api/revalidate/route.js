import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const secret = process.env.REVALIDATE_SECRET;
  const body = await request.json().catch(() => ({}));
  if (!secret || body?.secret !== secret) {
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
