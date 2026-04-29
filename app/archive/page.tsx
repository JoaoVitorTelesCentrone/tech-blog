import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getSortedArticlesData } from '@/lib/markdown'

export default function ArchivePage() {
  const allArticles = getSortedArticlesData()

  // Formatador de mes (ex: 2026-04-28 -> ABRIL 2026)
  const getMonthYear = (dateStr: string) => {
    const [y, m] = dateStr.split('T')[0].split('-');
    const months = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];
    return `${months[parseInt(m, 10) - 1]} ${y}`;
  }

  // Helper para mostrar formato dia/mes (ex: 28.04)
  const getDayMonth = (dateStr: string) => {
    const [, m, d] = dateStr.split('T')[0].split('-');
    return `${d}.${m}`;
  }

  // Agrupa artigos primeiro por mês, depois por data
  const archiveGroups = allArticles.reduce((acc, curr) => {
    const dateKey = curr.date.split('T')[0];
    const monthYear = getMonthYear(dateKey);
    if (!acc[monthYear]) acc[monthYear] = {};
    if (!acc[monthYear][dateKey]) acc[monthYear][dateKey] = [];
    
    acc[monthYear][dateKey].push(curr);
    return acc;
  }, {} as Record<string, Record<string, typeof allArticles>>);

  return (
    <>
      <Header />
      <main className="max-w-editorial mx-auto px-6 md:px-grid-margin py-16 min-h-screen">
        {/* Header */}
        <header className="grid grid-cols-12 gap-grid-gutter mb-24">
          <div className="col-span-12 md:col-start-3 md:col-span-7">
            <span className="font-label-caps text-label-caps uppercase border-b border-on-tertiary-container mb-4 inline-block pb-1 text-on-tertiary-container">
              Historical Records
            </span>
            <h1 className="font-newsreader italic mt-6 text-3xl sm:text-5xl md:text-display-xl text-on-background">
              Arquivo de Edições
            </h1>
            <p className="font-newsreader font-medium text-headline-md text-on-surface-variant mt-4 max-w-xl">
              Explore our collection of deep tech insights and editorial analysis, documented since our inception.
            </p>
          </div>
        </header>

        {/* Archive list */}
        <section className="grid grid-cols-12 gap-grid-gutter">
          <div className="col-span-12 md:col-start-3 md:col-span-8 space-y-20">
            {Object.entries(archiveGroups).map(([month, datesMap]) => (
              <div key={month}>
                <h2 className="font-label-caps text-label-caps text-on-tertiary-container mb-8 flex items-center gap-4">
                  {month}
                  <span className="flex-grow bg-outline-variant" style={{ height: '0.5pt' }} />
                </h2>
                
                <div className="space-y-12">
                  {Object.entries(datesMap).map(([date, articlesList]) => (
                    <div key={date} className="divide-y divide-outline-variant border-t border-outline-variant pt-2">
                      <div className="font-label-caps text-label-caps text-primary mb-4 mt-2">
                        Edição de {getDayMonth(date)}
                      </div>
                      
                      {articlesList.map((article) => (
                        <Link
                          key={article.slug}
                          href={`/post/${article.slug}`}
                          className="grid grid-cols-12 py-4 hover:bg-surface-container-low transition-colors duration-200 cursor-pointer group block"
                        >
                          <div className="col-span-12 sm:col-span-10 sm:col-start-3 font-newsreader font-medium text-[20px] md:text-[24px] leading-tight group-hover:translate-x-2 transition-transform duration-300">
                            {article.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Load more */}
        <section className="grid grid-cols-12 gap-grid-gutter mt-24 pb-24">
          <div className="col-span-12 md:col-start-3 md:col-span-8 text-center">
            <button className="px-12 py-4 border border-primary font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300">
              Carregar Edições Anteriores
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
