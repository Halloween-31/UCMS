using UCMS.DataService.DTOs.ContentPropertyDTOs;
using UCMS.Models.DbModels;

namespace UCMS.DataService.DTOs.ContentDTOs
{
    public class ContentSaveDTO
    {
        public int ContentId { get; set; }
        public string ContentName { get; set; } = string.Empty;

        public int DocumentTypeId { get; set; }

        public ICollection<ContentPropertySaveDTO> ContentProperties { get; set; } = [];
    }
}
