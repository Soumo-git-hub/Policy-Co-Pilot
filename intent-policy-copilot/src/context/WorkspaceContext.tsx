"use client";

import React, { createContext, useContext, useState } from "react";

export type Workspace = {
    id: string;
    name: string;
    flag: string;
    color: string;
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
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
    const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>(workspaces[1]);

    const switchWorkspace = (id: string) => {
        const ws = workspaces.find((w) => w.id === id);
        if (ws) setCurrentWorkspace(ws);
    };

    return (
        <WorkspaceContext.Provider value={{ currentWorkspace, availableWorkspaces: workspaces, switchWorkspace }}>
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
