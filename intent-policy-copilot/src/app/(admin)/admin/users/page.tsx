"use client";

import { Search, MoreHorizontal, Shield, Trash2, Mail, UserPlus, FileUp, Filter, ChevronDown } from "lucide-react";
import { useToast } from "@/components/ui/toast-system";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AdminUsersPage() {
    const { addToast } = useToast();
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

    const handleInvite = () => {
        addToast({
            type: "success",
            title: "Invitations Sent",
            description: "Secure login links sent to 3 pending users.",
        });
    };

    const handleExport = () => {
        addToast({
            type: "info",
            title: "Exporting Data",
            description: "Generating user audit report...",
        });
    };

    return (
        <div className="flex-1 p-8 md:p-10 overflow-y-auto bg-[#f8fafc] dark:bg-[#0b1121] custom-scrollbar">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                {/* Header */}
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">User Management</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">Administer access controls, roles, and user invitations across the platform.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 transition-all shadow-sm"
                        >
                            <FileUp className="w-4 h-4" />
                            Export List
                        </button>
                        <button
                            onClick={handleInvite}
                            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
                        >
                            <UserPlus className="w-4 h-4" />
                            Invite Users
                        </button>
                    </div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-[#151e32] p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or role..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium whitespace-nowrap">
                            <Filter className="w-4 h-4" />
                            <span>Sort:</span>
                            <button className="flex items-center gap-1 text-slate-900 dark:text-slate-200 hover:text-purple-600 transition-colors">
                                Last Active
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white dark:bg-[#151e32] border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 w-10">
                                        <input type="checkbox" className="rounded-md border-slate-300 dark:border-slate-600 text-purple-600 focus:ring-purple-500" />
                                    </th>
                                    <th className="px-6 py-4">User Details</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Last Login</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {[
                                    { name: "Aditi Sharma", email: "aditi.s@intent.gov", role: "Policy Analyst", status: "Active", login: "2 mins ago", color: "blue" },
                                    { name: "Rajiv Kumar", email: "rajiv.k@intent.gov", role: "Reviewer", status: "Active", login: "45 mins ago", color: "emerald" },
                                    { name: "Sarah Jenkins", email: "sarah.j@partner.org", role: "External Auditor", status: "Pending", login: "-", color: "purple" },
                                    { name: "Vikram Singh", email: "vikram.s@intent.gov", role: "Policy Analyst", status: "Active", login: "5 hrs ago", color: "indigo" },
                                    { name: "Dr. A. Gupta", email: "a.gupta@research.inst", role: "Observer", status: "Inactive", login: "3 days ago", color: "amber" },
                                ].map((user, i) => (
                                    <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <input type="checkbox" className="rounded-md border-slate-300 dark:border-slate-600 text-purple-600 focus:ring-purple-500" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ring-2 ring-white dark:ring-slate-800 shadow-sm transition-transform group-hover:scale-110",
                                                    user.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                                                        user.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                                                            user.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                                                                user.color === 'indigo' ? 'bg-indigo-100 text-indigo-700' :
                                                                    'bg-amber-100 text-amber-700'
                                                )}>
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-slate-100">{user.name}</p>
                                                    <p className="text-xs text-slate-500 font-medium">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border",
                                                user.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900' :
                                                    user.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900' :
                                                        'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                                            )}>
                                                <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5",
                                                    user.status === 'Active' ? 'bg-emerald-500' :
                                                        user.status === 'Pending' ? 'bg-amber-500 animate-pulse' : 'bg-slate-400'
                                                )}></span>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-xs">
                                            {user.login}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-10 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-4 group-hover:translate-x-0">
                                                <button className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 rounded-lg transition-colors" title="Email User">
                                                    <Mail className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 rounded-lg transition-colors" title="Manage Access">
                                                    <Shield className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 rounded-lg transition-colors" title="Revoke Access">
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
