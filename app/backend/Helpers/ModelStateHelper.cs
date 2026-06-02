using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace backend.Helpers
{
    public static class ModelStateHelper
    {
        public static string Format(this ModelStateDictionary modelState)
        {
            return string.Join("\n", modelState.Values.SelectMany(v => v.Errors).Select(v => v.ErrorMessage));
        }
    }
}