# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Start dev server at localhost:3000
npm run build            # Regenerate search index, then build (runs generate-search first)
npm run start            # Serve the production build
npm run lint             # next lint (note: ESLint is ignored during builds)
npm run generate-search  # Rebuild public/blog-search-index.json from content/blogs
npm run new-blog "Title" "Summary" "tag1,tag2" [featured] [author]   # Scaffold a blog MDX + image dir
npm run new-project <filename>                                        # Scaffold a project MDX
```

There is no test suite despite CONTRIBUTING.md mentioning `npm test`.

## Architecture

Next.js 14 App Router portfolio + blog. Content is **file-based MDX**, read from disk at build time — there is no database or CMS.

### Content pipeline
- Blog posts live in `content/blogs/*.mdx`; projects in `content/projects/*.mdx`. Each file has YAML frontmatter parsed by `gray-matter`. The frontmatter shape must match the `BlogPost` / `Project` types in `types/`.
- `lib/blog.ts` and `lib/project.ts` are the only readers of this content. They do `fs.readdirSync`/`readFileSync` over the content dirs, so they are server-only (`lib/project.ts` is marked `"use server"`; project getters are wrapped in React `cache`). The filename (minus `.mdx`) becomes the slug.
- Dynamic routes `app/blog/[slug]/page.tsx` and `app/project/[slug]/page.tsx` use `generateStaticParams` (from `getAllBlogSlugs`/`getAllProjectSlugs`) plus `generateMetadata`, and render content with `MDXRemote` from `next-mdx-remote/rsc`.

### Search (build-time index → client fetch)
Search does **not** read MDX at runtime. `scripts/generate-blog-data.ts` calls `getAllBlogPosts()` and writes `public/blog-search-index.json`. The `build` script runs this first. The `useSearch` hook (`hooks/useSearch.ts`) fetches that static JSON client-side and queries it with Fuse.js. **Consequence:** after adding/editing a blog, the search index is stale until `generate-search` (or a full `build`) runs — `npm run dev` alone will not refresh search results. Projects are not indexed for search.

### MDX rendering
Custom MDX element mappings live in `app/mdx-component.tsx` (`useMDXComponents`): fenced code blocks route through `components/mdx/CodeSnippet`, headings get anchor links via `LinkHeading`, plus custom `Image` and `Carousel` components usable directly in MDX. `next.config.js` wires `@next/mdx` with `remark-gfm` and `rehype-highlight` and registers `.md`/`.mdx` as page extensions.

### Static export config
`next.config.js` sets `trailingSlash: true`, `images.unoptimized: true`, and `eslint.ignoreDuringBuilds: true` — the site is built for static hosting (deployed at linhjr205-portfolio.vercel.app), so avoid features that require a Node server at runtime.

### Personal data
All personal/site content (name, contact, socials, work `experiences[]`) is centralized in `content/informations/info.ts` as `baseInfo` and `experiences`. Components and page metadata import `baseInfo` from here rather than hardcoding.

### UI
- The home page (`app/page.tsx`) composes section components from `app/components/` (Hero, About, Experiences, Projects, Blog, Contact, etc.). Page-specific sections live in `app/components/`; reusable primitives live in `components/`.
- `components/ui/` holds shadcn/ui components (new-york style, see `components.json`); `components/mdx/` holds MDX-only components; `components/effects/` holds visual effects.
- Path alias `@/*` maps to the repo root (see `tsconfig.json`). Import as `@/lib/...`, `@/components/...`, etc.
- Tailwind with dark theme via `next-themes`; code-highlight themes in `utils/themes/`.
