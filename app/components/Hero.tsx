'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Code, Sparkles, Zap, Rocket, Facebook } from 'lucide-react';
import * as THREE from 'three';
import Link from 'next/link';
import { baseInfo } from '@/content/informations/info';

export default function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const animationIdRef = useRef<number>();

  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const controls = useAnimation();

  const texts = [
    'Full Stack Developer',
    'Creative Technologist', 
    'Problem Solver',
    'Code Architect',
    'Digital Innovator'
  ];

  // Typewriter effect
  useEffect(() => {
    const currentText = texts[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, texts]);

  // Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Particles
    const particleCount = 150;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      colors[i] = Math.random() * 0.5 + 0.5;
      colors[i + 1] = Math.random() * 0.5 + 0.5;
      colors[i + 2] = 1;

      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Connecting lines
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4338ca,
      transparent: true,
      opacity: 0.2
    });

    camera.position.z = 10;

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Update particles
      const positions = particleSystem.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        if (positions[i] > 10) positions[i] = -10;
        if (positions[i] < -10) positions[i] = 10;
        if (positions[i + 1] > 10) positions[i + 1] = -10;
        if (positions[i + 1] < -10) positions[i + 1] = 10;
        if (positions[i + 2] > 10) positions[i + 2] = -10;
        if (positions[i + 2] < -10) positions[i + 2] = 10;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      // Create connecting lines
      const linePositions = [];
      for (let i = 0; i < particleCount * 3; i += 3) {
        for (let j = i + 3; j < particleCount * 3; j += 3) {
          const dx = positions[i] - positions[j];
          const dy = positions[i + 1] - positions[j + 1];
          const dz = positions[i + 2] - positions[j + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 3) {
            linePositions.push(positions[i], positions[i + 1], positions[i + 2]);
            linePositions.push(positions[j], positions[j + 1], positions[j + 2]);
          }
        }
      }

      if (linePositions.length > 0) {
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        scene.remove(scene.getObjectByName('lines') as THREE.Object3D);
        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        lines.name = 'lines';
        scene.add(lines);
      }

      particleSystem.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const floatingIcons = [
    { Icon: Code, delay: 0, x: '10%', y: '20%' },
    { Icon: Sparkles, delay: 0.5, x: '80%', y: '15%' },
    { Icon: Zap, delay: 1, x: '15%', y: '70%' },
    { Icon: Rocket, delay: 1.5, x: '75%', y: '65%' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Canvas */}
      <div ref={mountRef} className="absolute inset-0 z-0" />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 z-10" />

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute z-20 text-white/20"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon size={48} />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-30 text-center px-4 max-w-6xl mx-auto">
        <div className='md:h-28 2xl:hidden'></div>
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <motion.span
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-full text-sm font-medium text-gray-300 mb-4"
            whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mr-2"
            >
              👋
            </motion.span>
            Welcome to my digital realm
          </motion.span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-8xl font-bold mb-0 2xl:mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.span
            className="block bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            Hi, I'm{' '}
            <motion.span
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {baseInfo.shortName}
              </span>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 blur-xl rounded-lg opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
          </motion.span>
        </motion.h1>

        {/* Typewriter Effect */}
        <motion.div
          className="h-16 md:h-20 mb-0 2xl:mb-8 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h2
            className="text-xl md:text-3xl lg:text-4xl font-semibold text-gray-300"
            animate={{ 
              textShadow: [
                '0 0 20px rgba(59, 130, 246, 0.5)',
                '0 0 30px rgba(147, 51, 234, 0.5)',
                '0 0 20px rgba(59, 130, 246, 0.5)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="font-mono text-blue-400">{'> '}</span>
            {displayText}
            <motion.span
              className="inline-block ml-1 w-0.5 h-6 md:h-8 bg-purple-400"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.h2>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-gray-400 mb-8 md:mb-4 2xl:mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.span
            animate={{ 
              color: ['rgb(156, 163, 175)', 'rgb(209, 213, 219)', 'rgb(156, 163, 175)']
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Crafting digital experiences with modern technologies.
          </motion.span>
          {' '}
          <motion.span
            animate={{ 
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-medium"
          >
            Passionate about creating innovative solutions that make a difference.
          </motion.span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 md:mb-4 2xl:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.a
            href="#projects"
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full font-semibold text-white overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <motion.span
              className="relative z-10"
              animate={{ 
                textShadow: ['0 0 0px transparent', '0 0 10px rgba(255,255,255,0.5)', '0 0 0px transparent']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              View My Work
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
            />
          </motion.a>

          <motion.a
            href="#contact"
            className="group px-8 py-4 border-2 border-white/20 hover:border-white/40 rounded-full font-semibold text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              whileHover={{ 
                background: 'linear-gradient(to right, #60a5fa, #a855f7)',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Get In Touch
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex gap-6 justify-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { Icon: Github, href: `${baseInfo.socials.github}`, label: 'GitHub' },
            { Icon: Linkedin, href: `${baseInfo.socials.linkedin}`, label: 'LinkedIn' },
            { Icon: Facebook, href: `${baseInfo.socials.facebook}`, label: 'Facebook' },
          ].map(({ Icon, href, label }, index) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 md:p-2 2xl:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-gray-400 hover:text-white hover:border-white/30 transition-all duration-300 group"
              whileHover={{ 
                scale: 1.1, 
                boxShadow: '0 0 30px rgba(147, 51, 234, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/50 hover:text-white/80 cursor-pointer transition-colors duration-300"
          >
            <Link href="#about">
              <ChevronDown size={32} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}