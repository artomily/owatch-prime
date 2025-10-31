import React from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "hover" | "interactive" | "sticky";
  size?: "sm" | "md" | "lg";
  blur?: "sm" | "md" | "lg";
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      children,
      variant = "default",
      size = "md",
      blur = "md",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "backdrop-blur border shadow-sm transition-all duration-300";

    const variantClasses = {
      default: "dark:bg-white/5 dark:border-white/10 bg-white border-gray-200",
      hover:
        "dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 bg-white hover:bg-gray-50 border-gray-200 cursor-pointer group",
      interactive:
        "dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 bg-white hover:bg-gray-50 border-gray-200 transition-all duration-300 cursor-pointer shadow-sm group",
      sticky:
        "dark:bg-white/5 bg-white border dark:border-white/20 border-gray-200 sticky top-6",
    };

    const sizeClasses = {
      sm: "p-3 rounded-lg",
      md: "p-4 rounded-xl",
      lg: "p-6 rounded-xl",
    };

    const blurClasses = {
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-md",
      lg: "backdrop-blur-lg",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          blurClasses[blur],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
