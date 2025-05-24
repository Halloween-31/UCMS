using Microsoft.AspNetCore.Mvc;
using UCMS.DataService.Repositories.Interface;
using UCMS.Models.DbModels;
using UCMS.Models.Interface;

namespace UCMS.DataService.Controllers.BaseController
{
    [ApiController]
    public abstract class BaseController<T> : ControllerBase where T : class, IEntity
    {
        protected readonly IRepository<T> _repository;

        public BaseController(IRepository<T> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<T>>> GetAll()
        {
            var entities = await _repository.GetAllAsync();
            return Ok(entities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<T>> GetById(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null)
                return NotFound();
            return Ok(entity);
        }

        [HttpPost]
        public async Task<ActionResult<T>> Create(T entity)
        {
            await _repository.AddAsync(entity);
            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, T entity)
        {
            // Ensure id matches
            if (id != entity.Id)
                return BadRequest();

            await _repository.UpdateAsync(entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}
