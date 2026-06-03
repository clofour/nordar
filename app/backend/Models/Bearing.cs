using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Config;

namespace backend.Models
{
    public class Bearing : Goal
    {
        public Guid NorthStarId { get; set; }
        [ForeignKey("NorthStarId")]
        public NorthStar NorthStar { get; set; }

        [MaxLength(FieldLimits.LongText)]
        public string Description { get; set; }
        [MaxLength(FieldLimits.LongText)]
        public string Justification { get; set; }

        [MaxLength(FieldLimits.LongText)]
        public string? Strengths { get; set; }
        [MaxLength(FieldLimits.LongText)]
        public string? Weaknesses { get; set; }

        public List<Movement> Movements { get; set; }
    }
}
