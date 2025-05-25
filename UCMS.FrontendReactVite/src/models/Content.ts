import type { ContentProperty } from "./ContentProperty";
import type { DocumentType } from "./DocumentType";

export interface Content {
    contentId: number,
    contentName: string,

    documentTypeId: number,
    documentType : DocumentType,

    contentProperties: ContentProperty[],
}