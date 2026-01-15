"use client";

import { Plus, Globe2, MoreHorizontal } from "lucide-react";
import Link from "next/link";

const workspaces = [
    { id: 1, country: "Vietnam", flag: "🇻🇳", status: "Active", members: 8, lastActive: "Just now" },
    { id: 2, country: "India", flag: "🇮🇳", status: "Active", members: 12, lastActive: "2 hours ago" },
    { id: 3, country: "Indonesia", flag: "🇮🇩", status: "Setup", members: 3, lastActive: "1 day ago" },
];

export default function WorkspacesPage() {
    return (
        <div className="flex-1 overflow-y-auto px-8 pb-12 pt-4">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">My Workspaces</h2>
                    <p className="text-sm text-muted-foreground mt-1">Manage country-specific policy environments.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4" />
                    <span>New Workspace</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workspaces.map((ws) => (
                    <Link href="/workspace" key={ws.id} className="bg-surface rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all p-6 group cursor-pointer relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <MoreHorizontal className="w-5 h-5 text-muted-foreground hover:text-foreground z-10 relative" />
                        </div>

                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl mb-4 border border-border">
                            {ws.flag}
                        </div>

                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{ws.country} Exchange</h3>
                        <p className="text-sm text-muted-foreground mb-6">Policy Implementation & Analysis</p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4">
                            <div className="flex items-center gap-2">
                                <Globe2 className="w-3 h-3" />
                                <span>{ws.status}</span>
                            </div>
                            <span>{ws.members} Members</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
