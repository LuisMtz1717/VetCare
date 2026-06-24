import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  hint,
  icon,
  id,
  className = "",
  style,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium"
          style={{ color: "var(--color-ink)" }}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: "var(--color-ink-muted)" }}
          >
            {icon}
          </span>
        )}

        <input
          {...props}
          id={inputId}
          className={`
            w-full rounded-2xl text-sm transition-all outline-none
            ${icon ? "pl-10 pr-4 py-3" : "px-4 py-3"}
            ${className}
          `}
          style={{
            background: "var(--color-white)",
            border: `1px solid ${error ? "#dc2626" : "var(--color-border)"}`,
            color: "var(--color-ink)",
            boxShadow: "var(--shadow-sm)",
            ...style,
          }}
          onFocus={e => {
            (e.target as HTMLInputElement).style.borderColor = error
              ? "#dc2626"
              : "var(--color-brand)";
            (e.target as HTMLInputElement).style.boxShadow = error
              ? "0 0 0 3px rgba(220,38,38,.10)"
              : "0 0 0 3px rgba(26,107,74,.10)";
          }}
          onBlur={e => {
            (e.target as HTMLInputElement).style.borderColor = error
              ? "#dc2626"
              : "var(--color-border)";
            (e.target as HTMLInputElement).style.boxShadow = "var(--shadow-sm)";
          }}
        />
      </div>

      {(error || hint) && (
        <p
          className="text-xs"
          style={{ color: error ? "#dc2626" : "var(--color-ink-muted)" }}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}