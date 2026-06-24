"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/lib/cartStore";

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
  </svg>
);
const MinusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5"><path d="M5 12h14" /></svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5"><path d="M12 5v14M5 12h14" /></svg>
);
const BagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export default function CarritoPage() {
  const router = useRouter();
  const { items, setQuantity, removeItem, clear, total } = useCartStore();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n);

  const handleCheckout = async () => {
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          shippingAddress: address || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "No pudimos procesar tu pedido. Intenta de nuevo.");
        return;
      }

      clear();
      setSuccess(true);
    } catch {
      setError("Ocurrió un error de conexión. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream text-ink">
      <Navbar />

      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-10 text-ink">Tu carrito</h1>

        {success ? (
          <div className="rounded-3xl bg-white border border-border shadow-sm p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-brand/10 text-brand flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h2 className="font-display text-xl font-bold mb-2">¡Pedido confirmado!</h2>
            <p className="text-ink-soft text-sm mb-6">Te avisaremos cuando tu pedido esté en camino.</p>
            <Link href="/tienda">
              <Button>Seguir comprando</Button>
            </Link>
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-3xl bg-white border border-border shadow-sm p-12 text-center">
            <div className="text-ink-muted flex justify-center mb-4"><BagIcon /></div>
            <p className="text-ink-soft mb-6">Tu carrito está vacío.</p>
            <Link href="/tienda">
              <Button>Ir a la tienda</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-border shadow-sm"
                >
                  <div className="w-16 h-16 rounded-xl bg-parchment overflow-hidden flex-shrink-0">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink truncate">{item.name}</p>
                    <p className="text-xs text-ink-muted">{formatPrice(item.price)} c/u</p>
                  </div>

                  <div className="flex items-center gap-2 border border-border rounded-xl px-2 py-1.5 flex-shrink-0">
                    <button
                      onClick={() => setQuantity(item.productId, item.quantity - 1)}
                      className="text-ink-soft hover:text-brand transition-colors"
                      aria-label="Disminuir"
                    >
                      <MinusIcon />
                    </button>
                    <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => setQuantity(item.productId, item.quantity + 1)}
                      className="text-ink-soft hover:text-brand transition-colors"
                      aria-label="Aumentar"
                    >
                      <PlusIcon />
                    </button>
                  </div>

                  <p className="text-sm font-bold text-ink w-20 text-right flex-shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </p>

                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-ink-muted hover:text-red-600 transition-colors flex-shrink-0"
                    aria-label="Eliminar"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>

            <div className="rounded-3xl bg-white border border-border shadow-sm p-6 h-fit flex flex-col gap-5">
              <h2 className="font-display text-lg font-bold text-ink">Resumen</h2>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink">Dirección de envío</label>
                <textarea
                  className="w-full rounded-2xl text-sm px-4 py-3 outline-none transition-all bg-white border border-border text-ink shadow-sm resize-none focus:border-brand focus:ring-3 focus:ring-brand/10"
                  rows={3}
                  placeholder="Calle, número, colonia, ciudad..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-sm text-ink-soft">Total</span>
                <span className="font-display text-2xl font-bold text-ink">{formatPrice(total())}</span>
              </div>

              {error && (
                <p className="text-sm rounded-xl px-4 py-3 bg-red-50 text-red-600 border border-red-100">
                  {error}
                </p>
              )}

              <Button size="lg" onClick={handleCheckout} loading={submitting} className="w-full">
                Confirmar pedido
              </Button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}