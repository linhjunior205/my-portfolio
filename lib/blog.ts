import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogMetadata, BlogPost } from '@/types';
import { slugify } from '@/lib/utils';

const blogDirectory = path.join(process.cwd(), 'content/blogs');

// Translations live in content/blogs/<lang>/<slug>.mdx and share the English slug.
export type BlogLang = 'en' | 'vi';
export const BLOG_LANGS: BlogLang[] = ['en', 'vi'];

function postPath(slug: string, lang: BlogLang): string {
  return lang === 'en'
    ? path.join(blogDirectory, `${slug}.mdx`)
    : path.join(blogDirectory, lang, `${slug}.mdx`);
}

export function getAllBlogPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(blogDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        ...data,
      } as BlogPost;
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getBlogPostBySlug(slug: string, lang: BlogLang = 'en'): BlogPost | null {
  try {
    const fullPath = postPath(slug, lang);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...data,
    } as BlogPost;
  } catch (error) {
    return null;
  }
}

export function getAllBlogSlugs(): string[] {
  const fileNames = fs.readdirSync(blogDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}

export function getBlogMetadata(): BlogMetadata[] {
  const posts = getAllBlogPosts();
  return posts.map(({ content, ...metadata }) => metadata);
}

export function getFeaturedBlogPosts(): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter((post) => post.featured);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

export function getAllBlogTags(): string[] {
  const posts = getAllBlogPosts();
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}
export function hasTranslation(slug: string, lang: BlogLang): boolean {
  return fs.existsSync(postPath(slug, lang));
}

export function getTranslatedSlugs(lang: BlogLang): string[] {
  const dir = path.join(blogDirectory, lang);
  if (lang === 'en' || !fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''))
    .filter((slug) => fs.existsSync(postPath(slug, 'en')));
}

// Posts sharing the most tags with the given post, newest first on ties.
export function getRelatedPosts(slug: string, limit = 3): BlogMetadata[] {
  const posts = getBlogMetadata();
  const current = posts.find((post) => post.slug === slug);
  if (!current) return [];

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      shared: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.shared - a.shared || (a.post.publishedAt < b.post.publishedAt ? 1 : -1))
    .slice(0, limit)
    .map(({ post }) => post);
}

export type TocHeading = { id: string; text: string; level: 2 | 3 };

// Extract ## and ### headings (outside fenced code blocks) for a table of contents.
// IDs use the same slugify() as components/mdx/LinkHeading so anchors match.
export function extractHeadings(content: string): TocHeading[] {
  const headings: TocHeading[] = [];
  let inFence = false;

  for (const line of content.split('\n')) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const text = match[2].replace(/[*_`]/g, '').trim();
    headings.push({ id: slugify(text), text, level: match[1].length as 2 | 3 });
  }

  return headings;
}
