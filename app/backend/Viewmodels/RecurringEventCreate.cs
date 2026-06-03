using System.ComponentModel.DataAnnotations;
using backend.Config;
using backend.Enums;

namespace backend.Viewmodels
{
    public enum RecurrenceTypes
    {
        DAILY,
        WEEKLY,
        MONTHLY,
        YEARLY
    }

    public enum WeekDay
    {
        MO,
        TU,
        WE,
        TH,
        FR,
        SA,
        SU

    }

    public class RecurringEventCreate: EventCreate
    {
        [Required]
        public int RecurrenceAmount { get; set; }
        [Required]
        public RecurrenceTypes RecurrenceType { get; set; }

        public List<WeekDay>? WeekDays { get; set; }
        [Range(1, 31)]
        public int? MonthDay { get; set; }
        [Range(1, 12)]
        public int? YearMonth { get; set; }
    }
}