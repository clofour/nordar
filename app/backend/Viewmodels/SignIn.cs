using System.ComponentModel.DataAnnotations;
using Destructurama.Attributed;
namespace backend.Viewmodels
{
    public class SigninForm(string username, string password)
    {
        [Required(ErrorMessage = "Username is required.")]
        [MinLength(3, ErrorMessage = "Username must contain between 3 and 20 characters.")]
        [MaxLength(20, ErrorMessage = "Username must contain between 3 and 20 characters.")]
        [RegularExpression(@"^[a-zA-Z0-9]+$", ErrorMessage = "Username must only contain letters and numbers.")]
        public string Username { get; set; } = username;
        [Required(ErrorMessage = "Password is required.")]
        [MinLength(16, ErrorMessage = "Password must contain between 16 to 64 characters.")]
        [MaxLength(64, ErrorMessage = "Password must contain between 16 to 64 characters.")]
        [RegularExpression(@"^[a-zA-Z0-9]+$", ErrorMessage = "Password must only contain letters and numbers.")]
        [LogMasked(ShowFirst = 3, PreserveLength = true)]
        public string Password { get; set; } = password;

    }
}