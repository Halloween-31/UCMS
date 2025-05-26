using UCMS.Models.DbModels;

namespace UCMS.DataService.DTOs.ContentPropertyDTOs
{
    public class ContentPropertySaveDTO
    {
        public int ContentPropertyId { get; set; }
        public string Value { get; set; } = string.Empty;

        public int PropertyId { get; set; }
        public int ContentId { get; set; }
    }
}
