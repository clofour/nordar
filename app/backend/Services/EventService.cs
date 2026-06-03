using System.ComponentModel;
using AutoMapper;
using backend.Data;
using backend.Enums;
using backend.Models;
using backend.Viewmodels;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class EventService()
    {
        public string ConstructRRULE(RecurringEventCreate recurringEventCreate)
        {
            List<string> parts = new List<string>();

            parts.Add($"FREQ={recurringEventCreate.RecurrenceType}");
            parts.Add($"INTERVAL={recurringEventCreate.RecurrenceAmount}");

            switch (recurringEventCreate.RecurrenceType)
            {
                case RecurrenceTypes.WEEKLY:
                    if (recurringEventCreate.WeekDays == null)
                        throw new ArgumentException("WeekDays is required for weekly recurrence.");

                    parts.Add($"BYDAY={string.Join(",", recurringEventCreate.WeekDays)}");
                    
                    break;
                case RecurrenceTypes.MONTHLY:
                    if (recurringEventCreate.MonthDay == null)
                        throw new ArgumentException("MonthDay is required for monthly recurrence.");

                    parts.Add($"BYMONTHDAY={recurringEventCreate.MonthDay}");
                    
                    break;
                case RecurrenceTypes.YEARLY:
                    if (recurringEventCreate.MonthDay == null || recurringEventCreate.YearMonth == null)
                        throw new ArgumentException("MonthDay and YearMonth are required for yearly recurrence.");

                    parts.Add($"BYMONTHDAY={recurringEventCreate.MonthDay}");
                    parts.Add($"BYMONTH={recurringEventCreate.YearMonth}");
                    
                    break;

                default:
                    throw new InvalidEnumArgumentException(nameof(recurringEventCreate.RecurrenceType), (int) recurringEventCreate.RecurrenceType, typeof(RecurrenceTypes));
            }

            return string.Join(";", parts);
        }

        public DateTime ConstructStart(DateOnly startDate, TimeOnly startTime, string TimeZoneId)
        {
            TimeZoneInfo timeZone = TimeZoneInfo.FindSystemTimeZoneById(TimeZoneId);
            DateTime localDateTime = startDate.ToDateTime(startTime);
            DateTime utcDateTime = TimeZoneInfo.ConvertTimeToUtc(localDateTime, timeZone);

            return utcDateTime;
        }

        public DateTime ConstructEnd(DateTime start, int duration)
        {
            return start.AddMinutes(duration);
        }
    }
}