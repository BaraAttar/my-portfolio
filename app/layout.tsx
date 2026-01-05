import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cairo } from 'next/font/google';
import "./globals.css";

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  weight: ['200', '300', '400', '600', '700', '1000'],
  variable: '--font-cairo',
});

export const metadata = {
  title: 'Baraa Attar | Portfolio',
  description: 'Full Stack Developer Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cairo.variable} body-light`}>
        {children}
      </body>
    </html>
  );
}
