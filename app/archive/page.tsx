import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const archiveData = [
  {
    month: 'ABRIL 2026',
    editions: [
      { id: '047', number: 'Nº 047', date: '28.04', title: 'O Paradoxo da Inteligência Sintética' },
      { id: '046', number: 'Nº 046', date: '21.04', title: 'Arquiteturas de Silício e o Futuro do Processamento' },
      { id: '045', number: 'Nº 045', date: '14.04', title: 'A Ética na Vigilância Algorítmica' },
    ],
  },
  {
    month: 'MARÇO 2026',
    editions: [
      { id: '044', number: 'Nº 044', date: '31.03', title: 'Descentralização: Promessas e Ruínas' },
      { id: '043', number: 'Nº 043', date: '24.03', title: 'Interfaces Neuro-Digitais: A Próxima Fronteira' },
      { id: '042', number: 'Nº 042', date: '17.03', title: 'A Morte do Pixel e o Nascimento do Volume' },
    ],
  },
  {
    month: 'FEVEREIRO 2026',
    editions: [
      { id: '041', number: 'Nº 041', date: '28.02', title: 'Protocolos de Confiança em Tempos de Deepfake' },
    ],
  },
]

export default function ArchivePage() {
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
            {archiveData.map(({ month, editions }) => (
              <div key={month}>
                <h2 className="font-label-caps text-label-caps text-on-tertiary-container mb-8 flex items-center gap-4">
                  {month}
                  <span className="flex-grow bg-outline-variant" style={{ height: '0.5pt' }} />
                </h2>
                <div className="divide-y divide-outline-variant">
                  {editions.map(({ id, number, date, title }) => (
                    <Link
                      key={id}
                      href={`/edition/${id}`}
                      className="grid grid-cols-12 py-6 hover:bg-surface-container-low transition-colors duration-200 cursor-pointer group block"
                    >
                      <div className="col-span-3 sm:col-span-2 font-label-caps text-label-caps text-on-surface-variant flex items-center">
                        {number}
                      </div>
                      <div className="col-span-3 sm:col-span-2 font-label-caps text-label-caps text-on-surface-variant flex items-center">
                        {date}
                      </div>
                      <div className="col-span-6 sm:col-span-8 font-newsreader font-medium text-[20px] md:text-[24px] leading-tight group-hover:translate-x-2 transition-transform duration-300">
                        {title}
                      </div>
                    </Link>
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
