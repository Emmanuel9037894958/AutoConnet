
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "AutoConnet | Find Skilled Professionals",
    template: "%s | AutoConnet",
  },
  description:
    "AutoConnet connects customers with skilled professionals and service providers across Anambra State, Nigeria.",
  applicationName: "AutoConnet",
  openGraph: {
    siteName: "AutoConnet",
    title: "AutoConnet | Find Skilled Professionals",
    description:
      "Discover skilled professionals and connect directly with service providers through AutoConnet.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
         <Preloader />
        <div className="flex flex-1 flex-col">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
