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

export async function fetchLatestTechNews(): Promise<{ context: string, newUrls: string[] }> {
  // Ler o histórico de URLs já utilizadas
  const historyPath = path.join(process.cwd(), 'data', 'history.json');
  let usedUrls: string[] = [];
  
  if (fs.existsSync(historyPath)) {
    const data = fs.readFileSync(historyPath, 'utf8');
    usedUrls = JSON.parse(data);
  }

  let context = 'Aqui estão as notícias de tecnologia mais recentes e INÉDITAS coletadas:\n\n';
  const newUrlsToSave: string[] = [];
  let foundNewItems = false;
  
  for (const feedUrl of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);
      
      // Filtrar apenas notícias que não estão no histórico
      const freshItems = feed.items.filter((item: CustomItem) => item.link && !usedUrls.includes(item.link));
      
      // Pegar as 3 mais recentes dentre as inéditas
      const recentItems = freshItems.slice(0, 3);
      
      if (recentItems.length > 0) {
        context += `Fonte: ${feed.title}\n`;
        foundNewItems = true;
        
        for (const item of recentItems) {
          context += `- Título: ${item.title}\n`;
          context += `  Data: ${item.pubDate}\n`;
          context += `  Link: ${item.link}\n`;
          context += `  Resumo: ${item.contentSnippet || item.content?.substring(0, 200)}...\n\n`;
          
          if (item.link) {
            newUrlsToSave.push(item.link);
          }
        }
      }
    } catch (error) {
      console.error(`Erro ao buscar feed ${feedUrl}:`, error);
    }
  }

  // Se não encontrou nenhuma notícia nova, retorna vazio
  if (!foundNewItems) {
    return { context: '', newUrls: [] };
  }

  return { context, newUrls: newUrlsToSave };
}
