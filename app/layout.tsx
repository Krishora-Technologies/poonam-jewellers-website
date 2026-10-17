import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Poonam Jewellers | Fine Gold, Diamond, Platinum & Silver Jewellery',
  description:
    'Discover timeless BIS hallmarked gold, certified diamonds, platinum and silver jewellery at Poonam Jewellers Dombivli. Bespoke craftsmanship and heirlooms.',
  keywords: [
    'Poonam Jewellers',
    'Poonam Jewellers Dombivli',
    'Jewellery store Dombivli East',
    'Gold Jewellery',
    'Diamond Jewellery',
    'Platinum Jewellery',
    'Silver Jewellery',
    'BIS Hallmarked',
    'Bridal Jewellery',
  ],
  authors: [{ name: 'Poonam Jewellers' }],
  creator: 'Poonam Jewellers',
  publisher: 'Poonam Jewellers',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/icon-light-32x32.png',
        sizes: '32x32',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        sizes: '32x32',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    title: 'Poonam Jewellers | Jewellery that holds a feeling',
    description:
      'Timeless gold, diamond, platinum and silver jewellery, crafted with trust and care in Dombivli.',
    siteName: 'Poonam Jewellers',
    locale: 'en_IN',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#171613',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
