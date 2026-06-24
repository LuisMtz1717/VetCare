import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ petId: string }> }
) {
  const { petId } = await params;

  const records = await prisma.medicalRecord.findMany({
    where: { petId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(records);
}