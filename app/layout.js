import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import { SpeedInsights } from "@vercel/speed-insights/next"
// import { Analytics } from "@vercel/analytics/react"
import ProductsProvider from "@/context/ProductsProvider";
import HeroAnimationProvider from "@/context/HeroAnimationProvider";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "PriceWave - Price Tracker for Amazon",
  description: "Track prices across top e-commerce sites and get instant alerts on price drops. Save money effortlessly and make smart shopping decisions today",
  icons: {
    icon: '/assets/icons/logo.svg'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://m.media-amazon.com" />
        <Script defer src="https://cloud.umami.is/script.js" data-website-id="0b269a99-b430-4e9f-99a5-07f47e320741"></Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <SessionWrapper>
        <ProductsProvider>
        <HeroAnimationProvider>
          <Navbar/>

          <main className="max-w-[1440px] min-h-[calc(100vh-64px)] mx-auto px-1">

          {children}
          
          </main>

          <Footer/>
        </HeroAnimationProvider>
        </ProductsProvider>
        </SessionWrapper>

        <SpeedInsights />
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
