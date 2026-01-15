"use client";

import { Bell, Settings, Menu, Check, ChevronsUpDown, LogOut, Moon, Sun, Monitor, FileText, Activity } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useWorkspace } from "@/context/WorkspaceContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";


import { useTheme } from "next-themes";

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { currentWorkspace, availableWorkspaces, switchWorkspace } = useWorkspace();
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const breadcrumb = useMemo(() => {
        if (pathname === '/dashboard') return 'Governance Dashboard';
        if (pathname === '/admin/security') return 'Security & Compliance';
        if (pathname === '/admin/users') return 'Identity Management';
        if (pathname === '/admin/api') return 'API Configuration';
        if (pathname === '/admin/workspaces') return 'User Workspaces';
        if (pathname === '/admin/health') return 'System Health';
        if (pathname.startsWith('/admin')) return 'System Administration';
        const segment = pathname.split('/')[1];
        return segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : 'Dashboard';
    }, [pathname]);

    return (
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8 transition-all">
            {/* Left Context: Fully functional Workspace Switcher */}
            <div className="flex items-center gap-4">
                <button className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground">
                    <menu className="w-5 h-5" />
                </button>
                <div className="flex flex-col">
                    {!pathname.startsWith('/admin') && (
                        <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-0.5">
                            <span className="uppercase tracking-wider">Workspace</span>
                            <span className="text-slate-300">•</span>

                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1.5 focus:outline-none group rounded-md hover:bg-muted/50 px-1 -ml-1 transition-all">
                                    <span className={cn("font-bold text-primary group-hover:underline decoration-primary/30 underline-offset-2")}>{currentWorkspace.name}</span>
                                    <ChevronsUpDown className="w-3 h-3 text-muted-foreground" />
                                </DropdownMenuTrigger>
                                {mounted && (
                                    <DropdownMenuContent align="start" className="w-56">
                                        <DropdownMenuLabel>Switch Workspace</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {availableWorkspaces.map((ws) => (
                                            <DropdownMenuItem
                                                key={ws.id}
                                                onClick={() => switchWorkspace(ws.id)}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">{ws.flag}</span>
                                                    <span>{ws.name}</span>
                                                </div>
                                                {currentWorkspace.id === ws.id && <Check className="w-4 h-4 text-primary" />}
                                            </DropdownMenuItem>
                                        ))}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => router.push('/workspaces')}
                                            className="text-muted-foreground cursor-pointer"
                                        >
                                            <span className="flex items-center justify-center w-5 h-5 border border-dashed border-slate-300 rounded mr-2">+</span>
                                            Create New Workspace
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                )}
                            </DropdownMenu>
                        </div>
                    )}
                    <h1 className="text-lg font-bold text-foreground leading-none">{breadcrumb}</h1>
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">


                <div className="h-6 w-px bg-border mx-2"></div>

                {/* Functional Notifications */}
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="p-2.5 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-2xl transition-all relative group outline-none focus:bg-primary/5 active:scale-95">
                            <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background shadow-[0_0_8px_rgba(59,130,246,0.5)] animate-pulse"></span>
                        </button>
                    </PopoverTrigger>
                    {mounted && (
                        <PopoverContent align="end" className="w-[380px] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl rounded-3xl">
                            {/* ... Content ... */}
                            <div className="p-5 border-b border-border/50 bg-muted/30">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base">InBox</h4>
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">3 Unread Alerts</p>
                                    </div>
                                    <button className="text-[11px] font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 px-3 py-1.5 rounded-full border border-primary/10">
                                        Mark all as read
                                    </button>
                                </div>
                            </div>
                            <div className="max-h-[380px] overflow-y-auto custom-scrollbar">
                                {[
                                    {
                                        title: "Policy Update",
                                        desc: "Vietnam E-Bus roadmap has been updated by the Ministry of Transport.",
                                        time: "10m ago",
                                        read: false,
                                        icon: FileText,
                                        color: "blue"
                                    },
                                    {
                                        title: "Integrity Alert",
                                        desc: "Scheduled maintenance for the Knowledge Ledger tonight at 02:00 AM.",
                                        time: "2h ago",
                                        read: false,
                                        icon: Activity,
                                        color: "amber"
                                    },
                                    {
                                        title: "Document Shared",
                                        desc: "Sarah Mehta shared 'Q4 Financial Frameworks' for your review.",
                                        time: "5h ago",
                                        read: true,
                                        icon: LogOut,
                                        color: "emerald"
                                    },
                                ].map((notif, i) => (
                                    <div key={i} className={cn(
                                        "p-5 flex gap-4 border-b border-border/40 last:border-0 hover:bg-muted/50 transition-all cursor-pointer group",
                                        !notif.read && "bg-primary/[0.02]"
                                    )}>
                                        <div className={cn(
                                            "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110",
                                            notif.color === 'blue' ? "bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20 text-blue-600" :
                                                notif.color === 'amber' ? "bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20 text-amber-600" :
                                                    "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-600"
                                        )}>
                                            <notif.icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1 gap-2">
                                                <span className={cn("font-bold text-sm tracking-tight", !notif.read ? "text-slate-900 dark:text-slate-100" : "text-muted-foreground")}>
                                                    {notif.title}
                                                </span>
                                                <span className="text-[10px] font-bold text-muted-foreground/60 whitespace-nowrap mt-0.5 uppercase tracking-tighter">
                                                    {notif.time}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                                {notif.desc}
                                            </p>
                                            {!notif.read && (
                                                <div className="mt-2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 bg-muted/10 border-t border-border/50">
                                <button className="w-full text-[11px] font-black uppercase tracking-widest text-center py-3 text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-2 group">
                                    View Intelligence Feed
                                    <ChevronsUpDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
                                </button>
                            </div>
                        </PopoverContent>
                    )}
                </Popover>

                {/* Direct Settings Link */}
                <button
                    onClick={() => router.push('/settings')}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors outline-none focus:bg-muted"
                >
                    <Settings className="w-5 h-5" />
                </button>

            </div>
        </header>
    );
}
