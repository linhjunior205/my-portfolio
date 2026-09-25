import fs from 'fs'
import path from 'path'
import { format } from 'date-fns'

// Constants
const BLOG_DIR = path.join(process.cwd(), 'content/blogs')
const IMAGES_DIR = path.join(process.cwd(), 'public/images/blogs')

// Helper to create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Helper to ensure directory exists
function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

interface BlogConfig {
  title: string
  summary: string
  tags: string[]
  featured?: boolean
  author?: string
}

function createBlog(config: BlogConfig) {
  const {
    title,
    summary,
    tags,
    featured = false,
    author = 'Linh junior',
  } = config

  // Create slug from title
  const slug = createSlug(title)

  // Create blog directory and image directory
  const blogImageDir = path.join(IMAGES_DIR, slug)
  ensureDirectoryExists(blogImageDir)

  // Create MDX content
  const today = new Date()
  const mdxContent = `---
title: "${title}"
summary: "${summary}"
publishedAt: "${format(today, 'yyyy-MM-dd')}"
readTime: "5 min read"
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
featured: ${featured}
image: "/images/blogs/${slug}/cover.png"
author: "${author}"
---

## Introduction

Write your blog content here...
`

  // Write MDX file
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`)
  fs.writeFileSync(mdxPath, mdxContent)

  // Create placeholder cover image if it doesn't exist
  const coverImagePath = path.join(blogImageDir, 'cover.png')
  if (!fs.existsSync(coverImagePath)) {
    console.log('Remember to add a cover image at:', coverImagePath)
  }

  console.log('✅ Blog created successfully!')
  console.log('📝 Blog file:', mdxPath)
  console.log('🖼️  Image directory:', blogImageDir)
  console.log('\nNext steps:')
  console.log('1. Add your cover image to:', coverImagePath)
  console.log('2. Write your blog content in the MDX file')
  console.log('3. Update the readTime field based on your content length')
}

// Handle command line arguments
const args = process.argv.slice(2)
if (args.length < 3) {
  console.log('Usage: npm run new-blog "Blog Title" "Blog Summary" "tag1,tag2,tag3" [featured] [author]')
  process.exit(1)
}

const [title, summary, tagsArg, featured = 'false', author = 'Linh Junior'] = args

createBlog({
  title,
  summary,
  tags: tagsArg.split(',').map(t => t.trim()),
  featured: featured.toLowerCase() === 'true',
  author
})
