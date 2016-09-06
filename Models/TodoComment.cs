using System;
using System.ComponentModel.DataAnnotations;

namespace todocore.Models
{
    public class TodoComment
    {
        public int Id { get; set; }

        [Required]
        public string Text { get; set; }

        [Required]
        public DateTime UpdatedOn { get; set; }

        public int TodoId { get; set; }
    }
}