"use client";

import { Search, Filter, Plus, FileText, MoreHorizontal, CheckCircle2, UploadCloud, Trash2, DownloadCloud, Archive } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/components/ui/toast-system";
import { motion, AnimatePresence } from "framer-motion";

const initialDocuments = [
    { id: 1, name: "CESL_Framework_v2.pdf", type: "PDF", size: "2.4 MB", pages: 84, modified: "Jan 12, 2024", status: "Verified", author: "Director Nguyen" },
    { id: 2, name: "Payment_Security_Draft.docx", type: "DOCX", size: "1.8 MB", pages: 21, modified: "Jan 10, 2024", status: "Draft", author: "Sarah Jenkins" },
    { id: 3, name: "Q1_Financial_Model.xlsx", type: "XLSX", size: "4.2 MB", pages: 12, modified: "Jan 08, 2024", status: "Review", author: "Finance Team" },
    { id: 4, name: "Policy_Brief_Jan26.pdf", type: "PDF", size: "1.2 MB", pages: 6, modified: "Jan 14, 2024", status: "Verified", author: "AI Copilot" },
    { id: 5, name: "Stakeholder_Meeting_Minutes.docx", type: "DOCX", size: "0.8 MB", pages: 3, modified: "Jan 05, 2024", status: "Archived", author: "Admin" },
];

export default function DocumentsPage() {
    const { addToast } = useToast();
    const [documents, setDocuments] = useState(initialDocuments);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredDocs = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredDocs.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredDocs.map(d => d.id));
        }
    };

    const toggleSelect = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleUpload = () => {
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            addToast({
                type: 'success',
                title: 'Import Successful',
                description: 'New_Policy_Draft_v4.pdf has been processed and indexed.'
            });
            // Mock add
            setDocuments([{
                id: Math.random(),
                name: "New_Policy_Draft_v4.pdf",
                type: "PDF",
                size: "0.5 MB",
                pages: 12,
                modified: "Just now",
                status: "Draft",
                author: "You"
            }, ...documents]);
        }, 2000);
    };

    const handleBulkDelete = () => {
        addToast({
            type: 'success',
            title: 'Documents Deleted',
            description: `Successfully removed ${selectedIds.length} documents from the repository.`
        });
        setDocuments(documents.filter(d => !selectedIds.includes(d.id)));
        setSelectedIds([]);
    };

    const handleDownload = (name: string) => {
        addToast({
            type: 'info',
            title: 'Download Started',
            description: `Preparing ${name} for download...`
        });
    };

    return (
        <div className="flex-1 overflow-y-auto px-8 pb-12 pt-6 bg-slate-50 dark:bg-background relative">

            {/* Bulk Actions Bar */}
            <AnimatePresence>
                {selectedIds.length > 0 && (
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6"
                    >
                        <span className="font-semibold text-sm">{selectedIds.length} selected</span>
                        <div className="h-4 w-px bg-white/20"></div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-white/10 rounded-full transition-colors tooltip" title="Download">
                                <DownloadCloud className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Archive">
                                <Archive className="w-4 h-4" />
                            </button>
                            <button onClick={handleBulkDelete} className="p-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-full transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        <button onClick={() => setSelectedIds([])} className="ml-4 text-xs font-medium text-slate-400 hover:text-white">
                            Cancel
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Document Library</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Centralized repository for all policy frameworks and drafts.</p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/20 active:scale-95">
                            <Plus className="w-4 h-4" />
                            Import Document
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Import New Context</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div
                                onClick={!isUploading ? handleUpload : undefined}
                                className={cn(
                                    "border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group",
                                    isUploading ? "bg-slate-50 opacity-50 cursor-not-allowed" : "hover:bg-slate-50"
                                )}
                            >
                                <div className="bg-blue-50 p-3 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                    <UploadCloud className={cn("w-6 h-6 text-blue-600", isUploading && "animate-bounce")} />
                                </div>
                                <h3 className="text-sm font-semibold text-slate-900">
                                    {isUploading ? "Processing..." : "Click to upload or drag and drop"}
                                </h3>
                                <p className="text-xs text-slate-500 mt-1 max-w-xs">Supported formats: PDF, DOCX, XLSX (Max 25MB)</p>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button disabled={isUploading} className="px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                                <button disabled={isUploading} onClick={handleUpload} className="px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                                    {isUploading ? "Uploading..." : "Upload"}
                                </button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-4 mb-6 bg-white dark:bg-[#151e32] p-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm sticky top-0 z-30">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        placeholder="Search by name, tag, or content..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border-none focus:ring-0 placeholder:text-slate-400 outline-none bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white dark:bg-[#151e32] border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden min-h-[400px]">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-medium">
                        <tr>
                            <th className="px-6 py-4 w-12">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.length === filteredDocs.length && filteredDocs.length > 0}
                                    onChange={toggleSelectAll}
                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-600/20 cursor-pointer"
                                />
                            </th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Pages</th>
                            <th className="px-6 py-4">Size</th>
                            <th className="px-6 py-4">Modified</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <TooltipProvider>
                            {filteredDocs.map((doc) => (
                                <tr
                                    key={doc.id}
                                    className={cn(
                                        "transition-colors group",
                                        selectedIds.includes(doc.id) ? "bg-blue-50/50 hover:bg-blue-50" : "hover:bg-slate-50/80 dark:hover:bg-slate-800/50"
                                    )}
                                >
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(doc.id)}
                                            onChange={() => toggleSelect(doc.id)}
                                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-600/20 cursor-pointer"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                                <FileText className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium text-slate-900 dark:text-slate-100">{doc.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold capitalize border",
                                                doc.status === 'Verified' ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800" :
                                                    doc.status === 'Draft' ? "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700" :
                                                        "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
                                            )}>
                                                {doc.status}
                                            </span>
                                            {doc.status === 'Verified' && (
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 cursor-help" />
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-slate-900 text-white text-xs p-2 rounded">
                                                        Verified by INTENT Admin on Jan 14, 2024
                                                    </TooltipContent>
                                                </Tooltip>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono">{doc.pages}</td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{doc.size}</td>
                                    <td className="px-6 py-4 text-slate-500 dark:text-slate-500">
                                        <div>{doc.modified}</div>
                                        <div className="text-xs text-slate-400 dark:text-slate-500">by {doc.author}</div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="p-1 hover:bg-slate-100 rounded">
                                                <MoreHorizontal className="w-4 h-4 text-slate-400" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleDownload(doc.name)}>Download</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600" onClick={() => {
                                                    setSelectedIds([doc.id]);
                                                    handleBulkDelete();
                                                }}>
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </TooltipProvider>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
