import { NextResponse } from 'next/server';
import { fetchLatestTechNews } from '@/lib/news-fetcher';
import { generateArticleWithGemini } from '@/lib/ai-generator';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Impede o cache na rota de API
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Verifica o token de autorização, EXCETO se estiver rodando localmente (desenvolvimento)
  const isDevelopment = process.env.NODE_ENV === 'development';
  const authHeader = request.headers.get('authorization');
  
  if (!isDevelopment && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    console.log('[CRON] Iniciando busca de notícias inéditas...');
    const { context, newUrls } = await fetchLatestTechNews();

    if (!context || newUrls.length === 0) {
      console.log('[CRON] Nenhuma notícia nova encontrada. Abortando para evitar duplicatas.');
      return NextResponse.json({ success: true, message: 'Nenhuma notícia nova, ignorando.' });
    }

    console.log('[CRON] Gerando artigo com Gemini...');
    const topic = "Os principais destaques e inovações em Inteligência Artificial e Tecnologia hoje";
    let markdownContent = await generateArticleWithGemini(topic, context);

    // Limpar o markdown, caso o LLM coloque dentro de blocos ```markdown
    markdownContent = markdownContent.replace(/^```markdown\n/m, '');
    markdownContent = markdownContent.replace(/\n```$/m, '');


    // Fazer parse do markdown para extrair o título
    const matterResult = matter(markdownContent);
    const articleTitle = matterResult.data.title || "Inovação em Tecnologia e IA";

    console.log('[CRON] Gerando imagem de identidade visual dinamicamente...');
    // Criar um nome único
    const dateStr = new Date().toISOString().split('T')[0];
    const uniqueId = Math.random().toString(36).substring(2, 7);
    const fileName = `${dateStr}-${uniqueId}`;

    try {
      // Usando Pollinations.ai (API gratuita sem chave) para gerar a imagem a partir do título
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
        // Fallback
        const randomImageNumber = Math.floor(Math.random() * 3) + 1;
        matterResult.data.image = `/images/tech_${randomImageNumber}.png`;
      }
    } catch (e) {
      console.error('Erro ao gerar imagem, usando fallback.', e);
      const randomImageNumber = Math.floor(Math.random() * 3) + 1;
      matterResult.data.image = `/images/tech_${randomImageNumber}.png`;
    }
    const finalMarkdown = matter.stringify(matterResult.content, matterResult.data);

    // Salvar Markdown
    const dirPath = path.join(process.cwd(), 'content', 'articles');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = path.join(dirPath, `${fileName}.md`);
    fs.writeFileSync(filePath, finalMarkdown, 'utf-8');

    // Atualizar o histórico com as URLs usadas
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

    console.log(`[CRON] Sucesso! Artigo e imagem salvos: ${fileName}`);
    
    return NextResponse.json({ success: true, message: 'Artigo e imagem gerados', file: fileName });
  } catch (error: any) {
    console.error('[CRON] Erro no processo:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
