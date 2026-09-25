'use client';

import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Search, X } from 'lucide-react';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import { EmbeddedApp } from '@/types';

export default function AppsGrid({ apps }: { apps: EmbeddedApp[] }) {
    const [query, setQuery] = useState('');

    const fuse = useMemo(() => new Fuse(apps, {
        keys: [
            { name: 'title', weight: 0.5 },
            { name: 'description', weight: 0.3 },
            { name: 'tags', weight: 0.2 },
        ],
        threshold: 0.4,
        minMatchCharLength: 2,
    }), [apps]);

    const filteredApps = useMemo(() => {
        const normalizedQuery = query.trim();
        return normalizedQuery.length < 2
            ? apps
            : fuse.search(normalizedQuery).map((result) => result.item);
    }, [apps, fuse, query]);

    return (
        <section className="px-4 py-20">
            <div className="container mx-auto max-w-7xl">
                <SectionHeader
                    title="Apps"
                    subtitle="A collection of useful tools that run directly in your browser."
                />

                <div className="relative mx-auto mb-12 max-w-2xl">
                    <label htmlFor="app-search" className="sr-only">Search apps</label>
                    <Search
                        size={20}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                        id="app-search"
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search apps by name, description, or tag..."
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-14 text-white placeholder:text-gray-500 backdrop-blur-sm transition-colors focus:border-purple-500/60 focus:outline-none"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            aria-label="Clear search"
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <X size={18} aria-hidden="true" />
                        </button>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {filteredApps.length > 0 ? (
                        <motion.div
                            key="results"
                            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {filteredApps.map((app, index) => (
                                <motion.article
                                    key={app.slug}
                                    className="group flex min-h-72 flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-white/10"
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    whileHover={{ y: -8 }}
                                >
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 font-mono text-lg font-bold text-white ring-1 ring-white/10">
                                        {app.title.slice(0, 2).toUpperCase()}
                                    </div>

                                    <h2 className="mb-3 text-2xl font-bold text-white transition-colors group-hover:text-blue-400">
                                        {app.title}
                                    </h2>
                                    <p className="mb-6 flex-1 leading-relaxed text-gray-400">
                                        {app.description}
                                    </p>

                                    <div className="mb-6 flex flex-wrap gap-2">
                                        {app.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-white/10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 text-xs font-medium text-white"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        href={`/app/${app.slug}`}
                                        className="inline-flex items-center gap-2 font-medium text-blue-400 transition-colors hover:text-blue-300"
                                    >
                                        Launch app
                                        <ArrowUpRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </Link>
                                </motion.article>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            role="status"
                            className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-16 text-center"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="mb-2 text-xl font-semibold text-white">No apps found</h2>
                            <p className="text-gray-400">Try a different name, description, or tag.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
