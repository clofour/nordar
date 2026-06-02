using System.ComponentModel.DataAnnotations;

namespace backend.Viewmodels
{
    public class GoalStats
    {
        [Required]
        public int NorthStarCount { get; set; }
        [Required]
        public int BearingCount { get; set; }
        [Required]
        public int MovementCount { get; set; }
    }
}