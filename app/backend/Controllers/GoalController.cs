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
using backend.Enums;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class GoalController(AppDbContext appDbContext, UserManager<User> userManager, ILogger<GoalController> logger, IMapper mapper, GoalService goalService) : ControllerBase
    {
        [HttpGet]
        [EndpointName("ListGoals")]
        [ProducesResponseType(typeof(List<NorthStarGet>), StatusCodes.Status200OK, "application/json")]
        public async Task<ActionResult> List()
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Forbid();
            }

            ServiceResult serviceResult = await goalService.List(user);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }

        [HttpGet]
        [EndpointName("GoalStats")]
        [ProducesResponseType(typeof(GoalStats), StatusCodes.Status200OK, "application/json")]
        public async Task<ActionResult> Stats()
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Forbid();
            }

            ServiceResult serviceResult = await goalService.Stats(user);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }

        [HttpPost]
        [EndpointName("CreateNorthStar")]
        public async Task<ActionResult> CreateNorthStar([FromBody] NorthStarCreate northStarCreate)
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Forbid();
            }

            ServiceResult serviceResult = await goalService.CreateNorthStar(user.Id, northStarCreate);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }

        [HttpPost]
        [EndpointName("CreateBearing")]
        public async Task<ActionResult> CreateBearing([FromBody] BearingCreate bearingCreate)
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Forbid();
            }

            ServiceResult serviceResult = await goalService.CreateBearing(user, bearingCreate);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }

        [HttpPost]
        [EndpointName("CreateMovement")]
        public async Task<ActionResult> CreateMovement([FromBody] MovementCreate movementCreate)
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Forbid();
            }

            ServiceResult serviceResult = await goalService.CreateMovement(user, movementCreate);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }

        [HttpPost]
        [EndpointName("DeleteGoal")]
        public async Task<ActionResult> Delete(Guid id, GoalType goalType)
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Forbid();
            }

            ServiceResult serviceResult = await goalService.Delete(user.Id, id, goalType);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }
    }
}