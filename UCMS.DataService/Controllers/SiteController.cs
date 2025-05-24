using Microsoft.AspNetCore.Mvc;
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
        public ActionResult<Site> GetByUserId(int userId)
        {
            var entity = (_repository as SiteRepository)?.GetByUserId(userId);
            if (entity == null)
                return NotFound();
            return Ok(entity);
        }
    }
}
