"use client";

import { useToast } from "@/components/ui/toast-system";
import { Save, RefreshCw, Eye, EyeOff, Cpu, Database, Link2, Terminal, Info } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AdminApiPage() {
    const { addToast } = useToast();
    const [showKey, setShowKey] = useState(false);
    const [apiKey, setApiKey] = useState("sk-live-9s8d7f6g5h4j3k2l...");

    const handleSave = () => {
        addToast({
            type: "success",
            title: "Settings Saved",
            description: "API configuration updated successfully.",
        });
    };

    const handleRotate = () => {
        addToast({
            type: "warning",
            title: "Key Rotated",
            description: "Old API key has been invalidated.",
        });
        setApiKey("sk-live-NEW-GENERATED-KEY-" + Math.random().toString(36).substring(7));
    };

    return (
        <div className="flex-1 p-8 md:p-10 overflow-y-auto bg-[#f8fafc] dark:bg-[#0b1121] custom-scrollbar">
            <div className="max-w-4xl mx-auto flex flex-col gap-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">API & Engine Config</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">Manage connection strings, model endpoints, and secret keys for the policy processing engine.</p>
                    </div>
                </div>

                {/* Main Config Cards */}
                <div className="grid gap-8">

                    {/* LLM Section */}
                    <div className="bg-white dark:bg-[#151e32] border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 ring-1 ring-blue-100 dark:ring-blue-900/50">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Language Model Connectivity</h3>
                                <p className="text-sm text-slate-500 font-medium">Configure primary processing models.</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid gap-3">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Model Provider</label>
                                <div className="relative">
                                    <select className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-semibold appearance-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer">
                                        <option>OpenAI GPT-4o (Production)</option>
                                        <option>Anthropic Claude 3.5 Sonnet</option>
                                        <option>Azure OpenAI Instance</option>
                                        <option>Local Ollama Engine</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <Link2 className="w-4 h-4 text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-3">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Production API Key</label>
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type={showKey ? "text" : "password"}
                                            value={apiKey}
                                            onChange={(e) => setApiKey(e.target.value)}
                                            className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-mono focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                                        />
                                        <button
                                            onClick={() => setShowKey(!showKey)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                                        >
                                            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleRotate}
                                        className="px-5 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold flex items-center gap-2 transition-all shadow-sm"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Rotate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Infrastructure Section */}
                    <div className="bg-white dark:bg-[#151e32] border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 ring-1 ring-purple-100 dark:ring-purple-900/50">
                                <Database className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Knowledge Base & Latency</h3>
                                <p className="text-sm text-slate-500 font-medium">Vector index and retrieval settings.</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 border-dashed">
                                <div>
                                    <p className="font-bold text-sm text-slate-900 dark:text-slate-100 tracking-tight">Active Index: <span className="text-purple-600 font-mono ml-1">policy-prod-v2</span></p>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                            Region: us-east-1
                                        </span>
                                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                                            Status: Healthy
                                        </span>
                                    </div>
                                </div>
                                <button className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white bg-slate-900 dark:bg-slate-700 rounded-lg hover:bg-slate-800 transition-colors">Re-Index</button>
                            </div>

                            <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl flex items-start gap-4 border border-blue-100 dark:border-blue-900/30">
                                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                                <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed font-medium">
                                    Rotating the API key will temporarily disrupt active PDF scanning sessions. It is recommended to perform this during maintenance windows.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-end pt-2">
                        <button
                            onClick={handleSave}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                        >
                            <Save className="w-5 h-5" />
                            Apply Platform Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
