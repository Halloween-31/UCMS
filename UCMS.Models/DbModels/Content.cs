using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UCMS.Models.Interface;

namespace UCMS.Models.DbModels
{
    public class Content : IEntity
    {
        public int Id { get => ContentId; }

        public int ContentId { get; set; }
        public string Value { get; set; } = string.Empty;

        public int PropertyId { get; set; }
        public Property Property { get; set; } = null!;
    }
}
