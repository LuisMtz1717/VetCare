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
      role: "CLIENT",
    },
  });

  await prisma.client.create({
    data: {
      userId: user.id,
    },
  });

  return NextResponse.json({ ok: true });
}