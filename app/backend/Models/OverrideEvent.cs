using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Config;

namespace backend.Models
{
    public class OverrideEvent(): Event
    {
        public Guid RecurringEventId { get; set; }
        [ForeignKey("RecurringEventId")]
        public RecurringEvent RecurringEvent { get; set; }
        public DateTime RecurrenceId { get; set; }
    }
}
