import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  const vets = await prisma.vet.findMany({
    include: {
      user: {
        select: { name: true },
      },
    },
    orderBy: { available: "desc" },
  });

  const data = vets.map((v) => ({
    id: v.id,
    name: v.user.name,
    specialty: v.specialty,
    bio: v.bio,
    photoUrl: v.photoUrl,
    available: v.available,
  }));

  return NextResponse.json(data);
}

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