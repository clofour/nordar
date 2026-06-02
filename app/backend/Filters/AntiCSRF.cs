using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Primitives;

namespace backend.Filters
{
    public class AntiCSRF : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (context.HttpContext.Request.Headers.TryGetValue("X-CSRF-Token", out StringValues headerValues) && headerValues.Count == 1 && headerValues[0] == "clofour.com")
            {
                return;
            }
            context.Result = new UnauthorizedObjectResult("Invalid CSRF Token.");
        }
    }
}
