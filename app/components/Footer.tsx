'use client';

import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Facebook, Mail, ArrowUp } from 'lucide-react';
import { baseInfo } from '@/content/informations/info';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: `${baseInfo.socials.github}`, label: 'GitHub' },
    { icon: Linkedin, href: `${baseInfo.socials.linkedin}`, label: 'LinkedIn' },
    { icon: Facebook, href: `${baseInfo.socials.facebook}`, label: 'Facebook' },
    { icon: Mail, href: `mailto:${baseInfo.email}`, label: 'Email' },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />

      <div className="container mx-auto max-w-7xl px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex items-center mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <motion.img
                  src="/images/avatar.jpg"
                  alt="Avatar"
                  className="w-12 h-12 rounded-2xl object-cover shadow-xl border-2 border-white/20"
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className="absolute inset-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-30 blur-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Linhjr
              </span>
            </motion.div>

            <motion.p
              className="text-gray-400 leading-relaxed mb-6 max-w-md"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Full Stack Developer passionate about creating digital experiences that make a difference.
              Always exploring new technologies and pushing the boundaries of what's possible.
            </motion.p>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-300 group"
                    whileHover={{
                      scale: 1.1,
                      y: -5,
                      boxShadow: '0 10px 30px rgba(147, 51, 234, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                >
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Get in Touch</h3>
            <div className="space-y-4 text-gray-400">
              <motion.p
                whileHover={{ scale: 1.02, color: '#fff' }}
                className="transition-colors duration-300"
              >
                linhmedia2005@gmail.com
              </motion.p>
              <motion.p
                whileHover={{ scale: 1.02, color: '#fff' }}
                className="transition-colors duration-300"
              >
                Available for freelance work
              </motion.p>
              <motion.p
                whileHover={{ scale: 1.02, color: '#fff' }}
                className="transition-colors duration-300"
              >
                Open to collaborations
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <motion.p
            className="text-gray-400 text-sm mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="flex items-center gap-2">
              © {currentYear} Linhjr. Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1], color: ['#ef4444', '#f97316', '#ef4444'] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart size={16} className="text-red-500" />
              </motion.span>
              and lots of coffee
            </span>
          </motion.p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="text-sm font-medium">Back to top</span>
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUp size={16} />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </footer>
  );
}