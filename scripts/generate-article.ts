import { fetchLatestTechNews } from '../lib/news-fetcher';
import { generateArticleWithGroq, generateSlideScript } from '../lib/ai-generator';
import { generateSlideImages } from '../lib/slide-generator';
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

    console.log('🤖 [GITHUB ACTIONS] Gerando artigo com a IA do Groq...');
    const topic = "Os principais destaques e inovações em Inteligência Artificial e Tecnologia hoje";
    let markdownContent = await generateArticleWithGroq(topic, context);

    markdownContent = markdownContent.replace(/^```markdown\n/m, '');
    markdownContent = markdownContent.replace(/\n```$/m, '');

    const matterResult = matter(markdownContent);
    const articleTitle = matterResult.data.title || "Inovação em Tecnologia e IA";
    matterResult.data.date = new Date().toISOString();

    const dateStr = new Date().toISOString().split('T')[0];
    const uniqueId = Math.random().toString(36).substring(2, 7);
    const fileName = `${dateStr}-${uniqueId}`;

    // 1. Imagem de capa (Pollinations.ai)
    console.log('🤖 [GITHUB ACTIONS] Gerando imagem de identidade visual com Pollinations.ai...');
    try {
      const imagePrompt = encodeURIComponent(`Abstract cinematic 3d render representing ${articleTitle}. Technology, mathematics, coding, physics, subtle glowing lines, dark modern background, highly detailed. No text.`);
      const imageUrl = `https://image.pollinations.ai/prompt/${imagePrompt}?width=800&height=450&nologo=true`;
      const imageResponse = await fetch(imageUrl);
      if (imageResponse.ok) {
        const buffer = await imageResponse.arrayBuffer();
        const imagesDirPath = path.join(process.cwd(), 'public', 'images');
        if (!fs.existsSync(imagesDirPath)) fs.mkdirSync(imagesDirPath, { recursive: true });
        fs.writeFileSync(path.join(imagesDirPath, `${fileName}.jpg`), Buffer.from(buffer));
        matterResult.data.image = `/images/${fileName}.jpg`;
      } else {
        matterResult.data.image = `/images/tech_${Math.floor(Math.random() * 3) + 1}.png`;
      }
    } catch (e) {
      console.error('Erro ao gerar imagem, usando fallback.', e);
      matterResult.data.image = `/images/tech_${Math.floor(Math.random() * 3) + 1}.png`;
    }

    // 2. Slides para Instagram (Satori)
    console.log('🤖 [GITHUB ACTIONS] Gerando slides para Instagram com Satori...');
    try {
      const slideScript = await generateSlideScript(markdownContent, articleTitle);
      const slidesDir = path.join(process.cwd(), 'public', 'slides');
      const slidePaths = await generateSlideImages(slideScript, slidesDir, fileName);
      matterResult.data.slides = slidePaths;
      console.log(`🤖 [GITHUB ACTIONS] ${slidePaths.length} slides gerados!`);
    } catch (e) {
      console.error('🤖 [GITHUB ACTIONS] Falha ao gerar slides (não crítico):', e);
    }

    // 3. Salvar artigo com todos os metadados (imagem + slides no frontmatter)
    const finalMarkdown = matter.stringify(matterResult.content, matterResult.data);
    const dirPath = path.join(process.cwd(), 'content', 'articles');
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(path.join(dirPath, `${fileName}.md`), finalMarkdown, 'utf-8');

    // 4. Atualizar histórico de URLs
    const historyPath = path.join(process.cwd(), 'data', 'history.json');
    let usedUrls: string[] = [];
    if (fs.existsSync(historyPath)) usedUrls = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
    usedUrls.push(...newUrls);
    const dataDirPath = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDirPath)) fs.mkdirSync(dataDirPath, { recursive: true });
    fs.writeFileSync(historyPath, JSON.stringify(usedUrls, null, 2), 'utf8');

    console.log(`🤖 [GITHUB ACTIONS] Sucesso! Artigo + slides salvos: ${fileName}`);
  } catch (error) {
    console.error('🤖 [GITHUB ACTIONS] Erro fatal no processo:', error);
    process.exit(1);
  }
}

main();
