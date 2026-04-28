import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export type ArticleFrontmatter = {
  title: string;
  date: string;
  tags?: string[];
  slug: string;
  image?: string;
};

export type Article = ArticleFrontmatter & {
  contentHtml: string;
  excerpt?: string;
};

const articlesDirectory = path.join(process.cwd(), 'content', 'articles');

// Obtém uma lista ordenada de todos os artigos, do mais recente ao mais antigo
export function getSortedArticlesData(lang: string = 'pt'): ArticleFrontmatter[] {
  const dirPath = path.join(articlesDirectory, lang);
  
  // Garantir que a pasta exista
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(dirPath);
  const allArticlesData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(dirPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Usa gray-matter para separar a seção de metadados (frontmatter)
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title || 'Sem Título',
        date: matterResult.data.date || new Date().toISOString().split('T')[0],
        tags: matterResult.data.tags || [],
        image: matterResult.data.image,
      };
    });

  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Obtém o conteúdo completo de um artigo pelo slug
export async function getArticleData(slug: string, lang: string = 'pt'): Promise<Article> {
  const fullPath = path.join(articlesDirectory, lang, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Usa gray-matter para separar a seção de metadados
  const matterResult = matter(fileContents);

  // Usa remark para converter markdown em HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: matterResult.data.title || 'Sem Título',
    date: matterResult.data.date || new Date().toISOString().split('T')[0],
    tags: matterResult.data.tags || [],
    image: matterResult.data.image,
    contentHtml,
    excerpt: matterResult.content.substring(0, 300) + '...', // Um resumo simples
  };
}
