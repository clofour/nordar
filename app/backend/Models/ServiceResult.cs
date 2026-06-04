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

    public class ServiceResult(Status status, object? data = null)
    {
        public Status Status { get; set; } = status;
        public object? Data { get; set; } = data;
    }
}