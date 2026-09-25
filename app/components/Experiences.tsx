'use client';

import { motion } from 'framer-motion';
import { Building2, Calendar, Users, Code, Briefcase, Clock, Star, Section } from 'lucide-react';
import { experiences } from '@/content/informations/info';
import { Experience } from '@/types';
import SectionHeader from '@/components/ui/SectionHeader';

const formatDate = (dateString: string) => {
  if (dateString === 'Present') return 'Present';
  const [year, month] = dateString.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

const getExperienceDuration = (startDate: string, endDate: string) => {
  if (endDate === 'Present') {
    const start = new Date(startDate + '-01');
    const now = new Date();
    const diffMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;

    if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
    if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`;
    return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
  }

  const start = new Date(startDate + '-01');
  const end = new Date(endDate + '-01');
  const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;

  if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
  if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`;
  return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
};

export default function Experiences() {
  // Sort experiences by start date (oldest first for bottom to top timeline)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = new Date(a.startDate + '-01');
    const dateB = new Date(b.startDate + '-01');
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section id="experiences" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-7xl">
        <SectionHeader title="Professional Journey" subtitle="A timeline of my professional growth and the impactful projects I've contributed to across different organizations." />

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute md:left-1/2 transform md:-translate-x-1/2 top-0 w-0.5 h-[calc(100%-104px)] bg-gray-700">
            <motion.div
              className="w-full bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 2, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </div>

          {/* Experience Cards */}
          <div className="space-y-16">
            {sortedExperiences.map((experience, index) => {
              const isEven = index % 2 === 0;
              const duration = getExperienceDuration(experience.startDate, experience.endDate);
              const isCurrentJob = experience.endDate === 'Present';

              return (
                <div
                  key={`${experience.company}-${index}`}
                  className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex-col md:gap-16`}
                >
                  {/* Timeline Node */}
                  <motion.div
                    className={`absolute top-1/2 left-0 md:left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 ${isCurrentJob
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500 after:bg-green-500'
                      : 'bg-gradient-to-br from-emerald-400 to-blue-500 after:bg-blue-500'
                      } rounded-full border-4 border-gray-900 z-10 after:absolute after:inset-0 after:rounded-full after:blur-sm after:opacity-75 after:-z-10`}
                    initial={{ scale: 0, x: '-50%' }}
                    whileInView={{ scale: 1, x: '-50%' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.2,
                      boxShadow: isCurrentJob
                        ? '0 0 20px rgba(16, 185, 129, 0.5)'
                        : '0 0 20px rgba(59, 130, 246, 0.5)'
                    }}
                    viewport={{ once: true }}
                  />

                  {/* Experience Card */}
                  <motion.div
                    className={`w-(calc(100% - 32px)) md:w-5/12 ml-8 md:ml-0 group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 ${isEven ? 'md:mr-auto' : 'md:ml-auto'
                      } ${isCurrentJob ? 'ring-2 ring-green-500/30' : ''}`}
                    whileHover={{ y: -5, scale: 1.02 }}
                    initial={{ opacity: 1, y: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* Current Job Badge */}
                    {isCurrentJob && (
                      <motion.div
                        className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full text-xs font-bold text-black"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        viewport={{ once: true }}
                      >
                        Current
                      </motion.div>
                    )}

                    {/* Company Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={`min-w-[48px] w-12 h-12 rounded-xl ${isCurrentJob
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                            : 'bg-gradient-to-br from-emerald-500 to-blue-500'
                            } flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                          whileHover={{ rotate: 5 }}
                        >
                          <Building2 className="text-white" size={24} />
                        </motion.div>
                        <div>
                          <motion.h3
                            className="text-xl font-bold text-white mb-1"
                            whileHover={{ scale: 1.02 }}
                          >
                            {experience.company}
                          </motion.h3>
                          <div className="flex flex-wrap gap-1">
                            {experience.role.map((role, roleIndex) => (
                              <motion.span
                                key={role}
                                className={`text-sm font-medium ${isCurrentJob ? 'text-green-400' : 'text-emerald-400'
                                  }`}
                                initial={{ opacity: 0.7 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 + roleIndex * 0.05 }}
                                viewport={{ once: true }}
                              >
                                {role}
                                {roleIndex < experience.role.length - 1 && (
                                  <span className="text-gray-500 ml-1">•</span>
                                )}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Duration and Timeline */}
                    <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {duration}
                      </span>
                    </div>

                    {/* Summary */}
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {experience.summary}
                    </p>

                    {/* Tech Stack */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                        <Code size={16} />
                        <span>Technologies Used</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {experience.techStack.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className={`px-3 py-1.5 ${isCurrentJob
                              ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20'
                              : 'bg-gradient-to-r from-emerald-500/20 to-blue-500/20'
                              } backdrop-blur-sm border border-white/10 rounded-full text-xs font-medium text-white group-hover:border-white/20 transition-colors duration-300`}
                            initial={{ opacity: 0.8, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.1 + techIndex * 0.02 }}
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: isCurrentJob
                                ? 'rgba(16, 185, 129, 0.2)'
                                : 'rgba(59, 130, 246, 0.2)',
                              borderColor: 'rgba(255, 255, 255, 0.3)'
                            }}
                            viewport={{ once: true }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Start Point */}
          <motion.div
            className="relative flex items-center justify-center mt-16"
            initial={{ opacity: 0.8, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 left-0 md:left-1/2 transform -translate-x-1/2 md:-translate-y-1/2 w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full border-4 border-gray-900 z-10">
              <div className="absolute inset-0 flex items-center justify-center">
                <Star className="text-white" size={16} />
              </div>
            </div>
            <motion.div
              className="ml-8 md:ml-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-6 text-center"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-lg font-bold text-emerald-400 mb-2">Career Start</h3>
              <p className="text-gray-300 text-sm">March 2023 - Beginning of my professional journey</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}