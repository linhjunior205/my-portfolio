import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { getAllProjects } from '@/lib/project';
import Experiences from './components/Experiences';

export default async function Home() {
  const projects = await getAllProjects();
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Header />
      <main>
        <Hero />
        <About />
        <Experiences />
        <Projects projects={projects}/>
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}