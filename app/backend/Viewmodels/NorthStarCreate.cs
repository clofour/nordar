using System.ComponentModel.DataAnnotations;
using backend.Config;
using backend.Enums;

namespace backend.Viewmodels
{
    public class NorthStarCreate: GoalCreate
    {
        [Required(AllowEmptyStrings = false)]
        [MaxLength(FieldLimits.ShortText)]
        public string Description { get; set; }
        [Required]
        public GoalImportance Importance { get; set; }
        [Required]
        [MaxLength(FieldLimits.LongText)]
        public string Justification { get; set; }
    }
}