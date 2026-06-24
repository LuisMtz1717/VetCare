import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

type CartItem = { productId: string; quantity: number };

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
          orders: {
            include: { items: { include: { product: true } } },
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });

  return NextResponse.json(user?.client?.orders ?? []);
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const items: CartItem[] = body.items ?? [];

  if (items.length === 0) {
    return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { client: true },
  });

  if (!user?.client) {
    return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
  }

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, active: true },
  });

  if (products.length !== productIds.length) {
    return NextResponse.json({ error: "Uno o más productos ya no están disponibles" }, { status: 400 });
  }

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product || product.stock < item.quantity) {
      return NextResponse.json(
        { error: `Stock insuficiente para "${product?.name ?? item.productId}"` },
        { status: 400 }
      );
    }
  }

  const total = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId)!;
    return sum + Number(product.price) * item.quantity;
  }, 0);

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        clientId: user.client!.id,
        total,
        shippingAddress: body.shippingAddress ?? null,
        items: {
          create: items.map((item) => {
            const product = products.find((p) => p.id === item.productId)!;
            return {
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: product.price,
            };
          }),
        },
      },
      include: { items: true },
    });

    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return created;
  });

  return NextResponse.json(order);
}