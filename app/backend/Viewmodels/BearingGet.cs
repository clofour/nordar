using System.ComponentModel.DataAnnotations;
using backend.Config;

namespace backend.Viewmodels
{
    public class BearingGet : GoalGet
    {
        [Required]
        public Guid NorthStarId { get; set; }

        [Required]
        [MaxLength(FieldLimits.LongText)]
        public string Description { get; set; }
        [Required]
        [MaxLength(FieldLimits.LongText)]
        public string Justification { get; set; }

        [MaxLength(FieldLimits.LongText)]
        public string? Strengths { get; set; }
        [MaxLength(FieldLimits.LongText)]
        public string? Weaknesses { get; set; }

        [Required]
        public List<MovementGet> Movements { get; set; }
    }
}