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
    public class ReflectionController(AppDbContext appDbContext, ReflectionService reflectionService, UserManager<User> userManager, ILogger<ReflectionController> logger, IMapper mapper, EventService eventService) : ControllerBase
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

            ServiceResult serviceResult = await reflectionService.Get(user.Id, Id);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
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

            ServiceResult serviceResult = await reflectionService.List(user.Id);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
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

            ServiceResult serviceResult = await reflectionService.Create(user.Id, reflectionCreate);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
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

            ServiceResult serviceResult = await reflectionService.Delete(user.Id, id);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
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
            
            ServiceResult serviceResult = await reflectionService.PromptData(user);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }

        [HttpPost]
        public async Task<ActionResult> Prompt()
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Forbid();
            }

            ServiceResult serviceResult = await reflectionService.Prompt(user);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }
    }
}
