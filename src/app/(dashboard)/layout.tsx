import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

const PawIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M6.5 14c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2z" />
    <path d="M17.5 14c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2z" />
    <path d="M9 10c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1s1 .4 1 1v2c0 .6-.4 1-1 1z" />
    <path d="M15 10c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1s1 .4 1 1v2c0 .6-.4 1-1 1z" />
    <path d="M8 14s-1 1-1 3c0 2.5 2 4 5 4s5-1.5 5-4c0-2-1-3-1-3" />
  </svg>
);
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
  </svg>
);
const HeartPawIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M6.5 13c-1.1 0-2-.9-2-2v-.8c0-1.1.9-2 2-2s2 .9 2 2v.8c0 1.1-.9 2-2 2z" />
    <path d="M17.5 13c-1.1 0-2-.9-2-2v-.8c0-1.1.9-2 2-2s2 .9 2 2v.8c0 1.1-.9 2-2 2z" />
    <path d="M9 9.2c-.6 0-1-.4-1-1V6.5c0-.6.4-1 1-1s1 .4 1 1v1.7c0 .6-.4 1-1 1z" />
    <path d="M15 9.2c-.6 0-1-.4-1-1V6.5c0-.6.4-1 1-1s1 .4 1 1v1.7c0 .6-.4 1-1 1z" />
    <path d="M8 13s-1 1-1 2.8c0 2.3 2 3.7 5 3.7s5-1.4 5-3.7c0-1.8-1-2.8-1-2.8" />
  </svg>
);
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const BagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" />
  </svg>
);

const navItems = [
  { href: "/dashboard", label: "Inicio", icon: HomeIcon },
  { href: "/mis-mascotas", label: "Mis mascotas", icon: HeartPawIcon },
  { href: "/mis-citas", label: "Mis citas", icon: CalendarIcon },
  { href: "/tienda", label: "Tienda", icon: BagIcon },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const firstName = session.user?.name?.split(" ")[0] ?? "Usuario";
  const initials =
    session.user?.name
      ?.split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "U";

  return (
    <div className="min-h-screen flex bg-cream text-ink">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-border flex-shrink-0">
        <Link href="/" className="flex items-center gap-2.5 px-6 py-6 border-b border-border">
          <span className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center text-white flex-shrink-0">
            <PawIcon />
          </span>
          <span className="font-display text-xl font-bold text-brand">VetCare</span>
        </Link>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-ink-soft hover:bg-brand/5 hover:text-brand transition-colors"
            >
              <Icon />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-2 py-2 mb-3">
            <span className="w-9 h-9 rounded-full bg-brand/10 text-brand flex items-center justify-center text-sm font-bold flex-shrink-0">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink truncate">{firstName}</p>
              <p className="text-xs text-ink-muted truncate">{session.user?.email}</p>
            </div>
          </div>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-ink-soft border border-border hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors">
              <LogoutIcon />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-brand flex items-center justify-center text-white"><PawIcon /></span>
          <span className="font-display text-lg font-bold text-brand">VetCare</span>
        </Link>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button className="text-ink-soft" aria-label="Cerrar sesión">
            <LogoutIcon />
          </button>
        </form>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-5 sm:p-8 pt-20 md:pt-8">{children}</main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-border flex items-center justify-around py-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex flex-col items-center gap-1 px-3 py-1.5 text-ink-soft hover:text-brand transition-colors">
              <Icon />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}