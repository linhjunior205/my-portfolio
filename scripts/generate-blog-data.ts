import { getAllBlogPosts, hasTranslation } from '@/lib/blog';
import fs from 'fs';
import path from 'path';

export function generateBlogSearchIndex(): void {
  const posts = getAllBlogPosts().map((post) => ({
    ...post,
    languages: hasTranslation(post.slug, 'vi') ? ['en', 'vi'] : ['en'],
  }));

  const outputPath = path.join(process.cwd(), 'public/blog-search-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
}

generateBlogSearchIndex();