using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Config;
using backend.Enums;

namespace backend.Models
{
    public class Movement : Goal
    {
        public Guid BearingId { get; set; }
        [ForeignKey("BearingId")]
        public Bearing Bearing { get; set; }

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
