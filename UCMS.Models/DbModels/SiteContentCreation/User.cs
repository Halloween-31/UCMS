﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UCMS.Models.Interface;

namespace UCMS.Models.DbModels.SiteContentCreation
{
    public class User : IEntity
    {
        public int Id { get => UserId; }

        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Login { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        public ICollection<Site> Sites { get; set; } = new List<Site>();
    }
}
