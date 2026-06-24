import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl border-r flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold text-green-600">
            VetCare 🐾
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Menú
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/dashboard"
            className="block px-4 py-3 rounded-xl hover:bg-green-50 hover:text-green-700 transition"
          >
            Home 🏠
          </Link>

          <Link
            href="/mis-mascotas"
            className="block px-4 py-3 rounded-xl hover:bg-green-50 hover:text-green-700 transition"
          >
            Mis mascotas 🐾
          </Link>

          <Link
            href="/mis-citas"
            className="block px-4 py-3 rounded-xl hover:bg-green-50 hover:text-green-700 transition"
          >
            Citas 📅 
          </Link>
        </nav>

        <div className="p-4 border-t">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition">
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-8 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              ¡Hola, bienvenido!
            </h2>
            <p className="text-sm text-gray-500">
              {session.user?.email}
            </p>
          </div>

          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-medium">
            Usuario Activo
          </div>
        </header>

        {/* Content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}