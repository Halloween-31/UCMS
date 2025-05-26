using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UCMS.Models.Interface;

namespace UCMS.Models.DbModels.SiteContentCreation
{
    public class ContentProperty : IEntity
    {
        public int Id { get => ContentPropertyId; }

        public int ContentPropertyId { get; set; }
        public string Value { get; set; } = string.Empty;

        public int PropertyId { get; set; }
        public Property Property { get; set; } = null!;
        public int ContentId { get; set; }
        public Content Content { get; set; } = null!;
    }
}
