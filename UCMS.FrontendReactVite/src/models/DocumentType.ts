import type { Property } from "./Property";
import type { Site } from "./Site";

export interface DocumentType {
    documentTypeId: number,
    name: string,

    siteId: number,
    site: Site | null,

    properties: Property[],
};