import * as React from "react";

// Pequeña utilidad para combinar clases (sin dependencias externas).
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4", className)} {...props} />;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-brand text-brand-fg hover:opacity-90",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand",
        className
      )}
      {...props}
    />
  );
}

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        className
      )}
      {...props}
    />
  );
}
