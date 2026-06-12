using System.ComponentModel.DataAnnotations;

namespace backend.Viewmodels
{
    public class EventSummary
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}