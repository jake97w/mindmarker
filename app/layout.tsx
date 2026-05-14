import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mindmarker.app'),
  title: "MindMarker — Alzheimer's Educational Tool",
  description:
    'An educational tool that analyzes language samples for early indicators of cognitive change. Built for learners, families, and clinicians.',
  openGraph: {
    title: "MindMarker — Alzheimer's Educational Tool",
    description:
      'An educational tool that analyzes language samples for early indicators of cognitive change.',
    url: 'https://mindmarker.app',
    siteName: 'MindMarker',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "MindMarker — Alzheimer's Educational Tool",
    description:
      'An educational tool that analyzes language samples for early indicators of cognitive change.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
