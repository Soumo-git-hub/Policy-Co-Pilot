"use client";

import { BilateralWorkspace } from "@/components/workspace/BilateralWorkspace";
import { useWorkspace } from "@/context/WorkspaceContext";

export default function WorkspacePage() {
    const { currentWorkspace } = useWorkspace();

    return (
        <div className="h-full flex flex-col">
            <BilateralWorkspace key={currentWorkspace.id} />
        </div>
    );
}
