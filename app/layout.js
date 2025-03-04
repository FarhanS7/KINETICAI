import Header from "@/components/ui/header.jsx";
import { ThemeProvider } from "@/components/ui/theme-provider.jsx"; // Updated alias usage
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@node_modules/@clerk/themes/dist/themes/src";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* Header */}
            <Header />

            <main className="flex min-h-screen flex-col">{children}</main>

            {/* Footer */}
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto flex items-center justify-center text-gray-200">
                <p>All rights reserved</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
