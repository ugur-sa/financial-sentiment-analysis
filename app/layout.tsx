import type { Metadata } from 'next'
import './globals.css'
import { GeistSans } from 'geist/font/sans';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Yahoo Finance Sentiment Analysis',
  description: 'Yahoo Finance Sentiment Analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        {children}
      </body>
    </html>
  )
}
