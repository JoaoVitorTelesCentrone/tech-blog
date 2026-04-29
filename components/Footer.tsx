import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="bg-white dark:bg-[#1A1A1A] border-t border-[#1A1A1A] dark:border-stone-700"
      style={{ borderTopWidth: '0.5pt' }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 w-full max-w-editorial mx-auto gap-8">
        <div>
          <span className="text-lg font-bold text-[#1A1A1A] dark:text-stone-100 uppercase tracking-tighter">
            TechPulse Editorial
          </span>
          <p className="mt-4 font-newsreader text-sm uppercase tracking-widest text-stone-600 dark:text-stone-400">
            © 2024 TechPulse Editorial. Todos os direitos reservados.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 font-newsreader text-sm uppercase tracking-widest">
          <Link
            href="/privacy"
            className="text-stone-600 dark:text-stone-400 hover:text-accent-coral transition-colors"
          >
            Política de Privacidade
          </Link>
          <Link
            href="/terms"
            className="text-stone-600 dark:text-stone-400 hover:text-accent-coral transition-colors"
          >
            Termos de Uso
          </Link>
        </div>

        <div className="flex gap-4">
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:opacity-70 transition-opacity">
            rss_feed
          </span>
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:opacity-70 transition-opacity">
            alternate_email
          </span>
        </div>
      </div>
    </footer>
  )
}
