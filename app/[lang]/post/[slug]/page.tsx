import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getArticleData } from '@/lib/markdown';
import Link from 'next/link';

export default async function PostPage({ params }: { params: { slug: string, lang: string } }) {
  const lang = params.lang || 'pt'
  const article = await getArticleData(params.slug, lang)
  
  const t = {
    publishedOn: lang === 'en' ? 'Published on:' : 'Publicado em:',
    goBack: lang === 'en' ? '← Back to Homepage' : '← Voltar para o Início'
  };

  return (
    <>
      <Header />
      <main className="max-w-editorial mx-auto px-6 md:px-grid-margin py-12">
        <article className="max-w-3xl mx-auto">
          <Link href={`/${lang}/`} className="font-label-caps text-label-caps uppercase text-primary hover:underline mb-8 inline-block">
            {t.goBack}
          </Link>  
          <header className="mb-12 border-b border-primary pb-8" style={{ borderBottomWidth: '0.5pt' }}>
            <div className="flex gap-2 mb-4">
               {article.tags?.map(tag => (
                  <span key={tag} className="font-label-caps text-[10px] uppercase bg-surface-container-low px-2 py-1 rounded">
                    {tag}
                  </span>
               ))}
            </div>
            <h1 className="font-newsreader font-semibold text-primary mb-6 leading-tight text-4xl md:text-display-sm">
              {article.title}
            </h1>
            <p className="font-work-sans text-body-md text-on-surface-variant mb-8">
              {t.publishedOn} {article.date}
            </p>

            {article.image && (
              <div className="w-full aspect-[21/9] relative mb-8 grayscale hover:grayscale-0 transition-all duration-700">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </header>

          <div 
            className="prose prose-stone prose-lg font-work-sans max-w-none text-on-surface 
                       prose-headings:font-newsreader prose-headings:font-medium prose-headings:text-primary
                       prose-a:text-accent-coral prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }} 
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
