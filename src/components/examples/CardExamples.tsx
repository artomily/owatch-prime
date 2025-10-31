/**
 * Global Card Components - Usage Examples
 *
 * These components follow the same glassmorphism design pattern used throughout the app.
 * All components are built with the same structure as the video cards for consistency.
 */

import React from "react";
import { GlassCard, VideoCard, StatsCard, ContentCard } from "@/components/ui";
import { Coins, Clock, Eye, Trophy, Settings, Play } from "lucide-react";

// Example usage of all card components
export function CardExamples() {
  return (
    <div className="space-y-6 p-6">
      {/* Basic GlassCard - Most flexible */}
      <GlassCard variant="default" size="md">
        <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2">
          Basic Glass Card
        </h3>
        <p className="dark:text-slate-300 text-gray-600">
          This is a basic glass card with the same styling as video components.
        </p>
      </GlassCard>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Earnings"
          value="1,247"
          unit="OWATCH"
          change="+12.5%"
          changeType="positive"
          icon={Coins}
        />
        <StatsCard
          title="Watch Time Today"
          value="2h 18m"
          change="+45min"
          changeType="positive"
          icon={Clock}
        />
        <StatsCard
          title="Videos Watched"
          value="23"
          unit="videos"
          change="+5"
          changeType="positive"
          icon={Eye}
        />
        <StatsCard
          title="Streak"
          value="7"
          unit="days"
          change="New record!"
          changeType="positive"
          icon={Trophy}
        />
      </div>

      {/* Video Cards */}
      <div className="space-y-4">
        <VideoCard
          title="Introduction to Web3 & Blockchain"
          description="Learn the basics of Web3 technology and how blockchain works"
          duration="5:30"
          reward={10}
          category="Education"
          progress={0}
          watched={false}
          onClick={() => console.log("Play video")}
        />
        <VideoCard
          title="Solana Blockchain Deep Dive"
          description="Explore Solana's high-performance blockchain architecture"
          duration="8:15"
          reward={15}
          category="Technology"
          progress={75}
          watched={false}
          onClick={() => console.log("Continue watching")}
        />
        <VideoCard
          title="DeFi Fundamentals"
          description="Understanding decentralized finance and its applications"
          duration="6:45"
          reward={12}
          category="Finance"
          progress={100}
          watched={true}
          onClick={() => console.log("Video completed")}
        />
      </div>

      {/* Content Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContentCard
          title="Recent Activity"
          description="Your latest earnings and progress"
          variant="default"
          headerAction={
            <button className="text-sm text-purple-400 hover:text-purple-300">
              View All
            </button>
          }
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Play className="w-4 h-4 text-purple-400" />
                <span className="dark:text-white text-gray-900">
                  Watched: "Crypto Basics"
                </span>
              </div>
              <span className="text-green-400 text-sm">+10 OWATCH</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="dark:text-white text-gray-900">
                  Achievement Unlocked
                </span>
              </div>
              <span className="text-blue-400 text-sm">Streak: 7 days</span>
            </div>
          </div>
        </ContentCard>

        <ContentCard
          title="Settings"
          description="Manage your preferences"
          variant="hover"
          headerAction={
            <Settings className="w-5 h-5 dark:text-slate-400 text-gray-500" />
          }
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="dark:text-white text-gray-900">
                Email Notifications
              </span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="dark:text-white text-gray-900">
                Auto-play Videos
              </span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </ContentCard>
      </div>

      {/* Interactive Cards with different variants */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard variant="hover" size="md">
          <div className="text-center">
            <h4 className="font-semibold dark:text-white text-gray-900 mb-2">
              Hover Card
            </h4>
            <p className="text-sm dark:text-slate-400 text-gray-600">
              Hover over me
            </p>
          </div>
        </GlassCard>

        <GlassCard variant="interactive" size="md">
          <div className="text-center">
            <h4 className="font-semibold dark:text-white text-gray-900 mb-2">
              Interactive Card
            </h4>
            <p className="text-sm dark:text-slate-400 text-gray-600">
              Click me
            </p>
          </div>
        </GlassCard>

        <GlassCard variant="sticky" size="md">
          <div className="text-center">
            <h4 className="font-semibold dark:text-white text-gray-900 mb-2">
              Sticky Card
            </h4>
            <p className="text-sm dark:text-slate-400 text-gray-600">
              I stick to top
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

/**
 * Usage Examples:
 *
 * 1. Basic Glass Card:
 * <GlassCard variant="default" size="md">
 *   Your content here
 * </GlassCard>
 *
 * 2. Stats Card:
 * <StatsCard
 *   title="Total Balance"
 *   value="1,234"
 *   unit="OWATCH"
 *   change="+12%"
 *   changeType="positive"
 *   icon={Coins}
 * />
 *
 * 3. Video Card:
 * <VideoCard
 *   title="Video Title"
 *   description="Video description"
 *   duration="5:30"
 *   reward={10}
 *   category="Education"
 *   progress={50}
 *   watched={false}
 *   onClick={() => playVideo()}
 * />
 *
 * 4. Content Card:
 * <ContentCard
 *   title="Card Title"
 *   description="Card description"
 *   headerAction={<button>Action</button>}
 * >
 *   Your content here
 * </ContentCard>
 *
 * Variants available for GlassCard:
 * - "default": Basic glass card
 * - "hover": Adds hover effects
 * - "interactive": Clickable with group animations
 * - "sticky": Sticks to top of container
 *
 * Sizes available:
 * - "sm": Small padding (p-3)
 * - "md": Medium padding (p-4)
 * - "lg": Large padding (p-6)
 *
 * All components follow the same glassmorphism pattern with:
 * - Dark mode: white/5 background with backdrop blur
 * - Light mode: white background with borders
 * - Consistent hover states and transitions
 * - Responsive design patterns
 */
