import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

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

      allPostsData.push({
        slug,
        title: matterResult.data.title || slug,
        date: matterResult.data.date || new Date().toISOString(),
        description: matterResult.data.description || '',
        image: matterResult.data.image,
        hidden: matterResult.data.hidden,
        protected: matterResult.data.protected,
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
    title: matterResult.data.title || slug,
    date: matterResult.data.date || new Date().toISOString(),
    description: matterResult.data.description || '',
    image: matterResult.data.image,
    hidden: matterResult.data.hidden,
    protected: matterResult.data.protected,
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
