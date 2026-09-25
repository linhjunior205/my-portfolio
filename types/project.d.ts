export type Project = {
    slug: string;
    title: string;
    summary: string;
    image: string;
    publishedAt: string;
    live?: string;
    repo?: string;
    category?: string;
    tags: string[];
    featured: boolean;
    teamSize?: number;
    content: string;
}

export type ProjectMetadata = {
    slug: string;
    title: string;
    summary: string;
    image: string;
    publishedAt: string;
    live?: string;
    repo?: string;
    category?: string;
    tags: string[];
    featured: boolean;
    teamSize?: number;
}