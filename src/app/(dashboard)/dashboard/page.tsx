import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const PawIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M6.5 14c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2z"/>
    <path d="M17.5 14c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2z"/>
    <path d="M9 10c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1s1 .4 1 1v2c0 .6-.4 1-1 1z"/>
    <path d="M15 10c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1s1 .4 1 1v2c0 .6-.4 1-1 1z"/>
    <path d="M8 14s-1 1-1 3c0 2.5 2 4 5 4s5-1.5 5-4c0-2-1-3-1-3"/>
  </svg>
);
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="18" rx="3"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);
const BagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);
const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default async function DashboardPage() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
    include: {
      client: {
        include: {
          pets: true,
          appointments: true,
          orders: true,
        },
      },
    },
  });

  const totalPets         = user?.client?.pets.length         ?? 0;
  const totalAppointments = user?.client?.appointments.length ?? 0;
  const totalOrders       = user?.client?.orders.length       ?? 0;
  const firstName         = session?.user?.name?.split(" ")[0] ?? "Usuario";

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-1">Bienvenido de vuelta</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink">Hola, {firstName}</h1>
          <p className="text-sm text-ink-soft mt-1">Aqui tienes un resumen de tu actividad en VetCare.</p>
        </div>
        <Link href="/citas/nueva" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-white text-sm font-semibold bg-brand shadow-md hover:bg-brand-light transition-all hover:-translate-y-px flex-shrink-0">
          <PlusIcon />
          Nueva cita
        </Link>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <Link href="/mis-mascotas" className="group p-6 rounded-3xl bg-white border border-border shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-brand/10 text-brand"><PawIcon /></div>
            <span className="text-ink-muted group-hover:translate-x-0.5 transition-transform"><ArrowRightIcon /></span>
          </div>
          <p className="text-4xl font-bold font-display mb-1 text-brand">{totalPets}</p>
          <p className="text-sm text-ink-soft">Mascotas registradas</p>
        </Link>

        <Link href="/mis-citas" className="group p-6 rounded-3xl bg-white border border-border shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-blue-50 text-blue-600"><CalendarIcon /></div>
            <span className="text-ink-muted group-hover:translate-x-0.5 transition-transform"><ArrowRightIcon /></span>
          </div>
          <p className="text-4xl font-bold font-display mb-1 text-blue-600">{totalAppointments}</p>
          <p className="text-sm text-ink-soft">Citas totales</p>
        </Link>

        <Link href="/tienda" className="group p-6 rounded-3xl bg-white border border-border shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-purple-50 text-purple-600"><BagIcon /></div>
            <span className="text-ink-muted group-hover:translate-x-0.5 transition-transform"><ArrowRightIcon /></span>
          </div>
          <p className="text-4xl font-bold font-display mb-1 text-purple-600">{totalOrders}</p>
          <p className="text-sm text-ink-soft">Ordenes realizadas</p>
        </Link>
      </div>

      <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 bg-brand">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="absolute right-0 top-0 w-48 h-48 rounded-full translate-x-1/3 -translate-y-1/3 opacity-10 bg-accent" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">Bienvenido a VetCare</h2>
            <p className="text-white/75 text-sm leading-relaxed max-w-md">Administra las mascotas, agenda citas y manten el historial medico siempre al dia.</p>
          </div>
          {totalPets === 0 && (
            <Link href="/mis-mascotas" className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm bg-white text-brand shadow-lg hover:-translate-y-px transition-all">
              <PlusIcon />
              Registrar primera mascota
            </Link>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-4">Accesos rapidos</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link href="/mis-mascotas" className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md hover:-translate-y-px transition-all">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-brand/10 text-brand"><PawIcon /></div>
            <span className="text-sm font-medium text-ink">Ver mis mascotas</span>
            <span className="ml-auto text-ink-muted"><ArrowRightIcon /></span>
          </Link>
          <Link href="/citas/nueva" className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md hover:-translate-y-px transition-all">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50 text-blue-600"><CalendarIcon /></div>
            <span className="text-sm font-medium text-ink">Agendar cita</span>
            <span className="ml-auto text-ink-muted"><ArrowRightIcon /></span>
          </Link>
          <Link href="/tienda" className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md hover:-translate-y-px transition-all">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-amber-50 text-amber-600"><BagIcon /></div>
            <span className="text-sm font-medium text-ink">Ir a la tienda</span>
            <span className="ml-auto text-ink-muted"><ArrowRightIcon /></span>
          </Link>
        </div>
      </div>
    </div>
  );
}