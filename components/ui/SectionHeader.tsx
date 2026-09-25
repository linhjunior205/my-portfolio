import { motion } from "framer-motion";

export interface SectionHeaderProps {
    title: string;
    subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <motion.h2
                className="text-4xl md:text-5xl font-bold pb-6"
                whileInView={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                    background: 'linear-gradient(to right, #fff, #06b6d4, #a855f7, #fff)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                }}
            >
                {title}
            </motion.h2>
            <motion.p
                className="text-xl text-gray-400 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                {subtitle}
            </motion.p>
        </motion.div>
    );
}