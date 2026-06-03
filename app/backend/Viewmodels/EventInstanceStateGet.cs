using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using backend.Config;
using backend.Enums;
using backend.Models;

namespace backend.Viewmodels
{
    public class EventInstanceStateGet
    {
        [Required]
        public EventState EventState { get; set; }
    }
}
