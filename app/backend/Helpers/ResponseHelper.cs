using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Helpers
{
    public static class ServiceBoundaryHelper
    {
        public static ActionResult ConvertToActionResult<T>(ServiceResult<T> serviceResult)
        {
            if (serviceResult.Data == null)
            {
                return serviceResult.Status switch
                {
                    Status.Ok => new OkResult(),
                    Status.Created => new CreatedResult(),
                    Status.NoContent => new NoContentResult(),
                    Status.BadRequest => new BadRequestResult(),
                    Status.Unauthorized => new UnauthorizedResult(),
                    Status.Forbidden => new ForbidResult(),
                    Status.NotFound => new NotFoundResult(),
                    Status.ServerError => new StatusCodeResult(500),
                    _ => new StatusCodeResult(500)
                };
            }

            return serviceResult.Status switch
            {
                Status.Ok => new OkObjectResult(serviceResult.Data),
                Status.Created => new ObjectResult(serviceResult.Data) { StatusCode = 201 },
                Status.NoContent => new NoContentResult(),
                Status.BadRequest => new BadRequestObjectResult(serviceResult.Data),
                Status.Unauthorized => new UnauthorizedObjectResult(serviceResult.Data),
                Status.Forbidden => throw new InvalidDataException("This status code should never be accompanied by data."),
                Status.NotFound => new NotFoundObjectResult(serviceResult.Data),
                Status.ServerError => throw new InvalidDataException("This status code should never be accompanied by data."),
                _ => new StatusCodeResult(500)
            };

        }
    }
}