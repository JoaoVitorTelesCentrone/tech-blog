import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateArticleWithGemini(topic: string, context: string): Promise<string> {
  const promptTemplate = `
Você é um redator profissional de blog sobre tecnologia e inteligência artificial.

Tarefa:
Você recebeu as informações INÉDITAS da internet sobre o tema abaixo no campo [CONTEXTO]. 
Escolha a notícia MAIS impactante desse contexto e faça um "deep dive" (mergulho profundo) nela, em vez de fazer um resumo raso de todas. Escreva um post completo em português, pronto para publicação.

Tema: "${topic}"

[CONTEXTO]
${context}
[/CONTEXTO]

Regras obrigatórias:
1. O post deve ter:
   - Título principal cativante e otimizado para SEO.
   - Subtítulo com gancho.
   - Introdução (2-3 parágrafos).
   - Desenvolvimento dividido em 3-4 seções com subtítulos (<h2>).
   - Conclusão com resumo ou perspectiva futura.
   - Seção "Fontes consultadas" com links clicáveis das fontes do [CONTEXTO].
2. Formate TUDO em Markdown, seguindo RIGOROSAMENTE esta estrutura com frontmatter no topo. 
IMPORTANTE: NÃO inclua crases (```markdown) na sua resposta. Comece o texto DIRETAMENTE com os 3 traços (---):

---
title: "TÍTULO AQUI"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2", "tag3"]
---

# Título Principal

**Subtítulo envolvente**

## Introdução
(conteúdo)

## Seção 1: (subtítulo)
(conteúdo com links embutidos quando pertinente, ex: [Fonte](URL))

## Seção 2: (subtítulo)
(conteúdo)

## Seção 3: (subtítulo)
(conteúdo)

## Conclusão
(conteúdo)

### Fontes Consultadas
- [Título da Fonte 1](URL)
- [Título da Fonte 2](URL)

3. Use linguagem acessível mas técnica na medida certa.
4. Mínimo de 800 palavras.
5. Inclua pelo menos 3 links embutidos no corpo do texto para as fontes originais.
6. Não use a sintaxe de footnotes [^1]. Coloque os links diretamente no texto e crie uma lista simples no final.
6. Não invente dados. Baseie-se no [CONTEXTO] fornecido.
`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptTemplate,
    });
    
    let text = response.text || '';
    
    // Filtro de segurança rigoroso: remove crases de blocos markdown caso a IA decida enviá-los mesmo com o aviso
    text = text.replace(/^```markdown\s*/i, '');
    text = text.replace(/^```\s*/, '');
    text = text.replace(/```\s*$/, '');
    
    // Garante que o texto comece rigorosamente com --- para o gray-matter funcionar
    text = text.trim();
    if (!text.startsWith('---')) {
        text = '---\n' + text;
    }

    return text;
  } catch (error) {
    console.error('Erro ao gerar artigo com Gemini:', error);
    throw error;
  }
}

export async function generateImageWithGemini(articleTitle: string): Promise<string> {
  const prompt = `Abstract cinematic 3d render. A conceptual artwork representing "${articleTitle}". Aesthetic: Technology, mathematics, coding, physics, subtle glowing lines, dark modern background, highly detailed, photorealistic lighting. No text or words in the image.`;
  
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '3:4',
      }
    });

    const base64Image = response.generatedImages?.[0]?.image?.imageBytes;
    if (!base64Image) {
      throw new Error('Nenhuma imagem retornada pela API.');
    }

    return base64Image;
  } catch (error) {
    console.error('Erro ao gerar imagem com Imagen 3:', error);
    throw error;
  }
}
