"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const PawIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M6.5 14c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2z" />
    <path d="M17.5 14c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2z" />
    <path d="M9 10c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1s1 .4 1 1v2c0 .6-.4 1-1 1z" />
    <path d="M15 10c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1s1 .4 1 1v2c0 .6-.4 1-1 1z" />
    <path d="M8 14s-1 1-1 3c0 2.5 2 4 5 4s5-1.5 5-4c0-2-1-3-1-3" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="4" y="11" width="16" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });

    if (res?.error) {
      setError("Correo o contraseña incorrectos.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-cream text-ink">
      {/* ── Panel de marca ──────────────────────────── */}
      <div className="hidden lg:flex relative overflow-hidden bg-brand items-center justify-center p-16">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/3 translate-x-1/3 opacity-10 bg-accent" />

        <div className="relative z-10 max-w-md animate-fade-up">
          <Link href="/" className="inline-flex items-center gap-2 mb-10 text-white">
            <span className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center"><PawIcon /></span>
            <span className="font-display text-xl font-bold">VetCare</span>
          </Link>

          <h1 className="font-display text-4xl font-bold text-white mb-5" style={{ lineHeight: 1.15 }}>
            El cuidado de tu mascota, siempre a tu alcance.
          </h1>
          <p className="text-white/75 leading-relaxed mb-10">
            Inicia sesión para gestionar citas, expedientes médicos y pedidos desde un solo lugar.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {["M", "C", "S", "P"].map((i, idx) => (
                <div key={i} className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-brand ${idx % 2 === 0 ? "bg-accent" : "bg-brand-light"}`}>
                  {i}
                </div>
              ))}
            </div>
            <p className="text-xs text-white/70">+500 mascotas felices ya confían en VetCare</p>
          </div>
        </div>
      </div>

      {/* ── Formulario ──────────────────────────────── */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm animate-fade-up">
          <Link href="/" className="lg:hidden inline-flex items-center gap-2 mb-10 text-brand">
            <span className="w-9 h-9 rounded-xl bg-brand/10 flex items-center justify-center"><PawIcon /></span>
            <span className="font-display text-xl font-bold">VetCare</span>
          </Link>

          <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-brand">Bienvenido de nuevo</p>
          <h2 className="font-display text-3xl font-bold mb-2 text-ink">Iniciar sesión</h2>
          <p className="text-sm text-ink-soft mb-8">
            ¿Aún no tienes cuenta?{" "}
            <Link href="/register" className="font-semibold text-brand hover:underline">
              Regístrate gratis
            </Link>
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <Input
              type="email"
              label="Correo"
              placeholder="tucorreo@ejemplo.com"
              icon={<MailIcon />}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              label="Contraseña"
              placeholder="••••••••"
              icon={<LockIcon />}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-sm rounded-xl px-4 py-3 bg-red-50 text-red-600 border border-red-100">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" loading={loading} className="w-full mt-2">
              Entrar
            </Button>
          </form>

          <p className="text-xs text-ink-muted text-center mt-8">
            Al continuar aceptas nuestros términos y aviso de privacidad.
          </p>
        </div>
      </div>
    </main>
  );
}
