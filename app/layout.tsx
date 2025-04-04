import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DataProvider } from "@/lib/data/data-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Tech Logistics Blog",
   description: "Blog sobre tecnologia e logística",
   generator: "v0.dev",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="pt-BR" suppressHydrationWarning>
         <body className={inter.className}>
            <ThemeProvider
               attribute="class"
               defaultTheme="dark"
               enableSystem
               disableTransitionOnChange
            >
               <FirebaseProvider>
                  <DataProvider>
                     {children}
                     <Toaster />
                  </DataProvider>
               </FirebaseProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}

import "./globals.css";
import { FirebaseProvider } from "@/lib/firebase/firebase-provider";
