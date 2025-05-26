using UCMS.DataService.DTOs.CodeDTOs;
using UCMS.DataService.DTOs.ContentDTOs;
using UCMS.DataService.DTOs.PropertyDTOs;
using UCMS.Models.DbModels;

namespace UCMS.DataService.DTOs.DocumentTypeDTO
{
    public class DocumentTypeSaveDTO
    {
        public int DocumentTypeId { get; set; }
        public string Name { get; set; } = string.Empty;

        public int SiteId { get; set; }

        public CodeSaveDTO? Code { get; set; }

        public ICollection<PropertySaveDTO> Properties { get; set; } = [];
        public ICollection<ContentSaveDTO> Contents { get; set; } = [];
    }
}
