import type { Metadata } from "next";
import localFont from "next/font/local";
import { Ubuntu_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { PageTransition } from "@/components/PageTransition";

const googleSans = localFont({
  src: [
    {
      path: "../public/fonts/google-sans/GoogleSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/google-sans/GoogleSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/google-sans/GoogleSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/google-sans/GoogleSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/google-sans/GoogleSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/google-sans/GoogleSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/google-sans/GoogleSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/google-sans/GoogleSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

const ubuntuMono = Ubuntu_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const merriweather = localFont({
  src: [
    {
      path: "../public/fonts/merriweather/Merriweather-VariableFont_opsz,wdth,wght.ttf",
      style: "normal",
    },
    {
      path: "../public/fonts/merriweather/Merriweather-Italic-VariableFont_opsz,wdth,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-title",
  display: "swap",
});

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
      className={`${googleSans.variable} ${merriweather.variable} ${ubuntuMono.variable} ${gtStandard.variable}`}
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
