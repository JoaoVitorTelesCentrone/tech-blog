import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="w-full max-w-editorial mx-auto px-6 md:px-grid-margin pt-16 pb-section-gap">
        <div className="grid grid-cols-12 gap-grid-gutter">
          {/* Left margin metadata */}
          <div className="hidden lg:block col-span-2">
            <div className="sticky top-32 space-y-8">
              <div className="font-label-caps text-label-caps uppercase text-secondary">
                <p className="mb-2">Nº 047</p>
                <p className="mb-2">EDITION</p>
                <p>SPRING 2026</p>
              </div>
              <div className="w-12 border-t border-primary pt-4">
                <p className="font-label-caps text-[10px] leading-tight text-on-surface-variant">COLOPHON &amp; ARCHIVE</p>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="col-span-12 lg:col-span-7 space-y-section-gap">
            {/* Hero header */}
            <section>
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-tertiary-container mb-4 block underline underline-offset-8">
                MANIFESTO
              </span>
              <h1 className="font-newsreader text-3xl sm:text-5xl md:text-display-xl mb-8">Sobre o TechPulse</h1>
              <p className="font-newsreader font-medium text-headline-md italic mb-12 text-secondary">
                A digital-first editorial focused on the intersection of artificial intelligence, human ethics, and the
                pulse of technological shift.
              </p>
              <div className="fine-rule" />
            </section>

            {/* Two-column content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-grid-gutter">
              <div className="space-y-6">
                <h3 className="font-label-caps text-label-caps uppercase text-primary border-b border-outline-variant pb-2 inline-block">
                  The Vision
                </h3>
                <p className="font-work-sans text-body-lg text-on-surface">
                  TechPulse was born from a need for clarity in an era of algorithmic noise. We don&apos;t chase the
                  24-hour news cycle; we curate the shifts that will matter in 24 months. Our mission is to bridge the
                  gap between high-end print journalism and the immediacy of digital AI discourse.
                </p>
                <p className="font-work-sans text-body-md text-on-surface-variant">
                  O TechPulse nasceu da necessidade de clareza em uma era de ruído algorítmico. Não perseguimos o ciclo
                  de notícias de 24 horas; fazemos a curadoria das mudanças que importarão em 24 meses.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="font-label-caps text-label-caps uppercase text-primary border-b border-outline-variant pb-2 inline-block">
                  Curation &amp; Logic
                </h3>
                <p className="font-work-sans text-body-lg text-on-surface">
                  Our digest is powered by a proprietary blend of human intelligence and semantic analysis. We monitor
                  over 400 global sources—from research papers to deep-web technical forums—to extract the
                  &apos;pulse&apos; of the industry.
                </p>
                <p className="font-work-sans text-body-md text-on-surface-variant">
                  Nossa curadoria é alimentada por uma mistura proprietária de inteligência humana e análise semântica.
                  Monitoramos mais de 400 fontes globais para extrair o &apos;pulso&apos; da indústria.
                </p>
              </div>
            </div>

            {/* Editorial illustration */}
            <div className="relative w-full aspect-[21/9] bg-secondary-container overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIZLAKRmBHhaGJqnvPTc14_Oxw6gVk4pCujq0y7A554DW5LswFLUq4UfoQDTtRdvC-j8JMKe_c9ItT3T2lYKtUR5G9RXcIlTHc954min9MrjL30L-oxutEI2DHtAIgHxcq98rCdi7UCSStpuEpvIw449T9Ea10J7r7Df5KENk7pZzTnCStBMYBz6zt3_-TZ3sgPnyGUy66AwmT85jE6P4tq9RtTT9IW4fvdv3Uyz2HSLdIg6KIM2V9Y7dZVMT3ofzICyTZEriI9vQ"
                alt="Abstract digital landscape with glowing connections"
                fill
                className="object-cover grayscale opacity-80"
              />
              <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
              <div className="absolute bottom-4 left-4 font-label-caps text-[10px] text-white/70 tracking-widest uppercase">
                Visual representation of data flow Nº 001
              </div>
            </div>

            {/* Branding section */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start py-12">
              <div className="md:col-span-4 flex justify-center md:justify-start">
                <div className="border border-primary p-6 inline-block bg-white dark:bg-[#1A1A1A]" style={{ borderWidth: '0.5pt' }}>
                  <span className="font-newsreader font-semibold text-4xl md:text-[72px] leading-none">TP</span>
                  <div className="font-label-caps text-label-caps text-center mt-2 border-t border-primary pt-2">
                    EST. 2026
                  </div>
                </div>
              </div>
              <div className="md:col-span-8 space-y-4">
                <h4 className="font-newsreader font-medium text-headline-md">Bilingual Integrity</h4>
                <p className="font-work-sans text-body-md text-on-surface">
                  Language should not be a barrier to technological literacy. TechPulse is built as a truly bilingual
                  ecosystem, respecting the typographic nuances of both Portuguese and English. Every piece of analysis
                  is presented with structural parity.
                </p>
                <p className="font-work-sans text-body-md italic text-on-tertiary-container">
                  A linguagem não deve ser uma barreira para a alfabetização tecnológica.
                </p>
              </div>
            </section>
          </div>

          {/* Right margin pull quote */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="mt-48 pl-8 border-l border-outline-variant space-y-12">
              <blockquote className="font-newsreader font-medium italic text-headline-md leading-tight text-primary">
                &ldquo;The future is already here — it&apos;s just not evenly distributed yet.&rdquo;
              </blockquote>
              <cite className="block font-label-caps text-label-caps uppercase text-secondary not-italic">
                — William Gibson
              </cite>
              <div className="pt-24 space-y-4">
                <p className="font-label-caps text-label-caps uppercase text-primary underline underline-offset-4">
                  SOURCES WE TRUST
                </p>
                <ul className="font-work-sans text-body-md space-y-2 text-on-surface-variant">
                  <li>The Gradient</li>
                  <li>Wired UK</li>
                  <li>MIT Tech Review</li>
                  <li>ArXiv.org</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
