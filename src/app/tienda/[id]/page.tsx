"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
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

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);
const MinusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4"><path d="M5 12h14" /></svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4"><path d="M12 5v14M5 12h14" /></svg>
);

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [qty, setQty] = useState(1);

  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((data) => data && setProduct(data))
      .finally(() => setLoading(false));
  }, [id]);

  const formattedPrice = product
    ? new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(product.price)
    : "";

  const handleAdd = () => {
    if (!product) return;
    addItem(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        stock: product.stock,
      },
      qty
    );
    router.push("/tienda/carrito");
  };

  return (
    <main className="min-h-screen bg-cream text-ink">
      <Navbar />

      <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <Link href="/tienda" className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-brand transition-colors mb-8">
          <BackIcon />
          Volver a la tienda
        </Link>

        {loading ? (
          <div className="h-96 rounded-3xl bg-white border border-border animate-pulse" />
        ) : notFound || !product ? (
          <div className="text-center py-20">
            <p className="text-ink-soft">No encontramos este producto.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10 bg-white border border-border rounded-3xl shadow-sm overflow-hidden p-6 md:p-10">
            <div className="aspect-square rounded-2xl overflow-hidden bg-parchment">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-ink-muted">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-16 h-16">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">{product.category}</span>
              <h1 className="font-display text-3xl font-bold mb-4 text-ink">{product.name}</h1>

              {product.description && (
                <p className="text-ink-soft leading-relaxed mb-6">{product.description}</p>
              )}

              <p className="font-display text-3xl font-bold text-ink mb-6">{formattedPrice}</p>

              {product.stock > 0 ? (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm font-medium text-ink">Cantidad</span>
                    <div className="flex items-center gap-3 border border-border rounded-xl px-3 py-2">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="text-ink-soft hover:text-brand transition-colors"
                        aria-label="Disminuir"
                      >
                        <MinusIcon />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{qty}</span>
                      <button
                        onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                        className="text-ink-soft hover:text-brand transition-colors"
                        aria-label="Aumentar"
                      >
                        <PlusIcon />
                      </button>
                    </div>
                    <span className="text-xs text-ink-muted">{product.stock} disponibles</span>
                  </div>

                  <Button size="lg" onClick={handleAdd} className="w-full sm:w-auto">
                    Agregar al carrito
                  </Button>
                </>
              ) : (
                <p className="text-sm font-semibold text-red-600">Agotado por el momento</p>
              )}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}