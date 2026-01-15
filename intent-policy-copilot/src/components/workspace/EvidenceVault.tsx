"use client";

import { useEffect, useRef, useState } from "react";
import { Citation } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ZoomIn, ZoomOut, CheckCircle2, Printer, Search, FileText, Library, PanelRightClose } from "lucide-react";
import { cn } from "@/lib/utils";

interface EvidenceVaultProps {
    activeCitation: Citation | null;
    onClose: () => void;
}

// Extended Mock Content
const documents: Record<string, any> = {
    "CESL Tender": {
        title: "CESL_Payment_Security_Framework.pdf",
        fullTitle: "CESL_Payment_Security_Framework_v2.1_Final.pdf",
        pages: 84,
        category: "Financial Framework",
        content: (isActive: boolean) => (
            <>
                <h3 className="text-2xl font-bold font-sans mb-4 text-slate-900">3.4 Payment Security Mechanism (PSM)</h3>
                <p className="text-[16px] text-justify text-slate-800 leading-8 mb-6">
                    The implementation of the Payment Security Mechanism (PSM) is a critical component of the Grand Challenge framework. It is designed to foster trust between the operating entities and the financial aggregators. Without a robust security layer, the participation of private entities would be severely limited.
                </p>
                <div className="relative pl-6 border-l-4 border-slate-200 my-6 group">
                    <div className={cn("transition-all duration-500 rounded-sm p-1 -m-1", isActive ? "bg-yellow-200/50" : "bg-transparent")}>
                        <p className="text-[16px] text-justify text-slate-900 font-medium leading-8">
                            <span className={cn("transition-all duration-500", isActive ? "bg-yellow-300 text-slate-900 px-1 py-0.5 shadow-sm decoration-clone" : "")}>
                                The logic was to mitigate payment risk for aggregators by ensuring a revolving fund covered 3 months of receivables.
                            </span>
                            This fund acts as a primary liquidity buffer, accessible immediately upon any delay in scheduled payments, thereby ensuring operational continuity.
                        </p>
                    </div>
                </div>
            </>
        )
    },
    "FAME II Guidelines": {
        title: "FAME_II_Operational_Guidelines.pdf",
        fullTitle: "FAME_II_Operational_Guidelines_Ministry_Heavy_Industries.pdf",
        pages: 42,
        category: "Incentive Policy",
        content: (isActive: boolean) => (
            <>
                <h3 className="text-2xl font-bold font-sans mb-4 text-slate-900">5.1 Demand Incentive Delivery</h3>
                <p className="text-[16px] text-justify text-slate-800 leading-8 mb-6">
                    The demand incentive shall be available to consumers in the form of an upfront reduced purchase price of hybrid and electric vehicles. The OEM shall be reimbursed by the Department of Heavy Industry.
                </p>
                <div className="relative pl-6 border-l-4 border-slate-200 my-6 group">
                    <div className={cn("transition-all duration-500 rounded-sm p-1 -m-1", isActive ? "bg-yellow-200/50" : "bg-transparent")}>
                        <p className="text-[16px] text-justify text-slate-900 font-medium leading-8">
                            <span className={cn("transition-all duration-500", isActive ? "bg-yellow-300 text-slate-900 px-1 py-0.5 shadow-sm decoration-clone" : "")}>
                                To ensure effective delivery, the cap on incentives for electric buses is set at 40% of the vehicle cost, subject to a maximum of ₹55 Lakhs per bus.
                            </span>
                            This limit is enforced to prevent market distortion while providing sufficient catalyst for adoption.
                        </p>
                    </div>
                </div>
            </>
        )
    },
    "Battery Policy": {
        title: "National_Battery_Swapping_Policy_Draft.pdf",
        fullTitle: "NITI_Aayog_Battery_Swapping_Policy_2024.pdf",
        pages: 28,
        category: "Technical Standards",
        content: (isActive: boolean) => (
            <>
                <h3 className="text-2xl font-bold font-sans mb-4 text-slate-900">6.2 Interoperability Standards</h3>
                <p className="text-[16px] text-justify text-slate-800 leading-8 mb-6">
                    Batteries must be compatible with multiple vehicle types to ensure a seamless user experience. The policy mandates strict adherence to the BIS standards for connectors and communication protocols.
                </p>
                <div className="relative pl-6 border-l-4 border-slate-200 my-6 group">
                    <div className={cn("transition-all duration-500 rounded-sm p-1 -m-1", isActive ? "bg-yellow-200/50" : "bg-transparent")}>
                        <p className="text-[16px] text-justify text-slate-900 font-medium leading-8">
                            <span className={cn("transition-all duration-500", isActive ? "bg-yellow-300 text-slate-900 px-1 py-0.5 shadow-sm decoration-clone" : "")}>
                                Battery providers must ensure that their packs are cloud-connected and share real-time health data (SOH) with the central registry.
                            </span>
                            This data sharing is a prerequisite for generating Battery Swapping Credits (BSC) under the new fiscal scheme.
                        </p>
                    </div>
                </div>
            </>
        )
    }
};

export function EvidenceVault({ activeCitation, onClose }: EvidenceVaultProps) {
    const highlightRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentDocKey, setCurrentDocKey] = useState<string | null>(null); // Start null
    const [zoom, setZoom] = useState(100);

    // Sync document view with active citation
    useEffect(() => {
        if (activeCitation) {
            const key = Object.keys(documents).find(k => activeCitation.documentName.includes(k));
            if (key) {
                setCurrentDocKey(key);
                setTimeout(() => {
                    highlightRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 300);
            }
        }
    }, [activeCitation]);

    // Empty State (Idle Mode)
    if (!currentDocKey) {
        return (
            <div className="flex flex-col h-full bg-[#1a1d21] relative overflow-hidden">
                {/* Idle Header to allow closing */}
                <div className="h-14 bg-[#323639] border-b border-black/20 flex items-center justify-between px-4 shrink-0 shadow-md z-20 text-slate-100">
                    <span className="text-sm font-medium text-slate-400">Library Idle</span>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Close Panel">
                        <PanelRightClose className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#1a1d21]">
                    <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 ring-4 ring-slate-800/30">
                        <Library className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-200 mb-2">Evidence Vault Idle</h3>
                    <p className="text-slate-400 max-w-sm leading-relaxed mb-8">
                        Select a citation from the Inquiry Engine to retrieve and verify specific policy documents.
                    </p>
                    <div className="grid grid-cols-1 gap-3 w-full max-w-xs opacity-60">
                        <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                            <FileText className="w-4 h-4 text-blue-400" />
                            <span className="text-xs text-slate-300">CESL Payment Security.pdf</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                            <FileText className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs text-slate-300">FAME II Guidelines.pdf</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                            <FileText className="w-4 h-4 text-amber-400" />
                            <span className="text-xs text-slate-300">NITI Aayog Battery Pol...pdf</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const activeDoc = documents[currentDocKey];

    return (
        <div className="flex flex-col h-full bg-[#525659] relative overflow-hidden">
            {/* PDF Header Toolbar */}
            <div className="h-14 bg-[#323639] border-b border-black/20 flex items-center justify-between px-4 shrink-0 shadow-md z-20 text-slate-100 gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
                    {/* Replace Search with standard menu or nothing, mainly rely on right close */}
                    <div className="w-8 h-8 rounded flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer shrink-0" onClick={() => setCurrentDocKey(null)}>
                        <Library className="w-4 h-4 text-slate-300" />
                    </div>
                    <div className="flex flex-col truncate">
                        <span className="text-sm font-medium text-slate-100 truncate" title={activeDoc.fullTitle}>
                            {activeDoc.title}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide font-bold">
                            {activeDoc.category}
                        </span>
                    </div>
                </div>

                <div className="hidden lg:flex items-center bg-black/30 rounded-full px-1 py-0.5 border border-white/10 shrink-0">
                    <button className="p-1.5 hover:bg-white/10 rounded-full transition-all text-slate-300 hover:text-white" onClick={() => setZoom(z => Math.max(50, z - 10))}>
                        <ZoomOut className="w-4 h-4" />
                    </button>
                    <div className="px-3 text-xs font-mono font-medium text-slate-200 border-l border-r border-white/10 mx-1">
                        {activeCitation ? activeCitation.page : 12} / {activeDoc.pages}
                    </div>
                    <button className="p-1.5 hover:bg-white/10 rounded-full transition-all text-slate-300 hover:text-white" onClick={() => setZoom(z => Math.min(150, z + 10))}>
                        <ZoomIn className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                    <button className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"><Printer className="w-5 h-5" /></button>
                    <button className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"><Download className="w-5 h-5" /></button>
                    <div className="h-4 w-px bg-white/20 mx-1"></div>
                    <button onClick={onClose} className="p-2 text-slate-300 hover:text-white hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors" title="Close Panel">
                        <PanelRightClose className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Viewer */}
            <div ref={containerRef} className="flex-1 overflow-auto p-4 md:p-8 flex justify-center bg-[#525659] relative custom-scrollbar-dark">
                <div
                    className="bg-white w-full max-w-[800px] min-h-[1100px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] px-8 md:px-16 py-20 relative transition-transform duration-300 ease-out origin-top border border-white/20"
                    style={{ transform: `scale(${zoom / 100})` }}
                >
                    <div className="flex flex-col gap-6 font-serif text-black leading-relaxed">
                        <div className="border-b-2 border-black pb-2 mb-8 flex justify-between items-end opacity-80">
                            <span className="font-bold text-lg uppercase tracking-widest text-[#cf2e2e]">Confidential</span>
                            <span className="text-xs font-sans text-slate-500">Page {activeCitation ? activeCitation.page : 12}</span>
                        </div>

                        <div ref={highlightRef}>
                            {activeDoc.content(!!activeCitation)}
                        </div>

                        <AnimatePresence>
                            {activeCitation && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 20, scale: 0.95 }}
                                    className="absolute -right-32 top-64 mt-1 hidden xl:flex items-center gap-2 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-xl z-20"
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    AI Verified Source
                                    <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-600 rotate-45"></div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-auto pt-20 text-center text-[10px] text-slate-400 border-t border-slate-200 mt-10">
                            {activeDoc.title} - version 2.1 - Internal Distribution Only
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
