"use client";

import {
    Plus,
    FileText,
    TrendingUp,
    ShieldCheck,
    History,
    Filter,
    Download,
    MoreVertical,
    File,
    Archive,
    CheckCircle2,
    ArrowDown,
    Braces,
    FileCheck,
    Activity,
    Search,
    ChevronRight,
    SearchIcon
} from "lucide-react";
import { useToast } from "@/components/ui/toast-system";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
    const { addToast } = useToast();
    const [ledgerItems, setLedgerItems] = useState([
        { id: 1, file: "India Grand Challenge Framework.pdf", date: "Jan 06, 2026", status: "active", tier: "master", type: "pdf" },
        { id: 2, file: "Federal Data Privacy Act.docx", date: "Jan 05, 2026", status: "active", tier: "master", type: "word" },
        { id: 3, file: "Regional Compliance V2.pdf", date: "Dec 28, 2025", status: "inactive", tier: "archived", type: "pdf" }
    ]);

    const handleAddSource = () => {
        addToast({
            type: "success",
            title: "Action Initiated",
            description: "Opening verification workflow for new source...",
        });
    };

    const handleToggleStatus = (id: number) => {
        setLedgerItems(prev => prev.map(item => {
            if (item.id === id) {
                const newStatus = item.status === 'active' ? 'inactive' : 'active';
                addToast({
                    type: newStatus === 'active' ? 'success' : 'info',
                    title: newStatus === 'active' ? 'Source Activated' : 'Source Deactivated',
                    description: `${item.file} is now ${newStatus === 'active' ? 'live' : 'offline'} in the knowledge base.`,
                });
                return { ...item, status: newStatus };
            }
            return item;
        }));
    };

    return (
        <div className="flex flex-1 overflow-hidden relative bg-[#f8fafc] dark:bg-[#0b1121]">
            {/* Center Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-y-auto p-8 md:p-10 gap-10 custom-scrollbar">

                {/* Header Section */}
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            System Integrity Node
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Source Control & Data Integrity</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Manage and verify authoritative policy sources within the intelligence ledger.</p>
                    </div>
                    <button
                        onClick={handleAddSource}
                        className="flex items-center gap-2 bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-indigo-500/20 transition-all text-sm font-bold tracking-wide active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        Add Verified Source
                    </button>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                        title="Authored Sources"
                        value="142"
                        trend="+12 this month"
                        icon={FileCheck}
                        color="indigo"
                    />
                    <MetricCard
                        title="Extraction Accuracy"
                        value="99.8%"
                        trend="Consistent performance"
                        icon={Activity}
                        color="emerald"
                    />
                    <MetricCard
                        title="Audit Cycle"
                        value="Active"
                        trend="Live auto-scan"
                        icon={History}
                        color="purple"
                    />
                </div>

                {/* Main Ledger Section */}
                <div className="flex flex-col gap-6 flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 italic">Central Intelligence Ledger</h3>
                        <div className="flex items-center gap-4 bg-white dark:bg-[#151e32] p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                <input type="text" placeholder="Search ledger..." className="pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-900 border-none rounded-lg text-xs font-medium focus:ring-0 w-48" />
                            </div>
                            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
                            <button className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors">
                                <Filter className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors">
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#151e32] rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                                        <th className="px-8 py-5">Policy Document</th>
                                        <th className="px-8 py-5">Verification Date</th>
                                        <th className="px-8 py-5">Knowledge Status</th>
                                        <th className="px-8 py-5">Source Tier</th>
                                        <th className="px-8 py-5 text-right w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-slate-800 text-sm">
                                    {ledgerItems.map((item) => (
                                        <TableRow
                                            key={item.id}
                                            {...item}
                                            onToggle={() => handleToggleStatus(item.id)}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar (Logic Viewer) */}
            <aside className="w-[400px] bg-white dark:bg-[#0b1121] border-l border-slate-200 dark:border-slate-800 h-full overflow-y-auto shrink-0 hidden xl:flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
                <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-[#0b1121]/50 backdrop-blur-xl sticky top-0 z-10">
                    <div className="flex items-center gap-2 text-indigo-500 font-bold text-[10px] uppercase tracking-widest mb-3">
                        <Braces className="w-3.5 h-3.5" />
                        Intelligence Panel
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">Document Insights</h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">Deep-entity extraction and cross-reference validation for selected source.</p>
                </div>

                <div className="p-8 flex flex-col gap-8">
                    <LogicItem
                        property="Payment Security"
                        value='"3-Month Fund"'
                        match={100}
                        active={true}
                    />
                    <LogicItem
                        property="Jurisdiction"
                        value='"Federal (All States)"'
                        match={98}
                        active={false}
                    />
                    <LogicItem
                        property="Effective Date"
                        value='"Q1 2026"'
                        match={null}
                        active={false}
                        verified={true}
                    />
                </div>
            </aside>
        </div>
    );
}

// Subcomponents for cleaner code
function MetricCard({ title, value, trend, icon: Icon, color }: any) {
    const colors: Record<string, string> = {
        indigo: "text-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20 ring-indigo-100 dark:ring-indigo-900/50",
        emerald: "text-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/20 ring-emerald-100 dark:ring-emerald-900/50",
        purple: "text-purple-600 bg-purple-50/50 dark:bg-purple-900/20 ring-purple-100 dark:ring-purple-900/50",
    };

    return (
        <div className="bg-white dark:bg-[#151e32] p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden active:scale-[0.98]">
            <div className="flex items-center justify-between mb-6 relative z-10">
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">{title}</p>
                <div className={cn("p-3 rounded-2xl ring-1 transition-transform group-hover:scale-110 duration-500", colors[color])}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            <div className="relative z-10">
                <p className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tighter">{value}</p>
                <div className="mt-2 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{trend}</span>
                </div>
            </div>
            {/* Background decoration */}
            <div className="absolute -bottom-4 -right-4 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <Icon className="w-32 h-32" />
            </div>
        </div>
    );
}

function TableRow({ file, date, status, tier, type, onToggle }: any) {
    return (
        <tr className={cn(
            "group hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-all cursor-pointer",
            status === 'active' ? "" : "opacity-60 hover:opacity-100 bg-slate-50/30"
        )}>
            <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ring-1 ring-white dark:ring-slate-800",
                        type === 'pdf' ? "bg-red-50 text-red-600 dark:bg-red-900/20" : "bg-blue-50 text-blue-600 dark:bg-blue-900/20"
                    )}>
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">{file}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{type} manifest</span>
                    </div>
                </div>
            </td>
            <td className="px-8 py-6 text-slate-500 font-semibold text-xs tracking-tighter">{date}</td>
            <td className="px-8 py-6">
                <button onClick={onToggle} className="flex items-center gap-3 focus:outline-none group/toggle">
                    <motion.div
                        initial={false}
                        animate={{
                            scale: status === 'active' ? 1.05 : 1,
                            backgroundColor: status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(241, 245, 249, 1)'
                        }}
                        className={cn(
                            "inline-flex items-center px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] border shadow-sm transition-all duration-300",
                            status === 'active'
                                ? 'text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800'
                                : 'text-slate-400 border-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:border-slate-700'
                        )}
                    >
                        <motion.span
                            animate={{
                                scale: status === 'active' ? [1, 1.3, 1] : 1,
                                opacity: status === 'active' ? 1 : 0.5
                            }}
                            transition={{ repeat: status === 'active' ? Infinity : 0, duration: 2 }}
                            className={cn("w-2 h-2 rounded-full mr-2.5",
                                status === 'active' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-slate-400'
                            )}
                        />
                        <span className="relative">
                            {status === 'active' ? 'Live Knowledge' : 'Ledger Offline'}
                        </span>
                    </motion.div>
                </button>
            </td>
            <td className="px-8 py-6">
                {tier === 'master' ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Master Source
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        <Archive className="w-3.5 h-3.5" />
                        Archived
                    </span>
                )}
            </td>
            <td className="px-8 py-6 text-right">
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-600 transition-all">
                    <ChevronRight className="w-5 h-5" />
                </button>
            </td>
        </tr>
    );
}

function LogicItem({ property, value, match, active, verified }: any) {
    return (
        <div className="relative pl-8 pb-10 border-l-2 border-slate-100 dark:border-slate-800 last:border-0 last:pb-0 group">
            <div className={cn(
                "absolute -left-[9px] top-0 h-4 w-4 rounded-full border-4 border-white dark:border-[#0b1121] ring-1 ring-slate-200 dark:ring-slate-700 transition-all duration-500 group-hover:scale-125",
                active ? "bg-indigo-600" : "bg-slate-300"
            )}></div>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{property}</span>
                    {match && (
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md border border-emerald-100 dark:border-emerald-900/50 shadow-sm">
                            {match}% MATCH
                        </span>
                    )}
                    {verified && (
                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md border border-blue-100 dark:border-blue-900/50 shadow-sm">
                            SECURE
                        </span>
                    )}
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 font-mono text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    Verification Protocol: <span className="text-slate-900 dark:text-slate-200 ml-2">{property === 'Jurisdiction' ? 'Regional Domain' : property === 'Effective Date' ? 'Sunset Clock' : 'Entity Shield'}</span>
                </div>
                <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/30 font-mono text-xs text-indigo-700 dark:text-indigo-400 font-bold flex items-center justify-between shadow-sm relative overflow-hidden group-hover:shadow-indigo-500/10 transition-shadow">
                    <span className="relative z-10">{value}</span>
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 relative z-10" />
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/20"></div>
                </div>
            </div>
        </div>
    );
}

