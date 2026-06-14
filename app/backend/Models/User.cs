using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class User() : IdentityUser<Guid>
    {
        public List<NorthStar> NorthStars { get; set; } = new List<NorthStar>();
        public List<Event> Events { get; set; } = new List<Event>();
        public List<Reflection> Reflections { get; set; } = new List<Reflection>();
        public DateTime NextReflection { get; set; }
    }
}
