import { getNewsBySlug, getAllNews } from "@/lib/api";
import { notFound } from "next/navigation";
import NewsDetailClient from "./NewsDetailClient";

export async function generateStaticParams() {
  const posts = await getAllNews(1, 100);

  if (!posts) return [];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function NewsDetail({ params }) {
  const { slug } = params;

  // Fetch the post with embedded data
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(
    `${API_URL}/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`,
    { next: { revalidate: 0 } }
  );

  const posts = await response.json();
  const post = posts && posts.length > 0 ? posts[0] : null;

  if (!post) {
    notFound();
  }

  // Fetch related posts
  const allPosts = await getAllNews(1, 10);
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  return <NewsDetailClient post={post} relatedPosts={relatedPosts} />;
}
