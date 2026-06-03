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
        [ProducesResponseType(typeof(List<NorthStarGet>), StatusCodes.Status200OK, "application/json")]
        public async Task<ActionResult> Get()
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Forbid();
            }

            await appDbContext.Entry(user)
                .Collection(user => user.NorthStars)
                .Query()
                .Include(northStar => northStar.Bearings)
                    .ThenInclude(bearing => bearing.Movements)
                .LoadAsync();

            List<NorthStar> northStars = user.NorthStars;
            List<NorthStarGet> northStarsDTO = mapper.Map<List<NorthStarGet>>(northStars);

            return Ok(northStarsDTO);
        }

        [HttpGet]
        [ProducesResponseType(typeof(GoalStats), StatusCodes.Status200OK, "application/json")]
        public async Task<ActionResult> Stats()
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Forbid();
            }

            GoalStats goalStats = new GoalStats
            {
                NorthStarCount = await goalService.CountGoals<NorthStar>(user),
                BearingCount = await goalService.CountGoals<Bearing>(user),
                MovementCount = await goalService.CountGoals<Movement>(user)
            };

            return Ok(goalStats);
        }

        [HttpPost]
        public async Task<ActionResult> CreateNorthStar([FromBody] NorthStarCreate northStarCreate)
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Forbid();
            }

            NorthStar northStar = new NorthStar();
            mapper.Map(northStarCreate, northStar);
            northStar.User = user;

            appDbContext.NorthStars.Add(northStar);
            await appDbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> CreateBearing([FromBody] BearingCreate bearingCreate)
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Forbid();
            }

            NorthStar? parent = await goalService.FindParent<NorthStar>(user, bearingCreate.NorthStarId);
            if (parent == null)
            {
                return NotFound("The parent goal does not exist.");
            }

            await appDbContext.Entry(parent).Collection(northStar => northStar.Bearings).LoadAsync();

            Bearing bearing = new Bearing();
            mapper.Map(bearingCreate, bearing);
            bearing.User = user;
            bearing.NorthStar = parent;

            appDbContext.Bearings.Add(bearing);
            await appDbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> CreateMovement([FromBody] MovementCreate movementCreate)
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Forbid();
            }

            Bearing? parent = await goalService.FindParent<Bearing>(user, movementCreate.BearingId);
            if (parent == null)
            {
                return NotFound("The parent goal does not exist.");
            }

            await appDbContext.Entry(parent).Collection(bearing => bearing.Movements).LoadAsync();

            Movement movement = new Movement();
            mapper.Map(movementCreate, movement);
            movement.User = user;
            movement.Bearing = parent;

            appDbContext.Movements.Add(movement);
            await appDbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> Delete(Guid id, GoalType goalType)
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return Forbid();
            }

            int goalsDeleted = await goalService.ResolveGoalDbSet(goalType)
                .Where(goal => goal.UserId == user.Id && goal.Id == id)
                .ExecuteDeleteAsync();

            if (goalsDeleted == 1)
            {
                return Ok();
            }
            else {
                return NotFound();
            }
        }
    }
}