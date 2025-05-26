using UCMS.DataService.Data;
using UCMS.DataService.Repositories.Implementation;
using UCMS.Models.DbModels;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace UCMS.DataService.Repositories.ModelRepository
{
    public class SiteRepository(UCMSDbContext context, IMapper mapper) : Repository<Site>(context)
    {
        IMapper _mapper = mapper;

        public IEnumerable<Site> GetByUserId(int userId)
        {
            return _context.Sites.Where(site => site.UserId == userId);
        }

        public async Task<Site?> GetSiteWithDocTypesAndProps(int siteId)
        {
            return await _dbSet
                .Include(site => site.DocumentTypes)
                    .ThenInclude(doctype => doctype.Properties)
                .FirstOrDefaultAsync(site => site.SiteId == siteId);
        }

        public async Task<Site?> GetSiteWithAll(int siteId)
        {
            return await _dbSet
                .Include(site => site.DocumentTypes)
                    .ThenInclude(doctype => doctype.Properties)
                        .ThenInclude(prop => prop.ContentProperties)
                .Include(site => site.DocumentTypes)
                    .ThenInclude(doctype => doctype.Contents)
                        .ThenInclude(content => content.ContentProperties)
                .Include(site => site.DocumentTypes)
                    .ThenInclude(doctype => doctype.Code)
                .FirstOrDefaultAsync(site => site.SiteId == siteId);
        }

        public async Task UpdateSiteAsync(Site site)
        {
            var existingSite = await GetSiteWithAll(site.SiteId);

            if (existingSite == null) return;

            // Update scalar properties
            context.Entry(existingSite).CurrentValues.SetValues(site);

            // Initialize collections if they don't exist
            existingSite.DocumentTypes ??= new List<DocumentType>();

            // Update DocumentTypes collection
            UpdateDocumentTypes(existingSite, site.DocumentTypes);

            await context.SaveChangesAsync();
        }

        private void UpdateDocumentTypes(Site existingSite, ICollection<DocumentType> newDocumentTypes)
        {
            // Remove deleted document types
            var toRemove = existingSite.DocumentTypes
                .Where(existing => newDocumentTypes?.Any(n => n.DocumentTypeId == existing.DocumentTypeId && existing.DocumentTypeId != 0) != true)
                .ToList();

            foreach (var item in toRemove)
            {
                context.Entry(item).State = EntityState.Deleted;
            }

            if (newDocumentTypes == null) return;

            foreach (var newDocType in newDocumentTypes)
            {
                var existingDocType = existingSite.DocumentTypes
                    .FirstOrDefault(dt => dt.DocumentTypeId == newDocType.DocumentTypeId && newDocType.DocumentTypeId != 0);

                if (existingDocType == null)
                {
                    // Add new document type
                    newDocType.SiteId = existingSite.SiteId;
                    newDocType.Site = existingSite;

                    // Clear IDs for new entities to let EF generate them
                    newDocType.DocumentTypeId = 0;
                    ClearNewEntityIds(newDocType);

                    existingSite.DocumentTypes.Add(newDocType);
                    context.Entry(newDocType).State = EntityState.Added;
                }
                else
                {
                    // Update existing document type
                    var originalDocTypeId = existingDocType.DocumentTypeId;
                    context.Entry(existingDocType).CurrentValues.SetValues(newDocType);
                    existingDocType.DocumentTypeId = originalDocTypeId; // Preserve original ID

                    // Initialize collections if they don't exist
                    existingDocType.Properties ??= new List<Property>();
                    existingDocType.Contents ??= new List<Content>();

                    // Update nested collections
                    UpdateCode(existingDocType, newDocType.Code);
                    UpdateProperties(existingDocType, newDocType.Properties);
                    UpdateContents(existingDocType, newDocType.Contents);
                }
            }
        }

        private void ClearNewEntityIds(DocumentType docType)
        {
            // Clear Code ID
            if (docType.Code != null)
            {
                docType.Code.CodeId = 0;
                docType.Code.DocumentTypeId = 0;
            }

            // Clear Property IDs
            if (docType.Properties != null)
            {
                foreach (var property in docType.Properties)
                {
                    property.PropertyId = 0;
                    property.DocumentTypeId = 0;

                    if (property.ContentProperties != null)
                    {
                        foreach (var contentProp in property.ContentProperties)
                        {
                            contentProp.ContentPropertyId = 0;
                            contentProp.PropertyId = 0;
                            contentProp.ContentId = 0;
                        }
                    }
                }
            }

            // Clear Content IDs
            if (docType.Contents != null)
            {
                foreach (var content in docType.Contents)
                {
                    content.ContentId = 0;
                    content.DocumentTypeId = 0;

                    if (content.ContentProperties != null)
                    {
                        foreach (var contentProp in content.ContentProperties)
                        {
                            contentProp.ContentPropertyId = 0;
                            contentProp.PropertyId = 0;
                            contentProp.ContentId = 0;
                        }
                    }
                }
            }
        }

        private void UpdateCode(DocumentType existingDocType, Code newCode)
        {
            if (newCode == null)
            {
                // Remove code if it exists and new code is null
                if (existingDocType.Code != null)
                {
                    context.Entry(existingDocType.Code).State = EntityState.Deleted;
                    existingDocType.Code = null;
                }
                return;
            }

            if (existingDocType.Code == null)
            {
                // Add new code
                newCode.CodeId = 0;
                newCode.DocumentTypeId = existingDocType.DocumentTypeId;
                newCode.DocumentType = existingDocType;
                existingDocType.Code = newCode;
                context.Entry(newCode).State = EntityState.Added;
            }
            else
            {
                // Update existing code
                var originalCodeId = existingDocType.Code.CodeId;
                context.Entry(existingDocType.Code).CurrentValues.SetValues(newCode);
                existingDocType.Code.CodeId = originalCodeId; // Preserve original ID
                existingDocType.Code.DocumentTypeId = existingDocType.DocumentTypeId; // Preserve foreign key
            }
        }

        private void UpdateProperties(DocumentType existingDocType, ICollection<Property> newProperties)
        {
            // Remove deleted properties
            var toRemove = existingDocType.Properties
                .Where(existing => newProperties?.Any(n => n.PropertyId == existing.PropertyId && existing.PropertyId != 0) != true)
                .ToList();

            foreach (var item in toRemove)
            {
                context.Entry(item).State = EntityState.Deleted;
            }

            if (newProperties == null) return;

            foreach (var newProperty in newProperties)
            {
                var existingProperty = existingDocType.Properties
                    .FirstOrDefault(p => p.PropertyId == newProperty.PropertyId && newProperty.PropertyId != 0);

                if (existingProperty == null)
                {
                    // Add new property
                    newProperty.PropertyId = 0;
                    newProperty.DocumentTypeId = existingDocType.DocumentTypeId;
                    newProperty.DocumentType = existingDocType;

                    // Clear content property IDs
                    if (newProperty.ContentProperties != null)
                    {
                        foreach (var contentProp in newProperty.ContentProperties)
                        {
                            contentProp.ContentPropertyId = 0;
                            contentProp.PropertyId = 0;
                            contentProp.Property = newProperty;
                        }
                    }

                    existingDocType.Properties.Add(newProperty);
                    context.Entry(newProperty).State = EntityState.Added;
                }
                else
                {
                    // Update existing property
                    var originalPropertyId = existingProperty.PropertyId;
                    context.Entry(existingProperty).CurrentValues.SetValues(newProperty);
                    existingProperty.PropertyId = originalPropertyId; // Preserve original ID
                    existingProperty.DocumentTypeId = existingDocType.DocumentTypeId; // Preserve foreign key

                    // Initialize collection if it doesn't exist
                    existingProperty.ContentProperties ??= new List<ContentProperty>();

                    // Update content properties
                    UpdateContentProperties(existingProperty, newProperty.ContentProperties);
                }
            }
        }

        private void UpdateContents(DocumentType existingDocType, ICollection<Content> newContents)
        {
            // Remove deleted contents
            var toRemove = existingDocType.Contents
                .Where(existing => newContents?.Any(n => n.ContentId == existing.ContentId && existing.ContentId != 0) != true)
                .ToList();

            foreach (var item in toRemove)
            {
                context.Entry(item).State = EntityState.Deleted;
            }

            if (newContents == null) return;

            foreach (var newContent in newContents)
            {
                var existingContent = existingDocType.Contents
                    .FirstOrDefault(c => c.ContentId == newContent.ContentId && newContent.ContentId != 0);

                if (existingContent == null)
                {
                    // Add new content
                    newContent.ContentId = 0;
                    newContent.DocumentTypeId = existingDocType.DocumentTypeId;
                    newContent.DocumentType = existingDocType;

                    // Clear content property IDs
                    if (newContent.ContentProperties != null)
                    {
                        foreach (var contentProp in newContent.ContentProperties)
                        {
                            contentProp.ContentPropertyId = 0;
                            contentProp.ContentId = 0;
                            contentProp.Content = newContent;
                        }
                    }

                    existingDocType.Contents.Add(newContent);
                    context.Entry(newContent).State = EntityState.Added;
                }
                else
                {
                    // Update existing content
                    var originalContentId = existingContent.ContentId;
                    context.Entry(existingContent).CurrentValues.SetValues(newContent);
                    existingContent.ContentId = originalContentId; // Preserve original ID
                    existingContent.DocumentTypeId = existingDocType.DocumentTypeId; // Preserve foreign key

                    // Initialize collection if it doesn't exist
                    existingContent.ContentProperties ??= new List<ContentProperty>();

                    // Update content properties
                    UpdateContentPropertiesForContent(existingContent, newContent.ContentProperties);
                }
            }
        }

        private void UpdateContentProperties(Property existingProperty, ICollection<ContentProperty> newContentProperties)
        {
            // Remove deleted content properties
            var toRemove = existingProperty.ContentProperties
                .Where(existing => newContentProperties?.Any(n => n.ContentPropertyId == existing.ContentPropertyId && existing.ContentPropertyId != 0) != true)
                .ToList();

            foreach (var item in toRemove)
            {
                context.Entry(item).State = EntityState.Deleted;
            }

            if (newContentProperties == null) return;

            foreach (var newContentProperty in newContentProperties)
            {
                var existingContentProperty = existingProperty.ContentProperties
                    .FirstOrDefault(cp => cp.ContentPropertyId == newContentProperty.ContentPropertyId && newContentProperty.ContentPropertyId != 0);

                if (existingContentProperty == null)
                {
                    // Add new content property
                    newContentProperty.ContentPropertyId = 0;
                    newContentProperty.PropertyId = existingProperty.PropertyId;
                    newContentProperty.Property = existingProperty;

                    existingProperty.ContentProperties.Add(newContentProperty);
                    context.Entry(newContentProperty).State = EntityState.Added;
                }
                else
                {
                    // Update existing content property
                    var originalId = existingContentProperty.ContentPropertyId;
                    context.Entry(existingContentProperty).CurrentValues.SetValues(newContentProperty);
                    existingContentProperty.ContentPropertyId = originalId; // Preserve original ID
                    existingContentProperty.PropertyId = existingProperty.PropertyId; // Preserve foreign key
                }
            }
        }

        private void UpdateContentPropertiesForContent(Content existingContent, ICollection<ContentProperty> newContentProperties)
        {
            // Remove deleted content properties
            var toRemove = existingContent.ContentProperties
                .Where(existing => newContentProperties?.Any(n => n.ContentPropertyId == existing.ContentPropertyId && existing.ContentPropertyId != 0) != true)
                .ToList();

            foreach (var item in toRemove)
            {
                context.Entry(item).State = EntityState.Deleted;
            }

            if (newContentProperties == null) return;

            foreach (var newContentProperty in newContentProperties)
            {
                var existingContentProperty = existingContent.ContentProperties
                    .FirstOrDefault(cp => cp.ContentPropertyId == newContentProperty.ContentPropertyId && newContentProperty.ContentPropertyId != 0);

                if (existingContentProperty == null)
                {
                    // Add new content property
                    newContentProperty.ContentPropertyId = 0;
                    newContentProperty.ContentId = existingContent.ContentId;
                    newContentProperty.Content = existingContent;

                    existingContent.ContentProperties.Add(newContentProperty);
                    context.Entry(newContentProperty).State = EntityState.Added;
                }
                else
                {
                    // Update existing content property
                    var originalId = existingContentProperty.ContentPropertyId;
                    context.Entry(existingContentProperty).CurrentValues.SetValues(newContentProperty);
                    existingContentProperty.ContentPropertyId = originalId; // Preserve original ID
                    existingContentProperty.ContentId = existingContent.ContentId; // Preserve foreign key
                }
            }
        }
    }
}
