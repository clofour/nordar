using System.ComponentModel.DataAnnotations;
using backend.DataAnnotations;
using Destructurama.Attributed;
namespace backend.Viewmodels
{
    public class SignupForm(string accessCode, string username, string email, string password, bool termsOfService)
    {
        [Required(ErrorMessage = "Access Code is required.")]
        [MinLength(3, ErrorMessage = "Access Code must contain between 3 and 20 characters.")]
        [MaxLength(20, ErrorMessage = "Access Code must contain between 3 and 20 characters.")]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Access code must only contain letters.")]
        public string AccessCode { get; set; } = accessCode;
        [Required(ErrorMessage = "Username is required.")]
        [MinLength(3, ErrorMessage = "Username must contain between 3 and 20 characters.")]
        [MaxLength(20, ErrorMessage = "Username must contain between 3 and 20 characters.")]
        [RegularExpression(@"^[a-zA-Z0-9]+$", ErrorMessage = "Username must only contain letters and numbers.")]
        public string Username { get; set; } = username;
        [Required(ErrorMessage = "Email is required.")]
        [MaxLength(256, ErrorMessage = "Email must contain less than 256 characters.")]
        [EmailAddress(ErrorMessage = "Email is invalid.")]
        public string Email { get; set; } = email;
        [Required(ErrorMessage = "Password is required.")]
        [MinLength(16, ErrorMessage = "Password must contain between 16 to 64 characters.")]
        [MaxLength(64, ErrorMessage = "Password must contain between 16 to 64 characters.")]
        [RegularExpression(@"^[a-zA-Z0-9]+$", ErrorMessage = "Password must only contain letters and numbers.")]
        [LogMasked(ShowFirst = 3, PreserveLength = true)]
        public string Password { get; set; } = password;
        [Required(ErrorMessage = "You must accept the Terms of Service and Privacy Policy.")]
        [IsTrue(ErrorMessage = "You must accept the Terms of Service and Privacy Policy.")]
        public bool TermsOfService { get; set; } = termsOfService;
    }
}
