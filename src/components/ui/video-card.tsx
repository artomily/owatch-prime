import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Trophy } from "lucide-react";

export interface VideoCardProps {
  title: string;
  description: string;
  duration: string;
  reward: number;
  category: string;
  progress: number;
  watched: boolean;
  onClick?: () => void;
  className?: string;
}

const VideoCard = React.forwardRef<HTMLDivElement, VideoCardProps>(
  (
    {
      title,
      description,
      duration,
      reward,
      category,
      progress,
      watched,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <GlassCard
        ref={ref}
        variant="interactive"
        size="md"
        className={className}
        onClick={onClick}
        {...props}
      >
        <div className="flex items-center space-x-4">
          {/* Video Thumbnail */}
          <div className="w-32 h-20 dark:bg-slate-600 bg-gray-200 rounded flex items-center justify-center relative">
            <span className="dark:text-slate-300 text-gray-600 text-xs">
              Video
            </span>
            {watched && (
              <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <Trophy className="w-2 h-2 text-white" />
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="flex-1">
            <h3 className="dark:text-white text-gray-900 font-semibold mb-1">
              {title}
            </h3>
            <p className="dark:text-slate-300 text-gray-600 text-sm mb-2">
              {description}
            </p>

            {/* Video Metadata */}
            <div className="flex items-center space-x-4 text-sm dark:text-slate-400 text-gray-500 mb-2">
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{duration}</span>
              </span>
              <span className="flex items-center space-x-1">
                <DollarSign className="w-3 h-3 text-green-400" />
                <span className="text-green-400">{reward} OWATCH</span>
              </span>
              <Badge
                variant="secondary"
                className="px-2 py-1 dark:bg-slate-700 bg-gray-100 text-xs"
              >
                {category}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="w-full dark:bg-slate-700 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {progress > 0 && (
              <p className="text-xs dark:text-slate-400 text-gray-500 mt-1">
                {progress.toFixed(0)}% watched
              </p>
            )}
          </div>

          {/* Action Section */}
          <div className="flex flex-col items-end space-y-2">
            {watched ? (
              <span className="text-green-400 text-sm flex items-center space-x-1">
                <Trophy className="w-3 h-3" />
                <span>Completed</span>
              </span>
            ) : (
              <button
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 py-1 rounded text-sm transition-all duration-300 font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick?.();
                }}
              >
                Watch
              </button>
            )}
          </div>
        </div>
      </GlassCard>
    );
  }
);

VideoCard.displayName = "VideoCard";

export { VideoCard };
