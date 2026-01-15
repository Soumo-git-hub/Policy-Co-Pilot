"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutGrid,
    Home,
    FileText,
    PieChart,
    ChevronDown,
    Settings,
    ShieldAlert,
    MessageSquare,
    User
} from "lucide-react";

// Updated routing to match requested structure
const navItems = [
    { icon: Home, label: "Governance Dashboard", href: "/dashboard" },
    { icon: MessageSquare, label: "Policy Chat", href: "/workspace" },
    { icon: LayoutGrid, label: "My Workspaces", href: "/workspaces" },
    { icon: FileText, label: "Document Library", href: "/documents" },
    { icon: PieChart, label: "Analytics", href: "/analytics" },
];

const secondaryNav = [
    { icon: Settings, label: "Settings", href: "/settings" },
];

import { useWorkspace } from "@/context/WorkspaceContext";

export function Sidebar() {
    const pathname = usePathname();
    const { currentWorkspace, userProfile } = useWorkspace();

    return (
        <aside className="w-[280px] bg-sidebar border-r border-sidebar-border flex flex-col h-screen transition-all duration-300 z-50 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
            {/* Brand */}
            <div className="p-6 pb-4">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/10 shadow-sm shrink-0">
                        <LayoutGrid className="text-primary w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold tracking-tight text-foreground leading-none">INTENT</span>
                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mt-0.5">Platform</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8 custom-scrollbar">
                {/* Main Section */}
                <div className="space-y-1">
                    <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Main</div>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                                    isActive
                                        ? "bg-primary/5 text-primary shadow-sm ring-1 ring-primary/10"
                                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                )}
                            >
                                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full" />}
                                <item.icon
                                    className={cn(
                                        "w-4 h-4 transition-colors",
                                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                    )}
                                />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Secondary Section Removed as per request */}

            </div>

            {/* User Profile */}
            <div className="p-4 border-t border-sidebar-border bg-sidebar/50 backdrop-blur-sm">
                <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-sidebar-accent transition-all duration-200 text-left border border-transparent hover:border-sidebar-border group">
                    <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm flex items-center justify-center">
                            <User className="w-6 h-6 text-slate-500" />
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white dark:border-slate-800"></span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                            {userProfile?.firstName || 'User'} {userProfile?.lastName || 'Name'}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            Workspace Admin
                        </p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>
            </div>
        </aside>
    );
}
