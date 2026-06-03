using Serilog.Core;
using Serilog.Events;

namespace backend.Enrichers
{
    public class RequestEnricher(HttpContextAccessor httpContextAccessor) : ILogEventEnricher
    {
        public RequestEnricher() : this(new HttpContextAccessor()) { }

        public void Enrich(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
        {
            var httpContext = httpContextAccessor.HttpContext;
            if (httpContext == null)
            {
                return;
            }


            string ipAddress = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";

            string username = httpContext.User?.Identity?.Name ?? "anonymous";

            RouteValueDictionary routeValues = httpContext.Request.RouteValues;
            string controller = routeValues["controller"]?.ToString() ?? "?";
            string action = routeValues["action"]?.ToString() ?? "?";

            string requestDataString = $"{ipAddress}/{username} => ({controller}/{action})";
            ScalarValue requestData = new ScalarValue(requestDataString);
            LogEventProperty requestDataProperty = new LogEventProperty("RequestData", requestData);
            logEvent.AddPropertyIfAbsent(requestDataProperty);
        }
    }
}