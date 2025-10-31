"use client";

import { VideoContent } from "@/components/dashboard/VideoContent";

export default function VideosPage(): JSX.Element {
  return (
    <div className="min-h-screen dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 bg-white relative overflow-hidden">
      {/* Dark mode grid background */}
      <div className="dark:block hidden absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.3)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <VideoContent />
      </div>
    </div>
  );
}
