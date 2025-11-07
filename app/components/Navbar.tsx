"use client";


import Link from "next/link";
import { signOut, signIn, useSession } from "next-auth/react";


export default function Navbar() {
  const { data: session } = useSession();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 backdrop-blur-xl bg-white/70 supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/*Logo*/}
      <Link href="/" className="flex items-center gap-2 font-semibold  tracking-tight text-slate-800 transition hover:opacity-80">
        <span className="text-2xl">💠 </span>
        <span className="text-lg sm:text-xl font-bold">Finwise</span>
      </Link>
      <nav className="flex items-center gap-2  sm:gap-3">
        {session ? (
            <>
              <Link href="/dashboard" className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 active:scale-95">Dashboard</Link>
              <Link href="/insights" className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 active:scale-95">Insights</Link>
              <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-95" onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/signin" className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 active:scale-95">Sign In</Link>
              <Link href="/signup" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-95">Sign Up</Link>
            </>
        )}
      </nav>
      </div>
    </header>
  );
}