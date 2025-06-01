import type { DocumentType } from "./DocumentType";

export interface Code {
    codeId: number,
    codeValue: string,

    documentTypeId: number,
    documentType: DocumentType,
}