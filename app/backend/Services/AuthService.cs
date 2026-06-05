using System.ComponentModel;
using System.Security.Claims;
using AutoMapper;
using backend.Data;
using backend.Enums;
using backend.Models;
using backend.Viewmodels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class AuthService(AppDbContext appDbContext, SignInManager<User> signInManager, UserManager<User> userManager, ILogger<AuthService> logger)
    {
        public async Task<ServiceResult> SignUp(SignupForm signupForm)
        {
            AccessCode? accessCodeObject = await appDbContext.AccessCodes.FirstOrDefaultAsync(item => item.Name == signupForm.AccessCode && item.Uses >= 1);
            if (accessCodeObject == null)
            {
                logger.LogWarning("Invalid Access Code: {AccessCode}", signupForm.AccessCode);
                return new ServiceResult(Status.BadRequest, "Access Code is invalid.");
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
                        return new ServiceResult(Status.Ok, "Your account has successfully been created.");
                    }
                    else if (errors.Count != 0)
                    {
                        if (errors.FirstOrDefault(e => e.Code == "DuplicateEmail") != null || errors.FirstOrDefault(e => e.Code == "DuplicateUserName") != null)
                        {
                            logger.LogWarning("Duplicate Identifier: {Username}/{Email}", signupForm.Username, signupForm.Email);
                            return new ServiceResult(Status.BadRequest, "Username or Email is invalid.");
                        }
                    }
                }
                catch (Exception exception)
                {
                    await transaction.RollbackAsync();
                    logger.LogError(exception, "Database Failure");
                    return new ServiceResult(Status.ServerError);
                }
            }

            return new ServiceResult(Status.BadRequest, "An error has occurred. Please try again later.");
        }

        public async Task<ServiceResult> SignIn(SigninForm signinForm)
        {
            SignInResult accountAccess = await signInManager.PasswordSignInAsync(signinForm.Username, signinForm.Password, false, true);

            if (accountAccess.Succeeded)
            {
                logger.LogInformation("Success: {Username}", signinForm.Username);
                return new ServiceResult(Status.Ok, "You have successfully signed in.");
            }
            else if (accountAccess.IsNotAllowed)
            {
                logger.LogWarning("Not Allowed: {Username}", signinForm.Username);
                return new ServiceResult(Status.Unauthorized, "You are currently not allowed to sign in.");
            }
            else if (accountAccess.IsLockedOut)
            {
                logger.LogWarning("Locked Account: {Username}", signinForm.Username);
                return new ServiceResult(Status.Unauthorized, "You are currently locked out.");
            }
            else
            {
                logger.LogWarning("Incorrect Credentials: {Username}", signinForm.Username);
                return new ServiceResult(Status.Unauthorized, "Username or password is invalid.");
            }
        }

        public async Task<ServiceResult> SignOut(ClaimsPrincipal user)
        {
            Task signOutTask = signInManager.SignOutAsync();

            await signOutTask;

            if (signOutTask.IsCompletedSuccessfully)
            {
                logger.LogWarning("Success: {Username}", user.Identity?.Name);
                return new ServiceResult(Status.NoContent);
            }
            else
            {
                logger.LogWarning("Failure: {Username}", user.Identity?.Name);
                return new ServiceResult(Status.ServerError);
            }
        }
    }
}