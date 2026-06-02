using System.ComponentModel.DataAnnotations;

namespace backend.Viewmodels
{
    public class GoalGet
    {
        [Required]
        public Guid Id { get; set; }

        [Required(AllowEmptyStrings = false)]
        [MaxLength(200)]
        public string Name { get; set; }
    }
}