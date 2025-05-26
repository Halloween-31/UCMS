using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UCMS.Models.Interface;

namespace UCMS.Models.DbModels.SiteContentCreation
{
    public class DocumentType : IEntity
    {
        public int Id { get => DocumentTypeId; }

        public int DocumentTypeId { get; set; }
        public string Name { get; set; } = string.Empty;

        public int SiteId { get; set; }
        public Site Site { get; set; } = null!;

        public Code? Code { get; set; }

        public ICollection<Property> Properties { get; set; } = [];
        public ICollection<Content> Contents { get; set; } = [];
    }
}
