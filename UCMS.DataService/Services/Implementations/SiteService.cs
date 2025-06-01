using UCMS.Models.DbModels.SiteContentCreation;
using UCMS.DataService.Services.Interfaces;

namespace UCMS.DataService.Services.Implementations
{
    public class SiteService : ISiteService
    {
        public SiteService() { }

        public void UpdateContentProperties(Site site)
        {
            foreach (var docType in site.DocumentTypes)
            {
                foreach (var content in docType.Contents)
                {
                    foreach (var property in docType.Properties)
                    {
                        if (!property.ContentProperties.Any())
                        {
                            var contentProperty = new ContentProperty()
                            {
                                ContentPropertyId = 0,
                                Value = string.Empty,
                                Content = content,
                                ContentId = content.ContentId,
                                Property = property,
                                PropertyId = property.PropertyId,
                            };
                            property.ContentProperties.Add(contentProperty);
                            content.ContentProperties.Add(contentProperty);
                        }
                    }
                }
            }
        }
    }
}
