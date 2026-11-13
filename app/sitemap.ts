import type { MetadataRoute } from 'next';
import { baseInfo } from '@/content/informations/info';
import { getBlogMetadata, getTranslatedSlugs } from '@/lib/blog';
import { getAllProjects } from '@/lib/project';
import { getAllApps } from '@/lib/apps';

// URLs end with "/" because next.config.js sets trailingSlash: true
const url = (path: string) => `${baseInfo.portfolioURL}${path}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getBlogMetadata();
  const translated = new Set(getTranslatedSlugs('vi'));
  const projects = await getAllProjects();
  const apps = getAllApps();
  const latestPost = posts[0]?.publishedAt;

  return [
    { url: url('/'), lastModified: latestPost ? new Date(latestPost) : new Date(), changeFrequency: 'weekly', priority: 1 },
    ...(apps.length > 0 ? [{ url: url('/apps/'), changeFrequency: 'monthly' as const, priority: 0.5 }] : []),
    ...posts.flatMap((post) => {
      const en = url(`/blog/${post.slug}/`);
      const vi = url(`/blog/${post.slug}/vi/`);
      const hasVi = translated.has(post.slug);
      const alternates = hasVi ? { languages: { en, vi } } : undefined;
      const entry = { lastModified: new Date(post.publishedAt), changeFrequency: 'monthly' as const, alternates };
      return [
        { url: en, priority: 0.8, ...entry },
        ...(hasVi ? [{ url: vi, priority: 0.7, ...entry }] : []),
      ];
    }),
    ...projects.map((project) => ({
      url: url(`/project/${project.slug}/`),
      lastModified: new Date(project.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
