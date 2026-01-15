"use client";

import { Plus, Globe2, MoreHorizontal, X, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast-system";

// Utility to get flag from country name
const countryToFlag: Record<string, string> = {
    "india": "🇮🇳",
    "vietnam": "🇻🇳",
    "indonesia": "🇮🇩",
    "thailand": "🇹🇭",
    "singapore": "🇸🇬",
    "malaysia": "🇲🇾",
    "philippines": "🇵🇭",
    "vietnam exchange": "🇻🇳",
    "india exchange": "🇮🇳",
    "indonesia exchange": "🇮🇩",
    "usa": "🇺🇸",
    "united states": "🇺🇸",
    "united kingdom": "🇬🇧",
    "uk": "🇬🇧",
    "germany": "🇩🇪",
    "france": "🇫🇷",
    "japan": "🇯🇵",
    "south korea": "🇰🇷",
    "brazil": "🇧🇷",
};

const getFlag = (name: string) => {
    const lower = name.toLowerCase().trim();
    // Try exact match
    if (countryToFlag[lower]) return countryToFlag[lower];
    // Try contains match
    for (const key in countryToFlag) {
        if (lower.includes(key)) return countryToFlag[key];
    }
    return "🌍"; // Default globe
};

import { useRouter } from "next/navigation";

export default function WorkspacesPage() {
    const { availableWorkspaces, addWorkspace, switchWorkspace } = useWorkspace();
    const router = useRouter();
    const { addToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "" });

    const handleWorkspaceSelect = (id: string) => {
        switchWorkspace(id);
        router.push('/workspace');
    };

    const handleAddWorkspace = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) return;

        const flag = getFlag(formData.name);
        const id = formData.name.toLowerCase().replace(/\s+/g, '-');

        addWorkspace({
            id,
            name: formData.name,
            flag: flag
        });

        setIsModalOpen(false);
        setFormData({ name: "" });
        addToast({
            title: "Workspace Created",
            description: `${formData.name} has been added to your deployments.`,
            type: "success"
        });
    };

    const detectedFlag = formData.name ? getFlag(formData.name) : "🌍";

    return (
        <div className="flex-1 overflow-y-auto px-8 pb-12 pt-4 relative">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">My Workspaces</h2>
                    <p className="text-sm text-muted-foreground mt-1">Manage country-specific policy environments.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Workspace</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableWorkspaces.map((ws) => (
                    <div
                        key={ws.id}
                        onClick={() => handleWorkspaceSelect(ws.id)}
                        className="bg-surface rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all p-6 group cursor-pointer relative overflow-hidden active:scale-[0.98]"
                    >
                        <Link href="/workspace" className="absolute inset-0 z-0" />

                        <div className="absolute top-0 right-0 p-4 z-10">
                            <MoreHorizontal className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                        </div>

                        <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 border border-white/20 shadow-sm transition-transform group-hover:scale-110 duration-300 text-white",
                            ws.color || "bg-slate-500"
                        )}>
                            <span className="drop-shadow-sm">{ws.flag}</span>
                        </div>

                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors relative z-10">{ws.name}</h3>
                        <p className="text-sm text-muted-foreground mb-6 relative z-10">Policy Implementation & Analysis</p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4 relative z-10">
                            <div className="flex items-center gap-2 font-medium">
                                <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                                <span className="text-success">Live Ready</span>
                            </div>
                            <span>8 Members</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Workspace Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-surface w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
                        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/30">
                            <div className="flex items-center gap-2">
                                <LayoutGrid className="w-4 h-4 text-primary" />
                                <h3 className="font-bold text-foreground">Create New Workspace</h3>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-muted rounded-full transition-colors">
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>

                        <form onSubmit={handleAddWorkspace} className="p-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-3xl border border-border shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                                    {detectedFlag}
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-foreground mb-1.5">Workspace Name</label>
                                    <input
                                        autoFocus
                                        type="text"
                                        className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground"
                                        placeholder="e.g. Thailand Exchange"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <p className="text-[10px] text-muted-foreground mt-2 italic">
                                        Detecting region: {formData.name ? (detectedFlag !== "🌍" ? "Matched" : "Unknown (Global)") : "Type a country..."}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!formData.name.trim()}
                                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                            >
                                Deploy Workspace
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
