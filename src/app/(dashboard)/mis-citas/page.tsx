"use client";

import { useEffect, useState } from "react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  async function loadData() {
    const res = await fetch("/api/appointments");
    const data = await res.json();
    setAppointments(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main>
      <h1 className="text-3xl font-bold mb-6">
        Mis Citas 📅
      </h1>

      <div className="grid gap-4">
        {appointments.map((item: any) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <h2 className="font-bold">
              {item.pet.name}
            </h2>
            <p>{item.reason}</p>
            <p>
              {new Date(item.scheduledAt).toLocaleString()}
            </p>
            <p className="text-green-600 font-bold">
              {item.status}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}