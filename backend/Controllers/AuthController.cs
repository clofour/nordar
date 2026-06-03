using backend.Viewmodels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using backend.Filters;
using backend.Helpers;
using Microsoft.EntityFrameworkCore;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthController(AppDbContext appDbContext, SignInManager<User> signInManager, UserManager<User> userManager, ILogger<AuthController> logger) : ControllerBase
    {

        [HttpPost]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK, "text/plain")]
        public async Task<ActionResult> SignUp([FromBody] SignupForm signupForm)
        {
            if (!ModelState.IsValid)
            {
                logger.LogWarning("Invalid Model State: {@ModelState} {@SignupForm}", ModelState.Values, signupForm);
                return BadRequest(ModelState.Format());
            }

            AccessCode? accessCodeObject = await appDbContext.AccessCodes.FirstOrDefaultAsync(item => item.Name == signupForm.AccessCode && item.Uses >= 1);
            if (accessCodeObject == null)
            {
                logger.LogWarning("Invalid Access Code: {AccessCode}", signupForm.AccessCode);
                return BadRequest("Access Code is invalid.");
            }

            using (var transaction = await appDbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    User user = new User(accessCodeObject.Name)
                    {
                        Email = signupForm.Email,
                        UserName = signupForm.Username
                    };
                    IdentityResult accountCreation = await userManager.CreateAsync(user, signupForm.Password);
                    List<IdentityError> errors = accountCreation.Errors.ToList();

                    if (accountCreation.Succeeded)
                    {
                        accessCodeObject.Uses--;

                        await appDbContext.SaveChangesAsync();
                        await transaction.CommitAsync();
                        logger.LogInformation("Account Creation: {Username}", signupForm.Username);
                        return Ok("Your account has successfully been created.");
                    }
                    else if (errors.Count != 0)
                    {
                        if (errors.FirstOrDefault(e => e.Code == "DuplicateEmail") != null || errors.FirstOrDefault(e => e.Code == "DuplicateUserName") != null)
                        {
                            logger.LogWarning("Duplicate Identifier: {Username}/{Email}", signupForm.Username, signupForm.Email);
                            return BadRequest("Username or Email is invalid.");
                        }
                    }
                }
                catch (Exception exception)
                {
                    await transaction.RollbackAsync();
                    logger.LogError(exception, "Database Failure");
                    return StatusCode(500);
                }
            }

            return BadRequest("An error has occurred. Please try again later.");
        }

        [HttpPost]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK, "text/plain")]
        public async Task<ActionResult> SignIn([FromBody] SigninForm signinForm)
        {
            if (!ModelState.IsValid)
            {
                logger.LogWarning("Invalid Model State: {@ModelState} {@SigninForm}", ModelState.Values, signinForm);
                return BadRequest(ModelState.Format());
            }

            Microsoft.AspNetCore.Identity.SignInResult accountAccess = await signInManager.PasswordSignInAsync(signinForm.Username, signinForm.Password, false, true);
            if (accountAccess.Succeeded)
            {
                logger.LogInformation("Success: {Username}", signinForm.Username);
                return Ok("You have successfully signed in.");
            }
            else if (accountAccess.IsNotAllowed)
            {
                logger.LogWarning("Not Allowed: {Username}", signinForm.Username);
                return Unauthorized("You are currently not allowed to sign in.");
            }
            else if (accountAccess.IsLockedOut)
            {
                logger.LogWarning("Locked Account: {Username}", signinForm.Username);
                return Unauthorized("You are currently locked out.");
            }
            else
            {
                logger.LogWarning("Incorrect Credentials: {Username}", signinForm.Username);
                return Unauthorized("Username or password is invalid.");
            }
        }

        [Authorize]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public new async Task<ActionResult> SignOut()
        {
            Task signOutTask = signInManager.SignOutAsync();

            await signOutTask;

            if (signOutTask.IsCompletedSuccessfully)
            {
                logger.LogWarning("Success: {Username}", User.Identity?.Name);
                return NoContent();
            }
            else
            {
                logger.LogWarning("Failure: {Username}", User.Identity?.Name);
                return StatusCode(500);
            }
        }

        [Authorize]
        [HttpGet]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK, "text/plain")]
        public ActionResult IsAuthenticated()
        {
            return Ok();
        }
    }
}
