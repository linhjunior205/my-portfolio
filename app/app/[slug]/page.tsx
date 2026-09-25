import { getAllAppSlugs, getAppBySlug } from '@/lib/apps';
import { baseInfo } from '@/content/informations/info';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EmbeddedAppClient } from './EmbeddedAppClient';

interface EmbeddedAppPageProps {
    params: {
        slug: string;
    };
}

export function generateStaticParams() {
    return getAllAppSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: EmbeddedAppPageProps): Metadata {
    const app = getAppBySlug(params.slug);

    if (!app) {
        return {
            title: 'App Not Found',
        };
    }

    return {
        title: `${app.title} | ${baseInfo.shortName}`,
        description: app.description,
        openGraph: {
            title: app.title,
            description: app.description,
            type: 'website',
        },
    };
}

export default function EmbeddedAppPage({ params }: EmbeddedAppPageProps) {
    const app = getAppBySlug(params.slug);

    if (!app) {
        notFound();
    }

    return (
        <main className="fixed inset-0 z-[100] h-dvh w-screen overflow-hidden bg-black">
            <EmbeddedAppClient initialUrl={app.url} title={app.title} />
        </main>
    );
}
