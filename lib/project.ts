"use server";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project } from '@/types';
import { cache } from 'react';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export const getAllProjects = cache(async (): Promise<Project[]> => {
    const fileNames = fs.readdirSync(projectsDirectory);
    const allProjectsData = fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, '');
            const fullPath = path.join(projectsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                slug,
                content,
                ...data,
            } as Project;
        });

    // Sort projects by date
    return allProjectsData.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
});

export const getProjectBySlug = cache((slug: string): Project | null => {
    try {
        const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            content,
            ...data,
        } as Project;
    } catch (error) {
        return null;
    }
});

export const getAllProjectSlugs = cache((): string[] => {
    const fileNames = fs.readdirSync(projectsDirectory);
    return fileNames
        .filter((fileName) => fileName.endsWith('.mdx'))
        .map((fileName) => fileName.replace(/\.mdx$/, ''));
});

export const getProjectMetadata = cache(async (): Promise<Omit<Project, 'content'>[]> => {
    const projects = await getAllProjects();
    return projects.map(({ content, ...metadata }) => metadata);
});

export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
    const projects = await getAllProjects();
    return projects.filter((project) => project.featured);
});

export const getProjectsByTag = cache(async (tag: string): Promise<Project[]> => {
    const projects = await getAllProjects();
    return projects.filter((project) => project.tags.includes(tag));
});