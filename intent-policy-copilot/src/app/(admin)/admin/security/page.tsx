"use client";

import { useToast } from "@/components/ui/toast-system";
import { Shield, Key, FileText, AlertTriangle, Lock, Smartphone, Eye, FileWarning, Search, Download, CheckCircle, Globe, Loader2, Scan } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (val: boolean) => void }) {
    return (
        <button
            onClick={() => onChange(!enabled)}
            className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/20",
                enabled ? 'bg-purple-600' : 'bg-slate-200 dark:bg-slate-700'
            )}
        >
            <span
                className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
                    enabled ? 'translate-x-6' : 'translate-x-1'
                )}
            />
        </button>
    );
}

export default function AdminSecurityPage() {
    const { addToast } = useToast();
    const [mfaEnabled, setMfaEnabled] = useState(true);
    const [ssoEnabled, setSsoEnabled] = useState(true);
    const [auditLogEnabled, setAuditLogEnabled] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);

    const handleToggle = (setting: string, val: boolean) => {
        addToast({
            type: "info",
            title: "Security Policy Updated",
            description: `${setting} is now ${val ? "Enabled" : "Disabled"}.`,
        });
    };

    const handleRunAudit = () => {
        if (isScanning) return;
        setIsScanning(true);
        setScanProgress(0);

        // Simulation
        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsScanning(false);
                    addToast({
                        type: "success",
                        title: "Audit Complete",
                        description: "No new critical vulnerabilities found. 5 minor warnings logged.",
                    });
                    return 100;
                }
                return prev + Math.floor(Math.random() * 10) + 5;
            });
        }, 300);
    };


    const logs = [
        { id: 1, event: "Login Attempt", user: "Director", loc: "192.168.1.1 (VN)", time: "Jan 15, 10:42 AM", status: "Success", details: "Authorized via biometrics." },
        { id: 2, event: "Document Export", user: "Director", loc: "192.168.1.1 (VN)", time: "Jan 15, 10:15 AM", status: "Success", details: "Exported 'CESL_Framework_v2.pdf'." },
        { id: 3, event: "API Key Rotation", user: "System Admin", loc: "Internal", time: "Jan 14, 02:00 AM", status: "Success", details: "Routine automated rotation." },
        { id: 4, event: "Failed Login", user: "Unknown", loc: "45.2.1.1 (CN)", time: "Jan 13, 11:20 PM", status: "Blocked", details: "Multiple failed attempts. IP temporarily banned." },
        { id: 5, event: "Policy Access", user: "Sarah Jenkins", loc: "192.168.1.5 (VN)", time: "Jan 13, 09:30 AM", status: "Success", details: "Viewed restricted document #442." },
        { id: 6, event: "Anomalous Traffic", user: "System", loc: "External Gateway", time: "Jan 12, 04:15 AM", status: "Warning", details: "Spike in inbound traffic detected." },
    ];

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.event.toLowerCase().includes(searchQuery.toLowerCase()) || log.user.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'all'
            ? true
            : filter === 'critical'
                ? (log.status === 'Blocked' || log.status === 'Warning')
                : log.status === 'Success';
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="flex-1 overflow-y-auto bg-[#f8fafc] dark:bg-[#0b1121] p-8 md:p-10 custom-scrollbar relative">
            {/* Scan Overlay for Cool Effect */}
            <AnimatePresence>
                {isScanning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 pointer-events-none bg-purple-500/5 backdrop-blur-[1px] flex items-center justify-center p-10"
                    >
                        <div className="w-full max-w-lg bg-white/90 dark:bg-[#0b1121]/90 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-500/20 p-8 flex flex-col gap-4 text-center">
                            <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center animate-pulse">
                                <Scan className="w-8 h-8 text-purple-600 animate-spin-slow" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Running Deep Security Audit...</h3>
                                <p className="text-slate-500 mt-1 text-sm">Validating encryption keys and access logs.</p>
                            </div>
                            <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
                                <motion.div
                                    className="h-full bg-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.5)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(scanProgress, 100)}%` }}
                                    transition={{ ease: "linear" }}
                                ></motion.div>
                            </div>
                            <p className="text-xs font-mono text-slate-400">{Math.min(scanProgress, 100)}% COMPLETE</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto flex flex-col gap-10">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Security & Compliance Center</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">Centralized command for access control, threat monitoring, and audit trails.</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleRunAudit}
                        disabled={isScanning}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-xl shadow-lg transition-all text-sm font-bold tracking-wide border border-white/10 relative overflow-hidden group",
                            isScanning ? "bg-slate-800 text-slate-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white hover:shadow-purple-500/25"
                        )}
                    >
                        {isScanning ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Audit in Progress...
                            </>
                        ) : (
                            <>
                                <Shield className="w-4 h-4" />
                                Run Security Audit
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                            </>
                        )}
                    </motion.button>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                        title="Encryption Status"
                        value="AES-256"
                        icon={Lock}
                        color="blue"
                        status="Verified Active"
                        bgIcon={Lock}
                    />
                    <MetricCard
                        title="Active Sessions"
                        value="3 Devices"
                        icon={Eye}
                        color="purple"
                        status="Last login: Hanoi, VN"
                        bgIcon={Smartphone}
                        statusIcon={Globe}
                    />
                    <MetricCard
                        title="Threat Monitoring"
                        value="0 Alerts"
                        icon={AlertTriangle}
                        color="amber"
                        status="Last 30 days clean"
                        bgIcon={FileWarning}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Live Audit Log */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <div className="bg-white dark:bg-[#151e32] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col flex-1 min-h-[500px]">
                            {/* Toolbar */}
                            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
                                <div className="flex items-center gap-4 flex-1">
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">Live Audit Stream</h3>
                                    <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block"></div>
                                    <div className="relative flex-1 max-w-sm">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            placeholder="Search by IP, user, or event..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-9 pr-4 py-1.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <select
                                        className="text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-purple-500/20 outline-none cursor-pointer"
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                    >
                                        <option value="all">All Events</option>
                                        <option value="success">Successful</option>
                                        <option value="critical">Critical Only</option>
                                    </select>
                                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors shadow-sm">
                                        <Download className="w-4 h-4" />
                                        Export CSV
                                    </button>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="flex-1 overflow-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-slate-700 sticky top-0 backdrop-blur-sm z-10">
                                        <tr>
                                            <th className="px-6 py-3 w-1/4">Event Type</th>
                                            <th className="px-6 py-3">User</th>
                                            <th className="px-6 py-3">Location</th>
                                            <th className="px-6 py-3">Timestamp</th>
                                            <th className="px-6 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        <AnimatePresence>
                                            {filteredLogs.map((log) => (
                                                <motion.tr
                                                    key={log.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-colors cursor-default"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-slate-900 dark:text-slate-200">{log.event}</div>
                                                        <div className="text-xs text-slate-400 mt-0.5">{log.details}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                                                                {log.user.charAt(0)}
                                                            </div>
                                                            {log.user}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">{log.loc}</td>
                                                    <td className="px-6 py-4 text-slate-500 text-xs whitespace-nowrap">{log.time}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={cn(
                                                            "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border",
                                                            log.status === 'Success'
                                                                ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900"
                                                                : log.status === 'Warning'
                                                                    ? "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900"
                                                                    : "bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900"
                                                        )}>
                                                            {log.status === 'Blocked' && <AlertTriangle className="w-3 h-3 mr-1" />}
                                                            {log.status}
                                                        </span>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Policies */}
                    <div className="flex flex-col gap-6">

                        {/* Auth Policy Card */}
                        <div className="bg-white dark:bg-[#151e32] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                                <Key className="w-5 h-5 text-purple-600" />
                                Authentication Protocols
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-slate-200 text-sm">Enforce MFA</p>
                                        <p className="text-xs text-slate-500 mt-1">Multi-factor auth for all admin roles.</p>
                                    </div>
                                    <Toggle enabled={mfaEnabled} onChange={(v) => { setMfaEnabled(v); handleToggle("MFA Enforcement", v); }} />
                                </div>
                                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-slate-200 text-sm">SSO Integration</p>
                                        <p className="text-xs text-slate-500 mt-1">Google Workspace corporate login.</p>
                                    </div>
                                    <Toggle enabled={ssoEnabled} onChange={(v) => { setSsoEnabled(v); handleToggle("SSO Login", v); }} />
                                </div>
                            </div>
                        </div>

                        {/* Logging Policy Card */}
                        <div className="bg-white dark:bg-[#151e32] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-amber-600" />
                                Data Retention
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-slate-200 text-sm">Immutable Logging</p>
                                        <p className="text-xs text-slate-500 mt-1">Write-once read-many (WORM) storage.</p>
                                    </div>
                                    <Toggle enabled={auditLogEnabled} onChange={(v) => { setAuditLogEnabled(v); handleToggle("Audit Logging", v); }} />
                                </div>

                                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800 flex gap-3">
                                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                    <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                                        Logs must be retained for 7 years to meet regional compliance standards.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ title, value, icon: Icon, color, status, bgIcon: BgIcon, statusIcon: StatusIcon }: any) {
    const colors: Record<string, string> = {
        blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
        purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
        amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
    };

    return (
        <div className="bg-white dark:bg-[#151e32] p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                {BgIcon && <BgIcon className={`w-32 h-32 ${color === 'blue' ? 'text-blue-600' : color === 'purple' ? 'text-purple-600' : 'text-amber-600'}`} />}
            </div>

            <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className={cn("p-2.5 rounded-xl", colors[color])}>
                    <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-700 dark:text-slate-300 text-sm">{title}</h3>
            </div>

            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 relative z-10 tracking-tight">{value}</p>

            <div className={`flex items-center gap-1.5 mt-3 text-xs font-medium relative z-10 ${status.includes('Active') || status.includes('clean') ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                {StatusIcon ? <StatusIcon className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                <span>{status}</span>
            </div>
        </div>
    )
}
