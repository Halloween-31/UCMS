using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using UCMS.DataService.Controllers.BaseController;
using UCMS.DataService.Repositories.Interface;
using UCMS.DataService.Repositories.ModelRepository;
using UCMS.Models.DbModels.SiteContentCreation;

namespace UCMS.DataService.Controllers
{
    [Route("/[controller]")]
    public class ContentController(IRepository<Content> repository, IMapper mapper) : BaseController<Content>(repository)
    {
        private readonly IMapper _mapper = mapper;

        [HttpGet("GetFullContent/{contentId}")]
        public async Task<Content?> GetFullContent(int contentId)
        {
            var entity = await (_repository as ContentRepository)!.GetFullContent(contentId);
            entity.DocumentType.Contents = null;
            foreach (var prop in entity.DocumentType.Properties)
            {
                prop.DocumentType = null;
                prop.ContentProperties = [];
            }
            return entity;
        }
    }
}
