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
        public virtual DbSet<DocumentType> DocumentTypes { get; set; }
        public virtual DbSet<Property> Properties { get; set; }
        public virtual DbSet<Content> Contents { get; set; }
        public virtual DbSet<ContentProperty> ContentProperties { get; set; }
        public virtual DbSet<Code> Codes { get; set; }

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
                entity.Property(e => e.ContentName);

                entity.HasOne(e => e.DocumentType)
                    .WithMany(e => e.Contents)
                    .HasForeignKey(e => e.DocumentTypeId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<ContentProperty>(entity =>
            {
                entity.HasKey(e => e.ContentPropertyId);

                entity.Property(e => e.ContentPropertyId).HasColumnName(nameof(ContentProperty.ContentPropertyId));
                entity.Property(e => e.Value);

                entity.HasOne(e => e.Property)
                    .WithMany(e => e.ContentProperties)
                    .HasForeignKey(e => e.PropertyId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.Content)
                    .WithMany(e => e.ContentProperties)
                    .HasForeignKey(e => e.ContentId)
                    .OnDelete(DeleteBehavior.ClientCascade);
            });

            modelBuilder.Entity<Code>(entity =>
            {
                entity.HasKey(e => e.CodeId);

                entity.Property(e => e.CodeId).HasColumnName(nameof(Code.CodeId));
                entity.Property(e => e.CodeValue);

                entity.HasOne(e => e.DocumentType)
                    .WithOne(e => e.Code)
                    .HasForeignKey<Code>(e => e.DocumentTypeId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Cascade);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
