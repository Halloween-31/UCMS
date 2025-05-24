export interface Site {
    id: number;
    title: string;
    domain: string;
    status: "Published" | "Draft" | "Review" | string; // Allow other strings for flexibility
    lastUpdated: string;
    imageUrl: string | null;
    imageAlt: string;
}