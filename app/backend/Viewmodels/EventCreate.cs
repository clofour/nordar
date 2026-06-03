using System.ComponentModel.DataAnnotations;
using backend.Config;
using backend.Enums;

namespace backend.Viewmodels
{
    public abstract class EventCreate
    {
        public Guid? MovementId { get; set; }

        [Required]
        [MaxLength(FieldLimits.ShortText)]
        public string Name { get; set; }

        [Required]
        public DateOnly StartDate { get; set; }
        [Required]
        public TimeOnly StartTime { get; set; }
        [Required]
        public string TimeZoneId { get; set; }
        [Required]
        public int Duration { get; set; }
    }
}