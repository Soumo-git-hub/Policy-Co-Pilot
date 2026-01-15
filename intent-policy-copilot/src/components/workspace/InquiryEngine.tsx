"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, Sparkles, StopCircle, Paperclip, Zap, ShieldCheck, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Citation } from "@/types";
import { useWorkspace } from "@/context/WorkspaceContext";

interface InquiryEngineProps {
    onCitationClick: (citation: Citation) => void;
}

// Extensive Predefined Flows
const flows: Record<string, any> = {
    // FAME
    "fame": {
        q: "What are the incentive caps under FAME II?",
        a: "Under **FAME II Guidelines**, the demand incentive for electric buses is capped at **40% of the vehicle cost**. \n\nAdditionally, there is an absolute ceiling of ₹55 Lakhs per bus to ensure equitable distribution of funds.",
        cit: { id: "cit-fame", documentName: "FAME II Guidelines", page: 8 },
        suggestions: ["Compare with Vietnam's Policy", "Check Battery Swapping rules"]
    },
    // Payment Security
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
    // Battery
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
    // Comparison
    "vietnam_compare": {
        q: "Compare with Vietnam's Policy",
        a: "Unlike India's FAME II, **Vietnam's policy** focuses more on **Tax Holidays** rather than direct purchase subsidies. \n\nVietnam offers a **0% Registration Fee** for EVs for the first 3 years, whereas India provides upfront capital subsidies.",
        cit: { id: "cit-vn-compare", documentName: "Vietnam EV Roadmap", page: 12 },
        suggestions: ["What about Indonesia?", "Back to Payment Security"]
    }
}

export function InquiryEngine({ onCitationClick }: InquiryEngineProps) {
    const { currentWorkspace } = useWorkspace();
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isTyping, setIsTyping] = useState(false);

    // Initial State: Empty with Suggestions
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        setMessages([
            {
                role: "assistant",
                content: `Hello ${currentWorkspace.id === 'in' ? 'Arjun' : 'Sarah'}. I am ready to assist with the **${currentWorkspace.name}** program.\n\nI have loaded 14 active frameworks and 3 draft amendments. Where would you like to start?`,
                timestamp: "Just now",
                suggestions: ["Analyze Payment Security", "FAME II Incentives Cap", "Check Battery Swapping rules"]
            }
        ]);
    }, [currentWorkspace.id]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSuggestionClick = (suggestion: string) => {
        // Advanced Fuzzy Matching Logic
        let flowKey = "";
        const s = suggestion.toLowerCase();

        if (s.includes("fame")) flowKey = "fame";
        else if (s.includes("battery") && !s.includes("specs")) flowKey = "battery";
        else if (s.includes("payment")) flowKey = "payment";
        else if (s.includes("state guarantee")) flowKey = "state_guarantee";
        else if (s.includes("risk")) flowKey = "risk";
        else if (s.includes("technical") || s.includes("specs")) flowKey = "tech_standards";
        else if (s.includes("fiscal")) flowKey = "fiscal";
        else if (s.includes("vietnam")) flowKey = "vietnam_compare";
        else flowKey = "payment"; // Default fallback if really lost

        // 1. User Message
        const userMsg = { role: "user", content: suggestion, timestamp: "Just now" }; // Use actual suggestion text
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // 2. AI Response
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
        }, 1200);
    };

    const handleSend = () => {
        if (!input.trim()) return;

        let flowKey = "payment";
        const i = input.toLowerCase();
        // Simple keyword matching for typed input
        if (i.includes("risk")) flowKey = "risk";
        if (i.includes("battery")) flowKey = "battery";
        if (i.includes("vietnam")) flowKey = "vietnam_compare";

        const userMsg = { role: "user", content: input, timestamp: "Just now" };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const flow = flows[flowKey];
            // If we found a direct match, use it. If not, use generic.
            if (i.includes("risk") || i.includes("battery") || i.includes("vietnam")) {
                const aiMsg = {
                    role: "assistant",
                    content: flow.a,
                    timestamp: "Just now",
                    citations: [flow.cit],
                    suggestions: flow.suggestions
                };
                setMessages(prev => [...prev, aiMsg]);
            } else {
                const aiMsg = {
                    role: "assistant",
                    content: "I've analyzed your query against the repository. Could you clarify if you are looking for **fiscal incentives** or **technical standards** regarding this topic?",
                    timestamp: "Just now",
                    suggestions: ["Fiscal Incentives", "Technical Standards"]
                };
                setMessages(prev => [...prev, aiMsg]);
            }
        }, 1500);
    };

    return (
        <div className="flex flex-col h-full relative bg-surface">
            {/* Header */}
            <div className="h-16 flex flex-col justify-center px-6 border-b border-border bg-surface/50 backdrop-blur-sm z-10 shrink-0">
                <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide border border-primary/20">Inquiry • {currentWorkspace.name}</span>
                    <p className="text-muted-foreground text-xs font-mono">ID: #IN-8842-Alpha</p>
                </div>
                <h2 className="text-foreground text-lg font-bold leading-tight truncate pr-4 mt-0.5">Policy Copilot Engine</h2>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar scroll-smooth">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
                            msg.role === "user" ? "justify-end" : "justify-start"
                        )}
                    >
                        <div className={cn("max-w-[85%] flex gap-4 text-sm", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>

                            {/* Avatar */}
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm border",
                                    msg.role === "user"
                                        ? "bg-white border-border text-muted-foreground"
                                        : "bg-primary text-white border-primary shadow-blue-500/20"
                                )}
                            >
                                {msg.role === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                            </div>

                            {/* Message Content */}
                            <div className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-foreground opacity-90">
                                        {msg.role === "user" ? (currentWorkspace.id === 'in' ? "Arjun Mehta" : "Sarah Jenkins") : "AI Copilot"}
                                    </span>
                                </div>

                                <div className={cn(
                                    "rounded-2xl p-4 leading-relaxed shadow-sm border",
                                    msg.role === "user"
                                        ? "bg-slate-800 text-white border-slate-700 rounded-tr-sm"
                                        : "bg-white text-slate-800 border-slate-100 rounded-tl-sm"
                                )}>
                                    <p>
                                        {msg.content.split('\n').map((line: string, i: number) => (
                                            <span key={i} className="block min-h-[1.2em] mb-1">
                                                {line.split(/(\*\*.*?\*\*)/).map((part, j) =>
                                                    part.startsWith('**') && part.endsWith('**') ? (
                                                        <strong key={j} className="font-bold text-blue-600 dark:text-blue-400">
                                                            {part.slice(2, -2)}
                                                        </strong>
                                                    ) : (
                                                        part
                                                    )
                                                )}
                                            </span>
                                        ))}
                                    </p>
                                </div>

                                {/* Citations (Only for Assistant) */}
                                {msg.role === "assistant" && msg.citations && (
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {msg.citations.map((cit: Citation) => (
                                            <button
                                                key={cit.id}
                                                onClick={() => onCitationClick(cit)}
                                                className="flex items-center gap-3 pl-2 pr-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-primary/40 hover:shadow-md hover:ring-2 hover:ring-primary/5 transition-all group text-left max-w-sm active:scale-95"
                                            >
                                                <div className="bg-red-50 p-1.5 rounded-lg border border-red-100 shrink-0">
                                                    <span className="text-red-600 font-serif font-bold text-xs">PDF</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-semibold text-primary group-hover:underline decoration-primary/30 underline-offset-2">
                                                        Source: {cit.documentName}, Pg {cit.page}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400 leading-none mt-0.5">
                                                        Click to verify evidence
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Suggestion Pills (Only for Assistant) */}
                                {msg.role === "assistant" && msg.suggestions && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {msg.suggestions.map((sug: string, i: number) => (
                                            <button
                                                key={i}
                                                onClick={() => handleSuggestionClick(sug)}
                                                className="text-xs bg-slate-100 hover:bg-white hover:text-blue-600 hover:border-blue-200 hover:shadow-sm text-slate-600 font-medium px-3 py-1.5 rounded-full border border-slate-300 transition-all cursor-pointer"
                                            >
                                                {sug}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex w-full justify-start animate-in fade-in duration-300">
                        <div className="max-w-[85%] flex gap-4">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-primary text-white border border-primary shadow-sm">
                                <Sparkles className="w-4 h-4 animate-spin-slow" />
                            </div>
                            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-2">
                                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                {/* Hero View for Empty State */}
                {messages.length === 1 && !isTyping && (
                    <div className="px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        <button
                            onClick={() => handleSuggestionClick("Analyze FAME II Guidelines")}
                            className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Zap className="w-24 h-24 text-blue-600" />
                            </div>
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-100 dark:border-blue-500/20 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                                <Zap className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Analyze FAME II</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Deep dive into subsidy caps and eligibility criteria for electric buses.</p>
                        </button>

                        <button
                            onClick={() => handleSuggestionClick("How does the Payment Security Mechanism work?")}
                            className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <ShieldCheck className="w-24 h-24 text-emerald-600" />
                            </div>
                            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 border border-emerald-100 dark:border-emerald-500/20 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all duration-300">
                                <ShieldCheck className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Payment Security</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Review the CESL tender's revolving fund and risk mitigation guarantees.</p>
                        </button>

                        <button
                            onClick={() => handleSuggestionClick("Compare with Vietnam's Policy")}
                            className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Globe className="w-24 h-24 text-amber-600" />
                            </div>
                            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 border border-amber-100 dark:border-amber-500/20 group-hover:bg-amber-600 group-hover:border-amber-600 transition-all duration-300">
                                <Globe className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2">Global Comparison</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Benchmark India's incentives against Vietnam's tax holiday model.</p>
                        </button>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-surface border-t border-border mt-auto">
                <div className="relative flex items-center bg-white dark:bg-white rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all shadow-sm">
                    <button className="p-3 text-muted-foreground hover:text-foreground transition-colors">
                        <Paperclip className="w-5 h-5" />
                    </button>
                    <input
                        className="flex-1 bg-transparent border-none text-sm !text-slate-900 placeholder:text-slate-400 focus:ring-0 py-4"
                        placeholder="Ask a follow-up question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        className="mr-2 p-2 bg-primary text-white rounded-xl hover:bg-blue-600 transition-colors shadow-sm disabled:opacity-50 disabled:shadow-none"
                        disabled={!input.trim()}
                    >
                        {isTyping ? <StopCircle className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
