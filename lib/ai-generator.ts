import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateArticleWithGemini(topic: string, context: string): Promise<{ pt: string, en: string }> {
  const promptTemplate = `
Você é um redator profissional de blog bilíngue sobre tecnologia e inteligência artificial.

Tarefa:
Você recebeu as informações INÉDITAS da internet sobre o tema abaixo no campo [CONTEXTO]. 
Escolha a notícia MAIS impactante desse contexto e faça um "deep dive" nela. 
Escreva o mesmo artigo em DUAS línguas: Português e Inglês.

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
   - Seção de referências com links clicáveis das fontes.
2. Formate TUDO em Markdown, seguindo RIGOROSAMENTE a estrutura abaixo com frontmatter no topo:
---
title: "TÍTULO AQUI"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2", "tag3"]
---
# Main Title
**Engaging Subtitle**
## Introduction
(conteúdo)
## Section 1: (subtitle)
(conteúdo com links embutidos quando pertinente, ex: [Source](URL))
### References
- [Source Title](URL)

3. Mínimo de 800 palavras em cada língua.
4. Você DEVE retornar EXCLUSIVAMENTE um objeto JSON válido. NENHUM TEXTO A MAIS. 
O JSON deve seguir esta estrutura exata:
{
  "pt": "markdown completo em português aqui",
  "en": "markdown completo em inglês aqui"
}
`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptTemplate,
    });
    
    let text = response.text || '';
    
    // Tentar limpar blocos markdown se o modelo envolver o JSON
    text = text.replace(/^```json\n/m, '');
    text = text.replace(/\n```$/m, '');
    text = text.replace(/^```\n/m, '');
    
    const parsed = JSON.parse(text);
    return {
      pt: parsed.pt || '',
      en: parsed.en || ''
    };
  } catch (error) {
    console.error('Erro ao gerar artigo com Gemini:', error);
    throw error;
  }
}
