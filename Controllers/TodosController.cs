using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todocore.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace todocore.Controllers
{
    [Route("api/[controller]")]
    public class TodosController : Controller
    {
        private DbContextSqlite ctx;
    
        public TodosController (DbContextSqlite ctx)
        {
          this.ctx = ctx;
        }

        // GET api/todos
        [HttpGet]
        public IEnumerable<Todo> Get()
        {
            var todos = ctx.Todos.Include(c => c.TodoComments).ToList();

            return todos;
        }

        // GET api/todos/5
        // Returns the todo with Id of 5 as a JSON list
        [HttpGet("{id:int}")]
        public IList<Todo> Get(int id)
        {
            var todos = ctx.Todos.Include(c => c.TodoComments).Where(t => t.Id == id).ToList();

            return todos;
        }

        // POST api/todos
        // Create a todo based on the {todo} passed in. 
        [HttpPost]
        public void Post([FromBody]Todo todo)
        {
            if(ModelState.IsValid)
            {
                todo.CreateDate = DateTime.Now;
                foreach (var c in todo.TodoComments)
                {
                    c.UpdatedOn = DateTime.Now;
                }
                ctx.Todos.Add(todo);
                ctx.SaveChanges();
            }
        }

        // PUT api/todos/5
        // Update the todo with Id of {id} based on the {todo} passed in. 
        [HttpPut("{id:int}")]
        public void Put(int id, [FromBody]Todo todo)
        {
            if(ModelState.IsValid)
            {
                foreach (var c in todo.TodoComments)
                {
                    c.UpdatedOn = DateTime.Now;
                }
                ctx.Todos.Update(todo);
                ctx.SaveChanges();
            }
        }

        // PUT api/todos/markComplete/5
        // Marks the todo with id 5 as completed.
        // PUT api/todos/markComplete/5/false
        // Marks the todo with id 5 as NOT completed.
        [Route("markComplete/{id:int}")]
        [Route("markComplete/{id:int}/{isComplete:bool}")]
        [HttpPut]
        public void MarkComplete(int id, bool isComplete = true)
        {
            var todos = Get(id);
            if(todos.Count() > 0)
            {
                foreach (var todo in todos)
                {
                    todo.IsComplete = isComplete;
                    todo.CompleteDate = isComplete ? DateTime.Now : (DateTime?)null;
                    ctx.Todos.Update(todo);
                    ctx.SaveChanges();
                }
            }
        }

        // DELETE api/todos/5
        // Deletes the todo with Id of 5
        [HttpDelete("{id:int}")]
        public void Delete(int id)
        {
            var todos = Get(id);
            if(todos.Count() < 1)
            {
                ctx.Todos.RemoveRange(todos);
            }
        }


        // GET api/create
        // Creates a sample todo
        [HttpGet("create")]
        public IEnumerable<string> Create()
        {
            var todo = new Todo {
                Task = "A todo",
                IsComplete = false,
                CreateDate = DateTime.Now,
                DueDate = DateTime.Now.Add(TimeSpan.FromDays(1.0)),
                CompleteDate = null
            };
            ctx.Todos.Add(todo);
            ctx.SaveChanges(); // Make sure the Id gets generated

            var comments = new[] { "Comment 1", "Comment 2" };
            foreach (var c in comments)
            {
                var comment = new TodoComment {
                    Text = $"{c} for {todo.Id}",
                    UpdatedOn = DateTime.Now,
                    TodoId = todo.Id
                };
                ctx.TodoComments.Add(comment);
            }
            ctx.SaveChanges();

            return new [] { "todo created" };
        }

        protected override void Dispose(bool disposing)
        {
            // Release db resources
            ctx.Dispose();
            base.Dispose(disposing);
        }
    }
}
