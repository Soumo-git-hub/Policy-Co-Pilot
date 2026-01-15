"use client";

import {
    ResponsiveContainer,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    AreaChart,
    Area
} from "recharts";
import { useWorkspace } from "@/context/WorkspaceContext";

// Dynamic Data Maps
const radarDataMap: Record<string, any[]> = {
    'vn': [
        { subject: 'Legal', A: 120, fullMark: 150 }, { subject: 'Financial', A: 98, fullMark: 150 },
        { subject: 'Technical', A: 86, fullMark: 150 }, { subject: 'Social', A: 99, fullMark: 150 },
        { subject: 'Environ', A: 85, fullMark: 150 }, { subject: 'Governance', A: 65, fullMark: 150 },
    ],
    'in': [
        { subject: 'Legal', A: 140, fullMark: 150 }, { subject: 'Financial', A: 110, fullMark: 150 },
        { subject: 'Technical', A: 130, fullMark: 150 }, { subject: 'Social', A: 80, fullMark: 150 },
        { subject: 'Environ', A: 120, fullMark: 150 }, { subject: 'Governance', A: 100, fullMark: 150 },
    ],
    'id': [
        { subject: 'Legal', A: 90, fullMark: 150 }, { subject: 'Financial', A: 130, fullMark: 150 },
        { subject: 'Technical', A: 100, fullMark: 150 }, { subject: 'Social', A: 110, fullMark: 150 },
        { subject: 'Environ', A: 95, fullMark: 150 }, { subject: 'Governance', A: 80, fullMark: 150 },
    ],
};

const activityDataMap: Record<string, any[]> = {
    'vn': [
        { name: 'Mon', Inquiries: 4, Drafts: 2 }, { name: 'Tue', Inquiries: 3, Drafts: 5 }, { name: 'Wed', Inquiries: 7, Drafts: 3 },
        { name: 'Thu', Inquiries: 5, Drafts: 8 }, { name: 'Fri', Inquiries: 9, Drafts: 10 }, { name: 'Sat', Inquiries: 2, Drafts: 1 }, { name: 'Sun', Inquiries: 1, Drafts: 0 },
    ],
    'in': [
        { name: 'Mon', Inquiries: 12, Drafts: 5 }, { name: 'Tue', Inquiries: 15, Drafts: 8 }, { name: 'Wed', Inquiries: 10, Drafts: 6 },
        { name: 'Thu', Inquiries: 18, Drafts: 12 }, { name: 'Fri', Inquiries: 20, Drafts: 15 }, { name: 'Sat', Inquiries: 5, Drafts: 3 }, { name: 'Sun', Inquiries: 2, Drafts: 1 },
    ],
    'id': [
        { name: 'Mon', Inquiries: 6, Drafts: 4 }, { name: 'Tue', Inquiries: 5, Drafts: 6 }, { name: 'Wed', Inquiries: 8, Drafts: 5 },
        { name: 'Thu', Inquiries: 7, Drafts: 7 }, { name: 'Fri', Inquiries: 10, Drafts: 9 }, { name: 'Sat', Inquiries: 3, Drafts: 2 }, { name: 'Sun', Inquiries: 2, Drafts: 1 },
    ],
};

const trendDataMap: Record<string, any[]> = {
    'vn': [{ month: 'Jan', Score: 65 }, { month: 'Feb', Score: 68 }, { month: 'Mar', Score: 75 }, { month: 'Apr', Score: 72 }, { month: 'May', Score: 80 }, { month: 'Jun', Score: 85 }],
    'in': [{ month: 'Jan', Score: 55 }, { month: 'Feb', Score: 60 }, { month: 'Mar', Score: 78 }, { month: 'Apr', Score: 85 }, { month: 'May', Score: 88 }, { month: 'Jun', Score: 92 }],
    'id': [{ month: 'Jan', Score: 45 }, { month: 'Feb', Score: 50 }, { month: 'Mar', Score: 55 }, { month: 'Apr', Score: 60 }, { month: 'May', Score: 65 }, { month: 'Jun', Score: 72 }],
};

export function ReadinessRadar() {
    const { currentWorkspace } = useWorkspace();
    const color = currentWorkspace.id === 'vn' ? '#2563eb' : currentWorkspace.id === 'in' ? '#ea580c' : '#dc2626';
    const radarData = radarDataMap[currentWorkspace.id] || radarDataMap['in'];

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    {/* Increased contrast for grid lines */}
                    <PolarGrid stroke="#94a3b8" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar
                        name="Current Status"
                        dataKey="A"
                        stroke={color}
                        strokeWidth={3}
                        fill={color}
                        fillOpacity={0.5}
                    />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

export function WeeklyActivityBar() {
    const { currentWorkspace } = useWorkspace();
    const activityData = activityDataMap[currentWorkspace.id] || activityDataMap['in'];
    const color1 = currentWorkspace.id === 'vn' ? '#3b82f6' : currentWorkspace.id === 'in' ? '#f97316' : '#ef4444';
    const color2 = currentWorkspace.id === 'vn' ? '#93c5fd' : currentWorkspace.id === 'in' ? '#fdba74' : '#fca5a5';

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        cursor={{ fill: 'transparent' }}
                    />
                    <Legend iconType="circle" />
                    <Bar name="Inquiries" dataKey="Inquiries" stackId="a" fill={color1} radius={[0, 0, 4, 4]} />
                    <Bar name="Drafts" dataKey="Drafts" stackId="a" fill={color2} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export function CoverageTrend() {
    const { currentWorkspace } = useWorkspace();
    const color = currentWorkspace.id === 'vn' ? '#2563eb' : currentWorkspace.id === 'in' ? '#ea580c' : '#dc2626';
    const trendData = trendDataMap[currentWorkspace.id] || trendDataMap['in'];

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.1} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                    <Area type="monotone" dataKey="Score" stroke={color} fillOpacity={1} fill="url(#colorScore)" strokeWidth={3} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
