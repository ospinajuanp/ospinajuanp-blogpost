import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { z } from 'zod';

const postsDirectory = path.join(process.cwd(), 'content/posts');

const PostFrontmatterSchema = z.object({
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
  contentHtml?: string;
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

      allPostsData.push({
        slug,
        title: validatedData.title || slug,
        date: validatedData.date || new Date().toISOString(),
        description: validatedData.description || '',
        image: validatedData.image,
        hidden: validatedData.hidden,
        protected: validatedData.protected,
      });
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

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  let fileContents: string;
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch {
    throw new Error(`Failed to read post file: ${slug}`);
  }

  const matterResult = matter(fileContents);
  const validatedData = PostFrontmatterSchema.parse(matterResult.data);

  let contentHtml: string;
  try {
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    contentHtml = processedContent.toString();
  } catch {
    throw new Error(`Failed to process markdown for post: ${slug}`);
  }

  return {
    slug,
    contentHtml,
    title: validatedData.title || slug,
    date: validatedData.date || new Date().toISOString(),
    description: validatedData.description || '',
    image: validatedData.image,
    hidden: validatedData.hidden,
    protected: validatedData.protected,
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
