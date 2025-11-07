"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  const { status } = useSession();
  const router = useRouter();

  // If already logged in → go straight to dashboard
  useEffect(() => {
    if (status === "authenticated") router.push("/dashboard");
  }, [status, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-indigo-50 via-sky-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      <section className="w-full max-w-6xl px-4 py-20 text-center space-y-10 sm:px-6 lg:px-8 overflow-hidden">
        {/* Hero Section */}
         <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-6xl font-extrabold tracking-tight"
          >
            💠 FinWise
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400"
          >
            Your AI-powered personal finance coach. Track your expenses,
            uncover spending habits, and get actionable insights — powered by
            Gemini AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-4 pt-2"
          >
            <Link
              href="/signup"
              className="rounded-xl bg-slate-900 text-white px-8 py-3 text-base font-semibold shadow-sm transition hover:bg-slate-800 active:scale-95"
            >
              Get Started
            </Link>
            <Link
              href="/signin"
              className="rounded-xl border border-slate-300 bg-white/70 px-8 py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 active:scale-95"
            >
              Sign In
            </Link>
          </motion.div>
        </motion.div>
      

        {/* Features Section */}
          <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.15 }}
          className="grid gap-6 pt-16 md:grid-cols-3"
        >
          {[
            {
              icon: "💹",
              title: "Smart Insights",
              desc: "FinWise uses AI to detect spending patterns and reveal intelligent ways to save more efficiently.",
            },
            {
              icon: "📊",
              title: "Visual Analytics",
              desc: "Transform your financial data into stunning, easy-to-read charts and insights dashboards.",
            },
            {
              icon: "💰",
              title: "Budget Goals",
              desc: "Set personalized financial targets and track your progress toward smarter money habits.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition hover:shadow-md hover:-translate-y-1"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-slate-800">
                {f.title}
              </h3>
              <p className="text-sm text-slate-600">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      

        {/* Bottom CTA */}
    <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="pt-20 space-y-4"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Start mastering your finances today.
          </h2>
          <Link
            href="/signup"
            className="inline-block rounded-xl bg-slate-900 text-white px-8 py-3 text-base font-semibold shadow-sm transition hover:bg-slate-800 active:scale-95"
          >
            Create a Free Account
          </Link>
        </motion.div>    
      </section>
    </main>
  );
}