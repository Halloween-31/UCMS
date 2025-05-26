using UCMS.DataService.DTOs.ContentPropertyDTOs;
using UCMS.Models.DbModels;

namespace UCMS.DataService.DTOs.PropertyDTOs
{
    public class PropertySaveDTO
    {
        public int PropertyId { get; set; }
        public string PropertyName { get; set; } = string.Empty;
        public string DataType { get; set; } = string.Empty;

        public int DocumentTypeId { get; set; }

        public ICollection<ContentPropertySaveDTO> ContentProperties { get; set; } = [];
    }
}
