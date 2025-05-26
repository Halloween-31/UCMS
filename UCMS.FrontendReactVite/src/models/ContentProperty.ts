import type { Content } from "./Content";
import type { Property } from "./Property";

export interface ContentProperty {
    contentPropertyId: number,
    value: string,

    propertyId: number,
    property: Property,
    contentId: number,
    content: Content,
}