import React from "react";
import { GlassCard } from "@/components/ui/glass-card";

export interface ContentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  children: React.ReactNode;
  variant?: "default" | "hover" | "interactive" | "sticky";
  size?: "sm" | "md" | "lg";
  headerAction?: React.ReactNode;
}

const ContentCard = React.forwardRef<HTMLDivElement, ContentCardProps>(
  (
    {
      title,
      description,
      children,
      variant = "default",
      size = "lg",
      headerAction,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <GlassCard
        ref={ref}
        variant={variant}
        size={size}
        className={className}
        {...props}
      >
        {(title || description || headerAction) && (
          <div className="flex items-center justify-between mb-4">
            <div>
              {title && (
                <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-1">
                  {title}
                </h3>
              )}
              {description && (
                <p className="dark:text-slate-300 text-gray-600 text-sm">
                  {description}
                </p>
              )}
            </div>
            {headerAction && (
              <div className="flex items-center space-x-2">{headerAction}</div>
            )}
          </div>
        )}
        {children}
      </GlassCard>
    );
  }
);

ContentCard.displayName = "ContentCard";

export { ContentCard };
