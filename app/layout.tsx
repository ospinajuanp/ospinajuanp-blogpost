import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minimalist Dark Blog",
  description: "A static blog built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="py-8">
          <div className="container flex justify-between items-center">
            <Link href="/" className="text-lg font-bold tracking-tight">
              ospinajuanp.
            </Link>
            <nav>
              {/* Add navigation items here if needed later */}
            </nav>
          </div>
        </header>

        <main className="flex-grow container py-8">
          {children}
        </main>

        <footer className="py-8 text-center text-sm text-[#a3a3a3]">
          <div className="container">
            {new Date().getFullYear()} ospinajuanp. Built with Next.js.
          </div>
        </footer>
      </body>
    </html>
  );
}
