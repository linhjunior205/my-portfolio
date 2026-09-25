import { Experience } from "@/types";
import {
    Globe,
    Server,
    Database,
    Cloud,
    Smartphone,
    type LucideIcon,
} from "lucide-react";

export type SkillGroup = {
    name: string;
    icon: LucideIcon;
    color: string;
    skills: string[];
};

export type Stat = {
    number: string;
    label: string;
};

export const baseInfo = {
    name: "Linh Junior",
    shortName: "Linhjr",
    role: "Full Stack Developer",
    careerStartDate: "2025-03",
    portfolioURL: "https://linhjr.is-a.dev",
    avatar: "/images/avatar.jpg",
    email: "linhmedia2005@gmail.com",
    phone: "+84 766558382",
    location: "Da Nang, Vietnam",
    socials: {
        linkedin: "https://www.linkedin.com/in/tr%E1%BA%A7n-c%E1%BA%A3nh-linh-650148308/",
        facebook: "https://www.facebook.com/trancanhlinhcuto",
        github: "https://github.com/linhjunior205",
    }
}

export const experiences: Experience[] = [
    {
        company: "Freelance Developer",
        role: ["Full Stack Developer", "Business Analyst", "Tester"],
        startDate: "2025-03",
        endDate: "2026-08",
        summary: "Contributed as a Full Stack Developer, Business Analyst, and Tester in a 5-member outsourcing team. Delivered multiple web applications by gathering requirements, implementing features, and ensuring product quality.",
        techStack: ["Next.js", "NestJS", "PostgreSQL", "Trello"]
    }

];

// Whole years of professional experience, derived from baseInfo.careerStartDate
export function getYearsOfExperience(from: string = baseInfo.careerStartDate): number {
    const [year, month] = from.split("-").map(Number);
    const start = new Date(year, (month ?? 1) - 1, 1);
    const now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    if (now.getMonth() < start.getMonth()) {
        years -= 1;
    }
    return Math.max(0, years);
}

export const aboutDescription: string[] = [
    `Passionate Full-Stack Developer with ${getYearsOfExperience()}+ years of experience delivering production-ready web and mobile applications. Strong background in backend systems, distributed computing, and cloud-native development with a focus on performance, scalability, and security.`,
    "I specialize in Nest.js and Next.js, but I'm always excited to learn new technologies and tackle challenging problems. When I'm not coding, you'll find me working on personal projects, exploring the latest tech trends, or learning from tech blogs and documentation.",
];

export const traits: string[] = [
    "Problem Solver",
    "Team Player",
    "Continuous Learner",
    "Tech Enthusiast",
];

export const skillGroups: SkillGroup[] = [
    {
        name: "Frontend",
        icon: Globe,
        color: "from-blue-500 to-cyan-500",
        skills: ["React", "Next.js", "Redux", "Tailwind CSS", "HTML/CSS", "jQuery", "HTML Canvas"],
    },
    {
        name: "Backend",
        icon: Server,
        color: "from-violet-500 to-purple-500",
        skills: ["Nest.js", "Express", "MCP", "Spring Boot", "Socket.io", "AI Agents", "RabbitMQ", "Redis"],
    },
    {
        name: "Database",
        icon: Database,
        color: "from-emerald-500 to-green-500",
        skills: ["PostgreSQL", "MongoDB", "MySQL", "Clickhouse", "Elasticsearch", "Solr"],
    },
    {
        name: "DevOps & Cloud",
        icon: Cloud,
        color: "from-orange-500 to-red-500",
        skills: ["Docker", "Kubernetes", "CI/CD", "Git", "Linux", "Automation"],
    },
    {
        name: "Mobile",
        icon: Smartphone,
        color: "from-pink-500 to-rose-500",
        skills: ["Flutter", "Android (Kotlin)", "React Native"],
    },
];

export const stats: Stat[] = [
    { number: `${getYearsOfExperience()}+`, label: "Years Experience" },
    { number: "20+", label: "Projects Completed" },
    { number: "15+", label: "Technologies Mastered" },
    { number: "24/7", label: "Development Passion" },
];