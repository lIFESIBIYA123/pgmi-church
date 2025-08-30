import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import { LayoutFrame } from "@/components/layout/layout-frame";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PGMI Church - Spreading God's Love",
  description: "Join us at PGMI Church for worship, community, and spiritual growth. Experience God's love through our ministries, sermons, and events.",
  keywords: "church, worship, ministry, community, faith, PGMI, sermons, events",
  authors: [{ name: "PGMI Church" }],
  openGraph: {
    title: "PGMI Church - Spreading God's Love",
    description: "Join us for worship, community, and spiritual growth",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PGMI Church - Spreading God's Love",
    description: "Join us for worship, community, and spiritual growth",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <AuthSessionProvider>
            <Navbar />
            <LayoutFrame>
              {children}
            </LayoutFrame>
            <Footer />
          </AuthSessionProvider>
        </div>
      </body>
    </html>
  );
}
