const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function generateArticleWithGroq(topic: string, context: string): Promise<string> {
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
   - Desenvolvimento dividido em 3-4 seções com subtítulos (formato H2).
   - Conclusão com resumo ou perspectiva futura.
   - Seção "Fontes consultadas" com links clicáveis das fontes do [CONTEXTO].
2. Formate TUDO em Markdown, seguindo RIGOROSAMENTE esta estrutura com frontmatter no topo.
IMPORTANTE: NÃO inclua blocos de formatação markdown (como crase tripla) na sua resposta. Comece o texto DIRETAMENTE com os 3 traços (---):

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
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: promptTemplate }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Groq API error ${response.status}: ${err}`);
    }

    const data = await response.json() as { choices: { message: { content: string } }[] };
    let text = data.choices[0]?.message?.content || '';

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
    console.error('Erro ao gerar artigo com Groq:', error);
    throw error;
  }
}
