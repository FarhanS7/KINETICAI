import Header from "@/components/ui/header.jsx";
import { ThemeProvider } from "@/components/ui/theme-provider.jsx"; // Updated alias usage
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
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
    </>
  );
}
