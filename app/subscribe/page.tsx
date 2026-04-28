import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SubscribePage() {
  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col">
        {/* Hero & Form */}
        <section className="grid grid-cols-12 gap-grid-gutter px-6 md:px-grid-margin py-section-gap max-w-editorial mx-auto w-full">
          {/* Left metadata */}
          <div className="col-span-12 md:col-span-2 flex flex-col gap-4 border-l border-primary pt-2 pl-4 mb-8 md:mb-0">
            <span className="font-label-caps text-label-caps uppercase text-primary">Nº 047</span>
            <span className="font-label-caps text-label-caps uppercase text-secondary">EDITION 2026</span>
          </div>

          {/* Content column */}
          <div className="col-span-12 md:col-span-7 flex flex-col gap-stack-md">
            <h1 className="font-newsreader font-semibold text-primary text-3xl sm:text-5xl md:text-display-xl max-w-2xl">
              Subscribe to Morning Report
            </h1>
            <p className="font-work-sans text-body-lg text-on-surface-variant max-w-xl">
              Join our exclusive circle of readers for a curated deep dive into the intersection of technology, human
              logic, and the future of artificial intelligence.
            </p>

            {/* Subscription form */}
            <div className="mt-stack-md p-8 border border-primary bg-surface-bright max-w-lg" style={{ borderWidth: '1px' }}>
              <form className="flex flex-col gap-8">
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-label-caps text-label-caps uppercase text-primary">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="bg-transparent border-t-0 border-l-0 border-r-0 border-b border-primary px-0 py-2 focus:ring-0 focus:border-on-tertiary-container font-work-sans text-body-md text-primary placeholder-outline-variant"
                    placeholder="email@domain.com"
                  />
                </div>

                {/* Language */}
                <div className="flex flex-col gap-4">
                  <span className="font-label-caps text-label-caps uppercase text-primary">Preferred Language</span>
                  <div className="flex flex-col gap-3">
                    {[
                      { id: 'lang-en', value: 'en', label: 'English', defaultChecked: true },
                      { id: 'lang-pt', value: 'pt', label: 'Português', defaultChecked: false },
                      { id: 'lang-bi', value: 'bilingual', label: 'Both (Bilingual Edition)', defaultChecked: false },
                    ].map(({ id, value, label, defaultChecked }) => (
                      <label key={id} htmlFor={id} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          id={id}
                          type="radio"
                          name="lang"
                          value={value}
                          defaultChecked={defaultChecked}
                          className="w-4 h-4 text-primary border-primary focus:ring-offset-0 focus:ring-0 accent-primary"
                        />
                        <span className="font-work-sans text-body-md text-on-surface group-hover:text-on-tertiary-container transition-colors">
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="flex flex-col gap-4">
                  <button
                    type="submit"
                    className="bg-primary text-on-primary py-4 px-8 font-label-caps text-label-caps uppercase tracking-widest hover:bg-on-tertiary-container transition-colors duration-300"
                  >
                    Subscribe
                  </button>
                  <p className="font-work-sans text-sm italic text-secondary text-center">
                    We will send a confirmation email.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right image column */}
          <div className="col-span-12 md:col-span-3 flex flex-col gap-8">
            <div className="aspect-[3/4] border border-primary relative overflow-hidden" style={{ borderWidth: '1px' }}>
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzYSHuxlVq6hRgiGV-AzRaVNoOlRuC-Hi6npSlic4Pkhs85tC9VKlKoaDjXcRZluxaVdT3s2COEjceCQbFz5LxMQUIVpb5d-eDg_ibLReWRQhb1N6yUEUkEfYnO8h-XA3zwPFpxocn-Qb3gMo6DSfEOem2n8uOhgIs3sc7ql4kqYJLewRhAIgjwAh0sJ_XiYIxw-jzvS3SXbfdkusUkGoWsbZ022dFhpfBEDh9Y3o9t0YRZLRJ1oDB4Ayk92K-h-ivhRujkSkE3WE"
                alt="Monochrome minimalist tech architecture"
                fill
                className="object-cover grayscale brightness-90"
              />
              <div className="absolute inset-0 border border-white/20 pointer-events-none" style={{ borderWidth: '0.5pt' }} />
            </div>
            <div className="border-t border-primary pt-4" style={{ borderTopWidth: '1px' }}>
              <p className="font-work-sans text-sm text-secondary uppercase tracking-tighter italic">
                &ldquo;Precision is the hallmark of the digital era.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* Benefits bento */}
        <section className="px-6 md:px-grid-margin pb-section-gap max-w-editorial mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-primary" style={{ borderTopWidth: '1px' }}>
            {[
              {
                icon: 'auto_awesome',
                title: 'Daily Intelligence',
                body: 'Synthesized analysis of global technological shifts delivered to your inbox at 06:00 AM.',
              },
              {
                icon: 'history_edu',
                title: 'Editorial Rigor',
                body: "Long-form journalism that respects your time and intelligence. No clickbait, just substance.",
              },
              {
                icon: 'lock',
                title: 'Privacy First',
                body: 'Your data remains your own. We do not track, sell, or share subscriber information. Ever.',
              },
            ].map(({ icon, title, body }, i) => (
              <div
                key={title}
                className={`p-8 flex flex-col gap-4 ${
                  i < 2
                    ? 'border-b md:border-b-0 md:border-r border-primary'
                    : ''
                }`}
                style={{ borderWidth: '1px' }}
              >
                <span className="material-symbols-outlined text-on-tertiary-container">{icon}</span>
                <h3 className="font-newsreader font-medium text-headline-md">{title}</h3>
                <p className="font-work-sans text-body-md text-on-surface-variant">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
