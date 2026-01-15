"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { useWorkspace } from "@/context/WorkspaceContext";

// Dynamic Data Sets
const dataMap: Record<string, any[]> = {
    'vn': [
        { name: "Jan", impact: 2000 }, { name: "Feb", impact: 3500 }, { name: "Mar", impact: 3200 },
        { name: "Apr", impact: 4800 }, { name: "May", impact: 4200 }, { name: "Jun", impact: 5100 },
    ],
    'in': [
        { name: "Jan", impact: 1500 }, { name: "Feb", impact: 2100 }, { name: "Mar", impact: 2800 },
        { name: "Apr", impact: 3500 }, { name: "May", impact: 4900 }, { name: "Jun", impact: 5800 },
    ],
    'id': [
        { name: "Jan", impact: 1200 }, { name: "Feb", impact: 1400 }, { name: "Mar", impact: 1100 },
        { name: "Apr", impact: 2200 }, { name: "May", impact: 3100 }, { name: "Jun", impact: 3400 },
    ]
};

const barDataMap: Record<string, any[]> = {
    'vn': [{ name: 'Hanoi', value: 450 }, { name: 'HCMC', value: 380 }, { name: 'Da Nang', value: 210 }],
    'in': [{ name: 'Delhi', value: 520 }, { name: 'Mumbai', value: 480 }, { name: 'Bangalore', value: 350 }],
    'id': [{ name: 'Jakarta', value: 410 }, { name: 'Surabaya', value: 290 }, { name: 'Bali', value: 150 }],
};

import { memo, useState, useEffect } from "react";

export const ImpactChart = memo(function ImpactChart() {
    const { currentWorkspace } = useWorkspace();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Add a micro-delay to ensure parent layout is calculated
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const color = currentWorkspace.id === 'vn' ? '#2563eb' : currentWorkspace.id === 'in' ? '#ea580c' : '#dc2626';
    const data = dataMap[currentWorkspace.id] || dataMap['in'];

    if (!mounted) return <div className="h-[250px] w-full mt-4" />;

    return (
        <div className="h-[250px] w-full mt-4 will-change-transform overflow-hidden">
            <ResponsiveContainer width="99%" height="100%" minWidth={0}>
                <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.1} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
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
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        cursor={{ stroke: color, strokeWidth: 1 }}
                        formatter={(value: any) => [value, "Readiness Score"]}
                    />
                    <Area
                        type="monotone"
                        dataKey="impact"
                        stroke={color}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorImpact)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
});

export const EfficiencyChart = memo(function EfficiencyChart() {
    const { currentWorkspace } = useWorkspace();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const barData = barDataMap[currentWorkspace.id] || barDataMap['in'];
    const color = currentWorkspace.id === 'vn' ? '#3b82f6' : currentWorkspace.id === 'in' ? '#ea580c' : '#ef4444';

    if (!mounted) return <div className="h-[200px] w-full mt-4" />;

    return (
        <div className="h-[200px] w-full mt-4 will-change-transform overflow-hidden">
            <ResponsiveContainer width="99%" height="100%" minWidth={0}>
                <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {barData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? color : '#cbd5e1'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
});
