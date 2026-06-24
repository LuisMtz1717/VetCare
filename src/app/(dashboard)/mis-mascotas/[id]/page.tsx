"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPetPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    weight: "",
    medicalNotes: "",
  });

  useEffect(() => {
    fetch(`/api/pets`)
      .then((res) => res.json())
      .then((data) => {
        const pet = data.find((p: any) => p.id === id);

        if (pet) {
          setForm({
            name: pet.name || "",
            species: pet.species || "",
            breed: pet.breed || "",
            weight: String(pet.weight || ""),
            medicalNotes: pet.medicalNotes || "",
          });
        }
      });
  }, [id]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`/api/pets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    router.push("/mis-mascotas");
  }

  return (
    <main className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow">
      <h1 className="text-3xl font-bold mb-6">
        Editar Mascota ✏️
      </h1>

      <form onSubmit={handleUpdate} className="grid gap-4">
        <input
          className="border p-3 rounded"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="border p-3 rounded"
          placeholder="Especie"
          value={form.species}
          onChange={(e) =>
            setForm({ ...form, species: e.target.value })
          }
        />

        <input
          className="border p-3 rounded"
          placeholder="Raza"
          value={form.breed}
          onChange={(e) =>
            setForm({ ...form, breed: e.target.value })
          }
        />

        <input
          className="border p-3 rounded"
          placeholder="Peso"
          value={form.weight}
          onChange={(e) =>
            setForm({ ...form, weight: e.target.value })
          }
        />

        <textarea
          className="border p-3 rounded"
          placeholder="Notas médicas"
          value={form.medicalNotes}
          onChange={(e) =>
            setForm({
              ...form,
              medicalNotes: e.target.value,
            })
          }
        />

        <button className="bg-green-600 text-white py-3 rounded-xl">
          Guardar Cambios
        </button>
      </form>
    </main>
  );
}