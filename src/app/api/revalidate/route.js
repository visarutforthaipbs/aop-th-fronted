import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

const SECRET = process.env.REVALIDATE_SECRET;

export async function POST(request) {
  if (!SECRET) {
    return NextResponse.json(
      { error: "REVALIDATE_SECRET not configured" },
      { status: 500 }
    );
  }

  const provided = request.headers.get("x-revalidate-secret");
  if (provided !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { type, slug, action } = payload || {};
  const revalidated = [];

  switch (type) {
    case "campaigns": {
      revalidateTag("campaigns");
      revalidatePath("/campaigns");
      revalidatePath("/");
      revalidated.push("tag:campaigns", "/campaigns", "/");
      if (slug) {
        revalidatePath(`/campaigns/${slug}`);
        revalidated.push(`/campaigns/${slug}`);
      }
      break;
    }
    case "articles": {
      revalidateTag("articles");
      revalidatePath("/media");
      revalidatePath("/media/articles");
      revalidatePath("/");
      revalidated.push("tag:articles", "/media", "/media/articles", "/");
      if (slug) {
        revalidatePath(`/media/articles/${slug}`);
        revalidated.push(`/media/articles/${slug}`);
      }
      break;
    }
    case "posts": {
      revalidateTag("posts");
      revalidatePath("/");
      revalidated.push("tag:posts", "/");
      break;
    }
    case "pages": {
      revalidateTag("pages");
      revalidated.push("tag:pages");
      if (slug) {
        revalidatePath(`/${slug}`);
        revalidated.push(`/${slug}`);
      }
      break;
    }
    default:
      return NextResponse.json(
        { error: `Unknown type: ${type}` },
        { status: 400 }
      );
  }

  revalidatePath("/sitemap.xml");
  revalidated.push("/sitemap.xml");

  return NextResponse.json({
    revalidated: true,
    type,
    slug,
    action,
    paths: revalidated,
    now: Date.now(),
  });
}

export async function GET() {
  return NextResponse.json({
    message: "POST with header x-revalidate-secret and JSON body { type, slug, action }",
  });
}
