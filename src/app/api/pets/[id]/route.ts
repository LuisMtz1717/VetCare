import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const pet = await prisma.pet.update({
    where: { id },
    data: {
      name: body.name,
      species: body.species,
      breed: body.breed,
      weight: Number(body.weight),
      medicalNotes: body.medicalNotes,
    },
  });

  return NextResponse.json(pet);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.pet.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}