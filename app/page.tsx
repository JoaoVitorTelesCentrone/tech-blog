import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getSortedArticlesData } from '@/lib/markdown'

export default function HomePage() {
  const articles = getSortedArticlesData()
  const latestArticle = articles[0]
  const otherArticles = articles.slice(1, 3)

  return (
    <>
      <Header />
      <main className="max-w-editorial mx-auto px-6 md:px-grid-margin py-12">
        {articles.length === 0 ? (
          <div className="py-20 text-center">
            <h1 className="font-newsreader text-4xl text-primary mb-4">Ainda não há artigos</h1>
            <p className="font-work-sans text-on-surface-variant">Execute a rota /api/cron para gerar o primeiro artigo via IA.</p>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <header className="grid grid-cols-12 gap-grid-gutter mb-section-gap">
              {/* Left metadata */}
              <div className="col-span-12 md:col-span-2 mb-8 md:mb-0">
                <div className="md:sticky md:top-28">
                  <p className="font-label-caps text-label-caps text-on-surface uppercase mb-2">Edição de hoje</p>
                  <p className="font-newsreader text-primary text-2xl font-medium">Nº 0{articles.length}</p>
                  <p className="font-work-sans text-body-md text-on-surface-variant mt-4">{latestArticle.date}</p>
                </div>
              </div>

              {/* Main headline */}
              <div className="col-span-12 md:col-span-7">
                <Link href={`/post/${latestArticle.slug}`} className="hover:opacity-80 transition-opacity">
                  <h1 className="font-newsreader font-semibold text-primary mb-8 leading-[0.95] text-4xl sm:text-5xl lg:text-display-xl">
                    {latestArticle.title}
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
                      {latestArticle.tags?.map(tag => (
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
                <Link href={`/post/${latestArticle.slug}`}>
                  <div className="aspect-[3/4] w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 bg-surface-container-low flex items-center justify-center relative">
                    {latestArticle.image ? (
                      <Image src={latestArticle.image} alt={latestArticle.title} fill className="object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-[64px] text-primary/20">memory</span>
                    )}
                  </div>
                </Link>
              </div>
            </header>

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
            {otherArticles.length > 0 && (
              <section className="grid grid-cols-12 gap-grid-gutter mb-section-gap">
                {/* Featured Summary Card */}
                <div className="col-span-12 md:col-span-8 border-2 border-primary p-8 md:p-12">
                  <div className="mb-8 md:mb-12">
                    <span className="font-label-caps text-label-caps text-accent-coral uppercase tag-underline">
                      Publicações Anteriores
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                    <div>
                      <Link href={`/post/${otherArticles[0].slug}`} className="hover:underline">
                        <h2 className="font-newsreader font-medium text-primary mb-6 text-2xl md:text-headline-lg leading-tight">
                          {otherArticles[0].title}
                        </h2>
                      </Link>
                      <p className="font-work-sans text-body-md text-on-surface-variant mb-8">
                        Publicado em {otherArticles[0].date}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-[14px] text-white">verified</span>
                        </div>
                        <span className="font-label-caps text-[10px] uppercase">Fonte: AI Backend</span>
                        <Link className="font-label-caps text-[10px] uppercase text-accent-coral ml-auto hover:underline" href={`/post/${otherArticles[0].slug}`}>
                          Ler Artigo
                        </Link>
                      </div>
                    </div>
                    <div className="aspect-square w-full bg-surface-container-low flex items-center justify-center relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                      {otherArticles[0].image ? (
                        <Image src={otherArticles[0].image} alt={otherArticles[0].title} fill className="object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-[48px] text-primary/20">article</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right column cards */}
                <div className="col-span-12 md:col-span-4 flex flex-col gap-grid-gutter">
                  {otherArticles[1] && (
                    <div className="border border-primary p-8 h-full flex flex-col justify-between" style={{ borderWidth: '0.5pt' }}>
                      <div>
                        <div className="mb-6">
                          <span className="font-label-caps text-label-caps text-on-surface uppercase tag-underline">
                            Arquivo
                          </span>
                        </div>
                        <Link href={`/post/${otherArticles[1].slug}`} className="hover:underline">
                          <h3 className="font-newsreader font-medium text-primary mb-4 text-headline-md">
                            {otherArticles[1].title}
                          </h3>
                        </Link>
                        <p className="font-work-sans text-body-md text-on-surface-variant mb-6">
                          {otherArticles[1].date}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-auto">
                        <div className="w-5 h-5 bg-stone-200 flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-[12px] text-primary">auto_awesome</span>
                        </div>
                        <span className="font-label-caps text-[9px] uppercase">TechPulse AI</span>
                      </div>
                    </div>
                  )}
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

