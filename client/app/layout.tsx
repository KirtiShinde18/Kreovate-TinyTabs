import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kreovate - TinyTabs 🌸",
  description: "Let your saved tabs flutter beautifully.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col">

        {/* 🌄 Global Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/KreovateBg.jpg')",
          }}
        ></div>

        {/* 🌫️ Dark overlay (important for readability) */}
        <div className="absolute inset-0"></div>

        {/* 💻 App content */}
        <div className="relative z-10">

        <div>Mode: {process.env.NEXT_PUBLIC_ENV}</div>
        <ReduxProvider>
          <ToastContainer/>
          {children}
        </ReduxProvider>

        </div>
        
      </body>
    </html>
  );
}
