using Microsoft.EntityFrameworkCore;
using UCMS.DataService.Data;
using UCMS.DataService.Repositories.Implementation;
using UCMS.Models.DbModels.SiteContentCreation;

namespace UCMS.DataService.Repositories.Partial
{
    public class UserRepository(UCMSDbContext context) : Repository<User>(context)
    {
        public async Task<User?> GetByLoginAndPassword(string login, string password)
        {
            return await _dbSet.FirstOrDefaultAsync(user => user.Login == login && user.Password == password);
        }
    }
}
