import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WAYFARE — Compare. Plan. Book. Save.",
  description: "AI-powered travel intelligence platform with 12 tools to help you find the best flights, hotels, and experiences. Plan smarter trips and save money.",
  keywords: "travel, flights, hotels, trip planning, travel intelligence, AI travel assistant, vacation planner",
  authors: [{ name: "WAYFARE" }],
  openGraph: {
    title: "WAYFARE — Compare. Plan. Book. Save.",
    description: "AI-powered travel intelligence platform with 12 tools to help you find the best flights, hotels, and experiences.",
    type: "website",
    locale: "en_US",
    siteName: "WAYFARE",
  },
  twitter: {
    card: "summary_large_image",
    title: "WAYFARE — Compare. Plan. Book. Save.",
    description: "AI-powered travel intelligence platform with 12 tools to help you find the best flights, hotels, and experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
