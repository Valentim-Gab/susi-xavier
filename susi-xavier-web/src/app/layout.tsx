import Header from '@/components/header/header'
import HeaderMobile from '@/components/header/header-mobile'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Raleway } from 'next/font/google'
import './globals.scss'

const poppins = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
})

export const metadata = {
  title: 'Susi Xavier',
  description: 'Site de apresentação de Susana Xavier',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <HeaderMobile />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
