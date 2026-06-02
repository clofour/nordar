using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Config;

namespace backend.Models
{
    public abstract class Event()
    {
        [Key]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public Guid? MovementId { get; set; }
        [ForeignKey("MovementId")]
        public Movement? Movement { get; set; }

        [MaxLength(FieldLimits.ShortText)]
        public string Name { get; set; }

        public DateTime Start { get; set; }
        public DateTime End { get; set; }

    }
}