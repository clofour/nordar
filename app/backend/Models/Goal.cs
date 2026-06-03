using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Enums;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public abstract class Goal
    {
        [Key]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        [Required(AllowEmptyStrings = false)]
        [MaxLength(200)]
        public string Name { get; set; }
    }
}
