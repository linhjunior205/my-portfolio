import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogMetadata, BlogPost } from '@/types';

const blogDirectory = path.join(process.cwd(), 'content/blogs');

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

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);
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