using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Config;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public enum EventState
    {
        Unknown,
        Incomplete,
        Complete
    }

    [Index(nameof(EventId), IsUnique = false)]
    public class EventInstanceState()
    {
        [Key]
        public Guid Id { get; set; }
        public Guid EventId { get; set; }
        public DateTime? EventOccurrence { get; set; }
        public Guid UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public EventState? EventState { get; set; }
        public Guid? ReflectionId { get; set; }
        [ForeignKey("ReflectionId")]
        public Reflection? Reflection { get; set; }
    }
}
