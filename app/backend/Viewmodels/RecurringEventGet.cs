using System.ComponentModel.DataAnnotations;
using backend.Config;
using backend.Enums;

namespace backend.Viewmodels
{
    public class RecurringEventGet: EventGet
    {
        [Required]
        public RecurrenceGet Recurrence { get; set; }
    }

    public class RecurrenceGet
    {
        [Required]
        public string RRULE { get; set; }
        [Required]
        public List<string> ExDate { get; set; }
    }
}
