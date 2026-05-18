import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';

type CustomItem = {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  content?: string;
};

const parser = new Parser<any, CustomItem>();

const RSS_FEEDS = [
  'https://techcrunch.com/feed/',
  'https://www.theverge.com/rss/index.xml',
  'https://www.wired.com/feed/rss'
];

async function fetchArticleContent(url: string, fallback: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    clearTimeout(timeout);

    if (!response.ok) return fallback;

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) return fallback;

    let html = await response.text();

    // Remove ruído: scripts, estilos, nav, rodapé, comentários
    html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    html = html.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
    html = html.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
    html = html.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
    html = html.replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '');
    html = html.replace(/<!--[\s\S]*?-->/g, '');

    // Tenta extrair o conteúdo principal: <article> → <main> → body inteiro
    let content = '';
    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    if (articleMatch) {
      content = articleMatch[1];
    } else {
      const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
      content = mainMatch ? mainMatch[1] : html;
    }

    // Strip das tags restantes e entidades HTML
    content = content.replace(/<[^>]+>/g, ' ');
    content = content.replace(/&[a-zA-Z0-9#]+;/g, ' ');
    content = content.replace(/\s+/g, ' ').trim();

    // Se extraiu pouco conteúdo, usa o fallback do RSS
    if (content.length < 200) return fallback;

    return content.substring(0, 4000);
  } catch {
    return fallback;
  }
}

export async function fetchLatestTechNews(): Promise<{ context: string; newUrls: string[] }> {
  const historyPath = path.join(process.cwd(), 'data', 'history.json');
  let usedUrls: string[] = [];

  if (fs.existsSync(historyPath)) {
    usedUrls = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
  }

  type FeedItem = { feedTitle: string; item: CustomItem };
  const allFreshItems: FeedItem[] = [];

  // Busca todos os feeds em paralelo
  await Promise.allSettled(
    RSS_FEEDS.map(async (feedUrl) => {
      try {
        const feed = await parser.parseURL(feedUrl);
        const freshItems = feed.items
          .filter((item: CustomItem) => item.link && !usedUrls.includes(item.link))
          .slice(0, 3);
        for (const item of freshItems) {
          allFreshItems.push({ feedTitle: feed.title, item });
        }
      } catch (error) {
        console.error(`Erro ao buscar feed ${feedUrl}:`, error);
      }
    })
  );

  if (allFreshItems.length === 0) {
    return { context: '', newUrls: [] };
  }

  // Busca o conteúdo completo de todos os artigos em paralelo
  const enriched = await Promise.all(
    allFreshItems.map(async ({ feedTitle, item }) => {
      const fallback = item.contentSnippet || item.content?.substring(0, 500) || '';
      const fullContent = item.link
        ? await fetchArticleContent(item.link, fallback)
        : fallback;
      return { feedTitle, item, fullContent };
    })
  );

  // Agrupa por feed e monta o contexto
  let context = 'Aqui estão as notícias de tecnologia mais recentes e INÉDITAS coletadas:\n\n';
  const newUrlsToSave: string[] = [];

  const byFeed = new Map<string, typeof enriched>();
  for (const entry of enriched) {
    if (!byFeed.has(entry.feedTitle)) byFeed.set(entry.feedTitle, []);
    byFeed.get(entry.feedTitle)!.push(entry);
  }

  for (const [feedTitle, entries] of byFeed) {
    context += `Fonte: ${feedTitle}\n`;
    for (const { item, fullContent } of entries) {
      context += `- Título: ${item.title}\n`;
      context += `  Data: ${item.pubDate}\n`;
      context += `  Link: ${item.link}\n`;
      context += `  Conteúdo:\n${fullContent}\n\n`;
      if (item.link) newUrlsToSave.push(item.link);
    }
  }

  return { context, newUrls: newUrlsToSave };
}
