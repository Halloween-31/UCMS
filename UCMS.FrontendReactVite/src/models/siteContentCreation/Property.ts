import type { ContentProperty } from "./ContentProperty";
import type { DocumentType } from "./DocumentType";

export interface Property {
    propertyId : number,
    propertyName: string,
    dataType: string,

    documentTypeId: number,
    documentType: DocumentType | null,

    contentProperties: ContentProperty[],    
}