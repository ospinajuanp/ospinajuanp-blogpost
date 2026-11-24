import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { z } from 'zod';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export const PostFrontmatterSchema = z.object({
  title: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  hidden: z.boolean().optional(),
  protected: z.boolean().optional(),
});

export interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  hidden?: boolean;
  protected?: boolean;
  modifiedAt?: string;
  contentHtml?: string;
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
