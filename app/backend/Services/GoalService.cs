using System.ComponentModel;
using AutoMapper;
using backend.Data;
using backend.Enums;
using backend.Models;
using backend.Viewmodels;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class GoalService(AppDbContext appDbContext)
    {
        public async Task<T?> FindParent<T>(User user, Guid id) where T: Goal
        {
            T? parent = await ResolveGoalDbSet<T>().FindAsync(id);
            if (parent == null || parent.User != user)
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