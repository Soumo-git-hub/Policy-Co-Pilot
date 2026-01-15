"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Workspace = {
    id: string;
    name: string;
    flag: string;
    color: string;
};

export type UserProfile = {
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
};

const defaultWorkspaces: Workspace[] = [
    { id: "vn", name: "Vietnam Exchange", flag: "🇻🇳", color: "bg-blue-600" },
    { id: "in", name: "India Exchange", flag: "🇮🇳", color: "bg-orange-500" },
    { id: "id", name: "Indonesia Exchange", flag: "🇮🇩", color: "bg-red-600" },
];

interface WorkspaceContextType {
    currentWorkspace: Workspace;
    availableWorkspaces: Workspace[];
    switchWorkspace: (id: string) => void;
    addWorkspace: (ws: Omit<Workspace, 'color'>) => void;
    userProfile: UserProfile;
    updateUserProfile: (profile: Partial<UserProfile>) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
    const [availableWorkspaces, setAvailableWorkspaces] = useState<Workspace[]>(defaultWorkspaces);
    const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>(defaultWorkspaces[1]);

    // Load workspaces from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('available_workspaces');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setAvailableWorkspaces(parsed);
                // Also load last active workspace if stored
                const lastWsId = localStorage.getItem('last_active_workspace');
                if (lastWsId) {
                    const ws = parsed.find((w: Workspace) => w.id === lastWsId);
                    if (ws) setCurrentWorkspace(ws);
                }
            } catch (e) {
                console.error("Failed to parse workspaces", e);
            }
        }
    }, []);

    // Default profiles
    const getDefaults = (id: string): UserProfile => {
        const isIndia = id === 'in';
        return {
            firstName: isIndia ? "Arjun" : "Sarah",
            lastName: isIndia ? "Mehta" : "Jenkins",
            email: isIndia ? "arjun.mehta@intent.gov.in" : "sarah.jenkins@intent.gov.us",
            bio: isIndia
                ? "Senior Policy Director for INTENT, specializing in India's FAME II and e-mobility frameworks."
                : "Global Policy Lead for INTENT, specializing in international energy cooperation and sustainable transport."
        };
    };

    const [userProfile, setUserProfile] = useState<UserProfile>(getDefaults(defaultWorkspaces[1].id));

    // Load profile when workspace changes
    useEffect(() => {
        const stored = localStorage.getItem(`user_profile_${currentWorkspace.id}`);
        if (stored) {
            setUserProfile(JSON.parse(stored));
        } else {
            setUserProfile(getDefaults(currentWorkspace.id));
        }
        localStorage.setItem('last_active_workspace', currentWorkspace.id);
    }, [currentWorkspace.id]);

    const switchWorkspace = (id: string) => {
        const ws = availableWorkspaces.find((w) => w.id === id);
        if (ws) setCurrentWorkspace(ws);
    };

    const addWorkspace = (ws: Omit<Workspace, 'color'>) => {
        const colors = ["bg-blue-600", "bg-orange-500", "bg-red-600", "bg-emerald-600", "bg-purple-600", "bg-amber-600"];
        const newWs = {
            ...ws,
            color: colors[availableWorkspaces.length % colors.length]
        };
        const updated = [...availableWorkspaces, newWs];
        setAvailableWorkspaces(updated);
        localStorage.setItem('available_workspaces', JSON.stringify(updated));
    };

    const updateUserProfile = (newProfile: Partial<UserProfile>) => {
        setUserProfile((prev) => {
            const updated = { ...prev, ...newProfile };
            localStorage.setItem(`user_profile_${currentWorkspace.id}`, JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <WorkspaceContext.Provider value={{
            currentWorkspace,
            availableWorkspaces,
            switchWorkspace,
            addWorkspace,
            userProfile,
            updateUserProfile
        }}>
            {children}
        </WorkspaceContext.Provider>
    );
}

export function useWorkspace() {
    const context = useContext(WorkspaceContext);
    if (context === undefined) {
        throw new Error("useWorkspace must be used within a WorkspaceProvider");
    }
    return context;
}
