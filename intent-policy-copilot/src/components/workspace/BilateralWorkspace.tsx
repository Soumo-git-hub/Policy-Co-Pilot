"use client";

import { useState } from "react";
import { InquiryEngine } from "./InquiryEngine";
import { EvidenceVault } from "./EvidenceVault";
import { Citation } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { PanelRightOpen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function BilateralWorkspace() {
    const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false); // Default: Closed

    const handleCitationClick = (citation: Citation) => {
        setActiveCitation(citation);
        setIsPanelOpen(true); // Auto-open on interaction
    };

    return (
        <div className="flex h-full overflow-hidden bg-slate-50 dark:bg-slate-900 relative">
            {/* Left Panel: Inquiry Engine */}
            <div className="flex-1 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-10 shadow-xl shadow-slate-200/50 dark:shadow-none min-w-0 transition-all duration-300">

                {/* Expand Toggle (Visible only when panel is closed) */}
                <div className="absolute top-4 right-4 z-50">
                    <TooltipProvider>
                        <Tooltip>
                            <AnimatePresence>
                                {!isPanelOpen && (
                                    <TooltipTrigger asChild>
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            onClick={() => setIsPanelOpen(true)}
                                            className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg shadow-sm hover:shadow-md transition-all"
                                        >
                                            <PanelRightOpen className="w-5 h-5" />
                                        </motion.button>
                                    </TooltipTrigger>
                                )}
                            </AnimatePresence>
                            <TooltipContent side="left">Open Evidence Vault</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <InquiryEngine onCitationClick={handleCitationClick} />
            </div>

            {/* Right Panel: Evidence Vault (Collapsible) */}
            <AnimatePresence initial={false}>
                {isPanelOpen && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "45%", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="flex flex-col bg-slate-100 dark:bg-slate-800/50 relative border-l border-slate-200 dark:border-slate-800 overflow-hidden shrink-0"
                    >
                        {/* Background nuances */}
                        <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),transparent)] pointer-events-none" />

                        {/* Wrapper to ensure fixed width content doesn't squash during animation */}
                        <div className="w-full h-full min-w-[400px]">
                            <EvidenceVault activeCitation={activeCitation} onClose={() => setIsPanelOpen(false)} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
