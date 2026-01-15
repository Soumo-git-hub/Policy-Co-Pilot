"use client";

import { PlusCircle, Upload, ArrowRight, Shield, FileText, Zap, Activity, TrendingUp, Users, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/context/WorkspaceContext";
import { ImpactChart, EfficiencyChart } from "@/components/dashboard/Charts";

// Mock Data Sets
const inquiries: Record<string, any[]> = {
  'vn': [
    { title: "Hanoi E-Bus Fleet Conversion", desc: "Fiscal feasibility study for VinBus integration.", status: "Verified", color: "emerald", icon: Shield, time: "2h ago" },
    { title: "Charging Grid Load - District 1", desc: "Grid capacity analysis for fast-charging stations.", status: "In Review", color: "amber", icon: Zap, time: "5h ago" },
    { title: "Battery Disposal Policy", desc: "Environmental compliance for end-of-life batteries.", status: "Draft", color: "purple", icon: FileText, time: "1d ago" },
  ],
  'in': [
    { title: "Payment Security Mechanisms", desc: "Cross-border settlement protocols review.", status: "Verified", color: "emerald", icon: Shield, time: "2h ago" },
    { title: "EV Charging Infrastructure", desc: "Capex modeling for rural rollout phases.", status: "In Review", color: "amber", icon: Zap, time: "5h ago" },
    { title: "Data Privacy Standards", desc: "GDPR alignment for local data residency.", status: "Draft", color: "purple", icon: FileText, time: "1d ago" },
  ],
  'id': [
    { title: "Jakarta Low Emission Zone", desc: "Regulatory framework for TransJakarta electrification.", status: "Verified", color: "emerald", icon: Shield, time: "30m ago" },
    { title: "Nickel Downstreaming Impact", desc: "Economic analysis of local battery production policies.", status: "In Review", color: "amber", icon: Zap, time: "4h ago" },
    { title: "Two-Wheeler Subsidy", desc: "Adoption curve modeling for swap stations.", status: "Draft", color: "purple", icon: FileText, time: "2d ago" },
  ]
};

const dataMap: Record<string, any> = {
  'vn': { tagline: "Grounded in Vietnam's eBus Experience" },
  'in': { tagline: "Grounded in India's eBus Experience" },
  'id': { tagline: "Grounded in Indonesia's eBus Experience" },
}

export default function Home() {
  const { currentWorkspace } = useWorkspace();
  const currentInquiries = inquiries[currentWorkspace.id] || inquiries['in'];
  const tagline = dataMap[currentWorkspace.id]?.tagline || "Grounded in India's eBus Experience";

  return (
    <div className="flex-1 overflow-y-auto px-8 pb-12 pt-6 space-y-8 custom-scrollbar bg-[#f8fafc]"> {/* Removed motion wrapper here to avoid conflicts if AnimatePresence is not at root, but standard is fine. Actually, let's just make the text dynamic first as requested. */}

      {/* Top Header - Minimalist */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Executive Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time governance insights for {currentWorkspace.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm">
            <Clock className="w-4 h-4" />
            Last 24 Hours
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-400 rounded-lg text-sm font-medium cursor-not-allowed">
            <ArrowUpRight className="w-4 h-4" />
            Export Report (Coming Soon)
          </button>
        </div>
      </div>

      {/* Hero / Quick Action - Refined "Sleek" Look */}
      <section className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-0 group">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Zap className="w-64 h-64 rotate-12" />
        </div>
        {/* Subtle colored accent line on top */}
        <div className={cn("h-1 w-full", currentWorkspace.color)}></div>

        <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className={cn("w-2 h-2 rounded-full animate-pulse", currentWorkspace.id === 'vn' ? 'bg-blue-600' : 'bg-orange-600')}></span>
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">AI Copilot • {currentWorkspace.name}</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Initiate eBus Program Inquiry</h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Ingest local context documents and cross-reference multiple frameworks instantly.
              The engine is officially <span className="text-emerald-600 font-medium">{tagline}</span>.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button className="h-12 px-6 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Context
            </button>
            <Link
              href="/workspace"
              className={cn("h-12 px-8 rounded-lg text-white font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2", currentWorkspace.color)}
            >
              <PlusCircle className="w-5 h-5" />
              Start Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* Analytics Grid - "Relevant Metrics" */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Main Chart Card */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Program Readiness Index</h3>
              <p className="text-xs text-slate-500">Estimated regulatory adherence score over time</p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12.4%
            </span>
          </div>
          <ImpactChart />
        </div>

        {/* Side Metrics Column */}
        <div className="space-y-6">

          {/* Metric 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 mb-1">Active Stakeholders</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-slate-900">1,284</span>
              <span className="text-xs text-emerald-600 font-medium">+8% this week</span>
            </div>
            {/* Mini bar chart placeholder for Efficiency */}
            <EfficiencyChart />
          </div>
        </div>
      </div>

      {/* Detailed Data Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Recent Inquiries & Drafts</h2>
          <Link href="/documents" className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
            View all documents <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {currentInquiries.map((item, i) => (
            <div key={i} className="group bg-white rounded-xl p-5 border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-300 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                  item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' :
                    item.color === 'amber' ? 'bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white' :
                      'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'
                )}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border",
                  item.color === 'emerald' ? 'bg-white border-emerald-100 text-emerald-700' :
                    item.color === 'amber' ? 'bg-white border-amber-100 text-amber-700' :
                      'bg-white border-purple-100 text-purple-700'
                )}>
                  {item.status}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{item.desc}</p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex -space-x-2">
                  {[1, 2].map(k => <div key={k} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>)}
                </div>
                <span className="text-xs text-slate-400 font-medium">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
