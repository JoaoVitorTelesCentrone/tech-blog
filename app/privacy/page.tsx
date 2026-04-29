import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Política de Privacidade | TechPulse Editorial',
  description: 'Política de privacidade e proteção de dados do TechPulse Editorial',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="w-full max-w-editorial mx-auto px-6 md:px-grid-margin pt-16 pb-section-gap">
        <div className="grid grid-cols-12 gap-grid-gutter">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 space-y-12">
            <section>
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-tertiary-container mb-4 block underline underline-offset-8">
                PRIVACIDADE
              </span>
              <h1 className="font-newsreader text-3xl sm:text-5xl md:text-display-xl mb-8">Política de Privacidade</h1>
              <p className="font-newsreader font-medium text-headline-md italic mb-12 text-secondary">
                Nosso compromisso com a transparência e a proteção dos seus dados pessoais.
              </p>
              <div className="border-b border-primary" style={{ borderBottomWidth: '0.5pt' }} />
            </section>

            <div className="space-y-10 font-work-sans text-body-lg text-on-surface">
              <section className="space-y-4">
                <h2 className="font-newsreader text-2xl font-semibold text-primary">1. Coleta de Dados</h2>
                <p>
                  O TechPulse Editorial prioriza a sua privacidade. Coletamos apenas as informações estritamente necessárias para a prestação dos nossos serviços, como o endereço de e-mail fornecido voluntariamente ao assinar a nossa newsletter (TechPulse Morning Report) ou os cookies essenciais de navegação.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-newsreader text-2xl font-semibold text-primary">2. Uso das Informações</h2>
                <p>
                  Os dados coletados (como o seu e-mail) são utilizados exclusivamente para o envio de nossas curadorias diárias e comunicações institucionais. Não vendemos, alugamos ou compartilhamos seus dados com terceiros para fins de marketing ou publicidade sem o seu consentimento explícito.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-newsreader text-2xl font-semibold text-primary">3. Cookies e Tecnologias de Rastreamento</h2>
                <p>
                  Utilizamos cookies analíticos e de desempenho estritamente para compreender como os visitantes interagem com o nosso site, medindo métricas de tráfego de forma anonimizada. Você pode desativar o uso de cookies diretamente nas configurações do seu navegador.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-newsreader text-2xl font-semibold text-primary">4. Segurança dos Dados</h2>
                <p>
                  Implementamos medidas técnicas e organizacionais de ponta para proteger as suas informações contra acesso não autorizado, alteração, divulgação ou destruição. Embora busquemos os mais altos padrões de segurança cibernética, lembramos que nenhum método de transmissão na internet é 100% impenetrável.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="font-newsreader text-2xl font-semibold text-primary">5. Direitos do Usuário</h2>
                <p>
                  Você possui o direito de solicitar o acesso, a correção ou a exclusão de qualquer dado pessoal seu armazenado por nós. Caso deseje cancelar a sua assinatura da newsletter, disponibilizamos um link de cancelamento imediato ao final de cada e-mail enviado.
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
