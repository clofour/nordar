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
    public class EventController(UserManager<User> userManager, EventService eventService) : ControllerBase
    {
        [HttpGet]
        [EndpointName("ListEvents")]
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
        [EndpointName("CreateOnetime")]
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
        [EndpointName("CreateRecurring")]
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
        [EndpointName("UpdateEvent")]
        public async Task<ActionResult> Update()
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        [EndpointName("DeleteEvent")]
        public async Task<ActionResult> Delete()
        {
            throw new NotImplementedException();
        }

        [HttpGet("onetime/{eventId}")]
        [EndpointName("GetOnetimeInstanceState")]
        [ProducesResponseType(typeof(EventInstanceStateGet), StatusCodes.Status200OK, "application/json")]
        public async Task<ActionResult> GetOnetimeInstanceState([FromRoute] Guid eventId)
        {
            User? user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            ServiceResult serviceResult = await eventService.GetInstanceState(user.Id, eventId, null);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }

        [HttpGet("recurring/{eventId}/{eventOccurrence}")]
        [EndpointName("GetRecurringInstanceState")]
        [ProducesResponseType(typeof(EventInstanceStateGet), StatusCodes.Status200OK, "application/json")]
        public async Task<ActionResult> GetRecurringInstanceState([FromRoute] Guid eventId, [FromRoute] DateTime eventOccurrence)
        {
            User? user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            ServiceResult serviceResult = await eventService.GetInstanceState(user.Id, eventId, eventOccurrence);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }

        // [EndpointName("SetOnetimeInstanceState")]
        [HttpPut("onetime/{eventId}")]
        [EndpointName("SetOnetimeInstanceState")]
        public async Task<ActionResult> SetOnetimeInstanceState([FromRoute] Guid eventId, [FromBody] EventInstanceStateSet eventInstanceStateSet)
        {
            User? user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            ServiceResult serviceResult = await eventService.SetInstanceState(user.Id, eventId, null, eventInstanceStateSet);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }

        // [EndpointName("SetRecurringInstanceState")]
        [HttpPut("recurring/{eventId}/{eventOccurrence}")]
        [EndpointName("SetRecurringInstanceState")]
        public async Task<ActionResult> SetRecurringInstanceState([FromRoute] Guid eventId, [FromRoute] DateTime eventOccurrence, [FromBody] EventInstanceStateSet eventInstanceStateSet)
        {
            User? user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            ServiceResult serviceResult = await eventService.SetInstanceState(user.Id, eventId, eventOccurrence, eventInstanceStateSet);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }
    }
}
