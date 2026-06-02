using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using backend.Config;
using backend.Enums;

namespace backend.Viewmodels
{
    [JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
    [JsonDerivedType(typeof(OnetimeEventGet), "onetime")]
    [JsonDerivedType(typeof(RecurringEventGet), "recurring")]
    public abstract class EventGet
    {
        [Required]
        public Guid Id { get; set; }
        public Guid? MovementId { get; set; }

        [Required]
        [MaxLength(FieldLimits.ShortText)]
        public string Title { get; set; }

        [Required]
        public DateTime Start { get; set; }
        [Required]
        public DateTime End { get; set; }
    }
}
