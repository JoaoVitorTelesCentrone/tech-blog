import { fetchLatestTechNews } from '../lib/news-fetcher';
import { generateArticleWithGemini } from '../lib/ai-generator';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

async function main() {
  try {
    console.log('🤖 [GITHUB ACTIONS] Iniciando busca de notícias inéditas...');
    const { context, newUrls } = await fetchLatestTechNews();

    if (!context || newUrls.length === 0) {
      console.log('🤖 [GITHUB ACTIONS] Nenhuma notícia nova encontrada. Abortando para evitar duplicatas.');
      process.exit(0);
    }

    console.log('🤖 [GITHUB ACTIONS] Gerando artigo BILINGUE com a IA do Gemini...');
    const topic = "Os principais destaques e inovações em Inteligência Artificial e Tecnologia hoje";
    const articles = await generateArticleWithGemini(topic, context);

    if (!articles.pt || !articles.en) {
      throw new Error("A IA não retornou o JSON esperado com os dois idiomas.");
    }

    // Extrair o título da versão inglês para gerar a imagem
    const matterResultEn = matter(articles.en);
    const articleTitleEn = matterResultEn.data.title || "Technology Innovation";

    console.log('🤖 [GITHUB ACTIONS] Gerando imagem de identidade visual com Pollinations.ai...');
    
    const dateStr = new Date().toISOString().split('T')[0];
    const uniqueId = Math.random().toString(36).substring(2, 7);
    const fileName = `${dateStr}-${uniqueId}`;

    let imageUrlFinal = `/images/tech_${Math.floor(Math.random() * 3) + 1}.png`;

    try {
      const imagePrompt = encodeURIComponent(`Abstract cinematic 3d render representing ${articleTitleEn}. Technology, mathematics, coding, physics, subtle glowing lines, dark modern background, highly detailed. No text.`);
      const imageUrl = `https://image.pollinations.ai/prompt/${imagePrompt}?width=800&height=450&nologo=true`;
      
      const imageResponse = await fetch(imageUrl);
      if (imageResponse.ok) {
        const buffer = await imageResponse.arrayBuffer();
        const imagesDirPath = path.join(process.cwd(), 'public', 'images');
        if (!fs.existsSync(imagesDirPath)) {
          fs.mkdirSync(imagesDirPath, { recursive: true });
        }
        const imagePath = path.join(imagesDirPath, `${fileName}.jpg`);
        fs.writeFileSync(imagePath, Buffer.from(buffer));
        imageUrlFinal = `/images/${fileName}.jpg`;
      }
    } catch (e) {
      console.error('Erro ao gerar imagem, usando fallback.', e);
    }

    // Salvar artigo em PT
    const matterResultPt = matter(articles.pt);
    matterResultPt.data.image = imageUrlFinal;
    const finalMarkdownPt = matter.stringify(matterResultPt.content, matterResultPt.data);
    const dirPathPt = path.join(process.cwd(), 'content', 'articles', 'pt');
    if (!fs.existsSync(dirPathPt)) {
      fs.mkdirSync(dirPathPt, { recursive: true });
    }
    fs.writeFileSync(path.join(dirPathPt, `${fileName}.md`), finalMarkdownPt, 'utf-8');

    // Salvar artigo em EN
    matterResultEn.data.image = imageUrlFinal;
    const finalMarkdownEn = matter.stringify(matterResultEn.content, matterResultEn.data);
    const dirPathEn = path.join(process.cwd(), 'content', 'articles', 'en');
    if (!fs.existsSync(dirPathEn)) {
      fs.mkdirSync(dirPathEn, { recursive: true });
    }
    fs.writeFileSync(path.join(dirPathEn, `${fileName}.md`), finalMarkdownEn, 'utf-8');

    // Atualizar e salvar o histórico
    const historyPath = path.join(process.cwd(), 'data', 'history.json');
    let usedUrls: string[] = [];
    if (fs.existsSync(historyPath)) {
      usedUrls = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    }
    usedUrls.push(...newUrls);
    
    const dataDirPath = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDirPath)) {
      fs.mkdirSync(dataDirPath, { recursive: true });
    }
    fs.writeFileSync(historyPath, JSON.stringify(usedUrls, null, 2), 'utf8');

    console.log(`🤖 [GITHUB ACTIONS] Sucesso absoluto! Artigos salvos em PT e EN: ${fileName}.md`);
  } catch (error) {
    console.error('🤖 [GITHUB ACTIONS] Erro fatal no processo:', error);
    process.exit(1);
  }
}

main();
