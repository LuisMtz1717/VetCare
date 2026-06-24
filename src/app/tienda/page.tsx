"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/shop/ProductCard";
import { useCartStore } from "@/lib/cartStore";

type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string | null;
};

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export default function TiendaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("Todas");
  const [toast, setToast] = useState("");

  const addItem = useCartStore((s) => s.addItem);
  const count = useCartStore((s) => s.count());

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ["Todas", ...unique];
  }, [products]);

  const filtered = useMemo(() => {
    if (category === "Todas") return products;
    return products.filter((p) => p.category === category);
  }, [products, category]);

  const handleAddToCart = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      stock: product.stock,
    });

    setToast(`"${product.name}" agregado al carrito`);
    setTimeout(() => setToast(""), 2200);
  };

  return (
    <main className="min-h-screen bg-cream text-ink">
      <Navbar />

      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-3">Tienda VetCare</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 text-ink">Productos para tu mascota</h1>
            <p className="text-ink-soft max-w-xl">Alimento, salud, higiene y accesorios seleccionados por nuestro equipo veterinario.</p>
          </div>

          <Link
            href="/tienda/carrito"
            className="relative inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold bg-white border border-border shadow-sm hover:shadow-md hover:-translate-y-px transition-all flex-shrink-0 self-start"
          >
            <CartIcon />
            Carrito
            {count > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>

        {!loading && categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  category === c
                    ? "bg-brand text-white shadow-md"
                    : "bg-white text-ink-soft border border-border hover:border-brand/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 rounded-3xl bg-white border border-border animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-ink-soft">No hay productos disponibles en esta categoría por ahora.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description ?? undefined}
                price={product.price}
                imageUrl={product.imageUrl ?? undefined}
                category={product.category}
                inStock={product.stock > 0}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </section>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-2xl bg-ink text-white text-sm font-medium shadow-lg z-50 animate-fade-up">
          {toast}
        </div>
      )}

      <Footer />
    </main>
  );
}