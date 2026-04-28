import type { Metadata } from 'next'
import { Newsreader, Work_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-work-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TechPulse Editorial',
  description:
    'A digital-first editorial focused on the intersection of artificial intelligence, human ethics, and the pulse of technological shift.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${newsreader.variable} ${workSans.variable} bg-background text-on-background font-work-sans overflow-x-hidden`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
