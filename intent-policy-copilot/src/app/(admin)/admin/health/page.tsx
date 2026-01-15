"use client";

import { Activity, Server, Cpu, Database, Zap, Clock, ShieldCheck, BarChart3, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Area, AreaChart, ResponsiveContainer, YAxis, XAxis, Tooltip } from "recharts";

const performanceData = [
    { time: '10:00', load: 12 }, { time: '10:05', load: 15 }, { time: '10:10', load: 10 },
    { time: '10:15', load: 18 }, { time: '10:20', load: 22 }, { time: '10:25', load: 14 },
    { time: '10:30', load: 12 },
];

export default function AdminHealthPage() {
    return (
        <div className="flex-1 p-8 md:p-10 overflow-y-auto bg-[#f8fafc] dark:bg-[#0b1121] custom-scrollbar">
            <div className="max-w-6xl mx-auto flex flex-col gap-10">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Infrastructure Health</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">Global system performance and infrastructure observability.</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold border border-emerald-100 dark:border-emerald-800 shadow-sm">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Live Monitoring Active
                    </div>
                </div>

                {/* Primary Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <HealthMetricCard
                        title="API Latency"
                        value="42ms"
                        icon={Activity}
                        color="blue"
                        trend="Normal"
                    />
                    <HealthMetricCard
                        title="CPU Utilization"
                        value="18.4%"
                        icon={Cpu}
                        color="purple"
                        trend="Optimal"
                    />
                    <HealthMetricCard
                        title="DB Nodes"
                        value="8 Active"
                        icon={Database}
                        color="indigo"
                        trend="Stable"
                    />
                    <HealthMetricCard
                        title="Queue Depth"
                        value="0 Ready"
                        icon={Zap}
                        color="emerald"
                        trend="Idle"
                    />
                </div>

                {/* Detailed Performance Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Performance Graph */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#151e32] rounded-3xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-indigo-500" />
                                    Global Server Load
                                </h3>
                                <p className="text-sm text-slate-500 font-medium">Infrastructure strain over last 30 minutes</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase">
                                    <TrendingUp className="w-4 h-4" />
                                    Under Capacity
                                </span>
                            </div>
                        </div>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData}>
                                    <defs>
                                        <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="time" hide />
                                    <YAxis hide domain={[0, 40]} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="load" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Service Status Column */}
                    <div className="bg-white dark:bg-[#151e32] rounded-3xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm flex flex-col">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-slate-400" />
                            Uptime Log
                        </h3>
                        <div className="space-y-6 flex-1">
                            <StatusItem label="API Gateway" status="Operational" />
                            <StatusItem label="Vector Analytics" status="Operational" />
                            <StatusItem label="Auth Service" status="Operational" />
                            <StatusItem label="CDN Edge" status="Operational" />
                            <StatusItem label="Background Jobs" status="Idle" />
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <button className="w-full py-3 bg-slate-900 dark:bg-slate-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-colors">
                                View Full Status Page
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function StatusItem({ label, status }: { label: string, status: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{label}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md ring-1 ring-emerald-100 dark:ring-emerald-900/50">
                {status}
            </span>
        </div>
    )
}

function HealthMetricCard({ title, value, icon: Icon, color, trend }: any) {
    const colors: Record<string, string> = {
        blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 ring-blue-100 dark:ring-blue-900/50",
        purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 ring-purple-100 dark:ring-purple-900/50",
        indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 ring-indigo-100 dark:ring-indigo-900/50",
        emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 ring-emerald-100 dark:ring-emerald-900/50",
    };

    return (
        <div className="bg-white dark:bg-[#151e32] p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm group hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className={cn("p-2.5 rounded-2xl ring-1", colors[color])}>
                    <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{trend}</span>
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
                <div className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{value}</div>
            </div>
            {/* Subtle bg decoration */}
            <div className="absolute -bottom-2 -right-2 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <Icon className="w-24 h-24" />
            </div>
        </div>
    );
}
