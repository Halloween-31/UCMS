using System.Xml.Linq;
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
                entity.Property(e => e.Status);
                entity.Property(e => e.LastUpdated);
                entity.Property(e => e.ImageUrl);
                entity.Property(e => e.ImageAlt);

                entity.HasOne(b => b.User)
                    .WithMany(e => e.Sites)
                    .HasForeignKey(b => b.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<DocumentType>(entity =>
            {
                entity.HasKey(e => e.DocumentTypeId);

                entity.Property(e => e.DocumentTypeId).HasColumnName(nameof(DocumentType.DocumentTypeId));
                entity.Property(e => e.Name);

                entity.HasOne(e => e.Site)
                    .WithMany(e => e.DocumentTypes)
                    .HasForeignKey(e => e.SiteId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Property>(entity =>
            {
                entity.HasKey(e => e.PropertyId);

                entity.Property(e => e.PropertyId).HasColumnName(nameof(Property.PropertyId));
                entity.Property(e => e.PropertyName);
                entity.Property(e => e.DataType);

                entity.HasOne(e => e.DocumentType)
                    .WithMany(e => e.Properties)
                    .HasForeignKey(e => e.DocumentTypeId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Content>(entity =>
            {
                entity.HasKey(e => e.ContentId);

                entity.Property(e => e.ContentId).HasColumnName(nameof(Content.ContentId));
                entity.Property(e => e.Value);

                entity.HasOne(e => e.Property)
                    .WithOne(e => e.Content)
                    .HasForeignKey<Content>(e => e.PropertyId)
                    .IsRequired();
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
