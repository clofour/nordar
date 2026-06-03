using System.ComponentModel.DataAnnotations;
using backend.Config;
using backend.Enums;

namespace backend.Models
{
    public class NorthStar : Goal
    {
        [Required(AllowEmptyStrings = false)]
        [MaxLength(FieldLimits.ShortText)]
        public string Description { get; set; }
        public GoalImportance Importance { get; set; }
        [MaxLength(FieldLimits.LongText)]
        public string Justification { get; set; }
        
        public List<Bearing> Bearings { get; set; }
    }
}
