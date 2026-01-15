"use client";

import { Search, MoreHorizontal, Shield, Trash2, ExternalLink, Globe, LayoutGrid } from "lucide-react";
import { useToast } from "@/components/ui/toast-system";
import { cn } from "@/lib/utils";

export default function AdminWorkspacesPage() {
    const { addToast } = useToast();

    const handleAction = (action: string) => {
        addToast({
            type: "info",
            title: "Workspace Action",
            description: `Simulating ${action} sequence for management.`,
        });
    };

    return (
        <div className="flex-1 p-8 md:p-10 overflow-y-auto bg-[#f8fafc] dark:bg-[#0b1121] custom-scrollbar">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Organization Workspaces</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">Oversee, audit, and manage high-level policy containers across the department.</p>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find workspace..."
                            className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all w-64 font-medium"
                        />
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white dark:bg-[#151e32] border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-8 py-5">Workspace Name</th>
                                    <th className="px-8 py-5">Owner / Department</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5">Security Level</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {[
                                    { name: "Urban Planning Framework", owner: "Aditi Sharma", dept: "Municipal", level: "Critical", status: "Active", icon: Globe },
                                    { name: "Digital Trade Policy", owner: "Rajiv Kumar", dept: "Commerce", level: "Standard", status: "Active", icon: LayoutGrid },
                                    { name: "Public Health Safety", owner: "Vikram Singh", dept: "Health", level: "Critical", status: "Active", icon: Shield },
                                    { name: "Education Reform 2025", owner: "Sarah Jenkins", dept: "Education", level: "Restricted", status: "Review", icon: LayoutGrid },
                                    { name: "Infrastructure Audit", owner: "System Bot", dept: "Logistics", level: "High", status: "Active", icon: Globe },
                                ].map((item, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors group cursor-default">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-100 dark:ring-indigo-900/50">
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                                <span className="font-bold text-slate-900 dark:text-slate-100 text-base">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-700 dark:text-slate-300">{item.owner}</span>
                                                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold mt-0.5">{item.dept}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={cn(
                                                "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                                                item.status === 'Active' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                            )}>
                                                <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", item.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse')}></span>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className={cn(
                                                        "h-full rounded-full transition-all duration-1000",
                                                        item.level === 'Critical' ? 'w-full bg-red-500' :
                                                            item.level === 'High' ? 'w-3/4 bg-amber-500' :
                                                                item.level === 'Restricted' ? 'w-1/2 bg-purple-500' : 'w-1/3 bg-blue-500'
                                                    )}></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">{item.level}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                                                <button
                                                    onClick={() => handleAction("audit")}
                                                    className="p-2.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all"
                                                    title="Security Audit"
                                                >
                                                    <Shield className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleAction("view")}
                                                    className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all"
                                                    title="Jump to Workspace"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleAction("delete")}
                                                    className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                                                    title="Archive"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
