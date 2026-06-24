"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CLIENT",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint =
      form.role === "CLIENT"
        ? "/api/clients"
        : "/api/vets";

    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/login");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Crear Cuenta
        </h1>

        <input
          placeholder="Nombre"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Correo"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <select
          className="w-full border p-3 rounded mb-4"
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="CLIENT">Cliente</option>
          <option value="VET">Veterinario</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded"
        >
          Registrarse
        </button>
      </form>
    </main>
  );
}