using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class AccessCode(string name, int uses)
    {
        [Key]
        [Required]
        [MinLength(3)]
        [MaxLength(25)]
        public string Name { get; set; } = name;
        [Required]
        public int Uses { get; set; } = uses;
    }
}
