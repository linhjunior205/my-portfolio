import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/blog';
import BlogArticle from '@/components/blog/BlogArticle';
import { buildPostMetadata } from '@/components/blog/postMetadata';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  return post ? buildPostMetadata(post, 'en') : { title: 'Post Not Found' };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  return <BlogArticle post={post} lang="en" />;
}
