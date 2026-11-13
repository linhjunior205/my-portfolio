import { Metadata } from 'next';
import { baseInfo } from '@/content/informations/info';
import { BlogLang, hasTranslation } from '@/lib/blog';
import { BlogPost } from '@/types';
import { blogPostPath } from './BlogArticle';

export function buildPostMetadata(post: BlogPost, lang: BlogLang): Metadata {
  const languages: Record<string, string> = { en: blogPostPath(post.slug, 'en') };
  if (hasTranslation(post.slug, 'vi')) languages.vi = blogPostPath(post.slug, 'vi');

  return {
    title: `${post.title} | ${baseInfo.shortName} Blog`,
    description: post.summary,
    keywords: post.tags,
    alternates: {
      canonical: blogPostPath(post.slug, lang),
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      url: blogPostPath(post.slug, lang),
      locale: lang === 'vi' ? 'vi_VN' : 'en_US',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [post.image],
    },
  };
}
