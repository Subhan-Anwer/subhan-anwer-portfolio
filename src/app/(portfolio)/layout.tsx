import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SanityLive } from "@/sanity/lib/live";
import JsonLd from "@/components/JsonLd";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "400", "700", "900"],
});

// UPDATE WHEN CUSTOM DOMAIN IS READY — replace with https://subhananwer.com
const SITE_URL = "https://subhan-anwer-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Subhan Anwer | Frontend & Website Developer - Next.js & React",
    template: "%s | Subhan Anwer",
  },

  description:
    "Subhan Anwer is a frontend developer in Karachi specializing in Next.js, React, and Tailwind CSS. Building fast, responsive, SEO-optimized websites.",

  keywords: [
    "Subhan Anwer",
    "frontend developer",
    "website development",
    "freelance web developer",
    "Next.js developer",
    "React developer",
    "Tailwind CSS",
    "Karachi web developer",
    "portfolio",
  ],

  authors: [{ name: "Subhan Anwer", url: SITE_URL }],
  creator: "Subhan Anwer",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Subhan Anwer Portfolio",
    title: "Subhan Anwer | Frontend & Website Developer - Next.js & React",
    description:
      "Expert in responsive, SEO-optimized websites using Next.js, Tailwind CSS, and TypeScript. Open to freelance projects and collaboration.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Subhan Anwer — Frontend & Website Developer portfolio banner",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Subhan Anwer | Frontend & Website Developer - Next.js & React",
    description:
      "Looking to hire a freelance frontend developer? Let's connect & build something amazing together.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased bg-black`}>
        <JsonLd />
        <main>
          <Navbar />
          {children}
          <Footer />
        </main>
        <SanityLive />
      </body>
    </html>
  );
}
