"use client";

import { useState, useRef, useEffect, memo, useCallback } from "react";
import { Send, User, Sparkles, StopCircle, Paperclip, Zap, ShieldCheck, Globe, FileText, ChevronRight, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Citation } from "@/types";
import { useWorkspace } from "@/context/WorkspaceContext";
import { motion } from "framer-motion";

interface InquiryEngineProps {
    onCitationClick: (citation: Citation) => void;
}

// Extracted Message Component for High-Performance Rendering
const Message = memo(({ msg, idx, userProfile, currentWorkspace, onCitationClick, handleSuggestionClick }: any) => {
    return (
        <div
            key={idx}
            className={cn(
                "flex w-full animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both",
                msg.role === "user" ? "justify-end" : "justify-start"
            )}
        >
            <div className={cn("max-w-[85%] flex gap-5", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                <div
                    className={cn(
                        "w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-md border self-end mb-1",
                        msg.role === "user"
                            ? "bg-slate-900 border-slate-800 text-white dark:bg-slate-100 dark:text-slate-900"
                            : "bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-700 text-primary shadow-blue-500/5"
                    )}
                >
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                </div>

                <div className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className="px-1 flex items-center gap-2">
                        <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-tighter">
                            {msg.role === "user" ? `${userProfile.firstName} ${userProfile.lastName}` : `${currentWorkspace.id.toUpperCase()} POLICY BOT`}
                        </span>
                    </div>

                    <div className={cn(
                        "relative group px-6 py-4 rounded-3xl text-[14.5px] leading-[1.6] shadow-sm border transition-all",
                        msg.role === "user"
                            ? "bg-slate-900 text-white border-slate-800 rounded-tr-sm dark:bg-slate-100 dark:text-slate-900"
                            : "bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm text-slate-800 dark:text-slate-200 border-slate-100 dark:border-slate-800 rounded-tl-sm hover:border-primary/20"
                    )}>
                        <div className="whitespace-pre-wrap">
                            {msg.content.split('\n').map((line: any, i: number) => (
                                <p key={i} className="mb-2 last:mb-0">
                                    {line.split(/(\*\*.*?\*\*)/).map((part: string, j: number) =>
                                        part.startsWith('**') && part.endsWith('**') ? (
                                            <strong key={j} className={cn("font-bold", msg.role === 'user' ? "text-blue-300 dark:text-blue-600" : "text-primary")}>
                                                {part.slice(2, -2)}
                                            </strong>
                                        ) : part
                                    )}
                                </p>
                            ))}
                        </div>

                        {msg.citations && (
                            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                                {msg.citations.map((cit: Citation) => (
                                    <button
                                        key={cit.id}
                                        onClick={() => onCitationClick(cit)}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition-all active:scale-95 group/cit"
                                    >
                                        <FileText className="w-3.5 h-3.5 text-primary/60 group-hover/cit:scale-110 transition-transform" />
                                        Source: {cit.documentName} • p.{cit.page}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {msg.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-2 px-1 animate-in fade-in slide-in-from-left-2 duration-700 delay-300">
                            {msg.suggestions.map((suggest: string) => (
                                <button
                                    key={suggest}
                                    onClick={() => handleSuggestionClick(suggest)}
                                    className="px-4 py-1.5 bg-white dark:bg-slate-900 border border-border/80 hover:border-primary hover:text-primary transition-all rounded-full text-[11px] font-bold text-muted-foreground shadow-sm active:scale-95"
                                >
                                    {suggest}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

Message.displayName = "Message";

// Extensive Predefined Flows
const flows: Record<string, any> = {
    "fame": {
        q: "What are the incentive caps under FAME II?",
        a: "Under **FAME II Guidelines**, the demand incentive for electric buses is capped at **40% of the vehicle cost**. \n\nAdditionally, there is an absolute ceiling of ₹55 Lakhs per bus to ensure equitable distribution of funds.",
        cit: { id: "cit-fame", documentName: "FAME II Guidelines", page: 8 },
        suggestions: ["Compare with Vietnam's Policy", "Check Battery Swapping rules"]
    },
    "payment": {
        q: "How does the Payment Security Mechanism work?",
        a: "The **Payment Security Mechanism (PSM)** utilizes a **revolving fund** structure.\n\nThis fund is capitalized to cover a **3-Month Fund** of receivables, providing a guaranteed liquidity buffer for operators against delayed payments from DISCOMs.",
        cit: { id: "cit-psm", documentName: "CESL Tender", page: 12 },
        suggestions: ["Does it cover State Guarantees?", "Analyze Risk Factors"]
    },
    "state_guarantee": {
        q: "Does it cover State Guarantees?",
        a: "Yes, the PSM includes a provision for **State Government Guarantees**. \n\nIf the revolving fund is depleted, the State Government is obligated to step in and cover the payment deficit within 30 days of the default notice.",
        cit: { id: "cit-psm-guarantee", documentName: "CESL Tender", page: 14 },
        suggestions: ["Analyze Risk Factors", "Back to FAME Incentives"]
    },
    "risk": {
        q: "Analyze Risk Factors",
        a: "The primary risk identified is the **delayed replenishment of the revolving fund** by state utilities. \n\nHowever, the contract mitigates this by allowing the aggregator to **invoke the State Guarantee** immediately if the fund balance drops below 50%.",
        cit: { id: "cit-psm-risk", documentName: "CESL Tender", page: 16 },
        suggestions: ["How does this compare to Vietnam?", "Show Battery Specs"]
    },
    "battery": {
        q: "Check Battery Swapping rules",
        a: "The **National Battery Swapping Policy** mandates that all battery packs must be **interoperable** and adhere to BIS standards.\n\nProviders are also required to share real-time State of Health (SOH) data with a central registry.",
        cit: { id: "cit-batt", documentName: "Battery Policy", page: 6 },
        suggestions: ["Show Technical Standards", "Fiscal Incentives details"]
    },
    "tech_standards": {
        q: "Show Technical Standards",
        a: "The technical standards require batteries to feature **IoT-enabled BMS** for real-time tracking.\n\nConnectors must comply with **ISO 15118** to ensure universal compatibility across different vehicle makes.",
        cit: { id: "cit-batt-tech", documentName: "Battery Policy", page: 18 },
        suggestions: ["Fiscal Incentives details", "Back to Payment Security"]
    },
    "fiscal": {
        q: "Fiscal Incentives details",
        a: "Battery providers are eligible for **Battery Swapping Credits (BSC)** which can be traded on the carbon market. \n\nExamples include a **20% depreciation benefit** on battery assets in the first year.",
        cit: { id: "cit-batt-fiscal", documentName: "Battery Policy", page: 22 },
        suggestions: ["Compare with Vietnam's Policy", "Back to Main Menu"]
    },
    "vietnam_compare": {
        q: "Compare with Vietnam's Policy",
        a: "Unlike India's FAME II, **Vietnam's policy** focuses more on **Tax Holidays** rather than direct purchase subsidies. \n\nVietnam offers a **0% Registration Fee** for EVs for the first 3 years, whereas India provides upfront capital subsidies.",
        cit: { id: "cit-vn-compare", documentName: "Vietnam EV Roadmap", page: 12 },
        suggestions: ["What about Indonesia?", "Back to Payment Security"]
    }
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export function InquiryEngine({ onCitationClick }: InquiryEngineProps) {
    const { currentWorkspace, userProfile } = useWorkspace();
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        const isIndia = currentWorkspace.id === 'in';
        const isVN = currentWorkspace.id === 'vn';

        setMessages([
            {
                role: "assistant",
                content: `Hello ${userProfile.firstName}. I am ready to assist with the **${currentWorkspace.name}** program.\n\nI have loaded the specific regional frameworks and latest draft amendments for ${currentWorkspace.name.split(' ')[0]}. Where would you like to start?`,
                timestamp: "Just now",
                suggestions: isIndia
                    ? ["Analyze Payment Security", "FAME II Incentives Cap", "Check Battery Swapping rules"]
                    : isVN
                        ? ["Review Registration Fee Exemption", "Analyze Charging Infra Subsidy", "Compare with India"]
                        : ["Regional Framework Overview", "Incentive Structures", "Infrastructure Roadmap"]
            }
        ]);
    }, [currentWorkspace.id, userProfile.firstName]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        if (messages.length > 1 || isTyping) {
            scrollToBottom();
        }
    }, [messages, isTyping]);

    const handleSuggestionClick = useCallback((suggestion: string) => {
        let flowKey = "";
        const s = suggestion.toLowerCase();

        if (s.includes("fame") || s.includes("guidelines")) flowKey = "fame";
        else if (s.includes("battery")) flowKey = "battery";
        else if (s.includes("payment") || s.includes("incentive")) flowKey = "payment";
        else if (s.includes("guarantee")) flowKey = "state_guarantee";
        else if (s.includes("risk")) flowKey = "risk";
        else if (s.includes("technical") || s.includes("charging")) flowKey = "tech_standards";
        else if (s.includes("fiscal") || s.includes("registration")) flowKey = "fiscal";
        else if (s.includes("vietnam") || s.includes("india") || s.includes("compare")) flowKey = "vietnam_compare";
        else flowKey = "payment";

        const userMsg = { role: "user", content: suggestion, timestamp: "Just now" };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const flow = flows[flowKey];
            const aiMsg = {
                role: "assistant",
                content: flow.a,
                timestamp: "Just now",
                citations: [flow.cit],
                suggestions: flow.suggestions
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 800);
    }, [currentWorkspace.id]);

    const handleSend = useCallback(() => {
        if (!input.trim()) return;

        let flowKey = "payment";
        const i = input.toLowerCase();
        if (i.includes("risk")) flowKey = "risk";
        if (i.includes("battery")) flowKey = "battery";
        if (i.includes("compare") || i.includes("global")) flowKey = "vietnam_compare";

        const userMsg = { role: "user", content: input, timestamp: "Just now" };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const flow = flows[flowKey] || flows["payment"];
            const aiMsg = {
                role: "assistant",
                content: flow.a,
                timestamp: "Just now",
                citations: [flow.cit],
                suggestions: flow.suggestions
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 800);
    }, [input]);

    return (
        <div className="flex flex-col h-full relative bg-background">
            {/* Premium Glass Header */}
            <div className="h-20 flex items-center justify-between pl-8 pr-24 border-b border-border/50 bg-background/80 backdrop-blur-xl z-20 shrink-0 sticky top-0">
                <div className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 bg-primary/10")}>
                        <span className="text-xl">{currentWorkspace.flag}</span>
                    </div>
                    <div>
                        <h2 className="text-foreground text-sm font-bold leading-tight flex items-center gap-2">
                            {currentWorkspace.name}
                            <span className="px-1.5 py-0.5 bg-success/10 text-success text-[10px] rounded border border-success/20 tracking-tighter">ENCRYPTED</span>
                        </h2>
                        <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-widest mt-0.5">Policy Copilot Engine</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <span className="hidden sm:inline text-xs text-muted-foreground font-medium">12+ analysts active</span>
                </div>
            </div>

            {/* Main Chat Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth" style={{ contentVisibility: 'auto', contain: 'layout paint' } as any}>
                <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
                    {messages.map((msg, idx) => (
                        <Message
                            key={idx}
                            msg={msg}
                            idx={idx}
                            userProfile={userProfile}
                            currentWorkspace={currentWorkspace}
                            onCitationClick={onCitationClick}
                            handleSuggestionClick={handleSuggestionClick}
                        />
                    ))}

                    {isTyping && (
                        <div className="flex gap-5 animate-in fade-in duration-300">
                            <div className="w-9 h-9 rounded-2xl bg-primary shadow-lg shadow-primary/20 flex items-center justify-center border border-primary/20">
                                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">Processing</span>
                                <div className="px-5 py-3 bg-muted/20 border border-border/50 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Empty State Hero */}
                    {messages.length === 1 && !isTyping && (
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6"
                        >
                            {[
                                {
                                    label: `Analyze ${currentWorkspace.name.split(' ')[0]}`,
                                    icon: Zap,
                                    color: "bg-blue-500",
                                    desc: `Deep dive into local subsidy caps and regional benchmarks.`
                                },
                                {
                                    label: "Incentive Support",
                                    icon: ShieldCheck,
                                    color: "bg-emerald-500",
                                    desc: "Review regional tender's revolving fund and risk mitigation guarantees."
                                },
                                {
                                    label: "Global Benchmarking",
                                    icon: Globe,
                                    color: "bg-amber-500",
                                    desc: "Compare local policy against international EV roadmap standards."
                                }
                            ].map((card, i) => (
                                <motion.button
                                    variants={itemAnim}
                                    key={i}
                                    onClick={() => handleSuggestionClick(card.label.includes('Analyze') ? `${card.label} Guidelines` : card.label)}
                                    className="group p-6 bg-white dark:bg-slate-900 border border-border hover:border-primary/40 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 text-left relative overflow-hidden active:scale-95"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <card.icon className="w-20 h-20 text-slate-400" />
                                    </div>
                                    <div className={cn(
                                        "w-11 h-11 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300",
                                        card.color + "/10 text-foreground group-hover:text-white group-hover:" + card.color
                                    )}>
                                        <card.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                                    </div>
                                    <h3 className="font-bold text-foreground text-base mb-2 group-hover:text-primary transition-colors">{card.label}</h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed font-medium">{card.desc}</p>
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </div>
                <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Premium Floating Input Area */}
            <div className="p-6 bg-background/50 backdrop-blur-sm border-t border-border/30">
                <div className="max-w-4xl mx-auto flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-[2.5rem] border border-border focus-within:ring-4 focus-within:ring-primary/5 focus-within:border-primary transition-all shadow-lg group">
                    <button className="p-4 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all active:scale-90">
                        <Paperclip className="w-5 h-5" />
                    </button>
                    <input
                        className="flex-1 bg-transparent border-none text-sm !text-slate-900 dark:!text-slate-100 placeholder:text-slate-400 focus:ring-0 py-4 font-medium px-2"
                        placeholder="Analyze a policy or ask a follow-up..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        className="p-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-all shadow-md active:scale-90 disabled:opacity-50 duration-300"
                        disabled={!input.trim()}
                    >
                        {isTyping ? <StopCircle className="w-5 h-5 animate-pulse" /> : <Send className="w-5 h-5" />}
                    </button>
                </div>
                <div className="flex justify-center items-center gap-4 mt-3">
                    <p className="text-[10px] text-muted-foreground font-medium tracking-tight">AI can make mistakes. Verify critical policy decisions.</p>
                    <div className="h-1 w-1 rounded-full bg-border" />
                    <button className="flex items-center gap-1 text-[10px] text-primary font-bold hover:underline">
                        <HelpCircle className="w-3 h-3" />
                        Help Center
                    </button>
                </div>
            </div>
        </div>
    );
}
