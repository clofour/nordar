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
    public class EventController(AppDbContext appDbContext, SignInManager<User> signInManager, UserManager<User> userManager, ILogger<AuthController> logger, IMapper mapper, EventService eventService) : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(typeof(List<EventGet>), StatusCodes.Status200OK, "application/json")]
        public async Task<ActionResult> List()
        {
            User? user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            ServiceResult serviceResult = await eventService.List(user.Id);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK, "application/json")]
        public async Task<ActionResult> CreateOnetime([FromBody] OnetimeEventCreate onetimeEventCreate)
        {
            User? user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            ServiceResult serviceResult = await eventService.CreateOnetime(user.Id, onetimeEventCreate);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK, "application/json")]
        public async Task<ActionResult> CreateRecurring([FromBody] RecurringEventCreate recurringEventCreate)
        {
            User? user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            ServiceResult serviceResult = await eventService.CreateRecurring(user.Id, recurringEventCreate);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }

        [HttpPost]
        public async Task<ActionResult> Update()
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public async Task<ActionResult> Delete()
        {
            throw new NotImplementedException();
        }

        [HttpGet("onetime/{eventId}")]
        [ProducesResponseType(typeof(EventInstanceStateGet), StatusCodes.Status200OK, "application/json")]
        public async Task<ActionResult> GetOnetimeInstanceState([FromRoute] Guid eventId)
        {
            User? user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            ServiceResult serviceResult = await eventService.GetOnetimeInstanceState(user.Id, eventId);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }

        [HttpGet("recurring/{eventId}/{eventOccurence}")]
        [ProducesResponseType(typeof(EventInstanceStateGet), StatusCodes.Status200OK, "application/json")]
        public async Task<ActionResult> GetRecurringInstanceState([FromRoute] Guid eventId, [FromRoute] DateTime eventOccurence)
        {
            User? user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            ServiceResult serviceResult = await eventService.GetOnetimeInstanceState(user.Id, eventId);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }

        // [EndpointName("SetOnetimeInstanceState")]
        [HttpPut("onetime/{eventId}")]
        public async Task<ActionResult> SetOnetimeInstanceState([FromRoute] Guid eventId, [FromBody] EventInstanceStateSet eventInstanceStateSet)
        {
            User? user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            ServiceResult serviceResult = await eventService.SetOnetimeInstanceState(user.Id, eventId, eventInstanceStateSet);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }

        // [EndpointName("SetRecurringInstanceState")]
        [HttpPut("recurring/{eventId}/{eventOccurence}")]
        public async Task<ActionResult> SetRecurringInstanceState([FromRoute] Guid eventId, [FromRoute] DateTime? eventOccurence, [FromBody] EventInstanceStateSet eventInstanceStateSet)
        {
            User? user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            ServiceResult serviceResult = await eventService.SetOnetimeInstanceState(user.Id, eventId, eventInstanceStateSet);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }
    }
}
