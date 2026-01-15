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

const workspaces: Workspace[] = [
    { id: "vn", name: "Vietnam Exchange", flag: "🇻🇳", color: "bg-blue-600" },
    { id: "in", name: "India Exchange", flag: "🇮🇳", color: "bg-orange-500" },
    { id: "id", name: "Indonesia Exchange", flag: "🇮🇩", color: "bg-red-600" },
];

interface WorkspaceContextType {
    currentWorkspace: Workspace;
    availableWorkspaces: Workspace[];
    switchWorkspace: (id: string) => void;
    userProfile: UserProfile;
    updateUserProfile: (profile: Partial<UserProfile>) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
    const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>(workspaces[1]);

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

    const [userProfile, setUserProfile] = useState<UserProfile>(getDefaults(workspaces[1].id));

    // Load profile when workspace changes
    useEffect(() => {
        const stored = localStorage.getItem(`user_profile_${currentWorkspace.id}`);
        if (stored) {
            setUserProfile(JSON.parse(stored));
        } else {
            setUserProfile(getDefaults(currentWorkspace.id));
        }
    }, [currentWorkspace.id]);

    const switchWorkspace = (id: string) => {
        const ws = workspaces.find((w) => w.id === id);
        if (ws) setCurrentWorkspace(ws);
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
            availableWorkspaces: workspaces,
            switchWorkspace,
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
