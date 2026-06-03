using System.ComponentModel.DataAnnotations;
using backend.Config;
using backend.Enums;

namespace backend.Viewmodels
{
    public class MovementGet : GoalGet
    {
        [Required]
        public Guid BearingId { get; set; }

        [MaxLength(FieldLimits.LongText)]
        public string? Difficulty { get; set; }
        public MotivationType? MotivationType { get; set; }
        [MaxLength(FieldLimits.LongText)]
        public string? Motivation { get; set; }
        [MaxLength(FieldLimits.LongText)]
        public string? Triggers { get; set; }
        [MaxLength(FieldLimits.LongText)]
        public string? Temptations { get; set; }
        [MaxLength(FieldLimits.LongText)]
        public string? Obstacles { get; set; }
        [MaxLength(FieldLimits.LongText)]
        public string? KillConditions { get; set; }
    }
}
