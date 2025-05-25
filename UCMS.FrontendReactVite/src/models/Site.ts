import type { DocumentType } from "./DocumentType";

export interface Site {
    siteId: number;
    siteName: string;
    domain: string;
    status: "Published" | "Draft" | "Review" | string; // Allow other strings for flexibility
    lastUpdated: Date;
    imageUrl: string | null;
    imageAlt: string;
    documentTypes : DocumentType[];
}

export const SiteDefaultState: Site = {
    siteId: 0,
    siteName: '',
    domain: '',
    status: "Draft",
    lastUpdated: new Date(),
    imageUrl: null,
    imageAlt: '',
    documentTypes: [],
} 