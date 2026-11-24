import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { z } from 'zod';
import { PILLARS } from './config';

const postsDirectory = path.join(process.cwd(), 'content/posts');

const PILLAR_IDS = PILLARS.map(pillar => pillar.id);

const TagsSchema = z.preprocess(
  (value) => {
    if (typeof value === 'string') {
      return value.split(',').map(tag => tag.trim()).filter(Boolean);
    }
    if (Array.isArray(value)) {
      return value.map(tag => String(tag).trim()).filter(Boolean);
    }
    return value;
  },
  z.array(z.string()).optional()
);

export const PostFrontmatterSchema = z.object({
  title: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  hidden: z.boolean().optional(),
  protected: z.boolean().optional(),
  pilar: z.enum(PILLAR_IDS as [string, ...string[]]).optional(),
  tags: TagsSchema,
  series: z.string().optional(),
});

export interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  hidden?: boolean;
  protected?: boolean;
  pilar?: string;
  tags?: string[];
  series?: string;
  modifiedAt?: string;
  contentHtml?: string;
}

export interface AdjacentPosts {
  previous: PostData | null;
  next: PostData | null;
}

export interface SeriesContext {
  name: string;
  index: number;
  total: number;
}

export function isValidSlug(slug: string): boolean {
  if (!/^[A-Za-z0-9._-]+$/.test(slug)) {
    return false;
  }
  const resolved = path.resolve(postsDirectory, `${slug}.md`);
  return resolved.startsWith(`${path.resolve(postsDirectory)}${path.sep}`);
}

function buildPostData(slug: string, data: z.infer<typeof PostFrontmatterSchema>): PostData {
  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    description: data.description || '',
    image: data.image,
    hidden: data.hidden,
    protected: data.protected,
    pilar: data.pilar,
    tags: data.tags,
    series: data.series,
  };
}

function readFrontmatter(slug: string): z.infer<typeof PostFrontmatterSchema> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  let fileContents: string;
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch {
    throw new Error(`Failed to read post file: ${slug}`);
  }

  const matterResult = matter(fileContents);
  return PostFrontmatterSchema.parse(matterResult.data);
}

export function getSortedPostsData(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Posts directory does not exist: ${postsDirectory}`);
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostData[] = [];

  for (const fileName of fileNames) {
    try {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      const validatedData = PostFrontmatterSchema.parse(matterResult.data);
      const post = buildPostData(slug, validatedData);

      try {
        post.modifiedAt = fs.statSync(fullPath).mtime.toISOString();
      } catch {
        post.modifiedAt = post.date;
      }

      allPostsData.push(post);
    } catch (error) {
      console.error(`Error reading post file ${fileName}:`, error);
    }
  }

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPublicPostsData(): PostData[] {
  return getSortedPostsData().filter(post => !post.hidden && !post.protected);
}

export async function getPostMeta(slug: string): Promise<PostData> {
  if (!isValidSlug(slug)) {
    throw new Error(`Invalid post slug: ${slug}`);
  }

  return buildPostData(slug, readFrontmatter(slug));
}

export async function getPostContentHtml(slug: string): Promise<string> {
  if (!isValidSlug(slug)) {
    throw new Error(`Invalid post slug: ${slug}`);
  }

  const fullPath = path.join(postsDirectory, `${slug}.md`);

  let fileContents: string;
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch {
    throw new Error(`Failed to read post file: ${slug}`);
  }

  const matterResult = matter(fileContents);

  let contentHtml: string;
  try {
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    contentHtml = processedContent.toString();
  } catch {
    throw new Error(`Failed to process markdown for post: ${slug}`);
  }

  return contentHtml;
}

export function getAdjacentPosts(slug: string): AdjacentPosts {
  const posts = getPublicPostsData();
  const index = posts.findIndex(post => post.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index + 1 < posts.length ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export function getSeriesContext(slug: string): SeriesContext | null {
  const posts = getPublicPostsData();
  const current = posts.find(post => post.slug === slug);

  if (!current || !current.series) {
    return null;
  }

  const siblings = posts
    .filter(post => post.series === current.series)
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  const index = siblings.findIndex(post => post.slug === slug);

  if (index === -1) {
    return null;
  }

  return {
    name: current.series,
    index: index + 1,
    total: siblings.length,
  };
}

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}
