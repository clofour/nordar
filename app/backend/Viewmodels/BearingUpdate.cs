using System.ComponentModel.DataAnnotations;
using backend.Config;

namespace backend.Viewmodels
{
    public class BearingUpdate : GoalUpdate
    {
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
    }
}
