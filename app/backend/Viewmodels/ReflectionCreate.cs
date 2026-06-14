using System.ComponentModel.DataAnnotations;
using backend.Config;

namespace backend.Viewmodels
{
    public class ReflectionCreate
    {
        public Guid? EventId { get; set; }

        [Required]
        [MaxLength(FieldLimits.InputList)]
        public List<string> Positive { get; set; }
        [Required]
        [MaxLength(FieldLimits.InputList)]
        public List<string> Negative { get; set; }
        [Required]
        [MaxLength(FieldLimits.InputList)]
        public List<string> Improvement { get; set; }
    }
}