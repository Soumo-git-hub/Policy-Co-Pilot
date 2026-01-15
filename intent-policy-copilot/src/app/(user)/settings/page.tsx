"use client";

import { User, Bell, Shield, Key, Moon, Sun, Monitor, Laptop, Smartphone, Mail, Globe, Save, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast-system";
import { useWorkspace } from "@/context/WorkspaceContext";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const tabs = [
    { id: "profile", label: "Profile & Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Moon },
    { id: "security", label: "Security & Access", icon: Shield },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const { addToast } = useToast();
    const { setTheme, theme } = useTheme();
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    // Context State
    const { userProfile, updateUserProfile } = useWorkspace();
    const [formData, setFormData] = useState(userProfile);

    // Sync local state when context profile changes (e.g. workspace switch)
    useEffect(() => {
        setFormData(userProfile);
    }, [userProfile]);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setIsSaving(true);

        // Save to Context & LocalStorage
        updateUserProfile(formData);

        setTimeout(() => {
            setIsSaving(false);
            addToast({
                type: "success",
                title: "Changes Saved",
                description: "Your settings have been successfully updated.",
            });
        }, 800);
    };

    const handleLogout = () => {
        // Clear session specific stuff if any, or just redirect
        // For this demo, we'll just redirect to landing
        router.push("/");
    };

    return (
        <div className="flex-1 overflow-hidden bg-[#f8fafc] dark:bg-[#0b1121] flex flex-col">
            <div className="flex-1 flex overflow-hidden">
                {/* Settings Sidebar */}
                <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151e32] overflow-y-auto">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Settings</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Manage your workspace preferences.</p>
                    </div>
                    <nav className="px-3 py-4 flex flex-col justify-between min-h-[400px]">
                        <div className="space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                                        activeTab === tab.id
                                            ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                                    )}
                                >
                                    <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-blue-600 dark:text-blue-400" : "text-slate-400")} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="pt-4 mt-8 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
                            >
                                <LogOut className="w-4 h-4" />
                                Log Out
                            </button>
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-8 lg:p-12">
                    <div className="max-w-3xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                {/* Content Switcher */}
                                {activeTab === "profile" && <ProfileSection formData={formData} onChange={handleChange} />}
                                {activeTab === "notifications" && <NotificationsSection />}
                                {activeTab === "appearance" && <AppearanceSection theme={theme || 'system'} setTheme={setTheme} />}
                                {activeTab === "security" && <SecuritySection />}
                            </motion.div>
                        </AnimatePresence>

                        {/* Floating Save Bar */}
                        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <p className="text-sm text-slate-500 dark:text-slate-500">
                                Last saved: Just now
                            </p>
                            <div className="flex gap-4">
                                <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-600/20 disabled:opacity-50 transition-all"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>
        </div>
    );
}

function ProfileSection({ formData, onChange }: { formData: any, onChange: (f: string, v: string) => void }) {
    return (
        <div>
            <SectionHeader title="Profile Information" description="Update your personal information and public profile." />

            <div className="bg-white dark:bg-[#151e32] rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden border-4 border-slate-50 dark:border-slate-800 flex items-center justify-center">
                            <User className="w-10 h-10 text-slate-500" />
                        </div>
                        <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 text-white rounded-full shadow-lg border-2 border-white dark:border-slate-800 hover:bg-blue-700 transition-colors">
                            <User className="w-3 h-3" />
                        </button>
                    </div>
                    <div>
                        <h3 className="font-medium text-slate-900 dark:text-slate-100">Profile Photo</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Min 400x400px, PNG or JPG.</p>
                        <div className="flex gap-3">
                            <button className="px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Upload New</button>
                            <button className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">Remove</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
                        <input
                            type="text"
                            value={formData.firstName || ''}
                            onChange={(e) => onChange('firstName', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 shadow-sm outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
                        <input
                            type="text"
                            value={formData.lastName || ''}
                            onChange={(e) => onChange('lastName', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 shadow-sm outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2 col-span-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="email"
                                value={formData.email || ''}
                                onChange={(e) => onChange('email', e.target.value)}
                                className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 shadow-sm outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-2 col-span-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Bio</label>
                        <textarea
                            rows={3}
                            value={formData.bio || ''}
                            onChange={(e) => onChange('bio', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 shadow-sm outline-none transition-all resize-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function NotificationsSection() {
    return (
        <div>
            <SectionHeader title="Notifications" description="Choose how you want to be notified about activity." />
            <div className="bg-white dark:bg-[#151e32] rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800 shadow-sm overflow-hidden">
                {[
                    { title: "Email Digest", desc: "Receive a daily summary of all activity in your workspaces.", default: true },
                    { title: "Mention Alerts", desc: "Get notified immediately when someone mentions you.", default: true },
                    { title: "Document Updates", desc: "Notify me when a document status changes (e.g., Draft to Verified).", default: false },
                    { title: "Security Alerts", desc: "Critical alerts regarding account access and API usage.", default: true },
                ].map((item, i) => (
                    <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">{item.title}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

function AppearanceSection({ theme, setTheme }: { theme: string, setTheme: (t: string) => void }) {
    return (
        <div>
            <SectionHeader title="Appearance" description="Customize how the INTENT platform looks on your device." />

            <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                    { id: 'light', icon: Sun, label: 'Light Mode' },
                    { id: 'dark', icon: Moon, label: 'Dark Mode' },
                    { id: 'system', icon: Laptop, label: 'System' },
                ].map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => setTheme(mode.id)}
                        className={cn(
                            "flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all",
                            theme === mode.id
                                ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-[#151e32] text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                        )}
                    >
                        <mode.icon className="w-8 h-8 mb-3" />
                        <span className="font-medium">{mode.label}</span>
                    </button>
                ))}
            </div>

            <div className="bg-white dark:bg-[#151e32] rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Accessibility</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">Reduced Motion</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Minimize animations throughout the application.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SecuritySection() {
    return (
        <div>
            <SectionHeader title="Security & Access" description="Manage your password and security settings." />

            <div className="bg-white dark:bg-[#151e32] rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-6">
                <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                        <Key className="w-4 h-4 text-blue-600" />
                        Change Password
                    </h3>
                    <div className="grid gap-4 max-w-md">
                        <input type="password" placeholder="Current Password" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none" />
                        <input type="password" placeholder="New Password" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none" />
                        <input type="password" placeholder="Confirm New Password" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-blue-600" />
                        Two-Factor Authentication
                    </h3>
                    <div className="flex items-start justify-between">
                        <div className="max-w-xl">
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">Add an extra layer of security to your account by requiring a verification code whenever you sign in.</p>
                            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded w-fit">
                                <Shield className="w-3 h-3" />
                                Enabled via Google Authenticator
                            </div>
                        </div>
                        <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Configure</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
