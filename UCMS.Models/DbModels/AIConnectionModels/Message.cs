using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mscc.GenerativeAI;
using UCMS.Models.Interface;

namespace UCMS.Models.DbModels.AIConnectionModels
{
    public class Message : IEntity
    {
        public int Id { get => MessageId; }

        public int MessageId { get; set; }
        public string UserRequest { get; set; } = null!;
        public string? AIResponse { get; set; }

        public int ChatId { get; set; }
        public Chat Chat { get; set; } = null!;
    }
}
