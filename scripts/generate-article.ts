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

    console.log('🤖 [GITHUB ACTIONS] Gerando artigo com a IA do Gemini...');
    const topic = "Os principais destaques e inovações em Inteligência Artificial e Tecnologia hoje";
    let markdownContent = await generateArticleWithGemini(topic, context);

    // Limpar o markdown
    markdownContent = markdownContent.replace(/^```markdown\n/m, '');
    markdownContent = markdownContent.replace(/\n```$/m, '');

    // Extrair o título
    const matterResult = matter(markdownContent);
    const articleTitle = matterResult.data.title || "Inovação em Tecnologia e IA";
    matterResult.data.date = new Date().toISOString();

    console.log('🤖 [GITHUB ACTIONS] Gerando imagem de identidade visual com Pollinations.ai...');
    
    const dateStr = new Date().toISOString().split('T')[0];
    const uniqueId = Math.random().toString(36).substring(2, 7);
    const fileName = `${dateStr}-${uniqueId}`;

    try {
      const imagePrompt = encodeURIComponent(`Abstract cinematic 3d render representing ${articleTitle}. Technology, mathematics, coding, physics, subtle glowing lines, dark modern background, highly detailed. No text.`);
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
        matterResult.data.image = `/images/${fileName}.jpg`;
      } else {
        const randomImageNumber = Math.floor(Math.random() * 3) + 1;
        matterResult.data.image = `/images/tech_${randomImageNumber}.png`;
      }
    } catch (e) {
      console.error('Erro ao gerar imagem, usando fallback.', e);
      const randomImageNumber = Math.floor(Math.random() * 3) + 1;
      matterResult.data.image = `/images/tech_${randomImageNumber}.png`;
    }

    const finalMarkdown = matter.stringify(matterResult.content, matterResult.data);

    // Salvar o arquivo Markdown
    const dirPath = path.join(process.cwd(), 'content', 'articles');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = path.join(dirPath, `${fileName}.md`);
    fs.writeFileSync(filePath, finalMarkdown, 'utf-8');

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

    console.log(`🤖 [GITHUB ACTIONS] Sucesso absoluto! Artigo salvo: ${fileName}.md`);
  } catch (error) {
    console.error('🤖 [GITHUB ACTIONS] Erro fatal no processo:', error);
    process.exit(1);
  }
}

main();
