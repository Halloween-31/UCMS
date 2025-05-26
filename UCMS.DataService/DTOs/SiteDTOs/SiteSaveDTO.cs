using UCMS.DataService.DTOs.DocumentTypeDTO;
using UCMS.Models.DbModels;

namespace UCMS.DataService.DTOs.SiteDTOs
{
    public class SiteSaveDTO
    {
        public int SiteId { get; set; }
        public string SiteName { get; set; } = string.Empty;
        public string Domain { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty; // SiteStatus
        public DateTime LastUpdated { get; set; }
        public string? ImageUrl { get; set; }
        public string? ImageAlt { get; set; }

        public int UserId { get; set; }
        public ICollection<DocumentTypeSaveDTO> DocumentTypes { get; set; } = [];
    }
}
