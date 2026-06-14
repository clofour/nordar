using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Config;

namespace backend.Models
{
    public class Reflection
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public Guid? EventId { get; set; }
        [ForeignKey("EventId")]
        public Event? Event { get; set; }

        public DateTime Date { get; set; }

        [Required]
        [MaxLength(FieldLimits.InputList)]
        public List<string> Positive { get; set; }
        [Required]
        [MaxLength(FieldLimits.InputList)]
        public List<string> Negative { get; set; }
        [Required]
        [MaxLength(FieldLimits.InputList)]
        public List<string> Improvement { get; set; }
    }
}
