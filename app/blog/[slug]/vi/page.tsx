import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getBlogPostBySlug, getTranslatedSlugs } from '@/lib/blog';
import BlogArticle from '@/components/blog/BlogArticle';
import { buildPostMetadata } from '@/components/blog/postMetadata';

interface VietnameseBlogPostPageProps {
  params: {
    slug: string;
  };
}

// Only posts that have a translation in content/blogs/vi get a /vi page
export const dynamicParams = false;

export async function generateStaticParams() {
  return getTranslatedSlugs('vi').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: VietnameseBlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug, 'vi');
  return post ? buildPostMetadata(post, 'vi') : { title: 'Không tìm thấy bài viết' };
}

export default function VietnameseBlogPostPage({ params }: VietnameseBlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug, 'vi');
  if (!post) notFound();

  return <BlogArticle post={post} lang="vi" />;
}
