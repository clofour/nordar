using backend.Viewmodels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using backend.Filters;
using backend.Helpers;
using Microsoft.EntityFrameworkCore;
using backend.Services;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthController(ILogger<AuthController> logger, AuthService authService) : ControllerBase
    {

        [HttpPost]
        [EndpointName("SignUp")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK, "text/plain")]
        public async Task<ActionResult> SignUp([FromBody] SignupForm signupForm)
        {
            if (!ModelState.IsValid)
            {
                logger.LogWarning("Invalid Model State: {@ModelState} {@SignupForm}", ModelState.Values, signupForm);
                return BadRequest(ModelState.Format());
            }

            ServiceResult serviceResult = await authService.SignUp(signupForm);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }

        [HttpPost]
        [EndpointName("SignIn")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK, "text/plain")]
        public async Task<ActionResult> SignIn([FromBody] SigninForm signinForm)
        {
            ServiceResult serviceResult = await authService.SignIn(signinForm);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }

        [Authorize]
        [HttpPost]
        [EndpointName("SignOut")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public new async Task<ActionResult> SignOut()
        {
            ServiceResult serviceResult = await authService.SignOut(User);
            return ServiceBoundaryHelper.ConvertToActionResult(serviceResult);
        }

        [Authorize]
        [HttpGet]
        [EndpointName("IsAuthenticated")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK, "text/plain")]
        public ActionResult IsAuthenticated()
        {
            return Ok();
        }
    }
}
