using UCMS.DataService.Data;
using UCMS.DataService.Repositories.Implementation;
using UCMS.Models.DbModels;
using Microsoft.EntityFrameworkCore;

namespace UCMS.DataService.Repositories.ModelRepository
{
    public class SiteRepository(UCMSDbContext context) : Repository<Site>(context)
    {
        public IEnumerable<Site> GetByUserId(int userId)
        {
            return _context.Sites.Where(site => site.UserId == userId);
        }

        public async Task<Site?> GetSiteWithDocTypesAndProps(int siteId)
        {
            return await _dbSet
                .Include(site => site.DocumentTypes)
                    .ThenInclude(doctype => doctype.Properties)
                .FirstOrDefaultAsync(site => site.SiteId == siteId);
        }

        public async Task<Site?> GetSiteWithAll(int siteId)
        {
            return await _dbSet
                .Include(site => site.DocumentTypes)
                    .ThenInclude(doctype => doctype.Properties)
                        .ThenInclude(prop => prop.ContentProperties)
                    .ThenInclude(doctype => doctype.Content)
                        .ThenInclude(content => content.ContentProperties)
                .FirstOrDefaultAsync(site => site.SiteId == siteId);
        }
    }
}
