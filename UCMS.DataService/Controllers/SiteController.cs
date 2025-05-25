using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using UCMS.DataService.Controllers.BaseController;
using UCMS.DataService.Repositories.Interface;
using UCMS.DataService.Repositories.ModelRepository;
using UCMS.Models.DbModels;

namespace UCMS.DataService.Controllers
{
    [Route("/[controller]")]
    public class SiteController(IRepository<Site> repository) : BaseController<Site>(repository)
    {
        [HttpGet("ByUserId")]
        public ActionResult<IEnumerable<Site>> GetByUserId(int userId)
        {
            var entity = (_repository as SiteRepository)?.GetByUserId(userId);
            if (entity == null)
                return NotFound();
            return Ok(entity);
        }

        [HttpGet("{siteId}/doctypes&props")]
        public async Task<ActionResult<Site?>> GetSiteWithDocTypes(int siteId)
        {
            var entity = await (_repository as SiteRepository)!.GetSiteWithDocTypesAndProps(siteId);
            if (entity == null) return NotFound();

            // need change later for dtos
            foreach (var doctype in entity.DocumentTypes)
            {
                doctype.Site = null;
                foreach (var prop in doctype.Properties)
                {
                    prop.DocumentType = null;
                }
            }

            return Ok(entity);
        }

        [HttpGet("{siteId}/withAll")]
        public async Task<ActionResult<Site?>> GetStieWithAll(int siteId)
        {
            var entity = await (_repository as SiteRepository)!.GetSiteWithAll(siteId);
            if (entity == null) return NotFound();

            foreach (var doctype in entity.DocumentTypes)
            {
                doctype.Site = null;
                foreach (var prop in doctype.Properties)
                {
                    prop.DocumentType = null;
                    if(prop.Content != null)
                    {
                        prop.Content.Property = null;
                    }
                }
            }

            return Ok(entity);
        }
    }
}
