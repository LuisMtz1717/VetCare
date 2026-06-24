import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const hash = await bcrypt.hash(body.password, 10);

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      passwordHash: hash,
      role: "VET",
    },
  });

  await prisma.vet.create({
    data: {
      userId: user.id,
      specialty: "General",
      licenseNumber: crypto.randomUUID(),
    },
  });

  return NextResponse.json({ ok: true });
}