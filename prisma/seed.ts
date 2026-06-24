import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "Croquetas Premium Adulto 15kg",
    description: "Alimento balanceado para perros adultos de todas las razas, con proteína de pollo real y omega 3 y 6.",
    price: 899.0,
    stock: 40,
    category: "Alimento",
    imageUrl: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=600",
  },
  {
    name: "Alimento Húmedo para Gato Salmón 85g",
    description: "Lata de paté suave con salmón, ideal como complemento de la dieta diaria de tu gato.",
    price: 35.0,
    stock: 120,
    category: "Alimento",
    imageUrl: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600",
  },
  {
    name: "Antipulgas y Garrapatas en Pipeta",
    description: "Tratamiento tópico de acción rápida contra pulgas, garrapatas y piojos. Protección hasta 30 días.",
    price: 249.0,
    stock: 60,
    category: "Salud",
    imageUrl: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600",
  },
  {
    name: "Shampoo Hipoalergénico para Piel Sensible",
    description: "Fórmula suave libre de sulfatos, recomendada para perros y gatos con piel sensible o alergias.",
    price: 189.0,
    stock: 35,
    category: "Higiene",
    imageUrl: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=600",
  },
  {
    name: "Cama Ortopédica Memory Foam M",
    description: "Cama con espuma de memoria que reduce la presión en articulaciones, funda lavable.",
    price: 690.0,
    stock: 18,
    category: "Accesorios",
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600",
  },
  {
    name: "Arena Sanitaria Aglomerante 10kg",
    description: "Control de olores de larga duración, fácil de limpiar y baja generación de polvo.",
    price: 279.0,
    stock: 75,
    category: "Higiene",
    imageUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600",
  },
  {
    name: "Juguete Interactivo Dispensador de Premios",
    description: "Estimula la mente de tu mascota mientras dispensa croquetas o premios pequeños.",
    price: 159.0,
    stock: 50,
    category: "Accesorios",
    imageUrl: "https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=600",
  },
  {
    name: "Suplemento Articular para Perros Senior",
    description: "Glucosamina y condroitina para apoyar la movilidad y salud articular en perros mayores.",
    price: 410.0,
    stock: 28,
    category: "Salud",
    imageUrl: "https://images.unsplash.com/photo-1583512603806-077998240c7a?w=600",
  },
  {
    name: "Transportadora de Viaje Mediana",
    description: "Transportadora resistente y ventilada, aprobada para viajes en automóvil y aerolíneas.",
    price: 520.0,
    stock: 15,
    category: "Accesorios",
    imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600",
  },
  {
    name: "Snacks Dentales para Perro (Bolsa 28 pzas)",
    description: "Ayudan a reducir el sarro y refrescan el aliento mientras tu perro disfruta el snack.",
    price: 145.0,
    stock: 90,
    category: "Alimento",
    imageUrl: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=600",
  },
  {
    name: "Cepillo Deslanador Profesional",
    description: "Elimina pelo muerto y reduce la caída de pelo en casa, apto para razas de pelo corto y largo.",
    price: 199.0,
    stock: 42,
    category: "Higiene",
    imageUrl: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=600",
  },
  {
    name: "Vitaminas Multifuncionales en Tabletas",
    description: "Complejo vitamínico para fortalecer el sistema inmune, piel y pelaje de perros y gatos.",
    price: 320.0,
    stock: 33,
    category: "Salud",
    imageUrl: "https://images.unsplash.com/photo-1583512603806-077998240c7a?w=600",
  },
];

async function main() {
  console.log("Sembrando productos...");

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: product,
    });
  }

  console.log(`${products.length} productos listos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });