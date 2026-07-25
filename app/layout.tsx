import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { PageTransition } from "@/components/PageTransition";

const gtStandard = localFont({
  src: [
    {
      path: "../public/fonts/gt-standard/GT-Standard-L-Standard-Regular-Trial.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/gt-standard/GT-Standard-L-Standard-Medium-Trial.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-gt-standard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carl Stratton · Product, Design, Applied AI",
  description:
    "Carl Stratton — Product, Design, Applied AI. Portfolio showcasing product design and strategy case studies.",
  metadataBase: new URL("https://www.ccaarrll.com"),
  openGraph: {
    title: "Carl Stratton · Product, Design, Applied AI",
    description:
      "Carl Stratton — Product, Design, Applied AI. Portfolio showcasing product design and strategy case studies.",
    url: "https://www.ccaarrll.com",
    siteName: "Carl Stratton",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={gtStandard.variable}
    >
      <head>
        <link rel="preconnect" href="https://embed.figma.com" />
        <link rel="preconnect" href="https://www.figma.com" />
        <link rel="dns-prefetch" href="https://embed.figma.com" />
      </head>
      <body suppressHydrationWarning>
        <PageTransition>{children}</PageTransition>
        <Analytics />
      </body>
    </html>
  );
}
