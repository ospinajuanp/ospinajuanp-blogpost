import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Image from 'next/image';
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ospinajuanp-blogpost.vercel.app'),
  title: {
    default: "OspinaJuanP Blog",
    template: "%s | OspinaJuanP"
  },
  description: "Este blog nace como un espacio para compartir mi crecimiento en la tecnología. Apuntes del SENA, conceptos y construcción de conocimiento en público.",
  keywords: ["Next.js", "Blog", "SENA", "Tecnología", "Desarrollo Web", "OspinaJuanP"],
  authors: [{ name: "OspinaJuanP" }],
  creator: "OspinaJuanP",
  verification: {
    google: "FDuqDintsq-yBUwCZJdsZFB4zDzsj_5rA7gz806GZg8",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    title: "OspinaJuanP Blog",
    description: "Espacio para compartir mi crecimiento en la tecnología. Apuntes, conceptos y construcción de conocimiento en público.",
    siteName: "OspinaJuanP Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "OspinaJuanP Blog",
    description: "Espacio para compartir mi crecimiento en la tecnología.",
    creator: "@ospinajuanp",
  },
  alternates: {
    canonical: "/",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" themes={['dark', 'secondary']} enableSystem={false}>
          <header className="py-8">
            <div className="container flex justify-between items-center">
              <Link href="/" className="flex items-center gap-1">
                <Image src="/favicon.ico" alt="Logo" width={50} height={50} className="logo-image" />
                <div className={`logo-text ${sora.className}`}>
                  <span className="logo-text-title">
                    Juan Pablo
                  </span>
                  <span className="logo-text-subtitle">
                    Ospina Restrepo
                  </span>
                </div>
              </Link>
              <nav className="nav-horizontal">
                <ThemeToggle />
              </nav>
            </div>
          </header>

          <main className="flex-grow container py-8">
            {children}
          </main>

          <footer className="py-8 text-center text-sm text-[var(--accent)]">
            <div className="container">
              {new Date().getFullYear()} ospinajuanp. Built with Next.js.
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
