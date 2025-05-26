using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UCMS.Models.Interface;
using UCMS.Models.ModelEnums.Site;

namespace UCMS.Models.DbModels.SiteContentCreation
{
    public class Site : IEntity
    {
        public int Id { get => SiteId; }


        public int SiteId { get; set; }
        public string SiteName { get; set; } = string.Empty;
        public string Domain { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty; // SiteStatus
        public DateTime LastUpdated { get; set; }
        public string? ImageUrl { get; set; }
        public string? ImageAlt { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public ICollection<DocumentType> DocumentTypes { get; set; } = [];
    }
}
