using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UCMS.Models.Interface;

namespace UCMS.Models.DbModels
{
    public class DocumentType : IEntity
    {
        public int Id { get => DocumentTypeId; }

        public int DocumentTypeId { get; set; }

        public int SiteId { get; set; }
        public Site Site { get; set; } = null!;

        public ICollection<Property> Properties { get; set; } = new List<Property>();
    }
}
