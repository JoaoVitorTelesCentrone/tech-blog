import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const summaryCards = [
  {
    id: 1,
    importance: 'high',
    category: 'Inteligência Artificial',
    title: 'O Surgimento dos Agentes LMM: Além do Chatbot',
    body: 'Os novos Large Multimodal Models não apenas conversam; eles agem. Empresas do Vale do Silício estão lançando sistemas capazes de navegar na web e executar tarefas complexas de forma independente.',
    source: 'Wired Editorial',
  },
  {
    id: 2,
    importance: 'low',
    category: 'Hardware & Chips',
    title: 'A Crise Energética dos Datacenters',
    body: 'Com a explosão da demanda por IA, o consumo elétrico dos centros de processamento atingiu níveis críticos, forçando Big Techs a investirem em micro-reatores nucleares.',
    source: 'Bloomberg Tech',
  },
  {
    id: 3,
    importance: 'low',
    category: 'Cibersegurança',
    title: 'Deepfakes em Chamadas de Vídeo Corporativas',
    body: 'Hackers estão utilizando modelos de voz e vídeo em tempo real para enganar departamentos financeiros, resultando em perdas milionárias em transações não autorizadas.',
    source: 'Krebs on Security',
  },
  {
    id: 4,
    importance: 'high',
    category: 'Regulação',
    title: 'O "AI Act" da União Europeia Entra em Vigor',
    body: 'A primeira legislação abrangente do mundo sobre IA redefine como empresas podem operar no continente, proibindo práticas de pontuação social e reconhecimento facial indiscriminado.',
    source: 'Financial Times',
  },
]

const upcomingEditions = [
  { date: 'JUNHO 01', title: 'A Revanche do Papel: O renascimento editorial físico' },
  { date: 'JUNHO 08', title: 'Quantum Computing: Do laboratório para a nuvem' },
]

export default function EditionPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Header />
      <main className="max-w-editorial mx-auto px-6 md:px-8 py-12">
        {/* Edition hero */}
        <section className="grid grid-cols-12 gap-grid-gutter mb-section-gap">
          <div className="col-span-12 md:col-start-3 md:col-span-8">
            <div
              className="flex flex-col sm:flex-row justify-between items-baseline mb-stack-md border-b border-primary pb-4 gap-2"
              style={{ borderBottomWidth: '1px' }}
            >
              <span className="font-label-caps text-label-caps uppercase text-primary">Nº {params.id}</span>
              <span className="font-label-caps text-label-caps uppercase text-secondary">24 DE MAIO DE 2026</span>
            </div>
            <h1 className="font-newsreader italic text-primary leading-none text-3xl sm:text-5xl md:text-display-xl mb-stack-md">
              O Paradoxo da Inteligência Autônoma
            </h1>
          </div>

          <div className="col-span-12 my-stack-md">
            <div className="relative w-full aspect-[21/9] overflow-hidden border border-primary" style={{ borderWidth: '1px' }}>
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCN4QuRjjTYypPsd2VJGPyKo-l5Zd1o3L4ghS1Z_nDnQRWWMdNlfHFk7oxNsKhlljSJRm3T8ruI27I10EmPxC6Oaceu4NH2eKw4ERBb0RVY8tTWnfzjBEQ-KBfyZIPUhicfYAqA6m2wkC-y6w3emh3CihqjfdsdgLjhNLkUPBByTV83jvUHiEXyqQ7VvR-IUJPxUXf5R2Sya2asPsVJZzd-4yV8wv7rMXRygngNrsvB0svhlgDbIOq_SUnE65HwTZCPDPl5LfXIbTA"
                alt="Futuristic abstract representation of neural networks"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-background px-4 py-1 border border-primary" style={{ borderWidth: '1px' }}>
                <span className="font-label-caps text-[10px] italic">EDIÇÃO SEMANAL</span>
              </div>
            </div>
          </div>
        </section>

        {/* Intro & bilingual */}
        <section className="grid grid-cols-12 gap-grid-gutter mb-section-gap">
          <div className="col-span-12 md:col-start-3 md:col-span-7 flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <p className="font-work-sans text-body-lg text-primary leading-relaxed">
                Nesta edição, exploramos como a inteligência artificial está deixando de ser uma ferramenta de
                assistência para se tornar um agente autônomo. O que acontece quando os sistemas começam a tomar
                decisões sem supervisão humana direta?
              </p>
            </div>
            <div className="flex-1 opacity-70 border-l border-outline-variant pl-8">
              <p className="font-work-sans text-body-md text-secondary leading-relaxed">
                In this edition, we explore how artificial intelligence is shifting from being an assistive tool to an
                autonomous agent. What happens when systems start making decisions without direct human oversight?
              </p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-2 flex justify-start md:justify-end items-start pt-2">
            <div className="font-label-caps flex items-center gap-2 text-label-caps">
              <span className="text-on-tertiary-container">PT</span>
              <span className="text-outline-variant">|</span>
              <span className="text-secondary hover:text-on-tertiary-container cursor-pointer transition-colors">EN</span>
            </div>
          </div>

          {/* Ad slot */}
          <div className="col-span-12 md:col-start-3 md:col-span-7 mt-stack-md">
            <div
              className="w-full h-24 bg-surface-container-low border border-dashed border-outline-variant flex items-center justify-center"
              style={{ borderWidth: '1px' }}
            >
              <span className="font-label-caps text-secondary text-[10px]">PUBLICIDADE / ADVERTISEMENT</span>
            </div>
          </div>
        </section>

        {/* Content feed */}
        <section className="grid grid-cols-12 gap-grid-gutter">
          <div className="col-span-12 md:col-start-3 md:col-span-7 flex flex-col gap-8">
            {summaryCards.map((card, idx) => (
              <Fragment key={card.id}>
                {/* Mid ad between cards 2 and 3 */}
                {idx === 2 && (
                  <div
                    className="w-full h-48 bg-secondary-container border border-primary flex items-center justify-center my-stack-md"
                    style={{ borderWidth: '1px' }}
                  >
                    <div className="text-center">
                      <span className="font-label-caps text-on-secondary-fixed-variant text-[10px] block mb-2">
                        SPONSORED CONTENT
                      </span>
                      <p className="font-newsreader font-medium text-on-secondary-fixed text-lg">
                        Impulsione seu workflow com TechPulse Pro
                      </p>
                      <button className="mt-4 px-6 py-2 border border-primary font-label-caps text-[12px] uppercase hover:bg-primary hover:text-white transition-all">
                        Saiba Mais
                      </button>
                    </div>
                  </div>
                )}

                <article
                  className={`p-8 flex flex-col gap-4 ${
                    card.importance === 'high'
                      ? 'border-2 border-primary bg-surface-bright'
                      : 'border border-primary bg-surface'
                  }`}
                  style={{ borderWidth: card.importance === 'high' ? '2px' : '0.5pt' }}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`font-label-caps text-label-caps uppercase underline underline-offset-8 ${
                        card.importance === 'high'
                          ? 'decoration-on-tertiary-container decoration-2'
                          : 'decoration-outline-variant'
                      }`}
                    >
                      {card.category}
                    </span>
                    {card.importance === 'high' && (
                      <div className="flex gap-1">
                        {[1, 2, 3].map((i) => (
                          <span key={i} className="material-symbols-outlined text-primary text-sm">
                            star
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <h2 className="font-newsreader font-medium italic text-headline-md text-primary">{card.title}</h2>
                  <p className="font-work-sans text-body-md text-on-surface-variant">{card.body}</p>
                  <div
                    className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-center"
                    style={{ borderTopWidth: '1px' }}
                  >
                    <span className="font-label-caps text-[10px] text-secondary">Fonte: {card.source}</span>
                    <a
                      href="#"
                      className="font-label-caps text-[10px] text-primary hover:text-on-tertiary-container uppercase flex items-center gap-1 transition-colors"
                    >
                      Ler na fonte
                      <span className="material-symbols-outlined text-[14px]">north_east</span>
                    </a>
                  </div>
                </article>
              </Fragment>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="hidden md:block col-start-10 col-span-3">
            <div className="sticky top-28 border-l border-primary pl-6" style={{ borderLeftWidth: '1px' }}>
              <h3 className="font-label-caps text-label-caps uppercase mb-stack-md">Próximas Edições</h3>
              <ul className="flex flex-col gap-6">
                {upcomingEditions.map(({ date, title }) => (
                  <li key={date}>
                    <span className="font-label-caps text-[10px] text-secondary">{date}</span>
                    <p className="font-newsreader italic text-base leading-tight mt-1">{title}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <h3 className="font-label-caps text-label-caps uppercase mb-stack-sm">Newsletter</h3>
                <p className="font-work-sans text-sm text-secondary mb-4">Receba a síntese semanal no seu e-mail.</p>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-primary py-2 font-label-caps text-[10px] focus:outline-none placeholder:text-outline"
                    placeholder="SEU@EMAIL.COM"
                  />
                  <button className="absolute right-0 bottom-2" aria-label="Inscrever">
                    <span className="material-symbols-outlined text-primary">arrow_forward</span>
                  </button>
                </div>
              </div>

              <div className="mt-12">
                <Link
                  href="/archive"
                  className="font-label-caps text-[10px] uppercase text-on-tertiary-container hover:underline"
                >
                  ← Ver Arquivo
                </Link>
              </div>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  )
}
