import Link from "next/link";

const footerLinks = {
  Plataforma: [
    { href: "/veterinarios", label: "Veterinarios" },
    { href: "/tienda",       label: "Tienda" },
    { href: "/citas/nueva",  label: "Agendar cita" },
  ],
  Cuenta: [
    { href: "/login",      label: "Iniciar sesión" },
    { href: "/register",   label: "Registrarse" },
    { href: "/dashboard",  label: "Mi dashboard" },
  ],
  Legal: [
    { href: "#privacidad", label: "Privacidad" },
    { href: "#terminos",   label: "Términos de uso" },
    { href: "#cookies",    label: "Cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-9 h-9 rounded-xl bg-brand-light flex items-center justify-center text-white text-base font-bold">V</span>
              <span className="text-xl font-bold font-display text-cream">VetCare</span>
            </div>
            <p className="text-sm leading-relaxed text-ink-muted">
              Cuidado veterinario integral para tu mascota. Citas, historial médico y tienda en una sola plataforma.
            </p>
            <p className="text-xs mt-6 pt-6 border-t border-white/10 text-ink-muted">
              © 2026 VetCare. Todos los derechos reservados.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 text-accent">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-ink-muted hover:text-cream transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}