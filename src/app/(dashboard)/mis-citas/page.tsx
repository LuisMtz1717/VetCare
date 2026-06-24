"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4"><path d="M12 5v14M5 12h14" /></svg>
);
const EmptyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const statusStyles: Record<string, { label: string; bg: string; color: string }> = {
  PENDING:   { label: "Pendiente",  bg: "rgba(217,119,6,.08)",  color: "#d97706" },
  CONFIRMED: { label: "Confirmada", bg: "rgba(26,107,74,.08)",  color: "var(--color-brand)" },
  COMPLETED: { label: "Completada", bg: "rgba(37,99,235,.08)",  color: "#2563eb" },
  CANCELLED: { label: "Cancelada",  bg: "rgba(220,38,38,.08)",  color: "#dc2626" },
};

type Appointment = {
  id: string;
  reason?: string | null;
  scheduledAt: string;
  status: string;
  pet: { name: string };
  vet: { user: { name: string }; specialty?: string };
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    const res = await fetch("/api/appointments");
    const data = await res.json();
    setAppointments(data);
  }

  useEffect(() => {
    loadData().finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-1">Mis citas</p>
          <h1 className="font-display text-3xl font-bold text-ink">Citas agendadas</h1>
        </div>
        <Link
          href="/citas/nueva"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-white text-sm font-semibold bg-brand shadow-md hover:bg-brand-light transition-all hover:-translate-y-px flex-shrink-0"
        >
          <PlusIcon />
          Nueva cita
        </Link>
      </div>

      {loading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 rounded-3xl bg-white border border-border animate-pulse" />
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <div className="rounded-3xl bg-white border border-border shadow-sm p-12 text-center">
          <div className="text-ink-muted flex justify-center mb-4"><EmptyIcon /></div>
          <p className="text-ink-soft mb-6">Aún no tienes citas agendadas.</p>
          <Link
            href="/citas/nueva"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-white text-sm font-semibold bg-brand shadow-md hover:bg-brand-light transition-all"
          >
            <PlusIcon />
            Agendar mi primera cita
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {appointments.map((item) => {
            const status = statusStyles[item.status] ?? statusStyles.PENDING;
            const date = new Date(item.scheduledAt);

            return (
              <div
                key={item.id}
                className="flex items-center gap-5 p-5 rounded-3xl bg-white border border-border shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
                  <CalendarIcon />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-ink truncate">{item.pet.name}</p>
                  <p className="text-sm text-ink-soft truncate">
                    Dr. {item.vet.user.name}{item.vet.specialty ? ` · ${item.vet.specialty}` : ""}
                  </p>
                  {item.reason && (
                    <p className="text-xs text-ink-muted mt-0.5 truncate">{item.reason}</p>
                  )}
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-medium text-ink">
                    {date.toLocaleDateString("es-MX", { day: "2-digit", month: "short" })}
                  </p>
                  <p className="text-xs text-ink-muted">
                    {date.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>

                <span
                  className="text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0"
                  style={{ background: status.bg, color: status.color }}
                >
                  {status.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}