"use client";

import { Bell, Search, Settings, Menu, Check, ChevronsUpDown, User, Mail, LogOut, Moon, Sun, Monitor } from "lucide-react";
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
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { useState } from "react";
import { cn } from "@/lib/utils";


import { useTheme } from "next-themes";

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { currentWorkspace, availableWorkspaces, switchWorkspace } = useWorkspace();
    const [openSearch, setOpenSearch] = useState(false);
    const { setTheme, theme } = useTheme();

    const getBreadcrumb = () => {
        if (pathname === '/dashboard') return 'Governance Dashboard';
        if (pathname === '/admin/security') return 'Security & Compliance';
        if (pathname === '/admin/users') return 'Identity Management';
        if (pathname === '/admin/api') return 'API Configuration';
        if (pathname === '/admin/workspaces') return 'User Workspaces';
        if (pathname === '/admin/health') return 'System Health';
        if (pathname.startsWith('/admin')) return 'System Administration';
        const segment = pathname.split('/')[1];
        return segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : 'Dashboard';
    };

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
                            </DropdownMenu>
                        </div>
                    )}
                    <h1 className="text-lg font-bold text-foreground leading-none">{getBreadcrumb()}</h1>
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                {/* Functional Search Popover */}
                <div className="relative hidden md:block">
                    <Popover open={openSearch} onOpenChange={setOpenSearch}>
                        <PopoverTrigger asChild>
                            <div className="relative group cursor-text">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                <input
                                    readOnly
                                    placeholder="Search platform..."
                                    className="pl-9 pr-4 py-2 bg-surface border border-border rounded-full text-sm w-64 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm cursor-text"
                                    onClick={() => setOpenSearch(true)}
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-0.5">
                                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                        <span className="text-xs">⌘</span>K
                                    </kbd>
                                </div>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-[400px]" align="end">
                            <Command>
                                <CommandInput placeholder="Type a command or search..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup heading="Suggestions">
                                        <CommandItem onSelect={() => setOpenSearch(false)}>
                                            <Search className="mr-2 h-4 w-4" />
                                            <span>Search Policies</span>
                                        </CommandItem>
                                        <CommandItem onSelect={() => setOpenSearch(false)}>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Director Profile</span>
                                        </CommandItem>
                                    </CommandGroup>
                                    <CommandGroup heading="Recent Files">
                                        <CommandItem onSelect={() => setOpenSearch(false)}>
                                            <span className="mr-2 text-lg">📄</span>
                                            <span>CESL_Framework_v2.pdf</span>
                                        </CommandItem>
                                        <CommandItem onSelect={() => setOpenSearch(false)}>
                                            <span className="mr-2 text-lg">📊</span>
                                            <span>Q1_Budget_Analysis.xlsx</span>
                                        </CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="h-6 w-px bg-border mx-2"></div>

                {/* Functional Notifications */}
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-colors relative outline-none focus:bg-primary/5">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-80 p-0">
                        <div className="p-4 border-b border-border bg-slate-50/50">
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold leading-none">Notifications</h4>
                                <span className="text-xs text-muted-foreground">3 Unread</span>
                            </div>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                            {[
                                { title: "Policy Update", desc: "Vietnam E-Bus roadmap has been updated by Ministry.", time: "10m ago", read: false },
                                { title: "System Alert", desc: "Scheduled maintenance tonight at 02:00 AM.", time: "2h ago", read: false },
                                { title: "Document Shared", desc: "Sarah shared 'Q4 Financials' with you.", time: "5h ago", read: true },
                            ].map((notif, i) => (
                                <div key={i} className={cn("p-4 border-b border-border last:border-0 hover:bg-slate-50 transition-colors cursor-pointer", !notif.read && "bg-blue-50/30")}>
                                    <div className="flex justify-between items-start mb-1">
                                        <span className={cn("font-medium text-sm", !notif.read && "text-primary")}>{notif.title}</span>
                                        <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-snug">{notif.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="p-2 border-t border-border bg-slate-50/50">
                            <button className="w-full text-xs text-center py-2 text-primary hover:underline">View all notifications</button>
                        </div>
                    </PopoverContent>
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
