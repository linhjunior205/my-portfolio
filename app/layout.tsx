import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner"
import TrailingCursor from '@/components/effects/TrailingCursor';
import { baseInfo } from '@/content/informations/info';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL(baseInfo.portfolioURL),
  title: `${baseInfo.shortName} - ${baseInfo.role}`,
  description: `${baseInfo.role} based in ${baseInfo.location}, building web apps with Next.js, NestJS and PostgreSQL. Portfolio, projects and blog.`,
  keywords: ['full stack developer', 'next.js', 'nestjs', 'typescript', 'react', 'postgresql', 'da nang', 'vietnam'],
  authors: [{ name: baseInfo.shortName, url: baseInfo.portfolioURL }],
  creator: baseInfo.shortName,
  openGraph: {
    title: `${baseInfo.shortName} - ${baseInfo.role}`,
    description: `${baseInfo.role} based in ${baseInfo.location} — portfolio, projects and blog.`,
    url: baseInfo.portfolioURL,
    siteName: `${baseInfo.shortName} Portfolio`,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${baseInfo.name} — ${baseInfo.role}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${baseInfo.shortName} - ${baseInfo.role}`,
    description: `${baseInfo.role} based in ${baseInfo.location} — portfolio, projects and blog.`,
    images: ['/og-image.png'],
    creator: `@${baseInfo.shortName.toLowerCase()}`,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // Google Search Console ownership check (public value, safe to commit)
    google: '82sKDiJkZ7eiLMdF7mxNivW5d15E_g71dxxsOEBYB0E',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${inter.variable} ${jetBrainsMono.variable} font-inter antialiased bg-black text-white overflow-x-hidden`}>
        {children}
        <TrailingCursor />
        <Analytics />
        <Toaster position='top-center' richColors/>
      </body>
    </html>
  );
}