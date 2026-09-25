'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code, User, FolderKanban, BriefcaseBusiness, PenTool, Mail } from 'lucide-react';
import { baseInfo } from '@/content/informations/info';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      // Only apply hide/show on mobile
      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 30) {
          // Scrolling down
          setShowHeader(false);
        } else if (currentScrollY < lastScrollY.current) {
          // Scrolling up
          setShowHeader(true);
        }
        lastScrollY.current = currentScrollY;
      } else {
        setShowHeader(true); // Always show on desktop
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home', icon: Code },
    { href: '#about', label: 'About', icon: User },
    { href: '#experiences', label: 'Experiences', icon: BriefcaseBusiness },
    { href: '#projects', label: 'Projects', icon: FolderKanban },
    { href: '#blog', label: 'Blog', icon: PenTool },
    { href: '#contact', label: 'Contact', icon: Mail },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: showHeader ? 0 : '-110%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <motion.nav
          className={`relative bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 ${
            scrolled ? 'rounded-3xl py-3' : 'rounded-3xl py-4'
          }`}
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
            WebkitBackdropFilter: 'blur(20px)',
            backdropFilter: 'blur(20px)',
            WebkitTransform: 'translateZ(0)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          }}
        >
          <div className="flex items-center justify-between px-6">
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <div className="relative">
                <motion.img
                  src="/images/avatar.jpg"
                  alt="Avatar"
                  className="w-10 h-10 rounded-2xl object-cover shadow-xl border-2 border-white/20"
                  whileHover={{ 
                    rotate: 15,
                    boxShadow: '0 0 30px rgba(147, 51, 234, 0.5)'
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-30 blur-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <motion.span 
                className="ml-3 font-bold text-xl bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
                whileHover={{ 
                  scale: 1.05,
                  background: 'linear-gradient(to right, #60a5fa, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text'
                }}
              >
                {baseInfo.shortName}
              </motion.span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="relative px-4 py-2 rounded-2xl text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 group overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"
                      layoutId="navHover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-2xl blur-sm transition-opacity duration-300"
                    />
                    <span className="relative flex items-center gap-2">
                      <Icon size={16} />
                      {item.label}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden border-t border-white/10 mt-4 pt-4 px-6 pb-2"
              >
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 py-3 px-4 rounded-2xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 group"
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <Icon size={18} className="group-hover:text-purple-400 transition-colors duration-300" />
                      <span className="font-medium">{item.label}</span>
                    </motion.a>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </motion.header>
  );
}