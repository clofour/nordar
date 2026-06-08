using System.ComponentModel;
using AutoMapper;
using backend.Data;
using backend.Enums;
using backend.Models;
using backend.Viewmodels;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class EventService(AppDbContext appDbContext, IMapper mapper)
    {
        public async Task<ServiceResult> List(Guid userId)
        {
            List<Event> events = await appDbContext.Events
                .Where(e => e.UserId == userId)
                .ToListAsync();

            List<EventGet> eventsGet = new List<EventGet>();
            mapper.Map(events, eventsGet);

            return new ServiceResult(Status.Ok, eventsGet);
        }

        public async Task<ServiceResult> CreateOnetime(Guid userId, OnetimeEventCreate onetimeEventCreate)
        {
            OnetimeEvent onetimeEvent = new OnetimeEvent();
            mapper.Map(onetimeEventCreate, onetimeEvent);
            onetimeEvent.Start = ConstructStart(onetimeEventCreate.StartDate, onetimeEventCreate.StartTime, onetimeEventCreate.TimeZoneId);
            onetimeEvent.End = ConstructEnd(onetimeEvent.Start, onetimeEventCreate.Duration);
            onetimeEvent.UserId = userId;

            appDbContext.Events.Add(onetimeEvent);
            await appDbContext.SaveChangesAsync();

            return new ServiceResult(Status.Ok);
        }

        public async Task<ServiceResult> CreateRecurring(Guid userId, RecurringEventCreate recurringEventCreate)
        {
            RecurringEvent recurringEvent = new RecurringEvent();
            mapper.Map(recurringEventCreate, recurringEvent);
            recurringEvent.RRULE = ConstructRRULE(recurringEventCreate);
            recurringEvent.Start = ConstructStart(recurringEventCreate.StartDate, recurringEventCreate.StartTime, recurringEventCreate.TimeZoneId);
            recurringEvent.End = ConstructEnd(recurringEvent.Start, recurringEventCreate.Duration);
            recurringEvent.UserId = userId;

            appDbContext.Events.Add(recurringEvent);
            await appDbContext.SaveChangesAsync();

            return new ServiceResult(Status.Ok);
        }

        public async Task<ServiceResult> GetOnetimeInstanceState(Guid userId, Guid eventId)
        {
            EventInstanceState eventInstanceState = await appDbContext.EventInstanceStates.FirstOrDefaultAsync(obj =>
                obj.UserId == userId &&
                obj.EventId == eventId)
                ?? new EventInstanceState();

            EventInstanceStateGet eventInstanceStateGet = new EventInstanceStateGet();
            mapper.Map(eventInstanceState, eventInstanceStateGet);

            return new ServiceResult(Status.Ok, eventInstanceStateGet);
        }

        public async Task<ServiceResult> GetRecurringInstanceState(Guid userId, Guid eventId, DateTime eventOcurrence)
        {
            EventInstanceState eventInstanceState = await appDbContext.EventInstanceStates.FirstOrDefaultAsync(obj =>
                obj.UserId == userId &&
                obj.EventId == eventId &&
                obj.EventOccurence == eventOcurrence)
                ?? new EventInstanceState();

            EventInstanceStateGet eventInstanceStateGet = new EventInstanceStateGet();
            mapper.Map(eventInstanceState, eventInstanceStateGet);

            return new ServiceResult(Status.Ok, eventInstanceStateGet);
        }

        public async Task<ServiceResult> SetOnetimeInstanceState(Guid userId, Guid eventId, EventInstanceStateSet eventInstanceStateSet)
        {
            EventInstanceState? eventInstanceState = await appDbContext.EventInstanceStates.FirstOrDefaultAsync(obj =>
                obj.UserId == userId &&
                obj.EventId == eventId);

            if (eventInstanceState == null)
            {
                eventInstanceState = new EventInstanceState();
                eventInstanceState.UserId = userId;
                eventInstanceState.EventId = eventId;

                appDbContext.EventInstanceStates.Add(eventInstanceState);
            }

            mapper.Map(eventInstanceStateSet, eventInstanceState);
            
            await appDbContext.SaveChangesAsync();

            return new ServiceResult(Status.Ok);
        }

        public async Task<ServiceResult> SetRecurringInstanceState(Guid userId, Guid eventId, DateTime eventOccurence, EventInstanceStateSet eventInstanceStateSet)
        {
            EventInstanceState? eventInstanceState = await appDbContext.EventInstanceStates.FirstOrDefaultAsync(obj =>
                obj.UserId == userId &&
                obj.EventId == eventId &&
                obj.EventOccurence == eventOccurence);

            if (eventInstanceState == null)
            {
                eventInstanceState = new EventInstanceState();
                eventInstanceState.UserId = userId;
                eventInstanceState.EventId = eventId;
                eventInstanceState.EventOccurence = eventOccurence;

                appDbContext.EventInstanceStates.Add(eventInstanceState);
            }

            mapper.Map(eventInstanceStateSet, eventInstanceState);

            await appDbContext.SaveChangesAsync();

            return new ServiceResult(Status.Ok);
        }


        public T CreateEvent<T>() where T: Event, new()
        {
            return new T();
        }

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