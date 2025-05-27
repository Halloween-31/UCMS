using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UCMS.Models.DbModels.SiteContentCreation;
using UCMS.Models.Interface;

namespace UCMS.Models.DbModels.AIConnectionModels
{
    public class Chat : IEntity
    { 
        public int Id { get => ChatId; }

        public int ChatId { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public ICollection<Message> Messages { get; set; } = [];
    }
}
