using System.ComponentModel;
using System.Security.Claims;
using AutoMapper;
using backend.Data;
using backend.Enums;
using backend.Models;
using backend.Viewmodels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class ReflectionService(AppDbContext appDbContext, IMapper mapper, ILogger<AuthService> logger)
    {
        public async Task<ServiceResult> Get(Guid userId, Guid id)
        {
            Reflection? reflection = await appDbContext.Reflections
                .AsNoTracking()
                .FirstOrDefaultAsync(reflection => reflection.UserId == userId && reflection.Id == id);

            if (reflection == null)
            {
                return new ServiceResult(Status.NotFound);
            }

            ReflectionGet reflectionGet = new ReflectionGet();
            mapper.Map(reflection, reflectionGet);

            return new ServiceResult(Status.Ok, reflectionGet);
        }

        public async Task<ServiceResult> List(Guid userId)
        {
            List<Reflection> events = await appDbContext.Reflections
                .Where(e => e.UserId == userId)
                .ToListAsync();
            
            List<ReflectionGet> reflectionsGet = new List<ReflectionGet>();
            mapper.Map(events, reflectionsGet);

            return new ServiceResult(Status.Ok, reflectionsGet);
        }

        public async Task<ServiceResult> Create(Guid userId, ReflectionCreate reflectionCreate)
        {
            Reflection reflection = new Reflection();
            mapper.Map(reflectionCreate, reflection);
            reflection.UserId = userId;

            appDbContext.Reflections.Add(reflection);
            await appDbContext.SaveChangesAsync();

            return new ServiceResult(Status.Ok);
        }

        public async Task<ServiceResult> Delete(Guid userId, Guid id)
        {
            int reflectionsDeleted = await appDbContext.Reflections
                .Where(reflection => reflection.UserId == userId && reflection.Id == id)
                .ExecuteDeleteAsync();

            if (reflectionsDeleted == 1)
            {
                return new ServiceResult(Status.Ok);
            }
            else {
                return new ServiceResult(Status.NotFound);
            }
        }

        public async Task<ServiceResult> PromptData(User user)
        {
            return new ServiceResult(Status.Ok, user.NextReflection);
        }

        public async Task<ServiceResult> Prompt(User user)
        {
            Random random = new Random();
            int dayOffset = random.Next(1, 7);

            DateTime lastReflection = DateTime.UtcNow;
            DateTime nextReflection = lastReflection.AddDays(dayOffset);

            user.NextReflection = nextReflection;

            await appDbContext.SaveChangesAsync();

            return new ServiceResult(Status.Ok);
        }
    }
}