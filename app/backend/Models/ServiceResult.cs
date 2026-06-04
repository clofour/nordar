namespace backend.Models
{
    public enum Status
    {
        Ok,
        Created,
        NoContent,
        BadRequest,
        Unauthorized,
        Forbidden,
        NotFound,
        ServerError
    }

    public class ServiceResult(Status status, string? message)
    {
        public Status Status { get; set; } = status;
        public string? Message { get; set; } = message;
    }
}