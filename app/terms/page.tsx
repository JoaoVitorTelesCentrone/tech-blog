import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Termos de Uso | TechPulse Editorial',
  description: 'Termos de uso e condições do TechPulse Editorial',
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="w-full max-w-editorial mx-auto px-6 md:px-grid-margin pt-16 pb-section-gap">
        <div className="grid grid-cols-12 gap-grid-gutter">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 space-y-12">
            <section>
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-tertiary-container mb-4 block underline underline-offset-8">
                LEGAL
              </span>
              <h1 className="font-newsreader text-3xl sm:text-5xl md:text-display-xl mb-8">Termos de Uso</h1>
              <p className="font-newsreader font-medium text-headline-md italic mb-12 text-secondary">
                Condições gerais para a utilização do conteúdo automatizado e curadoria do TechPulse Editorial.
              </p>
              <div className="border-b border-primary" style={{ borderBottomWidth: '0.5pt' }} />
            </section>

            <div className="space-y-10 font-work-sans text-body-lg text-on-surface">
              <section className="space-y-4">
                <h2 className="font-newsreader text-2xl font-semibold text-primary">1. Aceitação dos Termos</h2>
                <p>
                  Ao acessar e utilizar o TechPulse Editorial, você concorda com os presentes Termos de Uso. Caso não concorde com alguma condição, solicitamos que não utilize nossos serviços.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-newsreader text-2xl font-semibold text-primary">2. Conteúdo Gerado por Inteligência Artificial</h2>
                <p>
                  Todo o conteúdo editorial publicado no TechPulse é gerado, revisado ou traduzido com o auxílio de sistemas de Inteligência Artificial. Apesar do nosso esforço para garantir a precisão e coerência, não garantimos a veracidade absoluta ou exatidão técnica irrepreensível de dados gerados de forma autônoma.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-newsreader text-2xl font-semibold text-primary">3. Propriedade Intelectual</h2>
                <p>
                  A estrutura, design, código-fonte e a curadoria dos conteúdos pertencem ao TechPulse Editorial. A reprodução parcial ou total dos textos gerados é permitida e incentivada, desde que devidamente citada a fonte original (TechPulse) e acompanhada de um link direto para a publicação.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-newsreader text-2xl font-semibold text-primary">4. Modificações no Serviço</h2>
                <p>
                  O TechPulse Editorial reserva-se o direito de modificar ou descontinuar, temporária ou permanentemente, o serviço de postagens automatizadas com ou sem aviso prévio. Não nos responsabilizamos por eventuais perdas derivadas de interrupções na periodicidade do site.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-newsreader text-2xl font-semibold text-primary">5. Limitação de Responsabilidade</h2>
                <p>
                  Os artigos têm fins informativos e jornalísticos e não constituem aconselhamento profissional, financeiro ou técnico. O usuário assume total responsabilidade por decisões tomadas com base em nossos textos.
                </p>
              </section>
            </div>
            
            <p className="font-label-caps text-label-caps uppercase text-secondary mt-16 pt-8 border-t border-outline-variant inline-block">
              Última atualização: {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
