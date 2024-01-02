import { ThemeProvider } from '@/components/providers/theme-provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jotion',
  description: 'Clone of Notion.so',
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme:light)",
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
      {
        media: "(prefers-color-scheme:dark)",
        url: "/favicon.ico",
        href: "/favicon.ico",
      }

    ]
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
          storageKey='notion-theme-2'
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
