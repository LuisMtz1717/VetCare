"use client";

import { useEffect, useState } from "react";

type Pet = {
  id: string;
  name: string;
  species: string;
  breed?: string;
  weight?: number;
};

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    weight: "",
    medicalNotes: "",
  });

  const loadPets = async () => {
    const res = await fetch("/api/pets");
    const data = await res.json();
    setPets(data);
  };

  useEffect(() => {
    loadPets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/pets", {
      method: "POST",
      body: JSON.stringify(form),
    });

    setForm({
      name: "",
      species: "",
      breed: "",
      weight: "",
      medicalNotes: "",
    });

    loadPets();
  };

  const deletePet = async (id: string) => {
    await fetch(`/api/pets/${id}`, {
      method: "DELETE",
    });

    loadPets();
  };

  return (
    <main className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mis Mascotas 🐾</h1>

      <form onSubmit={handleSubmit} className="grid gap-3 mb-10">
        <input
          placeholder="Nombre"
          className="border p-3 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        
          
        />

        <input
          placeholder="Especie"
          className="border p-3 rounded"
          value={form.species}
          onChange={(e) => setForm({ ...form, species: e.target.value })}
        />

        <input
          placeholder="Raza"
          className="border p-3 rounded"
          value={form.breed}
          onChange={(e) => setForm({ ...form, breed: e.target.value })}
        />

        <input
          placeholder="Peso"
          className="border p-3 rounded"
          value={form.weight}
          onChange={(e) => setForm({ ...form, weight: e.target.value })}
        />

        <textarea
          placeholder="Notas médicas"
          className="border p-3 rounded"
          value={form.medicalNotes}
          onChange={(e) =>
            setForm({ ...form, medicalNotes: e.target.value })
          }
        />

        <button className="bg-green-600 text-white py-3 rounded">
          Registrar Mascota
        </button>
      </form>

      <div className="grid gap-4">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="border p-4 rounded-xl flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold text-xl">{pet.name}</h2>
              <p>{pet.species} - {pet.breed}</p>
              <p>{pet.weight} kg</p>
            </div>
            
            <div className="flex gap-2">
                <a
                href={`/mis-mascotas/${pet.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Editar
                </a> 
            </div>
            <button
              onClick={() => deletePet(pet.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}