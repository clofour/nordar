using System.ComponentModel;
using AutoMapper;
using backend.Data;
using backend.Enums;
using backend.Models;
using backend.Viewmodels;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class GoalService(AppDbContext appDbContext, IMapper mapper, ILogger<GoalService> logger)
    {
        public async Task<ServiceResult> List(User user)
        {
            await appDbContext.Entry(user)
                .Collection(user => user.NorthStars)
                .Query()
                .Include(northStar => northStar.Bearings)
                    .ThenInclude(bearing => bearing.Movements)
                .LoadAsync();

            List<NorthStar> northStars = user.NorthStars;
            List<NorthStarGet> northStarsDTO = mapper.Map<List<NorthStarGet>>(northStars);

            return new ServiceResult(Status.Ok, northStarsDTO);
        }

        public async Task<ServiceResult> Stats(User user)
        {
            GoalStats goalStats = new GoalStats
            {
                NorthStarCount = await CountGoals<NorthStar>(user),
                BearingCount = await CountGoals<Bearing>(user),
                MovementCount = await CountGoals<Movement>(user)
            };

            return new ServiceResult(Status.Ok, goalStats);
        }

        public async Task<ServiceResult> CreateNorthStar(Guid userId, NorthStarCreate northStarCreate)
        {
            NorthStar northStar = new NorthStar();
            mapper.Map(northStarCreate, northStar);
            northStar.UserId = userId;

            appDbContext.NorthStars.Add(northStar);
            await appDbContext.SaveChangesAsync();

            return new ServiceResult(Status.Ok);
        }

        public async Task<ServiceResult> CreateBearing(User user, BearingCreate bearingCreate)
        {
            NorthStar? parent = await FindParent<NorthStar>(user, bearingCreate.NorthStarId);
            if (parent == null)
            {
                return new ServiceResult(Status.NotFound, "The parent goal does not exist.");
            }

            await appDbContext.Entry(parent).Collection(northStar => northStar.Bearings).LoadAsync();

            Bearing bearing = new Bearing();
            mapper.Map(bearingCreate, bearing);
            bearing.User = user;
            bearing.NorthStar = parent;

            appDbContext.Bearings.Add(bearing);
            await appDbContext.SaveChangesAsync();

            return new ServiceResult(Status.Ok);
        }

        public async Task<ServiceResult> CreateMovement(User user, MovementCreate movementCreate)
        {
            Bearing? parent = await FindParent<Bearing>(user, movementCreate.BearingId);
            if (parent == null)
            {
                return new ServiceResult(Status.NotFound, "The parent goal does not exist.");
            }

            await appDbContext.Entry(parent).Collection(bearing => bearing.Movements).LoadAsync();

            Movement movement = new Movement();
            mapper.Map(movementCreate, movement);
            movement.User = user;
            movement.Bearing = parent;

            appDbContext.Movements.Add(movement);
            await appDbContext.SaveChangesAsync();

            return new ServiceResult(Status.Ok);
        }

        public async Task<ServiceResult> Delete(Guid userId, Guid goalId, GoalType goalType)
        {
            int goalsDeleted = await ResolveGoalDbSet(goalType)
                .Where(goal => goal.UserId == userId && goal.Id == goalId)
                .ExecuteDeleteAsync();

            if (goalsDeleted == 1)
            {
                return new ServiceResult(Status.Ok);
            }
            else {
                return new ServiceResult(Status.NotFound);
            }
        }

        public async Task<T?> FindParent<T>(User user, Guid id) where T: Goal
        {
            T? parent = await ResolveGoalDbSet<T>().FindAsync(id);
            if (parent == null || parent.UserId != user.Id)
            {
                return null;
            }
            return parent;
        }

        public IQueryable<Goal> ResolveGoalDbSet(GoalType goalType)
        {
            switch (goalType)
            {
                case GoalType.NorthStar:
                    return appDbContext.NorthStars;
                case GoalType.Bearing:
                    return appDbContext.Bearings;
                case GoalType.Movement:
                    return appDbContext.Movements;
            }

            throw new ArgumentOutOfRangeException(nameof(goalType));
        }

        public DbSet<T> ResolveGoalDbSet<T>() where T: Goal
        {
            return appDbContext.Set<T>();
        }

        public async Task<int> CountGoals<T>(User user) where T: Goal
        {
            return await appDbContext.Set<T>().CountAsync(goal => goal.User == user);
        }
    }
}