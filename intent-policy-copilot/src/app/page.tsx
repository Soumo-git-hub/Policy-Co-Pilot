"use client";

import Link from "next/link";
import { ShieldCheck, UserCircle, LayoutGrid, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#0b1121] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen"></div>
                <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-purple-900/10 blur-[150px] rounded-full mix-blend-screen"></div>
            </div>

            <div className="max-w-4xl w-full relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 border border-white/10 rounded-2xl mb-6 shadow-2xl backdrop-blur-sm">
                        <LayoutGrid className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                        INTENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400/90 to-purple-400/90">Platform</span>
                    </h1>
                    <p className="text-slate-400 max-w-lg mx-auto text-lg">
                        Secure Policy Analysis & Governance Intelligence System
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    {/* User Portal Card */}
                    <Link href="/dashboard" className="group relative">
                        <div className="absolute inset-0 bg-blue-600/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                        <div className="relative h-full bg-[#111827]/80 backdrop-blur-sm border border-slate-800 hover:border-blue-500/30 p-8 rounded-2xl transition-all duration-300 group-hover:-translate-y-1 shadow-lg shadow-black/20">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                                <UserCircle className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Policy Analyst</h3>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                Access workspaces, document library, and AI policy chat.
                            </p>
                            <div className="flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                                Enter Workspace <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Admin Portal Card */}
                    <Link href="/admin/overview" className="group relative">
                        <div className="absolute inset-0 bg-purple-600/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                        <div className="relative h-full bg-[#111827]/80 backdrop-blur-sm border border-slate-800 hover:border-purple-500/30 p-8 rounded-2xl transition-all duration-300 group-hover:-translate-y-1 shadow-lg shadow-black/20">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                                <ShieldCheck className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Systems Admin</h3>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                Manage source control, data integrity, and security audit logs.
                            </p>
                            <div className="flex items-center text-purple-400 text-sm font-medium group-hover:text-purple-300 transition-colors">
                                Launch Console <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
