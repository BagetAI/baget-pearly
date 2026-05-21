import type { Metadata } from "next";
import { Libre_Baskerville, Lato } from "next/font/google";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Pearly | Automate Your Independent Dental Practice",
  description: "The automation your practice actually uses. Patient self-booking, SMS recall, and automated insurance tracking for 1-4 chair clinics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${libreBaskerville.variable} ${lato.variable}`}>
      <body className="bg-cream text-sepia font-sans antialiased min-h-screen">
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
