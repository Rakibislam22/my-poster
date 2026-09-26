import type { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

const hindSiliguri = Hind_Siliguri({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-bengali",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "আমার পোস্টার - AI চালিত রাজনৈতিক ও সামাজিক পোস্টার মেকার",
  description: "মাত্র কয়েক ক্লিকে তৈরি করুন দৃষ্টিনন্দন নির্বাচনী প্রচার, বিজয় দিবস, শোক প্রস্তাব ও শুভেচ্ছা পোস্টার। ১০০% সঠিক বাংলা ও প্রিন্ট-রেডি কোয়ালিটি।",
  keywords: ["Bangladeshi political poster", "poster maker", "election poster bangla", "বিজয় দিবস পোস্টার", "রাজনৈতিক পোস্টার"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
