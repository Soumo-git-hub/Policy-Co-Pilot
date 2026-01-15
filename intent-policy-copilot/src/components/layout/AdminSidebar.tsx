"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutGrid,
    Shield,
    Database,
    Lock,
    Home,
    Settings,
    ChevronDown,
    FileCode,
    Activity
} from "lucide-react";

// Admin-specific navigation items
const navItems = [
    { icon: Home, label: "Admin Home", href: "/admin/overview" },
    { icon: LayoutGrid, label: "User Workspaces", href: "/admin/workspaces" },
    { icon: Settings, label: "User Management", href: "/admin/users" },
    { icon: Database, label: "Source Control & Data Integrity", href: "/admin/dashboard" },
    { icon: Activity, label: "System Health", href: "/admin/health" },
];

const secondaryNav = [
    { icon: Lock, label: "Security & Audit Log", href: "/admin/security" },
    { icon: FileCode, label: "API Configuration", href: "/admin/api" },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-[280px] bg-sidebar border-r border-sidebar-border flex flex-col h-screen transition-all duration-300 z-50 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
            {/* Brand */}
            <div className="p-6 pb-4">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 bg-purple-600/10 rounded-xl flex items-center justify-center border border-purple-600/10 shadow-sm shrink-0">
                        <Shield className="text-purple-600 w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold tracking-tight text-foreground leading-none">INTENT</span>
                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mt-0.5">System Admin</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8 custom-scrollbar">
                {/* Main Section */}
                <div className="space-y-1">
                    <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Administration</div>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                                    isActive
                                        ? "bg-purple-600/5 text-purple-600 shadow-sm ring-1 ring-purple-600/10"
                                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                )}
                            >
                                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-purple-600 rounded-r-full" />}
                                <item.icon
                                    className={cn(
                                        "w-4 h-4 transition-colors",
                                        isActive ? "text-purple-600" : "text-muted-foreground group-hover:text-foreground"
                                    )}
                                />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Secondary Section */}
                <div className="space-y-1">
                    <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Configuration</div>
                    {secondaryNav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 group"
                        >
                            <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Admin Profile */}
            <div className="p-4 border-t border-sidebar-border bg-sidebar/50 backdrop-blur-sm">
                <Dropdown />
            </div>
        </aside>
    );
}

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

function Dropdown() {
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-sidebar-accent transition-all duration-200 text-left border border-transparent hover:border-sidebar-border group outline-none">
                    <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm flex items-center justify-center">
                            <User className="w-6 h-6 text-slate-500" />
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-purple-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate group-hover:text-purple-600 transition-colors">
                            System Admin
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            Root Access
                        </p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-2" align="start" side="top">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>Switch to Analyst View</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-red-600 cursor-pointer flex items-center gap-2"
                    onClick={() => router.push("/")}
                >
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
