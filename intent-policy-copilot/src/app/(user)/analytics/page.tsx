"use client";

import { CoverageTrend, ReadinessRadar, WeeklyActivityBar } from "@/components/analytics/AnalyticsCharts";
import { ArrowUpRight, Download, SlidersHorizontal, Target, AlertTriangle, CheckCircle, TrendingUp, Info } from "lucide-react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // Assuming Dialog is available
import { motion, AnimatePresence } from "framer-motion";

// Dynamic KPI Data
const kpiData: Record<string, any> = {
    'vn': {
        cov: "62.4%", covChg: "+1.2%", risk: "8", riskChg: "-2%", comp: "88.1%", imp: "$1.1M", regions: [
            { name: "Ho Chi Minh City", val: "44%", bar: "w-[44%]" },
            { name: "Hanoi Central", val: "32%", bar: "w-[32%]" },
            { name: "Da Nang", val: "18%", bar: "w-[18%]" },
            { name: "Can Tho", val: "6%", bar: "w-[6%]" },
        ]
    },
    'in': {
        cov: "84.2%", covChg: "+2.4%", risk: "12", riskChg: "-4.5%", comp: "98.5%", imp: "$2.4M", regions: [
            { name: "Delhi NCR", val: "52%", bar: "w-[52%]" },
            { name: "Mumbai Region", val: "28%", bar: "w-[28%]" },
            { name: "Bangalore", val: "15%", bar: "w-[15%]" },
            { name: "Ahmedabad", val: "5%", bar: "w-[5%]" },
        ]
    },
    'id': {
        cov: "55.8%", covChg: "+5.1%", risk: "14", riskChg: "-1.2%", comp: "76.4%", imp: "$0.8M", regions: [
            { name: "Jakarta", val: "60%", bar: "w-[60%]" },
            { name: "Surabaya", val: "25%", bar: "w-[25%]" },
            { name: "Bali", val: "10%", bar: "w-[10%]" },
            { name: "Medan", val: "5%", bar: "w-[5%]" },
        ]
    }
};

export default function AnalyticsPage() {
    const { currentWorkspace } = useWorkspace();
    const data = kpiData[currentWorkspace.id] || kpiData['in'];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={currentWorkspace.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex-1 overflow-y-auto bg-[#f8fafc] px-8 pb-12 pt-6 items-center"
            >

                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Platform Analytics</h1>
                        <p className="text-slate-500 text-sm mt-1">Deep dive into governance performance and usage metrics for <span className="font-semibold text-slate-700">{currentWorkspace.name}</span>.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                            <SlidersHorizontal className="w-4 h-4" />
                            Filter View
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                            <Download className="w-4 h-4" />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <KPI
                        title="Policy Coverage"
                        value={data.cov}
                        change={data.covChg}
                        trend="up"
                        icon={Target}
                        color="blue"
                    />
                    <KPI
                        title="Risk Detected"
                        value={data.risk}
                        change={data.riskChg}
                        trend="down"
                        icon={AlertTriangle}
                        color="red"
                    />
                    <KPI
                        title="Compliance Rate"
                        value={data.comp}
                        change="+0.1%" // Static small change
                        trend="up"
                        icon={CheckCircle}
                        color="emerald"
                    />

                    {/* Interactive Total Impact Card */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="cursor-pointer group relative">
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-violet-500 rounded-full border-2 border-white animate-pulse"></div>
                                <KPI
                                    title="Total Impact"
                                    value={data.imp}
                                    change="+12%"
                                    trend="up"
                                    icon={TrendingUp}
                                    color="violet"
                                />
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Total Impact Breakdown</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-2">
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-slate-600">Operational Efficiency</span>
                                        <span className="font-bold text-slate-900">$1,450,000</span>
                                    </div>
                                    <div className="h-2 bg-slate-200 rounded-full w-full">
                                        <div className="h-full bg-violet-500 rounded-full w-[65%]"></div>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-slate-600">Carbon Credit Value</span>
                                        <span className="font-bold text-slate-900">$850,000</span>
                                    </div>
                                    <div className="h-2 bg-slate-200 rounded-full w-full">
                                        <div className="h-full bg-emerald-500 rounded-full w-[35%]"></div>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-slate-600">Risk Mitigation Savings</span>
                                        <span className="font-bold text-slate-900">$100,000</span>
                                    </div>
                                    <div className="h-2 bg-slate-200 rounded-full w-full">
                                        <div className="h-full bg-blue-500 rounded-full w-[5%]"></div>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 text-center pt-2">
                                    *Verified by 3rd party audit (Deloitte, Jan 2024)
                                </p>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Main Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                    {/* Chart 1: Radar Analysis */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-bold text-slate-900">Framework Readiness</h3>
                                <p className="text-xs text-slate-500">Alignment across key governance sectors.</p>
                            </div>
                            <span className={cn("px-2 py-1 rounded text-xs font-semibold bg-blue-50 text-blue-700")}>
                                {currentWorkspace.name} scope
                            </span>
                        </div>
                        <ReadinessRadar />
                    </div>

                    {/* Chart 2: Trend Line */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-bold text-slate-900">Governance Score Trend</h3>
                                <p className="text-xs text-slate-500">6-month historical performance.</p>
                            </div>
                            <button className="text-blue-600 text-xs font-medium hover:underline flex items-center gap-1">
                                View Report <ArrowUpRight className="w-3 h-3" />
                            </button>
                        </div>
                        <CoverageTrend />
                    </div>
                </div>

                {/* Lower Section: Detailed Bar & Table */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="mb-6">
                            <h3 className="font-bold text-slate-900">Weekly Activity Volume</h3>
                            <p className="text-xs text-slate-500">Inquiries vs Drafts generated by the team.</p>
                        </div>
                        <WeeklyActivityBar />
                    </div>

                    {/* Mini Stat List */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                        <h3 className="font-bold text-slate-900 mb-6">Top Contributing Regions</h3>
                        <div className="space-y-6 flex-1">
                            {data.regions.map((city: any, i: number) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-1.5">
                                        <span className="font-medium text-slate-700">{city.name}</span>
                                        <span className="text-slate-500">{city.val}</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className={cn("h-full bg-slate-800 rounded-full", city.bar)}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="mt-auto w-full py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                            View Full Geographic Report
                        </button>
                    </div>
                </div>

            </motion.div>
        </AnimatePresence>
    );
}

function KPI({ title, value, change, trend, icon: Icon, color }: any) {
    const colors = {
        blue: "bg-blue-50 text-blue-600",
        red: "bg-red-50 text-red-600",
        emerald: "bg-emerald-50 text-emerald-600",
        violet: "bg-violet-50 text-violet-600 hover:bg-violet-100 cursor-pointer", // Added transition
    }

    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-slate-500">{title}</span>
                <div className={cn("p-2 rounded-lg transition-colors", colors[color as keyof typeof colors])}>
                    <Icon className="w-4 h-4" />
                </div>
            </div>
            <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
                <span className={cn("text-xs font-semibold px-1.5 py-0.5 rounded", trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
                    {change}
                </span>
            </div>
        </div>
    )
}
