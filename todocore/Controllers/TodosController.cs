using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using todocore.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace todocore.Controllers
{
    [Route("api/[controller]")]
    public class TodosController : Controller
    {
        private ITodosRepository todosRepository;

        public TodosController (ITodosRepository todosRepository)
        {
            this.todosRepository = todosRepository;
        }

        // GET api/todos
        [HttpGet]
        public IEnumerable<Todo> Get()
        {
            var todos = todosRepository.GetAll();

            return todos;
        }

        // GET api/todos/5
        // Returns the todo with Id of 5 as a JSON list
        [HttpGet("{id:int}")]
        public IEnumerable<Todo> Get(int id)
        {
            var todos = todosRepository.Get(id);

            return todos;
        }

        // POST api/todos
        // Create a todo based on the {todo} passed in. 
        [HttpPost]
        public IEnumerable<Todo> Post([FromBody]Todo todo)
        {
            if(ModelState.IsValid)
            {
                todo.CreateDate = DateTime.Now.ToUniversalTime();
                if(todo.DueDate == null)
                {
                    // Default to due in 1 day
                    todo.DueDate = DateTime.Now.ToUniversalTime().Add(TimeSpan.FromDays(1.0));
                }
                foreach (var c in todo.TodoComments)
                {
                    c.UpdatedOn = DateTime.Now.ToUniversalTime();
                }
                todosRepository.Add(todo);
            }

            return Get();
        }

        // POST api/todos/5/comment
        // Create a todo comment based on the {todo} and {comment} passed in.
        [HttpPost("{id:int}/comment")]
        public IEnumerable<Todo> PostComment(int id, [FromBody]TodoComment todoComment)
        {
            var todos = Get(id);
            if(todos.Count() > 0)
            {
                foreach (var todo in todos)
                {
                    todoComment.UpdatedOn = DateTime.Now.ToUniversalTime();
                    todoComment.TodoId = todo.Id;
                    todosRepository.AddComment(todo, todoComment);
                    break;
                }
            }

            return Get();
        }

        // PUT api/todos/5
        // Update the todo with Id of {id} based on the {todo} passed in. 
        [HttpPut("{id:int}")]
        public IEnumerable<Todo> Put(int id, [FromBody]Todo todo)
        {
            if(ModelState.IsValid)
            {
                foreach (var c in todo.TodoComments)
                {
                    c.UpdatedOn = DateTime.Now.ToUniversalTime();
                }
                todosRepository.Update(todo);
            }

            return Get();
        }

        // PUT api/todos/markComplete/5
        // Marks the todo with id 5 as completed.
        // PUT api/todos/markComplete/5/false
        // Marks the todo with id 5 as NOT completed.
        [Route("markComplete/{id:int}")]
        [Route("markComplete/{id:int}/{isComplete:bool}")]
        [HttpPut]
        public IEnumerable<Todo> MarkComplete(int id, bool isComplete = true)
        {
            var todos = Get(id);
            if(todos.Count() > 0)
            {
                foreach (var todo in todos)
                {
                    todo.IsComplete = isComplete;
                    todo.CompleteDate = isComplete ? DateTime.Now.ToUniversalTime() : (DateTime?)null;
                    todosRepository.Update(todo);
                    break;
                }
            }

            return Get();
        }

        // DELETE api/todos/5
        // Deletes the todo with Id of 5
        [HttpDelete("{id:int}")]
        public IEnumerable<Todo> Delete(int id)
        {
            var todos = Get(id);
            if(todos.Count() > 0)
            {
                todosRepository.DeleteRange(todos);
            }
            return Get();
        }


        // GET api/create
        // Creates a sample todo
        [Route("create")]
        [Route("create/{word}")]
        [HttpGet]
        public IEnumerable<string> Create(string word = "")
        {
            var article = "A";
            if(Regex.IsMatch(word, "^[aeiouAEIoU]"))
            {
                article = "An";
            }
            var todo = new Todo {
                Task = $"{article} {word} todo",
                IsComplete = false,
                CreateDate = DateTime.Now.ToUniversalTime(),
                DueDate = DateTime.Now.ToUniversalTime().Add(TimeSpan.FromDays(1.0)),
                CompleteDate = null
            };
            todosRepository.Add(todo); // Make sure the Id gets generated

            var comments = new[] { "Comment 1", "Comment 2" };
            foreach (var c in comments)
            {
                var comment = new TodoComment {
                    Text = $"{c} for {todo.Id}",
                    UpdatedOn = DateTime.Now.ToUniversalTime(),
                    TodoId = todo.Id
                };
                todosRepository.AddComment(todo, comment);
            }

            return new [] { "todo created" };
        }
    }
}
