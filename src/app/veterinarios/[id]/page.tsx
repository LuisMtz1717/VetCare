import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const vet = await prisma.vet.findUnique({
    where: { id },
    include: {
      user: { select: { name: true } },
    },
  });

  if (!vet) {
    return NextResponse.json({ error: "Veterinario no encontrado" }, { status: 404 });
  }

  return NextResponse.json({
    id: vet.id,
    name: vet.user.name,
    specialty: vet.specialty,
    licenseNumber: vet.licenseNumber,
    bio: vet.bio,
    photoUrl: vet.photoUrl,
    available: vet.available,
  });
}