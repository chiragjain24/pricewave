import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import ProductsProvider from "@/context/ProductsProvider";

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
  title: "PriceWave",
  description: "Track product prices effortlessly and save money on your online shopping",
  icons: {
    icon: '/assets/icons/logo.svg'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <SessionWrapper>
        <ProductsProvider>
          <Navbar/>

          <main className="max-w-[1440px] min-h-[calc(100vh-64px)] mx-auto px-1">

          {children}
          
          </main>

          <Footer/>
        </ProductsProvider>
        </SessionWrapper>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
