import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export function UserProfile() {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Full-stack developer passionate about creating amazing user experiences. Love working with React, TypeScript, and modern web technologies.",
    joinDate: "2023-06-15",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to an API
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values if needed
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">
            User Profile
          </h1>
          <p className="dark:text-gray-300 text-gray-600">
            Manage your personal information and preferences
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-4 py-2 dark:border-gray-600 dark:hover:bg-gray-700/50 dark:text-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition-all duration-300"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="dark:bg-white/5 dark:backdrop-blur-md bg-white rounded-xl p-6 shadow-sm border dark:border-white/20 border-gray-200">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-xl font-semibold dark:text-white text-gray-900 mb-1">
                {profile.name}
              </h2>
              <p className="dark:text-gray-300 text-gray-600 mb-4">
                {profile.email}
              </p>
              <div className="flex items-center justify-center text-sm dark:text-gray-400 text-gray-500 mb-4">
                <Calendar className="w-4 h-4 mr-1" />
                Joined {new Date(profile.joinDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="dark:bg-white/5 dark:backdrop-blur-md bg-white rounded-xl p-6 shadow-sm border dark:border-white/20 border-gray-200 mt-6">
            <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="dark:text-gray-300 text-gray-600">
                  Videos Uploaded
                </span>
                <span className="font-semibold dark:text-white text-gray-900">
                  24
                </span>
              </div>
              <div className="flex justify-between">
                <span className="dark:text-gray-300 text-gray-600">
                  Total Views
                </span>
                <span className="font-semibold dark:text-white text-gray-900">
                  2.4M
                </span>
              </div>
              <div className="flex justify-between">
                <span className="dark:text-gray-300 text-gray-600">
                  Subscribers
                </span>
                <span className="font-semibold dark:text-white text-gray-900">
                  1.2K
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="dark:bg-white/5 dark:backdrop-blur-md bg-white rounded-xl p-6 shadow-sm border dark:border-white/20 border-gray-200">
            <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-6">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="w-full px-3 py-2 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                  />
                ) : (
                  <p className="dark:text-white text-gray-900">
                    {profile.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 dark:text-gray-400 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      className="flex-1 px-3 py-2 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    />
                  ) : (
                    <p className="dark:text-white text-gray-900">
                      {profile.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 dark:text-gray-400 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      className="flex-1 px-3 py-2 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    />
                  ) : (
                    <p className="dark:text-white text-gray-900">
                      {profile.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                  Location
                </label>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 dark:text-gray-400 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) =>
                        setProfile({ ...profile, location: e.target.value })
                      }
                      className="flex-1 px-3 py-2 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    />
                  ) : (
                    <p className="dark:text-white text-gray-900">
                      {profile.location}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  rows={4}
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  className="w-full px-3 py-2 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                />
              ) : (
                <p className="dark:text-white text-gray-900">{profile.bio}</p>
              )}
            </div>
          </div>

          {/* Account Settings */}
          <div className="dark:bg-white/5 dark:backdrop-blur-md bg-white rounded-xl p-6 shadow-sm border dark:border-white/20 border-gray-200 mt-6">
            <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-6">
              Account Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border dark:border-gray-600 border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium dark:text-white text-gray-900">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-sm dark:text-gray-300 text-gray-600">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all duration-300 text-sm">
                  Enable
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border dark:border-gray-600 border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium dark:text-white text-gray-900">
                    Change Password
                  </h4>
                  <p className="text-sm dark:text-gray-300 text-gray-600">
                    Update your password regularly for security
                  </p>
                </div>
                <button className="px-4 py-2 border dark:border-gray-600 dark:hover:bg-gray-700/50 dark:text-white border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition-all duration-300 text-sm">
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
