using System.ComponentModel.DataAnnotations;

namespace backend.DataAnnotations
{
    public class IsTrue : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value != null && (bool) value == true)
            {
                return ValidationResult.Success;
            }

            return new ValidationResult(ErrorMessage);
        }
    }
}