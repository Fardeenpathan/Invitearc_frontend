import DisableInspect from "@/app/components/DisableInspect";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./laavan-globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://aura-demo-flame.vercel.app/"),

  openGraph: {
    title: "Harpreet & Ritika",
    description: "Join as they begin their forever. 8, 9 & 11 March 2026",
    url: "https://aura-demo-flame.vercel.app/",
    siteName: "InviteArc",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Harpreet & Ritika ",
      }, 
    ],
    type: "website",
  },


  twitter: {
    card: "summary_large_image",
    title: "Harpreet & Ritika",
    description: "Join as they begin their forever. 8, 9 & 11 March, 2026",
    images: ["/og.jpg"],
  },

 other: {
    "og:image:secure_url": "https://aura-demo-flame.vercel.app/og.jpg",
    "og:image:type": "image/jpg",
  },


};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <DisableInspect /> 
        {children}
        
      </body>
    </html>
  );
}