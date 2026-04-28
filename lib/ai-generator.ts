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
2. Formate TUDO em Markdown, seguindo RIGOROSAMENTE esta estrutura com frontmatter no topo:

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
(conteúdo com citações [^1] quando pertinente)

## Seção 2: (subtítulo)
(conteúdo)

## Seção 3: (subtítulo)
(conteúdo)

## Conclusão
(conteúdo)

### Fontes
[^1]: [Título da Fonte](URL)
[^2]: [Título da Fonte](URL)

3. Use linguagem acessível mas técnica na medida certa.
4. Mínimo de 800 palavras.
5. Inclua pelo menos 3 citações de fontes diferentes no corpo do texto.
6. Não invente dados. Baseie-se no [CONTEXTO] fornecido.
`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptTemplate,
    });
    
    return response.text || '';
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
