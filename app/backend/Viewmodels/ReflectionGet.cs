using System.ComponentModel.DataAnnotations;

namespace backend.Viewmodels
{
    public class ReflectionGet
    {
        [Required]
        public Guid Id { get; set; }

        public Guid? EventId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public List<string> Positive { get; set; }
        [Required]
        public List<string> Negative { get; set; }
        [Required]
        public List<string> Improvement { get; set; }
    }
}