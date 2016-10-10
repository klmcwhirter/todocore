using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace todocore.Models
{
    public class Todo
    {
        public int Id { get; set; }

        [Required]
        public string Task { get; set; }

        public bool IsComplete { get; set; }

        public DateTime CreateDate { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? CompleteDate { get; set; }

        public IList<TodoComment> TodoComments { get; set; }
    }
}