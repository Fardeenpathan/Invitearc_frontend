// import DisableInspect from "@/app/components/DisableInspect";
import { Geist, Geist_Mono } from "next/font/google";
import "./hitched-globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://hitched-clientdemo.vercel.app/"),

  openGraph: {
    title: "Dhiraj Weds Ritika",
    description: "Come celebrate love, laughter & happily ever after with us!",
    url: "https://hitched-clientdemo.vercel.app/",
    siteName: "InviteArc",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Dhiraj Weds Ritika",
      },
    ],
    type: "website",
  },


  twitter: {
    card: "summary_large_image",
    title: "Dhiraj Weds Ritika",
    description: "Come celebrate love, laughter & happily ever after with us!",
    images: ["/og.jpg"],
  },

 other: {
    "og:image:secure_url": "https://hitched-clientdemo.vercel.app/og.jpg",
    "og:image:type": "image/jpeg",
  },


};

export default function RootLayout({
  children,
}) {
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