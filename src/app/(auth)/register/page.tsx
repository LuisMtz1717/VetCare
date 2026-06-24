"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
  </svg>
);
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

type Role = "CLIENT" | "VET";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CLIENT" as Role,
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = form.role === "CLIENT" ? "/api/clients" : "/api/vets";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.message ?? "No pudimos crear tu cuenta. Intenta de nuevo.");
      }
    } catch {
      setError("Ocurrió un error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const roles: { value: Role; label: string; sub: string }[] = [
    { value: "CLIENT", label: "Dueño de mascota", sub: "Agenda citas y compra productos" },
    { value: "VET", label: "Veterinario", sub: "Atiende pacientes y gestiona tu agenda" },
  ];

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-cream text-ink">
      {/* ── Panel de marca ──────────────────────────── */}
      <div className="hidden lg:flex relative overflow-hidden bg-brand items-center justify-center p-16">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full translate-y-1/3 -translate-x-1/3 opacity-10 bg-accent" />

        <div className="relative z-10 max-w-md animate-fade-up">
          <Link href="/" className="inline-flex items-center gap-2 mb-10 text-white">
            <span className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center"><PawIcon /></span>
            <span className="font-display text-xl font-bold">VetCare</span>
          </Link>

          <h1 className="font-display text-4xl font-bold text-white mb-5" style={{ lineHeight: 1.15 }}>
            Únete a la comunidad que cuida mejor a sus mascotas.
          </h1>
          <p className="text-white/75 leading-relaxed mb-10">
            Crea tu cuenta gratis y lleva el control de citas, expedientes y compras en un solo lugar.
          </p>

          <ul className="flex flex-col gap-4">
            {["Historial médico siempre disponible", "Agenda con veterinarios verificados", "Tienda con envío a domicilio"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-sm text-white/90">
                <span className="w-5 h-5 rounded-full bg-accent text-brand-dark flex items-center justify-center flex-shrink-0"><CheckIcon /></span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Formulario ──────────────────────────────── */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm animate-fade-up">
          <Link href="/" className="lg:hidden inline-flex items-center gap-2 mb-10 text-brand">
            <span className="w-9 h-9 rounded-xl bg-brand/10 flex items-center justify-center"><PawIcon /></span>
            <span className="font-display text-xl font-bold">VetCare</span>
          </Link>

          <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-brand">Empieza gratis</p>
          <h2 className="font-display text-3xl font-bold mb-2 text-ink">Crear cuenta</h2>
          <p className="text-sm text-ink-soft mb-8">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="font-semibold text-brand hover:underline">
              Inicia sesión
            </Link>
          </p>

          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            {/* Selector de rol */}
            <div className="grid grid-cols-2 gap-3">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setForm({ ...form, role: r.value })}
                  className={`text-left p-4 rounded-2xl border transition-all ${
                    form.role === r.value
                      ? "border-brand bg-brand/5 shadow-sm"
                      : "border-border bg-white hover:border-brand/40"
                  }`}
                >
                  <p className={`text-sm font-semibold mb-0.5 ${form.role === r.value ? "text-brand" : "text-ink"}`}>
                    {r.label}
                  </p>
                  <p className="text-xs text-ink-muted leading-snug">{r.sub}</p>
                </button>
              ))}
            </div>

            <Input
              label="Nombre completo"
              placeholder="Tu nombre"
              icon={<UserIcon />}
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <Input
              type="email"
              label="Correo"
              placeholder="tucorreo@ejemplo.com"
              icon={<MailIcon />}
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <Input
              type="password"
              label="Contraseña"
              placeholder="Mínimo 8 caracteres"
              icon={<LockIcon />}
              required
              minLength={8}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {error && (
              <p className="text-sm rounded-xl px-4 py-3 bg-red-50 text-red-600 border border-red-100">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" loading={loading} className="w-full mt-2">
              Crear cuenta
            </Button>
          </form>

          <p className="text-xs text-ink-muted text-center mt-8">
            Al registrarte aceptas nuestros términos y aviso de privacidad.
          </p>
        </div>
      </div>
    </main>
  );
}
