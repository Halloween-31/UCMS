import type { Code } from "./Code";
import type { Content } from "./Content";
import type { Property } from "./Property";
import type { Site } from "./Site";

export interface DocumentType {
    documentTypeId: number,
    name: string,

    siteId: number,
    site: Site | null,

    properties: Property[],
    contents: Content[],
    code: Code,
};