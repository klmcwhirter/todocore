using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace todocore.Models
{
    public class TodosRepository : ITodosRepository, IDisposable
    {
        private DbContextSqlite ctx;
    
        public TodosRepository (DbContextSqlite ctx)
        {
          this.ctx = ctx;
        }

        public IEnumerable<Todo> GetAll()
        {
            return ctx.Todos.Include(c => c.TodoComments).ToList();
        }
        public IEnumerable<Todo> Get(int id)
        {
            return ctx.Todos.Include(c => c.TodoComments).Where(t => t.Id == id).ToList();
        }
        public TodoComment GetTodoComment(int id)
        {
            var rc = ctx.TodoComments.Where(oc => oc.Id == id).First();
            return rc;
        }
        public void Add(Todo todo)
        {
            ctx.Todos.Add(todo);
            ctx.SaveChanges();
        }
        public void AddComment(Todo todo, TodoComment todoComment)
        {
            ctx.TodoComments.Add(todoComment);

            ctx.Todos.Update(todo);
            ctx.SaveChanges();
        }
        public void Update(Todo todo)
        {
            ctx.Todos.Update(todo);
            ctx.SaveChanges();
        }
        public void DeleteRange(IEnumerable<Todo> todos)
        {
            ctx.Todos.RemoveRange(todos);
            ctx.SaveChanges();
        }

        public void Dispose()
        {
            // Release db resources
            ctx.Dispose();
        }
    }
}
