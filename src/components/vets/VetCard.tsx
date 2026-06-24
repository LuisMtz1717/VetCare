import Link from "next/link";

interface VetCardProps {
  id: string;
  name: string;
  specialty: string;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  available?: boolean;
}

const starIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const specialtyColors: Record<string, { color: string; bg: string }> = {
  "Cirugía":        { color: "#dc2626", bg: "rgba(220,38,38,.08)" },
  "Dermatología":   { color: "#9333ea", bg: "rgba(147,51,234,.08)" },
  "Cardiología":    { color: "#2563eb", bg: "rgba(37,99,235,.08)" },
  "Nutrición":      { color: "#d97706", bg: "rgba(217,119,6,.08)" },
  "Odontología":    { color: "#0891b2", bg: "rgba(8,145,178,.08)" },
  "General":        { color: "var(--color-brand)", bg: "rgba(26,107,74,.08)" },
};

function getSpecialtyStyle(specialty: string) {
  return specialtyColors[specialty] ?? specialtyColors["General"];
}

export default function VetCard({
  id,
  name,
  specialty,
  rating = 5.0,
  reviewCount = 0,
  imageUrl,
  available = true,
}: VetCardProps) {
  const { color, bg } = getSpecialtyStyle(specialty);
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map(n => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="group relative rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "var(--color-white)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-sm)",
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)")}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)")}
    >
      {/* Franja superior decorativa */}
      <div className="h-1.5 w-full" style={{ background: color }} />

      <div className="p-6">
        {/* Avatar + disponibilidad */}
        <div className="flex items-start justify-between mb-5">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-16 h-16 rounded-2xl object-cover"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
              style={{ background: color }}
            >
              {initials}
            </div>
          )}

          {/* Badge disponibilidad */}
          <span
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={
              available
                ? { background: "rgba(26,107,74,.08)", color: "var(--color-brand)" }
                : { background: "rgba(100,100,100,.08)", color: "#6b7280" }
            }
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: available ? "var(--color-brand)" : "#6b7280" }}
            />
            {available ? "Disponible" : "No disponible"}
          </span>
        </div>

        {/* Nombre y especialidad */}
        <h3
          className="text-lg font-semibold mb-1"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
        >
          Dr. {name}
        </h3>

        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold mb-4"
          style={{ background: bg, color }}
        >
          {specialty}
        </span>

        {/* Rating */}
        {reviewCount > 0 && (
          <div className="flex items-center gap-1.5 mb-5">
            <div className="flex gap-0.5" style={{ color: "var(--color-accent)" }}>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  style={{ opacity: i < Math.round(rating) ? 1 : 0.3 }}
                >
                  {starIcon}
                </span>
              ))}
            </div>
            <span className="text-xs font-medium" style={{ color: "var(--color-ink-soft)" }}>
              {rating.toFixed(1)}
            </span>
            <span className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
              ({reviewCount} reseñas)
            </span>
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/veterinarios/${id}`}
          className="block w-full text-center py-3 rounded-2xl text-sm font-semibold transition-all hover:-translate-y-px"
          style={{
            background: available ? "var(--color-brand)" : "var(--color-parchment)",
            color: available ? "white" : "var(--color-ink-muted)",
            boxShadow: available ? "0 2px 8px rgba(26,107,74,.25)" : "none",
          }}
        >
          {available ? "Ver perfil y agendar" : "Ver perfil"}
        </Link>
      </div>
    </div>
  );
}