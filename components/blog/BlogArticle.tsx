import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Calendar, Clock, User, ArrowLeft, ListTree, Languages } from 'lucide-react';
import { useMDXComponents } from '@/app/mdx-component';
import { baseInfo } from '@/content/informations/info';
import { BlogLang, extractHeadings, getBlogPostBySlug, getRelatedPosts, hasTranslation } from '@/lib/blog';
import { BlogPost } from '@/types';

const UI = {
  en: {
    back: 'Back to Blog',
    toc: 'On this page',
    related: 'Related articles',
    readMore: 'Read article',
    enjoyed: 'Enjoyed this article?',
    follow: 'Share it or get in touch — I would love to hear your thoughts.',
    share: 'Share on X',
    shareLinkedIn: 'Share on LinkedIn',
    contact: 'Get in Touch',
    locale: 'en-US',
  },
  vi: {
    back: 'Quay lại Blog',
    toc: 'Mục lục',
    related: 'Bài viết liên quan',
    readMore: 'Đọc bài',
    enjoyed: 'Bạn thấy bài viết hữu ích?',
    follow: 'Chia sẻ bài viết hoặc liên hệ với mình nếu bạn muốn trao đổi thêm.',
    share: 'Chia sẻ lên X',
    shareLinkedIn: 'Chia sẻ lên LinkedIn',
    contact: 'Liên hệ',
    locale: 'vi-VN',
  },
} as const;

export function blogPostPath(slug: string, lang: BlogLang): string {
  return lang === 'en' ? `/blog/${slug}/` : `/blog/${slug}/${lang}/`;
}

function formatDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
}

interface BlogArticleProps {
  post: BlogPost;
  lang: BlogLang;
}

export default function BlogArticle({ post, lang }: BlogArticleProps) {
  const t = UI[lang];
  const headings = extractHeadings(post.content);
  const related = getRelatedPosts(post.slug, 3);
  const otherLang: BlogLang = lang === 'en' ? 'vi' : 'en';
  const hasOtherLang = hasTranslation(post.slug, otherLang);

  const url = `${baseInfo.portfolioURL}${blogPostPath(post.slug, lang)}`;
  const shareOnX = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`;
  const shareOnLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto max-w-4xl px-4 py-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            {t.back}
          </Link>

          {hasOtherLang && (
            <nav aria-label="Language" className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-sm">
              <Languages size={16} className="mx-2 text-gray-400" />
              {(['en', 'vi'] as BlogLang[]).map((code) => (
                <Link
                  key={code}
                  href={blogPostPath(post.slug, code)}
                  hrefLang={code}
                  aria-current={code === lang ? 'page' : undefined}
                  className={`rounded-full px-3 py-1 font-semibold transition-colors ${
                    code === lang ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {code === 'en' ? 'English' : 'Tiếng Việt'}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Featured Image */}
        <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden mb-8">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {post.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-xs font-bold text-black">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Article Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{formatDate(post.publishedAt, t.locale)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{post.author}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full text-sm font-medium text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Table of Contents */}
        {headings.length > 2 && (
          <details open className="group mb-12 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <summary className="flex cursor-pointer list-none items-center gap-2 font-semibold text-white">
              <ListTree size={18} className="text-pink-400" />
              {t.toc}
              <span className="ml-auto text-xs text-gray-500 transition-transform group-open:rotate-180">▼</span>
            </summary>
            <ol className="mt-4 space-y-2 text-sm">
              {headings.map((heading) => (
                <li key={heading.id} className={heading.level === 3 ? 'pl-5' : ''}>
                  <a
                    href={`#${heading.id}`}
                    className={`transition-colors hover:text-pink-300 ${heading.level === 2 ? 'text-gray-200' : 'text-gray-400'}`}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        )}

        {/* Article Content */}
        <article lang={lang} className="prose prose-invert prose-lg max-w-none">
          <div className="text-gray-300 leading-relaxed">
            <MDXRemote source={post.content} components={useMDXComponents()} options={{ blockJS: false }} />
          </div>
        </article>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="related-heading">
            <h2 id="related-heading" className="mb-6 text-2xl font-bold text-white">
              {t.related}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((item) => {
                const itemLang: BlogLang = lang !== 'en' && hasTranslation(item.slug, lang) ? lang : 'en';
                const translated = itemLang === lang && lang !== 'en' ? getTranslatedMeta(item.slug, lang) : null;
                return (
                  <Link
                    key={item.slug}
                    href={blogPostPath(item.slug, itemLang)}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                  >
                    <img src={item.image} alt="" className="h-32 w-full object-cover" />
                    <div className="p-4">
                      <h3 className="mb-2 line-clamp-2 font-semibold text-white group-hover:text-pink-300">
                        {translated?.title ?? item.title}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {formatDate(item.publishedAt, t.locale)} · {translated?.readTime ?? item.readTime}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">{t.enjoyed}</h3>
              <p className="text-gray-400">{t.follow}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={shareOnX}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-300"
              >
                {t.share}
              </a>
              <a
                href={shareOnLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-full transition-colors duration-300"
              >
                {t.shareLinkedIn}
              </a>
              <Link
                href="/#contact"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full transition-colors duration-300"
              >
                {t.contact}
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function getTranslatedMeta(slug: string, lang: BlogLang) {
  const post = getBlogPostBySlug(slug, lang);
  return post ? { title: post.title, readTime: post.readTime } : null;
}
