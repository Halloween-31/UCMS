import type { Content } from "../../siteContentCreation/Content"
import type { ContentProperty } from "../../siteContentCreation/ContentProperty"
import type { DocumentType } from "../../siteContentCreation/DocumentType"
import type { Property } from "../../siteContentCreation/Property"
import type { Site } from "../../siteContentCreation/Site"

export interface SiteSaveDto {
    siteId: number,
    siteName: string,
    domain: string,
    status: string,
    lastUpdated: Date,
    imageUrl: string,
    imageAlt: string,
    userId: number,
    documentTypes: DocumentTypeSaveDto[],
};

interface DocumentTypeSaveDto {
    documentTypeId: number,
    name: string,
    siteId: number,
    code: CodeSaveDto,
    properties: PropertySaveDto[],
    contents: ContentSaveDto[]
};

interface CodeSaveDto {
    codeId: number,
    codeValue: string,
    documentTypeId: number,
}

interface PropertySaveDto {
    propertyId: number,
    propertyName: string,
    dataType: string,
    documentTypeId: number,
    contentProperties: ContentPropertySaveDto[],
};

interface ContentSaveDto {
    contentId: number,
    contentName: string,
    documentTypeId: number,
    contentProperties: ContentPropertySaveDto[],
};

interface ContentPropertySaveDto {
    contentPropertyId: number,
    value: string,
    propertyId: number,
    contentId: number,
}

export const MapSiteToSiteSaveDTO = (site: Site) : SiteSaveDto => {
    return {
        siteId: site.siteId,
        siteName: site.siteName,
        domain: site.domain,
        status: site.status,
        lastUpdated: site.lastUpdated,
        imageUrl: site.imageUrl,
        imageAlt: site.imageAlt,
        userId: site.userId,
        documentTypes: site.documentTypes.map(docType => MapDocumentTypeToDocumentTypeSaveDTO(docType)),
    }
}

const MapDocumentTypeToDocumentTypeSaveDTO = (docType: DocumentType) : DocumentTypeSaveDto => {
    return {
        documentTypeId: docType.documentTypeId,
        name: docType.name,
        siteId: docType.siteId,
        code: {
            codeId: docType.code.codeId,
            codeValue: docType.code.codeValue,
            documentTypeId: docType.code.documentTypeId,
        },
        properties: docType.properties.map(property => MapPropertyToPropertySaveDTO(property)),
        contents: docType.contents.map(content => MapContentToContentSaveDTO(content)),
    }
}

const MapPropertyToPropertySaveDTO = (property: Property) : PropertySaveDto => {
    return {
        propertyId: property.propertyId,
        propertyName: property.propertyName,
        dataType: property.dataType,
        documentTypeId: property.documentTypeId,
        contentProperties: property.contentProperties.map(contentProperty => MapContentPropertyToContentPropertySaveDTO(contentProperty)),
    }
};

const MapContentToContentSaveDTO = (content: Content) : ContentSaveDto => {
    return {
        contentId: content.contentId,
        contentName: content.contentName,
        documentTypeId: content.documentTypeId,
        contentProperties: content.contentProperties.map(contentProperty => MapContentPropertyToContentPropertySaveDTO(contentProperty)),
    }
}

const MapContentPropertyToContentPropertySaveDTO = (contentProperty: ContentProperty) : ContentPropertySaveDto => {
    return {
        contentPropertyId: contentProperty.contentPropertyId,
        value: contentProperty.value,
        propertyId: contentProperty.propertyId,
        contentId: contentProperty.contentId,
    }
}

/*
    const objectToSave = {
      siteId: site.siteId,
      siteName: site.siteName,
      domain: site.domain,
      status: site.status,
      lastUpdated: site.lastUpdated,
      imageUrl: site.imageUrl,
      imageAlt: site.imageAlt,
      userId: site.userId,
      documentTypes: [
        {
          documentTypeId: site.documentTypes[0].documentTypeId,
          name: site.documentTypes[0].name,
          siteId: site.documentTypes[0].siteId,
          code: {
            codeId: site.documentTypes[0].code.codeId,
            codeValue: site.documentTypes[0].code.codeValue,
            documentTypeId: site.documentTypes[0].code.documentTypeId
          },
          properties: [
            {
              propertyId: site.documentTypes[0].properties[0].propertyId,
              propertyName: site.documentTypes[0].properties[0].propertyName,
              dataType: site.documentTypes[0].properties[0].dataType,
              documentTypeId: site.documentTypes[0].properties[0].documentTypeId,
              contentProperties: [
                {
                  contentPropertyId: site.documentTypes[0].properties[0].contentProperties[0].contentPropertyId,
                  value: site.documentTypes[0].properties[0].contentProperties[0].value,
                  propertyId: site.documentTypes[0].properties[0].contentProperties[0].propertyId,
                  contentId: site.documentTypes[0].properties[0].contentProperties[0].contentId
                }
              ]
            }
          ],
          contents: [
            {
              contentId: site.documentTypes[0].contents[0].contentId,
              contentName: site.documentTypes[0].contents[0].contentName,
              documentTypeId: site.documentTypes[0].contents[0].documentTypeId,
              contentProperties: [
                {
                  contentPropertyId: site.documentTypes[0].contents[0].contentProperties[0].contentPropertyId,
                  value: site.documentTypes[0].contents[0].contentProperties[0].value,
                  propertyId: site.documentTypes[0].contents[0].contentProperties[0].propertyId,
                  contentId: site.documentTypes[0].contents[0].contentProperties[0].contentId
                }
              ]
            }
          ]
        }
      ]
    };
*/