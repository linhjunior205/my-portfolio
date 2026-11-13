import type { MetadataRoute } from 'next';
import { baseInfo } from '@/content/informations/info';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${baseInfo.portfolioURL}/sitemap.xml`,
    host: baseInfo.portfolioURL,
  };
}
