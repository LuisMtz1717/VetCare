"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VetCard from "@/components/vets/VetCard";

type Vet = {
  id: string;
  name: string;
  specialty: string;
  photoUrl?: string | null;
  available: boolean;
};

export default function VeterinariosPage() {
  const [vets, setVets] = useState<Vet[]>([]);
  const [loading, setLoading] = useState(true);
  const [specialty, setSpecialty] = useState("Todas");

  useEffect(() => {
    fetch("/api/vets")
      .then((res) => res.json())
      .then((data) => setVets(data))
      .finally(() => setLoading(false));
  }, []);

  const specialties = useMemo(() => {
    const unique = Array.from(new Set(vets.map((v) => v.specialty)));
    return ["Todas", ...unique];
  }, [vets]);

  const filtered = useMemo(() => {
    if (specialty === "Todas") return vets;
    return vets.filter((v) => v.specialty === specialty);
  }, [vets, specialty]);

  return (
    <main className="min-h-screen bg-cream text-ink">
      <Navbar />

      <section className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-3">Nuestro equipo</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-ink">Veterinarios</h1>
        <p className="text-ink-soft max-w-xl mb-10">
          Elige al especialista ideal para tu mascota y agenda tu cita directamente desde su perfil.
        </p>

        {!loading && specialties.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {specialties.map((s) => (
              <button
                key={s}
                onClick={() => setSpecialty(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  specialty === s
                    ? "bg-brand text-white shadow-md"
                    : "bg-white text-ink-soft border border-border hover:border-brand/40"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-3xl bg-white border border-border animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-ink-soft">Aún no hay veterinarios disponibles en esta categoría.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((vet) => (
              <VetCard
                key={vet.id}
                id={vet.id}
                name={vet.name}
                specialty={vet.specialty}
                imageUrl={vet.photoUrl ?? undefined}
                available={vet.available}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}