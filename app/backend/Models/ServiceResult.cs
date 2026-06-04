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

    public class ServiceResult<T>(Status status, T? data)
    {
        public Status Status { get; set; } = status;
        public T? Data { get; set; } = data;
    }
}