import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold tracking-tight transition-colors disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "border border-border bg-card/70 text-foreground hover:border-accent/50 hover:bg-card",
        ghost: "text-foreground hover:bg-foreground/5",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    href?: string;
    external?: boolean;
    download?: boolean;
    children: ReactNode;
  };

export function Button({
  href,
  external,
  download,
  variant,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonStyles({ variant }), className);

  if (href && download) {
    return (
      <a href={href} className={classes} download>
        {children}
      </a>
    );
  }

  if (href && external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
