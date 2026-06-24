"use client";

import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category?: string;
  inStock?: boolean;
  onAddToCart?: (id: string) => void;
}

const cartIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

export default function ProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
  inStock = true,
  onAddToCart,
}: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(price);

  return (
    <div
      className="group relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "var(--color-white)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-sm)",
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)")}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)")}
    >
      {/* Imagen */}
      <Link href={`/tienda/${id}`} className="block relative overflow-hidden bg-[--color-parchment] aspect-square"
        style={{ "--color-parchment": "var(--color-parchment)" } as React.CSSProperties}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "var(--color-parchment)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-12 h-12" style={{ color: "var(--color-border)" }}>
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
        )}

        {/* Badge sin stock */}
        {!inStock && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(28,25,23,.5)" }}
          >
            <span
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white"
              style={{ background: "rgba(0,0,0,.6)" }}
            >
              Agotado
            </span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5">
        {category && (
          <span
            className="text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: "var(--color-ink-muted)" }}
          >
            {category}
          </span>
        )}

        <Link href={`/tienda/${id}`}>
          <h3
            className="text-base font-semibold mb-1 transition-colors hover:text-[--color-brand]"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", "--color-brand": "var(--color-brand)" } as React.CSSProperties}
          >
            {name}
          </h3>
        </Link>

        {description && (
          <p
            className="text-xs leading-relaxed mb-4 line-clamp-2 flex-1"
            style={{ color: "var(--color-ink-soft)" }}
          >
            {description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid var(--color-border)" }}>
          <span
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
          >
            {formattedPrice}
          </span>

          <button
            onClick={() => inStock && onAddToCart?.(id)}
            disabled={!inStock}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-px active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            style={{
              background: inStock ? "var(--color-brand)" : "var(--color-parchment)",
              color: inStock ? "white" : "var(--color-ink-muted)",
              boxShadow: inStock ? "0 2px 8px rgba(26,107,74,.25)" : "none",
            }}
          >
            {cartIcon}
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}