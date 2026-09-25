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
  description: `${baseInfo.role} & Creative Technologist based in the digital realm.`,
  keywords: ['developer', 'full stack', 'react', 'nextjs', 'typescript'],
  authors: [{ name: baseInfo.shortName, url: baseInfo.portfolioURL }],
  creator: baseInfo.shortName,
  openGraph: {
    title: `${baseInfo.shortName} - ${baseInfo.role}`,
    description: `${baseInfo.role} & Creative Technologist`,
    url: baseInfo.portfolioURL,
    siteName: `${baseInfo.shortName} Portfolio`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${baseInfo.shortName} - ${baseInfo.role}`,
    description: `${baseInfo.role} & Creative Technologist`,
    creator: `@${baseInfo.shortName.toLowerCase()}`,
  },
  robots: {
    index: true,
    follow: true,
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