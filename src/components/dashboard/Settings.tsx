import {
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  Trash2,
  ToggleLeft as Toggle,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    marketing: false,
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    analyticsData: false,
    cookieConsent: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">
          Settings
        </h1>
        <p className="dark:text-gray-300 text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notifications */}
        <div className="dark:bg-white/5 dark:backdrop-blur-md bg-white rounded-xl p-6 shadow-sm border dark:border-white/20 border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-50 dark:bg-purple-500/20 rounded-lg">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold dark:text-white text-gray-900">
              Notifications
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium dark:text-white text-gray-900">
                  Email Notifications
                </h3>
                <p className="text-sm dark:text-gray-300 text-gray-600">
                  Receive notifications via email
                </p>
              </div>
              <button
                onClick={() => toggleNotification("email")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.email
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "dark:bg-gray-600 bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.email ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium dark:text-white text-gray-900">
                  Push Notifications
                </h3>
                <p className="text-sm dark:text-gray-300 text-gray-600">
                  Receive push notifications in browser
                </p>
              </div>
              <button
                onClick={() => toggleNotification("push")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.push
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "dark:bg-gray-600 bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.push ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium dark:text-white text-gray-900">
                  Weekly Summary
                </h3>
                <p className="text-sm dark:text-gray-300 text-gray-600">
                  Get weekly activity summary
                </p>
              </div>
              <button
                onClick={() => toggleNotification("weekly")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.weekly
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "dark:bg-gray-600 bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.weekly ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium dark:text-white text-gray-900">
                  Marketing Emails
                </h3>
                <p className="text-sm dark:text-gray-300 text-gray-600">
                  Receive promotional content
                </p>
              </div>
              <button
                onClick={() => toggleNotification("marketing")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.marketing
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "dark:bg-gray-600 bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications.marketing ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="dark:bg-white/5 dark:backdrop-blur-md bg-white rounded-xl p-6 shadow-sm border dark:border-white/20 border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-50 dark:bg-green-500/20 rounded-lg">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold dark:text-white text-gray-900">
              Privacy & Security
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium dark:text-white text-gray-900">
                  Public Profile
                </h3>
                <p className="text-sm dark:text-gray-300 text-gray-600">
                  Make your profile visible to others
                </p>
              </div>
              <button
                onClick={() => togglePrivacy("profilePublic")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacy.profilePublic
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "dark:bg-gray-600 bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacy.profilePublic ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium dark:text-white text-gray-900">
                  Analytics Data
                </h3>
                <p className="text-sm dark:text-gray-300 text-gray-600">
                  Share usage data for improvements
                </p>
              </div>
              <button
                onClick={() => togglePrivacy("analyticsData")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacy.analyticsData
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "dark:bg-gray-600 bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacy.analyticsData ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium dark:text-white text-gray-900">
                  Cookie Consent
                </h3>
                <p className="text-sm dark:text-gray-300 text-gray-600">
                  Accept cookies for better experience
                </p>
              </div>
              <button
                onClick={() => togglePrivacy("cookieConsent")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacy.cookieConsent
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "dark:bg-gray-600 bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacy.cookieConsent ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="dark:bg-white/5 dark:backdrop-blur-md bg-white rounded-xl p-6 shadow-sm border dark:border-white/20 border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-50 dark:bg-purple-500/20 rounded-lg">
              <Palette className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold dark:text-white text-gray-900">
              Appearance
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium dark:text-white text-gray-900 mb-3">
                Theme
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => theme !== "light" && toggleTheme()}
                  className={`p-3 border-2 rounded-lg transition-all duration-300 ${
                    theme === "light"
                      ? "border-purple-600 bg-purple-50 dark:bg-purple-500/20"
                      : "border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
                  }`}
                >
                  <div className="w-full h-8 bg-white rounded mb-2 shadow-sm"></div>
                  <p
                    className={`text-xs font-medium ${
                      theme === "light"
                        ? "text-purple-600"
                        : "dark:text-gray-300 text-gray-600"
                    }`}
                  >
                    Light
                  </p>
                </button>
                <button
                  onClick={() => theme !== "dark" && toggleTheme()}
                  className={`p-3 border-2 rounded-lg transition-all duration-300 ${
                    theme === "dark"
                      ? "border-purple-600 bg-purple-50 dark:bg-purple-500/20"
                      : "border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
                  }`}
                >
                  <div className="w-full h-8 bg-gray-900 rounded mb-2"></div>
                  <p
                    className={`text-xs font-medium ${
                      theme === "dark"
                        ? "text-purple-600"
                        : "dark:text-gray-300 text-gray-600"
                    }`}
                  >
                    Dark
                  </p>
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-medium dark:text-white text-gray-900 mb-3">
                Language
              </h3>
              <select className="w-full px-3 py-2 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300">
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="dark:bg-white/5 dark:backdrop-blur-md bg-white rounded-xl p-6 shadow-sm border dark:border-white/20 border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-orange-50 dark:bg-orange-500/20 rounded-lg">
              <Download className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-lg font-semibold dark:text-white text-gray-900">
              Data Management
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 border dark:border-gray-600 border-gray-200 rounded-lg">
              <h3 className="font-medium dark:text-white text-gray-900 mb-2">
                Export Data
              </h3>
              <p className="text-sm dark:text-gray-300 text-gray-600 mb-3">
                Download a copy of your data
              </p>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 text-sm">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>

            <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
              <h3 className="font-medium text-red-900 dark:text-red-400 mb-2">
                Delete Account
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                Permanently delete your account and all data
              </p>
              <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 text-sm">
                <Trash2 className="w-4 h-4" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Changes */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300">
          Save All Changes
        </button>
      </div>
    </div>
  );
}
