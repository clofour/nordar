using backend.Enums;
using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options)
        : IdentityUserContext<User, Guid>(options)
    {

        public DbSet<AccessCode> AccessCodes { get; set; }
        public DbSet<NorthStar> NorthStars { get; set; }
        public DbSet<Bearing> Bearings { get; set; }
        public DbSet<Movement> Movements { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventInstanceState> EventInstanceStates { get; set; }
        public DbSet<Reflection> Reflections { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Goal>().UseTpcMappingStrategy();

            builder.Entity<NorthStar>()
                .HasMany(northStar => northStar.Bearings)
                .WithOne(bearing => bearing.NorthStar)
                .HasForeignKey("NorthStarId")
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Bearing>()
                .HasMany(bearing => bearing.Movements)
                .WithOne(movement => movement.Bearing)
                .HasForeignKey("BearingId")
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Event>()
                .HasDiscriminator<string>("Type")
                .HasValue<OnetimeEvent>("Onetime")
                .HasValue<RecurringEvent>("Recurring")
                .HasValue<OverrideEvent>("Override");

            base.OnModelCreating(builder);
        }
    }
}