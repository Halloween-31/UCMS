using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using UCMS.DataService.Controllers.BaseController;
using UCMS.DataService.DTOs.SiteDTOs;
using UCMS.DataService.Repositories.Interface;
using UCMS.DataService.Repositories.ModelRepository;
using UCMS.Models.DbModels.SiteContentCreation;

namespace UCMS.DataService.Controllers
{
    [Route("/[controller]")]
    public class SiteController(IRepository<Site> repository, IMapper mapper) : BaseController<Site>(repository)
    {
        private readonly IMapper _mapper = mapper;

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
        public async Task<ActionResult<Site?>> GetSiteWithAll(int siteId)
        {
            var entity = await (_repository as SiteRepository)!.GetSiteWithAll(siteId);
            if (entity == null) return NotFound();

            foreach (var doctype in entity.DocumentTypes)
            {
                doctype.Site = null;
                foreach (var prop in doctype.Properties)
                {
                    prop.DocumentType = null;
                    foreach (var contentProperty in prop.ContentProperties)
                    {
                        contentProperty.Property = null;
                        contentProperty.Content = null;
                    }
                }
                foreach (var content in doctype.Contents)
                {
                    content.DocumentType = null;
                    foreach (var contentProperty in content.ContentProperties)
                    {
                        contentProperty.Property = null;
                        contentProperty.Content = null;
                    }
                }
                if (doctype.Code != null)
                {
                    doctype.Code.DocumentType = null;
                }
            }

            return Ok(entity);
        }

        [HttpGet("{siteId}/page/{contentId}")]
        public async Task<ActionResult<string>> GetSiteHtmlCode(int siteId, int contentId)
        {
            var entity = await (_repository as SiteRepository)!.GetSiteWithAll(siteId);
            if (entity == null) return NotFound();

            var docType = entity.DocumentTypes.FirstOrDefault(d => d.Contents.FirstOrDefault(c => c.ContentId == contentId) != null);

            var code = docType?.Code;
            if (code == null) return BadRequest();

            //
            Dictionary<string, string> propValue = docType.Properties
                .ToDictionary(p => p.PropertyName, p => p.ContentProperties.FirstOrDefault(cp => cp.ContentId == contentId).Value);

            string resultCode = code.CodeValue;
            foreach (var pv in propValue)
            {
                resultCode = resultCode.Replace($"{{{{{pv.Key}}}}}", pv.Value);
            }
            //

            return Ok(resultCode);
        }

        [HttpPost("RealCreate")]
        public async Task<ActionResult<Site>> RealCreate(SiteSaveDTO entity)
        {
            Site site = _mapper.Map<Site>(entity);
            await _repository.AddAsync(site);
            return CreatedAtAction(nameof(GetById), new { id = entity.SiteId }, site);
        }

        [HttpPut("RealUpdate/{siteId}")]
        public async Task<IActionResult> Update(int siteId, SiteSaveDTO entity)
        {
            // Ensure id matches
            if (siteId != entity.SiteId)
                return BadRequest();

            var site = _mapper.Map<Site>(entity);

            await (_repository as SiteRepository).UpdateSiteAsync(site);
            return NoContent();
        }
    }
}
