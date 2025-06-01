using AutoMapper;
using Microsoft.EntityFrameworkCore;
using UCMS.DataService.Data;
using UCMS.DataService.Repositories.Implementation;
using UCMS.Models.DbModels.SiteContentCreation;

namespace UCMS.DataService.Repositories.ModelRepository
{
    public class ContentRepository(UCMSDbContext context, IMapper mapper) : Repository<Content>(context)
    {
        IMapper _mapper = mapper;

        public async Task<Content?> GetFullContent(int contentId)
        {
            return _dbSet
                .Include(c => c.DocumentType)
                    .ThenInclude(d => d.Properties)
                .FirstOrDefault(c => c.ContentId == contentId);
        }
    }
}
