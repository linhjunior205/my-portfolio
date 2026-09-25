import apps from '@/content/apps.json';
import { EmbeddedApp } from '@/types';

const embeddedApps = apps as EmbeddedApp[];

export function getAllApps(): EmbeddedApp[] {
    return embeddedApps;
}

export function getAppBySlug(slug: string): EmbeddedApp | undefined {
    return embeddedApps.find((app) => app.slug === slug);
}

export function getAllAppSlugs(): string[] {
    return embeddedApps.map((app) => app.slug);
}
