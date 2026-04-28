'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useState } from 'react'

const navLinks = [
  { href: '/archive', label: 'Arquivo' },
  { href: '/subscribe', label: 'Assinar' },
  { href: '/about', label: 'Sobre' },
]

export default function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isHome = pathname === '/'

  return (
    <>
      {isHome && (
        <div className="w-full bg-accent-coral text-white py-2 px-4 text-center sticky top-0 z-[60]">
          <p className="font-label-caps text-[10px] uppercase tracking-[0.2em]">
            Últimas Notícias: A Inteligência Artificial Generativa alcança novos marcos na tradução editorial em tempo real.
          </p>
        </div>
      )}

      <nav
        className={`sticky ${isHome ? 'top-[32px]' : 'top-0'} z-50 bg-white dark:bg-[#1A1A1A] border-b border-[#1A1A1A] dark:border-stone-700`}
        style={{ borderBottomWidth: '0.5pt' }}
      >
        <div className="flex justify-between items-center px-8 py-4 w-full max-w-editorial mx-auto">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-2xl font-bold uppercase tracking-tighter text-[#1A1A1A] dark:text-stone-100"
            >
              TechPulse
            </Link>
            <div className="hidden md:flex gap-6 items-center">
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`font-newsreader italic text-lg transition-colors duration-300 ${
                      isActive
                        ? 'text-[#1A1A1A] dark:text-white border-b-2 border-accent-coral'
                        : 'text-stone-500 dark:text-stone-400 hover:bg-[#1A1A1A] hover:text-white px-2 py-1'
                    }`}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-6">

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="material-symbols-outlined text-[#1A1A1A] dark:text-stone-100 cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="Alternar modo escuro"
            >
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </button>

            <button
              className="md:hidden material-symbols-outlined text-[#1A1A1A] dark:text-stone-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileOpen ? 'close' : 'menu'}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            className="md:hidden bg-white dark:bg-[#1A1A1A] border-t border-[#1A1A1A] dark:border-stone-700 px-8 py-6 flex flex-col gap-4"
            style={{ borderTopWidth: '0.5pt' }}
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`font-newsreader italic text-lg ${
                  pathname === href
                    ? 'text-[#1A1A1A] dark:text-white border-b border-accent-coral pb-1'
                    : 'text-stone-500 dark:text-stone-400'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
