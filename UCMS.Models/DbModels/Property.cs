using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UCMS.Models.Interface;

namespace UCMS.Models.DbModels
{
    public class Property : IEntity
    {
        public int Id { get => PropertyId; }

        public int PropertyId { get; set; }
        public string PropertyName { get; set; } = string.Empty;
        public string DataType { get; set; } = string.Empty;

        public int DocumentTypeId { get; set; }
        public DocumentType DocumentType { get; set; } = null!;

        public Content? Content { get; set; }
    }
}
