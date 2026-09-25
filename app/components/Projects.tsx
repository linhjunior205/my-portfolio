'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronRight, Section } from 'lucide-react';
import { Project } from '@/types';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import { baseInfo } from '@/content/informations/info';

export default function Projects({
  projects
}: {
  projects: Project[];
}) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = ['all', 'web', 'mobile', 'fullstack', 'opensource'];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <SectionHeader title="Featured Projects" subtitle="A showcase of my recent work, spanning web applications, mobile apps, and open source contributions." />

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === filter
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.article
                key={index}
                className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 ${project.featured ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <motion.div
                    className="absolute top-4 right-4 z-20 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-xs font-bold text-black"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Featured
                  </motion.div>
                )}

                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Overlay Links */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  >
                    {project.live && <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink size={20} />
                    </motion.a>}
                    {project.repo && <motion.a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github size={20} />
                    </motion.a>}
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <Link href={`/project/${project.slug}`}>
                    <motion.h3
                      className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {project.title}
                    </motion.h3>
                  </Link>

                  <motion.p
                    className="text-gray-400 mb-4 leading-relaxed"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {project.summary}
                  </motion.p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-full text-xs font-medium text-white"
                        whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: (index * 0.1) + (tagIndex * 0.05) }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <Link href={`/project/${project.slug}`}>
                    <motion.div
                      className="flex items-center text-blue-400 hover:text-blue-300 font-medium text-sm cursor-pointer group/link"
                      whileHover={{ x: 5 }}
                    >
                      <span>Read case study</span>
                      <motion.div
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronRight size={16} />
                      </motion.div>
                    </motion.div>
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Projects */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.a
            href={`${baseInfo.socials.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-white/20 rounded-full text-white font-medium transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            <span>View All Projects on GitHub</span>
            <motion.div
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <ExternalLink size={16} />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}