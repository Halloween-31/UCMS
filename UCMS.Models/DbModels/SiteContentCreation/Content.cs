using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UCMS.Models.Interface;

namespace UCMS.Models.DbModels.SiteContentCreation
{
    public class Content : IEntity
    {
        public int Id { get => ContentId; }

        public int ContentId { get; set; }
        public string ContentName { get; set; } = string.Empty;

        public int DocumentTypeId { get; set; }
        public DocumentType DocumentType { get; set; } = null!;

        public ICollection<ContentProperty> ContentProperties { get; set; } = [];
    }
}
