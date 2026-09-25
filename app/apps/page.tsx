import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import AppsGrid from '@/app/components/AppsGrid';
import { getAllApps } from '@/lib/apps';
import { baseInfo } from '@/content/informations/info';

export const metadata: Metadata = {
    title: `Apps | ${baseInfo.shortName}`,
    description: 'A collection of useful browser-based tools and applications.',
};

export default function AppsPage() {
    const apps = getAllApps();

    return (
        <main className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black">
            <div className="container mx-auto max-w-7xl px-4 pt-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                >
                    <ArrowLeft size={18} aria-hidden="true" />
                    Back to home
                </Link>
            </div>
            <AppsGrid apps={apps} />
        </main>
    );
}
