import '@/styles/globals.css'
import { Unbounded } from 'next/font/google'
import Layout from '@/components/Layout'
import { CartProvider } from '@/context/CartContext'

const unbounded = Unbounded({ 
  subsets: ['latin'],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
})

export const metadata = {
  title: 'Re:U — Re you at University',
  description: 'A sustainable fashion platform for TU students',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={unbounded.className}>
        <CartProvider>
          <Layout>{children}</Layout>
        </CartProvider>
      </body>
    </html>
  )
}
