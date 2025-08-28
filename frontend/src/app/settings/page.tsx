"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/lib/auth-context";
import { Bell, Shield, Moon, Globe, Save } from "lucide-react";

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "en",
    notifications: true,
    marketingEmails: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("preferences");
        if (saved) setPreferences(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const savePreferences = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("preferences", JSON.stringify(preferences));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

        {!user ? (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-700">
              Please log in to manage your account settings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" /> Account
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Name
                  </label>
                  <input
                    className="w-full border rounded-lg p-3"
                    value={user.name || ""}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Email
                  </label>
                  <input
                    className="w-full border rounded-lg p-3"
                    value={user.email || ""}
                    disabled
                  />
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5" /> Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-700">
                    <Moon className="w-4 h-4" /> Dark Mode
                  </span>
                  <input
                    type="checkbox"
                    checked={preferences.theme === "dark"}
                    onChange={(e) =>
                      setPreferences((p) => ({
                        ...p,
                        theme: e.target.checked ? "dark" : "light",
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1 flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Language
                  </label>
                  <select
                    className="w-full border rounded-lg p-3"
                    value={preferences.language}
                    onChange={(e) =>
                      setPreferences((p) => ({
                        ...p,
                        language: e.target.value,
                      }))
                    }
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Notifications</span>
                  <input
                    type="checkbox"
                    checked={preferences.notifications}
                    onChange={(e) =>
                      setPreferences((p) => ({
                        ...p,
                        notifications: e.target.checked,
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Marketing Emails</span>
                  <input
                    type="checkbox"
                    checked={preferences.marketingEmails}
                    onChange={(e) =>
                      setPreferences((p) => ({
                        ...p,
                        marketingEmails: e.target.checked,
                      }))
                    }
                  />
                </div>
                <button
                  onClick={savePreferences}
                  className="mt-2 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <Save className="w-4 h-4" /> Save
                </button>
              </div>
            </section>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SettingsPage;
