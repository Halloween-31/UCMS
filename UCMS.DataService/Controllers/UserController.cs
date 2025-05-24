using Microsoft.AspNetCore.Mvc;
using UCMS.DataService.Controllers.BaseController;
using UCMS.DataService.DTOs.UserDTOs;
using UCMS.DataService.Repositories.Interface;
using UCMS.DataService.Repositories.Partial;
using UCMS.Models.DbModels;
using static Grpc.Core.Metadata;

namespace UCMS.DataService.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class UserController(IRepository<User> repository) : BaseController<User>(repository)
    {
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] LoginUserDTO loginUser)
        {
            var entity = await (_repository as UserRepository)!.GetByLoginAndPassword(loginUser.Login, loginUser.Password);
            if (entity == null)
                return NotFound();
            return Ok(entity);
        }
    }
}
