import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, React.CSSProperties & { hover?: string }> = {
  primary: {
    background: "var(--color-brand)",
    color: "white",
    border: "none",
    boxShadow: "0 2px 8px rgba(26,107,74,.30)",
  },
  secondary: {
    background: "var(--color-white)",
    color: "var(--color-ink)",
    border: "1px solid var(--color-border)",
    boxShadow: "var(--shadow-sm)",
  },
  ghost: {
    background: "transparent",
    color: "var(--color-ink-soft)",
    border: "none",
  },
  danger: {
    background: "rgba(220,38,38,.08)",
    color: "#dc2626",
    border: "1px solid rgba(220,38,38,.15)",
  },
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-5 py-2.5 text-sm rounded-2xl",
  lg: "px-7 py-4 text-base rounded-2xl",
};

const spinner = (
  <svg
    className="w-4 h-4 animate-spin"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
);

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  className = "",
  disabled,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold
        transition-all duration-150
        hover:-translate-y-px active:translate-y-0
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
        ${sizeStyles[size]}
        ${className}
      `}
      style={{ ...variantStyles[variant], ...style }}
    >
      {loading && spinner}
      {children}
    </button>
  );
}