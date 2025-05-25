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
};

export const SiteDefaultState: Site = {
    siteId: 0,
    siteName: '',
    domain: '',
    status: "Draft",
    lastUpdated: new Date(),
    imageUrl: null,
    imageAlt: '',
    documentTypes: [],
};

export function makeSiteDependencies(site: Site) : Site {
    site.documentTypes.forEach(doctype => {
        doctype.site = site;

        doctype.contents.forEach(content => {
            content.documentType = doctype;

            content.contentProperties.forEach(contentProperty => {
                contentProperty.content = content;
            })
        });

        doctype.properties.forEach(property => {
            property.documentType = doctype;

            property.contentProperties.forEach(contentProperty => {
                contentProperty.property = property;
            });
        });

        doctype.contents.forEach(content => {
            doctype.properties.forEach(property => {

                content.contentProperties.forEach(contentContentProperty => {

                    property.contentProperties.forEach(propertyContentProperty => {
                        
                        if(contentContentProperty.contentPropertyId == propertyContentProperty.contentPropertyId) {
                            contentContentProperty.property = propertyContentProperty.property;
                            propertyContentProperty.content = contentContentProperty.content;
                        }
                        
                    });

                });

            });
        });
    });
    return site;
}