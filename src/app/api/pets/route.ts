import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json([], { status: 200 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        client: {
          include: {
            pets: true,
          },
        },
      },
    });

    return NextResponse.json(user?.client?.pets || []);
  } catch (error) {
    console.error("GET pets error:", error);
    return NextResponse.json(
      { error: "Error al obtener mascotas" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        client: true,
      },
    });

    if (!user?.client) {
      return NextResponse.json(
        { error: "Cliente no encontrado" },
        { status: 404 }
      );
    }

    const pet = await prisma.pet.create({
      data: {
        clientId: user.client.id,
        name: body.name,
        species: body.species,
        breed: body.breed || null,
        weight: body.weight ? Number(body.weight) : null,
        medicalNotes: body.medicalNotes || null,
      },
    });

    return NextResponse.json(pet);
  } catch (error) {
    console.error("POST pets error:", error);

    return NextResponse.json(
      { error: "Error al crear mascota" },
      { status: 500 }
    );
  }
}