import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getSortedArticlesData } from '@/lib/markdown'

export default function HomePage() {
  const allArticles = getSortedArticlesData()

  // Formatador de data (ex: 2026-04-28 -> 28 de Abril de 2026)
  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-');
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return `${parseInt(d, 10)} de ${months[parseInt(m, 10) - 1]} de ${y}`;
  }

  // Agrupa artigos por data
  const grouped = allArticles.reduce((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = [];
    acc[curr.date].push(curr);
    return acc;
  }, {} as Record<string, typeof allArticles>);

  const sortedDates = Object.keys(grouped).sort((a, b) => (a < b ? 1 : -1));
  const latestDate = sortedDates[0];
  const todayArticles = latestDate ? grouped[latestDate] : [];
  const mainArticle = todayArticles[0];
  const secondaryTodayArticles = todayArticles.slice(1);
  const previousDates = sortedDates.slice(1, 4); // pega os ultimos 3 dias para a home

  return (
    <>
      <Header />
      <main className="max-w-editorial mx-auto px-6 md:px-grid-margin py-12">
        {allArticles.length === 0 ? (
          <div className="py-20 text-center">
            <h1 className="font-newsreader text-4xl text-primary mb-4">Ainda não há artigos</h1>
            <p className="font-work-sans text-on-surface-variant">Aguarde o robô gerar a primeira publicação.</p>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <header className="grid grid-cols-12 gap-grid-gutter mb-section-gap">
              {/* Left metadata */}
              <div className="col-span-12 md:col-span-2 mb-8 md:mb-0">
                <div className="md:sticky md:top-28">
                  <p className="font-label-caps text-label-caps text-on-surface uppercase mb-2">Edição de {formatDate(latestDate)}</p>
                  <p className="font-newsreader text-primary text-2xl font-medium">Hoje</p>
                  <p className="font-work-sans text-body-md text-on-surface-variant mt-4">{latestDate}</p>
                </div>
              </div>

              {/* Main headline */}
              <div className="col-span-12 md:col-span-7">
                <Link href={`/post/${mainArticle.slug}`} className="hover:opacity-80 transition-opacity">
                  <h1 className="font-newsreader font-semibold text-primary mb-8 leading-[0.95] text-4xl sm:text-5xl lg:text-display-xl">
                    {mainArticle.title}
                  </h1>
                </Link>
                <div className="border-b border-primary mb-8" style={{ borderBottomWidth: '0.5pt' }} />
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <p className="font-work-sans text-body-lg text-on-surface italic">
                      Um artigo gerado inteiramente por Inteligência Artificial baseado nas notícias mais recentes da internet.
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mt-2">
                      {mainArticle.tags?.map(tag => (
                         <span key={tag} className="font-label-caps text-[10px] uppercase bg-surface-container-low px-2 py-1 rounded">
                           {tag}
                         </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover image */}
              <div className="col-span-12 md:col-span-3 mt-8 md:mt-0">
                <Link href={`/post/${mainArticle.slug}`}>
                  <div className="aspect-[3/4] w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 bg-surface-container-low flex items-center justify-center relative">
                    {mainArticle.image ? (
                      <Image src={mainArticle.image} alt={mainArticle.title} fill className="object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-[64px] text-primary/20">memory</span>
                    )}
                  </div>
                </Link>
              </div>
            </header>

            {secondaryTodayArticles.length > 0 && (
              <div className="grid grid-cols-12 gap-grid-gutter mb-section-gap">
                <div className="col-span-12 md:col-start-3 md:col-span-10">
                  <h3 className="font-label-caps text-label-caps uppercase text-on-surface-variant mb-4">Também na edição de hoje:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {secondaryTodayArticles.map(article => (
                      <Link key={article.slug} href={`/post/${article.slug}`} className="block border-t border-outline-variant pt-4 hover:bg-surface-container-low transition-colors duration-200">
                        <h4 className="font-newsreader text-xl font-medium text-primary mb-2">{article.title}</h4>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Ad placeholder */}
            <div
              className="w-full h-32 mb-section-gap border border-outline-variant flex items-center justify-center bg-surface-container-low"
              style={{ borderWidth: '0.5pt' }}
            >
              <span className="font-label-caps text-label-caps text-outline uppercase tracking-widest text-[10px]">
                Anúncio Editorial — TechPulse Partnership
              </span>
            </div>

            {/* Editorial Grid */}
            {previousDates.length > 0 && (
              <section className="grid grid-cols-12 gap-grid-gutter mb-section-gap">
                <div className="col-span-12 md:col-span-8 border-2 border-primary p-8 md:p-12">
                  <div className="mb-8 md:mb-12">
                    <span className="font-label-caps text-label-caps text-accent-coral uppercase tag-underline">
                      Publicações Anteriores
                    </span>
                  </div>
                  
                  <div className="space-y-12">
                    {previousDates.map(date => (
                      <div key={date}>
                        <h3 className="font-label-caps text-label-caps text-on-surface mb-6 border-b border-outline-variant pb-2">
                          Edição de {formatDate(date)}
                        </h3>
                        <div className="flex flex-col gap-6">
                          {grouped[date].map(article => (
                            <Link key={article.slug} href={`/post/${article.slug}`} className="hover:underline">
                              <h2 className="font-newsreader font-medium text-primary text-xl leading-tight">
                                {article.title}
                              </h2>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-outline-variant">
                    <Link href="/archive" className="font-label-caps text-[11px] uppercase tracking-[0.15em] text-on-surface hover:text-accent-coral transition-colors flex items-center gap-2">
                      Ver todo o arquivo <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>

                {/* Right column cards (Advertising or Highlights) */}
                <div className="col-span-12 md:col-span-4 flex flex-col gap-grid-gutter">
                  <div className="border border-primary p-8 h-full flex flex-col justify-between" style={{ borderWidth: '0.5pt' }}>
                    <div>
                      <div className="mb-6">
                        <span className="font-label-caps text-label-caps text-on-surface uppercase tag-underline">
                          Sobre o Projeto
                        </span>
                      </div>
                      <h3 className="font-newsreader font-medium text-primary mb-4 text-headline-md">
                        Jornalismo 100% Automatizado
                      </h3>
                      <p className="font-work-sans text-body-md text-on-surface-variant mb-6">
                        Nossas edições diárias são pesquisadas, escritas e ilustradas por Inteligência Artificial autônoma.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-5 h-5 bg-stone-200 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[12px] text-primary">auto_awesome</span>
                      </div>
                      <span className="font-label-caps text-[9px] uppercase">TechPulse AI</span>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* Newsletter */}
        <section
          className="w-full py-20 border-t border-primary flex flex-col md:flex-row items-start md:items-center justify-between gap-12 mt-12"
          style={{ borderTopWidth: '0.5pt' }}
        >
          <div className="max-w-md">
            <h4 className="font-newsreader font-medium italic text-headline-md mb-4">
              Assine o TechPulse Morning Report
            </h4>
            <p className="font-work-sans text-body-md text-on-surface-variant">
              Uma curadoria diária do que realmente importa na tecnologia, entregue às 06:00 BRT.
            </p>
          </div>
          <div className="w-full max-w-lg">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="newsletter-email"
                className="font-label-caps text-label-caps text-on-surface-variant uppercase"
              >
                Seu Email Profissional
              </label>
              <div className="flex border-b border-primary py-2" style={{ borderBottomWidth: '1px' }}>
                <input
                  id="newsletter-email"
                  type="email"
                  className="bg-transparent border-none w-full focus:ring-0 font-work-sans text-body-md placeholder:text-stone-300"
                  placeholder="nome@companhia.com.br"
                />
                <button className="font-label-caps text-label-caps uppercase text-primary hover:text-accent-coral transition-colors px-4 flex-shrink-0">
                  Inscrever
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

