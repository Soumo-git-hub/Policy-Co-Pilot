"use client";

import Link from "next/link";
import { Activity, Users, Globe, PlayCircle, TrendingUp, TrendingDown, Shield, Zap, Server, ArrowUpRight } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

// Mock Data for Chart
const performanceData = [
    { name: "00:00", ms: 320 }, { name: "04:00", ms: 280 }, { name: "08:00", ms: 450 },
    { name: "12:00", ms: 180 }, { name: "16:00", ms: 120 }, { name: "20:00", ms: 85 },
    { name: "23:59", ms: 45 },
];

export default function AdminOverviewPage() {
    return (
        <div className="flex-1 p-8 md:p-10 overflow-y-auto bg-[#f8fafc] space-y-8 custom-scrollbar">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">System Administration</h2>
                        <p className="text-slate-500 mt-2">Real-time system oversight and platform metrics.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
                            <Activity className="w-3 h-3 animate-pulse" />
                            All Systems Operational
                        </div>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Link href="/admin/users" className="block group">
                        <StatCard
                            title="Total Users"
                            value="2,543"
                            icon={Users}
                            trend="+12%"
                            color="blue"
                            desc="Active accounts"
                        />
                    </Link>
                    <StatCard
                        title="Workspaces"
                        value="856"
                        icon={Globe}
                        trend="+5%"
                        color="purple"
                        desc="Across 3 regions"
                    />
                    <StatCard
                        title="Server Uptime"
                        value="99.9%"
                        icon={Server}
                        trend="Stable"
                        color="emerald"
                        desc="Last 30 days"
                    />
                    <StatCard
                        title="API Calls"
                        value="1.2M"
                        icon={Zap}
                        trend="+8%"
                        color="amber"
                        desc="Total requests today"
                    />
                </div>

                {/* Main Content Info Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Main Chart Section */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Average Response Time</h3>
                                <p className="text-sm text-slate-500">Global API latency (ms) over last 24h</p>
                            </div>
                            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                                <TrendingDown className="w-3 h-3" />
                                -85% Latency
                            </span>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#94a3b8' }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#94a3b8' }}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.1)' }}
                                        cursor={{ stroke: '#10b981', strokeWidth: 1 }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="ms"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorTraffic)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Activity Column */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Live Audit Log</h3>
                            <button className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1">
                                View Full
                                <ArrowUpRight className="w-3 h-3" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                            <ActivityItem
                                time="Just now"
                                message="New Master Source uploaded: 'FAME_II_Review_2025.pdf'"
                                type="info"
                                user="Admin"
                            />
                            <ActivityItem
                                time="15m ago"
                                message="Suspicious login attempt blocked from IP 45.2.1.1"
                                type="alert"
                                user="System"
                            />
                            <ActivityItem
                                time="1h ago"
                                message="Automated Compliance Scan completed for Workspace #8842"
                                type="success"
                                user="Bot"
                            />
                            <ActivityItem
                                time="2h ago"
                                message="API Key rotation scheduled for midnight"
                                type="info"
                                user="System"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActivityItem({ time, message, type, user }: { time: string, message: string, type: 'info' | 'alert' | 'success', user: string }) {
    const colorClass = type === 'alert' ? 'bg-red-50 text-red-600' : type === 'success' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600';
    const Icon = type === 'alert' ? Shield : type === 'success' ? CheckCircleIcon : Activity;

    return (
        <div className="flex gap-4 group">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors", colorClass)}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">{message}</p>
                <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-slate-500">{time}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">{user}</span>
                </div>
            </div>
        </div>
    );
}

// Helper icon
const CheckCircleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
)

function StatCard({ title, value, icon: Icon, trend, color, className, desc }: any) {
    const colors: Record<string, string> = {
        blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
        purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
        emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
        amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white",
    };

    return (
        <div className={cn(
            "bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-300 transition-all cursor-pointer",
            className
        )}>
            <div className="flex justify-between items-start mb-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors", colors[color] || colors.blue)}>
                    <Icon className="w-5 h-5" />
                </div>
                {trend && (
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-[10px] font-bold">
                        {trend}
                    </span>
                )}
            </div>

            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
                <p className="text-xs text-slate-400 mt-1">{desc}</p>
            </div>
        </div>
    );
}
