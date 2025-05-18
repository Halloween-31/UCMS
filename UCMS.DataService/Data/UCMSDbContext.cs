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
        public virtual DbSet<Site> Sites { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.UserId).HasColumnName(nameof(User.UserId));
                entity.Property(e => e.Name);
                entity.Property(e => e.Email);
                entity.Property(e => e.Login);
                entity.Property(e => e.Password);
            });

            modelBuilder.Entity<Site>(entity =>
            {
                entity.HasKey(e => e.SiteId);

                entity.Property(e => e.SiteId).HasColumnName(nameof(Site.SiteId));
                entity.Property(e => e.SiteName);
                entity.Property(e => e.Domain);

                entity.HasOne(b => b.User)
                    .WithMany(a => a.Sites)
                    .HasForeignKey(b => b.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
