import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ── SVG Icons ───────────────────────────────────────── */
const PawIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M6.5 14c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2z"/>
    <path d="M17.5 14c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2z"/>
    <path d="M9 10c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1s1 .4 1 1v2c0 .6-.4 1-1 1z"/>
    <path d="M15 10c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1s1 .4 1 1v2c0 .6-.4 1-1 1z"/>
    <path d="M8 14s-1 1-1 3c0 2.5 2 4 5 4s5-1.5 5-4c0-2-1-3-1-3"/>
  </svg>
);
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="3" y="4" width="18" height="18" rx="3"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
  </svg>
);
const StethIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M4.5 4a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v5a3.5 3.5 0 0 1-7 0V4z"/>
    <path d="M8 12.5v2a5.5 5.5 0 0 0 11 0v-2"/>
    <circle cx="19" cy="12" r="1.5"/>
  </svg>
);
const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

/* ── Data ─────────────────────────────────────────────── */
const services = [
  { Icon: PawIcon,     color: "text-brand",       bg: "bg-brand/10",   title: "Gestión de mascotas",  desc: "Crea perfiles con historial médico, vacunas y alergias siempre disponibles." },
  { Icon: CalendarIcon,color: "text-blue-600",     bg: "bg-blue-50",    title: "Citas inteligentes",   desc: "Agenda, reprograma o cancela citas con tus veterinarios desde cualquier dispositivo." },
  { Icon: StethIcon,   color: "text-purple-600",   bg: "bg-purple-50",  title: "Historial médico",     desc: "Accede al expediente completo: diagnósticos, tratamientos y recetas en un lugar." },
  { Icon: CartIcon,    color: "text-amber-600",    bg: "bg-amber-50",   title: "Tienda integrada",     desc: "Compra alimentos y medicamentos recomendados por veterinarios con envío a domicilio." },
  { Icon: ShieldIcon,  color: "text-red-600",      bg: "bg-red-50",     title: "Pagos seguros",        desc: "Procesa pagos con Stripe. Tus datos financieros siempre cifrados y protegidos." },
];

const testimonials = [
  { name: "Mariana López",  role: "Dueña de Luna, 3 años",  initials: "ML", text: "Agendar la cita fue cuestión de minutos y el historial médico siempre está disponible." },
  { name: "Carlos Rivas",   role: "Dueño de Max y Coco",    initials: "CR", text: "Tengo dos perros y VetCare me permite gestionar ambos desde la misma cuenta." },
  { name: "Sofía Mendoza",  role: "Dueña de Mochi, 5 años", initials: "SM", text: "El sistema de recordatorios me salvó de olvidar las vacunas de Mochi." },
];

const featureCards = [
  { Icon: PawIcon,     color: "text-brand",       bg: "bg-brand/10",  label: "Registro de mascotas", sub: "Perfil completo y seguro" },
  { Icon: CalendarIcon,color: "text-blue-600",    bg: "bg-blue-50",   label: "Citas inteligentes",   sub: "Agenda fácil y rápida" },
  { Icon: StethIcon,   color: "text-purple-600",  bg: "bg-purple-50", label: "Historial médico",     sub: "Siempre disponible" },
  { Icon: CartIcon,    color: "text-amber-600",   bg: "bg-amber-50",  label: "Tienda integrada",     sub: "Productos confiables" },
];

/* ════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream text-ink">

        {/* ── HERO ─────────────────────────────────────── */}
        <section className="relative overflow-hidden min-h-screen flex items-center">
          {/* Fondo decorativo */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgba(26,107,74,.07)_0%,transparent_70%)]" />
          <div className="absolute inset-0 -z-10 opacity-25"
            style={{ backgroundImage: "radial-gradient(circle, #1a6b4a22 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid md:grid-cols-2 gap-16 items-center w-full">

            {/* Copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-8 bg-brand/10 text-brand border border-brand/15 animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                Plataforma veterinaria integral
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up" style={{ lineHeight: 1.1 }}>
                Cuidamos a tu mascota con{" "}
                <span className="text-brand italic underline decoration-accent decoration-[3px] underline-offset-[6px]">
                  tecnología
                </span>{" "}
                y cariño.
              </h1>

              <p className="text-lg text-ink-soft mb-10 max-w-lg leading-relaxed animate-fade-up delay-100">
                Agenda citas, gestiona expedientes médicos, encuentra veterinarios
                confiables y compra productos esenciales — todo en un solo lugar.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-up delay-200">
                <Link href="/register" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-white font-semibold bg-brand shadow-lg hover:bg-brand-light transition-all hover:-translate-y-0.5 active:translate-y-0">
                  Empieza gratis <ArrowRight />
                </Link>
                <Link href="/veterinarios" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold bg-white text-ink border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                  Ver veterinarios
                </Link>
              </div>

              {/* Prueba social */}
              <div className="flex items-center gap-4 mt-10 animate-fade-up delay-300">
                <div className="flex -space-x-2">
                  {[
                    { i: "M", dark: true  },
                    { i: "C", dark: false },
                    { i: "S", dark: true  },
                    { i: "P", dark: false },
                  ].map(({ i, dark }, idx) => (
                    <div key={idx} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-cream ${dark ? "bg-brand" : "bg-accent"}`}>
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 text-accent">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                  </div>
                  <p className="text-xs text-ink-muted mt-0.5">+500 mascotas felices</p>
                </div>
              </div>
            </div>

            {/* Feature card */}
            <div className="relative animate-scale-in delay-200">
              <div className="absolute -inset-4 rounded-3xl bg-brand/5 -z-10 rotate-2" />
              <div className="relative rounded-3xl p-0.5 bg-gradient-to-br from-brand/30 to-accent/30">
                <div className="bg-white rounded-[22px] p-7">

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">Panel de control</p>
                      <p className="text-sm font-medium text-ink">Resumen de hoy</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white text-sm font-bold">V</div>
                  </div>

                  <div className="space-y-3">
                    {featureCards.map(({ Icon, color, bg, label, sub }) => (
                      <div key={label} className="flex items-center gap-4 p-4 rounded-2xl bg-cream hover:-translate-y-px transition-transform">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${bg} ${color}`}>
                          <Icon />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-ink">{label}</p>
                          <p className="text-xs text-ink-muted">{sub}</p>
                        </div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4 ml-auto text-ink-muted"><path d="M9 18l6-6-6-6"/></svg>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-border">
                    {[{ val: "+500", label: "Mascotas" }, { val: "+120", label: "Veterinarios" }, { val: "24/7", label: "Soporte" }].map(({ val, label }) => (
                      <div key={label} className="text-center">
                        <p className="text-lg font-bold font-display text-brand">{val}</p>
                        <p className="text-xs text-ink-muted">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BANDA DE CONFIANZA ────────────────────────── */}
        <section className="border-y border-border bg-white">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-center gap-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">Plataforma confiable para</p>
            {["Clínicas veterinarias", "Consultorios privados", "Tiendas de mascotas", "Veterinarios independientes"].map(l => (
              <span key={l} className="text-sm font-medium text-ink-soft">{l}</span>
            ))}
          </div>
        </section>

        {/* ── SERVICIOS ─────────────────────────────────── */}
        <section id="servicios" className="py-28">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-brand">Todo en un lugar</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-5 text-ink">Servicios diseñados para tu mascota</h2>
              <p className="text-ink-soft leading-relaxed">Desde el primer registro hasta la última consulta, VetCare te acompaña en cada etapa.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(({ Icon, color, bg, title, desc }) => (
                <div key={title} className="group p-8 rounded-3xl border border-border bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${bg} ${color}`}>
                    <Icon />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-ink">{title}</h3>
                  <p className="text-sm leading-relaxed text-ink-soft">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden relative bg-brand shadow-xl">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-accent" />
            <div className="relative z-10 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Empieza hoy sin costo</h2>
                <p className="text-white/75 leading-relaxed">Únete a cientos de familias que ya cuidan mejor a sus mascotas.</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <Link href="/register" className="px-7 py-4 rounded-2xl font-semibold bg-white text-brand hover:-translate-y-0.5 transition-all shadow-lg">
                  Crear cuenta gratis
                </Link>
                <Link href="/veterinarios" className="px-7 py-4 rounded-2xl font-semibold text-white bg-white/10 border border-white/25 hover:-translate-y-0.5 transition-all">
                  Ver veterinarios
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIOS ───────────────────────────────── */}
        <section id="beneficios" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-xl mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-brand">Testimonios</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">Familias que confían en VetCare</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map(({ name, role, text, initials }) => (
                <div key={name} className="p-8 rounded-3xl flex flex-col gap-6 bg-cream border border-border">
                  <div className="flex gap-0.5 text-accent">{[...Array(5)].map((_, i) => <StarIcon key={i} />)}</div>
                  <p className="text-sm leading-relaxed flex-1 text-ink-soft">"{text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-sm font-bold text-white">{initials}</div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{name}</p>
                      <p className="text-xs text-ink-muted">{role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}