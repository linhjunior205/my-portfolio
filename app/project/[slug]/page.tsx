import { getAllProjectSlugs, getProjectBySlug } from "@/lib/project";
import { notFound } from "next/navigation";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from "next";
import { useMDXComponents } from "@/app/mdx-component";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { baseInfo } from "@/content/informations/info";

interface ProjectPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const slugs = await getAllProjectSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
    const { getProjectBySlug } = await import('@/lib/project');
    const project = await getProjectBySlug(params.slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: `${project.title} | ${baseInfo.shortName} Portfolio`,
        description: project.summary,
        openGraph: {
            title: project.title,
            description: project.summary,
            type: 'website',
            images: [project.image],
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: project.summary,
            images: [project.image],
        },
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const project = await getProjectBySlug(params.slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            <div className="container mx-auto max-w-4xl px-4 py-20">
                {/* Back to Projects */}
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    Back to Projects
                </Link>

                {/* Project Header */}
                <header className="mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                        {project.title}
                    </h1>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full text-sm font-medium text-blue-400"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {project.teamSize && (
                        <div className="flex items-center gap-2 text-gray-400 mb-6">
                            <User size={16} />
                            <span>Team Size: {project.teamSize}</span>
                        </div>
                    )}
                </header>

                {/* Featured Image */}
                <div className="relative aspect-video rounded-lg overflow-hidden mb-12">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Project Content */}
                <article className="prose prose-invert prose-lg max-w-none">
                    <div className="text-gray-300 leading-relaxed">
                        <MDXRemote
                            source={project.content}
                            components={useMDXComponents()}
                            options={{ blockJS: false }}
                        />
                    </div>
                </article>

                {/* Project Links */}
                {(project.live || project.repo) && (
                    <div className="mt-12 flex flex-wrap gap-4">
                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 inline-flex items-center gap-2"
                            >
                                View Live Demo
                            </a>
                        )}
                        {project.repo && (
                            <a
                                href={project.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg transition-colors duration-300 inline-flex items-center gap-2"
                            >
                                View Source Code
                            </a>
                        )}
                    </div>
                )}

                {/* Project Footer */}
                <footer className="mt-16 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Interested in working together?</h3>
                            <p className="text-gray-400">
                                Let's discuss your next project.
                            </p>
                        </div>
                        <Link
                            href="/#contact"
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </footer>
            </div>
        </div>
    );
}