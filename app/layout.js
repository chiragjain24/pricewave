import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import { SpeedInsights } from "@vercel/speed-insights/next"

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
  title: "PriceWise",
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
          <Navbar/>

          <main className="max-w-[1440px] min-h-[calc(100vh-64px)] mx-auto">

          {children}
          
          </main>

          <Footer/>
        </SessionWrapper>
        <SpeedInsights />
      </body>
    </html>
  );
}
