"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const { status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") router.push("/dashboard");
  }, [status, router]);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
    setLoading(false);
  }

return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to access your FinWise dashboard
          </p>
        </div>

        {/* Sign-In Form */}
        <form
          onSubmit={handleSignIn}
          className="rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm space-y-4 transition hover:shadow-md"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl px-5 py-2 text-sm font-semibold shadow-sm transition active:scale-95 ${
              loading
                ? "bg-slate-400 text-white cursor-not-allowed"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>

          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/60 px-2 text-slate-500">or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 active:scale-95"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="h-4 w-4"
            />
            Continue with Google
          </button>
          <button
            type="button"
            className=" w-full flex items-center justify-center gap-2 rounded-xl border bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={async () => {
              const res = await fetch("/api/auth/demo", { method: "POST" });
              const data = await res.json();
              if (data.ok) {
                await signIn("credentials", {
                  email: data.demoEmail,
                  password: data.demoPassword,
                  callbackUrl: "/dashboard",
                });
              }
            }}
          >
            Try Demo
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="font-semibold text-slate-800 underline-offset-4 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}