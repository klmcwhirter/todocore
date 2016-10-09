using System.Collections.Generic;

namespace todocore.Models
{
    public interface ITodosRepository
    {
        IEnumerable<Todo> GetAll();
        IEnumerable<Todo> Get(int id);
        void Add(Todo todo);
        void AddComment(Todo todo, TodoComment todoComment);
        void Update(Todo todo);
        void DeleteRange(IEnumerable<Todo> todos);
    }
}