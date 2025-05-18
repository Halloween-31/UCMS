using Microsoft.EntityFrameworkCore;
using UCMS.Models.DbModels;

// PM> Add-Migration InitialCreate -Project UCMS.DataService -StartupProject UCMS.DataService -Context UCMSDbContext
// PM> Update-Database InitialCreate -Project UCMS.DataService -StartupProject UCMS.DataService -Context UCMSDbContext

namespace UCMS.DataService.Data
{
    public class UCMSDbContext : DbContext
    {
        public UCMSDbContext(DbContextOptions<UCMSDbContext> options)
            : base(options) { }

        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId).HasName("PRIMARY");

                entity.Property(e => e.UserId).HasColumnName("UserId");
                entity.Property(e => e.Name);
                entity.Property(e => e.Email);
                entity.Property(e => e.Login);
                entity.Property(e => e.Password);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
