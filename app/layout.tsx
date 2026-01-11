import type { Metadata } from "next";
import { Cairo } from 'next/font/google';
import "./globals.css";
import Header from "./components/Header";
import ParticleScene from "./components/ParticleScene";
import Theme from "./components/Theme";
import localFont from 'next/font/local';
import SmoothScroll from "./components/SmoothScroll";


const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  weight: ['200', '300', '400', '600', '700', '1000'],
  variable: '--font-cairo',
});

const neueMontreal = localFont({
  src: [
    {
      path: '../fonts/ppneuemontreal-thin.woff',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/ppneuemontreal-book.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/ppneuemontreal-italic.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/ppneuemontreal-medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/ppneuemontreal-semibolditalic.woff',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../fonts/ppneuemontreal-bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-neue',
  display: 'swap',
});

export const metadata: Metadata = {
  // metadataBase: new URL('https://baraa-attar.com'),
  title: 'Baraa Attar | Portfolio',
  description: 'Full Stack Developer Portfolio',
  openGraph: {
    title: 'Baraa Attar | Portfolio',
    description: 'Full Stack Developer Portfolio',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${cairo.variable} ${neueMontreal.variable} body-dark`}>
        {/* <main> */}

        {/* تفعيل السكرول الناعم */}
        <SmoothScroll />

        {/* مشهد الـ Three.js في الخلفية */}
        <ParticleScene />

        {/* الأقنعة العلوية والسفلية */}
        <div className="mask">
          <div className="mask_top"></div>
          <div className="mask_right"></div>
          <div className="mask_left"></div>
          <div className="mask_bottom"></div>
        </div>

        {/* الإطار المحيط */}
        <div className="frame">
          <div className="frame_line frame_line-left"></div>
          <div className="frame_line frame_line-right"></div>
          <div className="frame_line frame_line-top"></div>
          <div className="frame_line frame_line-bottom"></div>
        </div>

        {/* theme*/}
        <Theme />

        <div className="content" >
          {/* الهيدر */}
          <Header />

          {/* يمكنك إضافة محتوى إضافي هنا */}
          <main>
            {children}
          </main>

        </div>
        {/* </main> */}
      </body>
    </html>
  );
}
