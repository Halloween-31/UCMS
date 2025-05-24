using UCMS.DataService.Data;
using UCMS.DataService.Repositories.Implementation;
using UCMS.Models.DbModels;

namespace UCMS.DataService.Repositories.ModelRepository
{
    public class SiteRepository(UCMSDbContext context) : Repository<Site>(context)
    {
        public IEnumerable<Site> GetByUserId(int userId)
        {
            return _context.Sites.Where(site => site.UserId == userId);
        }
    }
}
