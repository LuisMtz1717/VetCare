"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

type Pet = { id: string; name: string; species: string };
type Vet = { id: string; name: string; specialty: string; available: boolean };

const fieldClass =
  "w-full rounded-2xl text-sm px-4 py-3 outline-none transition-all bg-white border border-border text-ink shadow-sm focus:border-brand focus:ring-3 focus:ring-brand/10";

function NuevaCitaForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedVetId = searchParams.get("vetId") ?? "";

  const [pets, setPets] = useState<Pet[]>([]);
  const [vets, setVets] = useState<Vet[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const [form, setForm] = useState({
    petId: "",
    vetId: preselectedVetId,
    date: "",
    time: "",
    reason: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/pets").then((r) => r.json()),
      fetch("/api/vets").then((r) => r.json()),
    ])
      .then(([petsData, vetsData]) => {
        setPets(petsData);
        setVets(vetsData);
      })
      .finally(() => setLoadingData(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.petId || !form.vetId || !form.date || !form.time) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }

    setSubmitting(true);

    const scheduledAt = new Date(`${form.date}T${form.time}`);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          petId: form.petId,
          vetId: form.vetId,
          scheduledAt: scheduledAt.toISOString(),
          reason: form.reason,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "No pudimos agendar la cita. Intenta de nuevo.");
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/mis-citas"), 1500);
    } catch {
      setError("Ocurrió un error de conexión. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <main className="min-h-screen bg-cream text-ink">
      <Navbar />

      <section className="pt-32 pb-20 px-6 max-w-2xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-3">Citas</p>
        <h1 className="font-display text-4xl font-bold mb-3 text-ink">Agendar cita</h1>
        <p className="text-ink-soft mb-10">
          Elige a tu mascota, al veterinario y la fecha que mejor te acomode.
        </p>

        {success ? (
          <div className="rounded-3xl bg-white border border-border shadow-sm p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-brand/10 text-brand flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h2 className="font-display text-xl font-bold mb-2">¡Cita agendada!</h2>
            <p className="text-ink-soft text-sm">Te llevamos a tus citas en un momento...</p>
          </div>
        ) : loadingData ? (
          <div className="h-96 rounded-3xl bg-white border border-border animate-pulse" />
        ) : pets.length === 0 ? (
          <div className="rounded-3xl bg-white border border-border shadow-sm p-10 text-center">
            <p className="text-ink-soft mb-5">Necesitas registrar al menos una mascota antes de agendar una cita.</p>
            <Link href="/mis-mascotas">
              <Button>Registrar mi mascota</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl bg-white border border-border shadow-sm p-6 sm:p-8 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-ink">Mascota</label>
              <select
                className={fieldClass}
                value={form.petId}
                onChange={(e) => setForm({ ...form, petId: e.target.value })}
                required
              >
                <option value="">Selecciona una mascota</option>
                {pets.map((pet) => (
                  <option key={pet.id} value={pet.id}>
                    {pet.name} ({pet.species})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-ink">Veterinario</label>
              <select
                className={fieldClass}
                value={form.vetId}
                onChange={(e) => setForm({ ...form, vetId: e.target.value })}
                required
              >
                <option value="">Selecciona un veterinario</option>
                {vets.map((vet) => (
                  <option key={vet.id} value={vet.id} disabled={!vet.available}>
                    Dr. {vet.name} — {vet.specialty}{!vet.available ? " (no disponible)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink">Fecha</label>
                <input
                  type="date"
                  className={fieldClass}
                  min={today}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink">Hora</label>
                <input
                  type="time"
                  className={fieldClass}
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-ink">Motivo de la consulta (opcional)</label>
              <textarea
                className={`${fieldClass} resize-none`}
                rows={3}
                placeholder="Ej. revisión general, vacunación, malestar..."
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
              />
            </div>

            {error && (
              <p className="text-sm rounded-xl px-4 py-3 bg-red-50 text-red-600 border border-red-100">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" loading={submitting} className="w-full mt-1">
              Confirmar cita
            </Button>
          </form>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default function NuevaCitaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <NuevaCitaForm />
    </Suspense>
  );
}