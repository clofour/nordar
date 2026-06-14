using System.ComponentModel.DataAnnotations;
using backend.Enums;

namespace backend.Viewmodels
{
    public abstract class GoalUpdate
    {
        [Required(AllowEmptyStrings = false)]
        [MaxLength(200)]
        public string Name { get; set; }
    }
}