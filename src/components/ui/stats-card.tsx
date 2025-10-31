import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { LucideIcon, TrendingUp } from "lucide-react";

export interface StatsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
  className?: string;
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  (
    {
      title,
      value,
      unit,
      change,
      changeType = "neutral",
      icon: Icon,
      className,
      ...props
    },
    ref
  ) => {
    const changeColorClasses = {
      positive: "text-green-400",
      negative: "text-red-400",
      neutral: "dark:text-slate-400 text-gray-500",
    };

    return (
      <GlassCard
        ref={ref}
        variant="hover"
        size="lg"
        className={className}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium dark:text-slate-400 text-gray-600">
              {title}
            </p>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-2xl font-bold dark:text-white text-gray-900">
                {value}
              </span>
              {unit && (
                <span className="text-sm dark:text-slate-400 text-gray-500">
                  {unit}
                </span>
              )}
            </div>
            {change && (
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className={`text-xs ${changeColorClasses[changeType]}`}>
                  {change}
                </span>
              </div>
            )}
          </div>
          {Icon && (
            <div className="w-12 h-12 dark:bg-gradient-to-br dark:from-purple-500/20 dark:to-pink-500/20 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-6 h-6 dark:text-purple-400 text-purple-600" />
            </div>
          )}
        </div>
      </GlassCard>
    );
  }
);

StatsCard.displayName = "StatsCard";

export { StatsCard };
