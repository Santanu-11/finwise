import "@/styles/globals.css";
import Navbar from "./components/Navbar";
import Providers from "./providers";


export const metadata = {
  title: "FinWise – AI Personal Finance Coach",
  description: "Track, analyze, and optimize spending with Gemini AI",
  icons:{
    icon: "/favicon.ico"
  }
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
  <html lang="en" className="scroll-smooth">
    <body className="min-h-screen bg-linear-to-br from-indigo-50 via-sky-50 to-teal-50 text-slate-900 antialiased dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 dark:text-slate-100 transition-colors duration-300">
         <Providers>
          <div className="flex min-h-screen flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 w-full">
              <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>

            {/* Footer (optional for future scalability) */}
            <footer className="border-t border-slate-200/50 bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
              <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-slate-500">
                © {new Date().getFullYear()} FinWise. All rights reserved.
              </div>
            </footer>
          </div>
        </Providers>
   
      
    </body>
  </html>
  );
}