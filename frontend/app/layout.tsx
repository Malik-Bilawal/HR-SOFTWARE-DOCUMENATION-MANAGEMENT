import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@users/components/Navbar"; // Import the Navbar

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HRMS Documentation Portfolio",
  description: "Learn about our HRMS modules and features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        {/* Place Navbar here so it sits at the top of the app */}
        <Navbar /> 
        
        {/* 'children' represents the active page (like your homepage) */}
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}