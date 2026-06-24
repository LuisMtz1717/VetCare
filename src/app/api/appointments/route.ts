import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json([]);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      client: {
        include: {
          appointments: {
            include: {
              pet: true,
              vet: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return NextResponse.json(
    user?.client?.appointments || []
  );
}

export async function POST(req: Request) {
  const session = await auth();
  const body = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
    include: { client: true },
  });

  if (!user?.client) {
    return NextResponse.json(
      { error: "Cliente no encontrado" },
      { status: 404 }
    );
  }

  const appointment = await prisma.appointment.create({
    data: {
      petId: body.petId,
      vetId: body.vetId,
      clientId: user.client.id,
      scheduledAt: new Date(body.scheduledAt),
      reason: body.reason,
      price: 500,
    },
  });

  return NextResponse.json(appointment);
}