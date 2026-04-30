// @ts-nocheck
import type { Metadata } from 'next';
import { Libre_Baskerville, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-source',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Core Method — San Francisco, CA',
  description: 'Precision Pilates studio in San Francisco. Reformer, mat, tower, and private sessions for every body.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${libreBaskerville.variable} ${sourceSans.variable}`}>{children}</body>
    </html>
  );
}
