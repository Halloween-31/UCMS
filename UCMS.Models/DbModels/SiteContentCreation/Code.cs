using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UCMS.Models.Interface;

namespace UCMS.Models.DbModels.SiteContentCreation
{
    public class Code : IEntity
    {
        public int Id { get => CodeId; }

        public int CodeId { get; set; }
        public string CodeValue { get; set; } = string.Empty;

        public int DocumentTypeId { get; set; }
        public DocumentType DocumentType { get; set; } = null!;
    }
}
