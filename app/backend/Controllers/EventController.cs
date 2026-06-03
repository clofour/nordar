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
        public async Task<ActionResult> Get()
        {
            User? user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            List<Event> events = await appDbContext.Events
                .Where(e => e.UserId == user.Id)
                .ToListAsync();

            List<EventGet> eventsGet = new List<EventGet>();
            mapper.Map(events, eventsGet);

            return Ok(eventsGet);
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

            OnetimeEvent onetimeEvent = new OnetimeEvent();
            mapper.Map(onetimeEventCreate, onetimeEvent);
            onetimeEvent.Start = eventService.ConstructStart(onetimeEventCreate.StartDate, onetimeEventCreate.StartTime, onetimeEventCreate.TimeZoneId);
            onetimeEvent.End = eventService.ConstructEnd(onetimeEvent.Start, onetimeEventCreate.Duration);
            onetimeEvent.User = user;

            appDbContext.Events.Add(onetimeEvent);
            await appDbContext.SaveChangesAsync();

            return Ok();
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

            RecurringEvent recurringEvent = new RecurringEvent();
            mapper.Map(recurringEventCreate, recurringEvent);
            recurringEvent.RRULE = eventService.ConstructRRULE(recurringEventCreate);
            recurringEvent.Start = eventService.ConstructStart(recurringEventCreate.StartDate, recurringEventCreate.StartTime, recurringEventCreate.TimeZoneId);
            recurringEvent.End = eventService.ConstructEnd(recurringEvent.Start, recurringEventCreate.Duration);
            recurringEvent.User = user;

            appDbContext.Events.Add(recurringEvent);
            await appDbContext.SaveChangesAsync();

            return Ok();
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
        public async Task<ActionResult> GetOnetimeInstanceState([FromRoute] Guid eventId, DateTime eventOccurence)
        {
            User? user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            EventInstanceState eventInstanceState = await appDbContext.EventInstanceStates.FirstOrDefaultAsync(obj =>
                obj.UserId == user.Id &&
                obj.EventId == eventId)
                ?? new EventInstanceState();

            EventInstanceStateGet eventInstanceStateGet = new EventInstanceStateGet();
            mapper.Map(eventInstanceState, eventInstanceStateGet);

            return Ok(eventInstanceStateGet);
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

            EventInstanceState eventInstanceState = await appDbContext.EventInstanceStates.FirstOrDefaultAsync(obj =>
                obj.UserId == user.Id &&
                obj.EventId == eventId &&
                obj.EventOccurence == eventOccurence)
                ?? new EventInstanceState();

            EventInstanceStateGet eventInstanceStateGet = new EventInstanceStateGet();
            mapper.Map(eventInstanceState, eventInstanceStateGet);

            return Ok(eventInstanceStateGet);
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

            EventInstanceState? eventInstanceState = await appDbContext.EventInstanceStates.FirstOrDefaultAsync(obj =>
                obj.UserId == user.Id &&
                obj.EventId == eventId);

            if (eventInstanceState == null)
            {
                eventInstanceState = new EventInstanceState();
                eventInstanceState.UserId = user.Id;
                eventInstanceState.EventId = eventId;

                appDbContext.EventInstanceStates.Add(eventInstanceState);
            }

            mapper.Map(eventInstanceStateSet, eventInstanceState);
            
            await appDbContext.SaveChangesAsync();

            return Ok();
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

            EventInstanceState? eventInstanceState = await appDbContext.EventInstanceStates.FirstOrDefaultAsync(obj =>
                obj.UserId == user.Id &&
                obj.EventId == eventId &&
                obj.EventOccurence == eventOccurence);

            if (eventInstanceState == null)
            {
                eventInstanceState = new EventInstanceState();
                eventInstanceState.UserId = user.Id;
                eventInstanceState.EventId = eventId;
                eventInstanceState.EventOccurence = eventOccurence;

                appDbContext.EventInstanceStates.Add(eventInstanceState);
            }

            mapper.Map(eventInstanceStateSet, eventInstanceState);

            await appDbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
