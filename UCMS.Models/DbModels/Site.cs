using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UCMS.Models.DbModels
{
    public class Site
    {
        public int SiteId { get; set; }
        public string SiteName { get; set; } = string.Empty;
        public string Domain { get; set; } = string.Empty;

        public int UserId { get; set; }
        public required User User { get; set; }
    }
}
