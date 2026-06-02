using backend.Viewmodels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using backend.Filters;
using backend.Helpers;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using backend.Services;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class ReflectionController(AppDbContext appDbContext, UserManager<User> userManager, ILogger<ReflectionController> logger, IMapper mapper, EventService eventService) : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(typeof(ReflectionGet), StatusCodes.Status200OK, "application/json")]
        public async Task<ActionResult> Get(Guid Id)
        {
            User? user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            Reflection? reflection = await appDbContext.Reflections
                .AsNoTracking()
                .FirstOrDefaultAsync(reflection => reflection.UserId == user.Id && reflection.Id == Id);

            if (reflection == null)
            {
                return NotFound();
            }

            ReflectionGet reflectionGet = new ReflectionGet();
            mapper.Map(reflection, reflectionGet);

            return Ok(reflectionGet);
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<ReflectionGet>), StatusCodes.Status200OK, "application/json")]
        public async Task<ActionResult> List()
        {
            User? user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            List<Reflection> events = await appDbContext.Reflections
                .Where(e => e.UserId == user.Id)
                .ToListAsync();
            
            List<ReflectionGet> reflectionsGet = new List<ReflectionGet>();
            mapper.Map(events, reflectionsGet);

            return Ok(reflectionsGet);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK, "application/json")]
        public async Task<ActionResult> Create([FromBody] ReflectionCreate reflectionCreate)
        {
            User? user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            Reflection reflection = new Reflection();
            mapper.Map(reflectionCreate, reflection);
            reflection.User = user;

            appDbContext.Reflections.Add(reflection);
            await appDbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> Update()
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public async Task<ActionResult> Delete(Guid id)
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Forbid();
            }

            int reflectionsDeleted = await appDbContext.Reflections
                .Where(reflection => reflection.UserId == user.Id && reflection.Id == id)
                .ExecuteDeleteAsync();

            if (reflectionsDeleted == 1)
            {
                return Ok();
            }
            else {
                return NotFound();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(DateTime), StatusCodes.Status200OK, "application/json")]
        public async Task<ActionResult> PromptData()
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Forbid();
            }
            
            return Ok(user.NextReflection);
        }

        [HttpPost]
        public async Task<ActionResult> Prompt()
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Forbid();
            }

            Random random = new Random();
            int dayOffset = random.Next(1, 7);

            DateTime lastReflection = new DateTime();
            DateTime nextReflection = lastReflection.AddDays(dayOffset);

            user.NextReflection = nextReflection;

            await appDbContext.SaveChangesAsync();
            
            return Ok();
        }
    }
}
