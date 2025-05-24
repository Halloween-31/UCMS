using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UCMS.Models.Interface;

namespace UCMS.Models.DbModels
{
    public class Site : IEntity
    {
        public int Id { get => SiteId; }


        public int SiteId { get; set; }
        public string SiteName { get; set; } = string.Empty;
        public string Domain { get; set; } = string.Empty;

        public int UserId { get; set; }
        public User User { get; set; } = null!;
    }
}
