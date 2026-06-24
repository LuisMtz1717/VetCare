import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const record = await prisma.medicalRecord.create({
    data: {
      petId: body.petId,
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(record);
}