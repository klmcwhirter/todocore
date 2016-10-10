using System;
using System.Collections.Generic;
using System.Linq;
using todocore.Controllers;
using todocore.Models;
using Xunit;

namespace todocore.UnitTests
{
    class TestTodosRepository : ITodosRepository
    {
        public IDictionary<int,Todo> Todos { get; set; }

        public IEnumerable<Todo> GetAll()
        {
            return Todos.Values;
        }
        public IEnumerable<Todo> Get(int id)
        {
            return new List<Todo> { Todos[id] };
        }
        public void Add(Todo todo)
        {
            Todos[todo.Id] = todo;
        }
        public void AddComment(Todo todo, TodoComment todoComment)
        {
            var thisTodo = Todos[todo.Id];
            thisTodo.TodoComments.Add(todoComment);
        }
        public void Update(Todo todo)
        {
            Todos[todo.Id] = todo;
        }
        public void DeleteRange(IEnumerable<Todo> todos)
        {
            foreach (var todo in todos)
            {
                while(Todos.ContainsKey(todo.Id))
                {
                    Todos.Remove(todo.Id);
                }
            }
        }
    }

    public class TodosControllerTests
    {
        [Fact]
        public void GetAllReturnsAll()
        {
            //Given
            var todosRepository = new TestTodosRepository {
                Todos = new Dictionary<int,Todo> {
                    { 1, new Todo { Id = 1 } },
                    { 2, new Todo { Id = 2 } }
                }
            };
            var todosController = new TodosController(todosRepository);
            //When
            var rc = todosController.Get();
            //Then
            Assert.Equal(2, rc.Count());
        }

        [Theory]
        [InlineData(3)]
        [InlineData(35)]
        [InlineData(5)]
        public void GetReturnsOneAndTheRightOne(int value)
        {
            //Given
            var todosRepository = new TestTodosRepository {
                Todos = new Dictionary<int,Todo> {
                    { 1, new Todo { Id = 1 } },
                    { value, new Todo { Id = value } },
                    { 2, new Todo { Id = 2 } }
                }
            };
            var todosController = new TodosController(todosRepository);
            //When
            var rc = todosController.Get(value);
            //Then
            Assert.Equal(1, rc.Count());
            Assert.Equal(value, rc.First().Id);
        }

        [Fact]
        public void PostStoresAndSetsDates()
        {
            //Given
            var now = DateTime.Now;
            var todosRepository = new TestTodosRepository {
                Todos = new Dictionary<int,Todo> {
                }
            };
            var todosController = new TodosController(todosRepository);
            var todo = new Todo {
                Id = 5,
                TodoComments = new TodoComment[] {}
            };
            //When
            var rc = todosController.Post(todo);
            //Then
            Assert.True(1 == rc.Count(), "Count is wrong");
            Assert.True(todo.Id == rc.First().Id, "Id is wrong");
            Assert.True(now <= rc.First().CreateDate, "CreateDate should have been set");
            Assert.True(now <= rc.First().DueDate, "DueDate should have been set");
        }

        [Fact]
        public void PostCommentStoresAndSetsDates()
        {
            //Given
            var now = DateTime.Now;
            var todosRepository = new TestTodosRepository {
                Todos = new Dictionary<int,Todo> {
                    { 5, new Todo { Id = 5, TodoComments = new List<TodoComment>() } }
                }
            };
            var todosController = new TodosController(todosRepository);
            var todoComment = new TodoComment { Id = 1, Text = "A comment" };
            //When
            var rc = todosController.PostComment(5, todoComment);
            //Then
            Assert.True(1 == rc.Count(), "Count is wrong");
            Assert.True(5 == rc.First().Id, "Id is wrong");
            Assert.True(1 == rc.First().TodoComments.First().Id, "TodoComment.Id is wrong");
            Assert.True(now <= rc.First().TodoComments.First().UpdatedOn, "UpdatedOn should have been set");
            Assert.True(5 == rc.First().TodoComments.First().TodoId, "TodoId is wrong");
        }

        [Fact]
        public void PutStores()
        {
            //Given
            var todosRepository = new TestTodosRepository {
                Todos = new Dictionary<int,Todo> {
                    { 5, new Todo { Id = 5, Task = "ZZZZ" } }
                }
            };
            var todosController = new TodosController(todosRepository);
            var todo = new Todo { Id = 5, Task = "Task", };
            //When
            var rc = todosController.Post(todo);
            //Then
            Assert.True(1 == rc.Count(), "Count is wrong");
            Assert.True(todo.Id == rc.First().Id, "Id is wrong");
            Assert.True("Task" == rc.First().Task, "Task is not correct - was the Put todo stored?");
        }

        [Fact]
        public void MarkCompleteTrueSetCompleteDate()
        {
            //Given
            var todosRepository = new TestTodosRepository {
                Todos = new Dictionary<int,Todo> {
                    { 5, new Todo { Id = 5, IsComplete = false  } }
                }
            };
            var todosController = new TodosController(todosRepository);
            //When
            var rc = todosController.MarkComplete(todosRepository.Todos.First().Key, true);
            //Then
            Assert.True(1 == rc.Count(), "Count is wrong");
            Assert.True(5 == rc.First().Id, "Id is wrong");
            Assert.True(rc.First().IsComplete, "was not marked complete");
            Assert.True(null != rc.First().CompleteDate, "CompleteDate was not set");
        }

        [Fact]
        public void MarkCompleteFalseUnsetsCompleteDate()
        {
            //Given
            var todosRepository = new TestTodosRepository {
                Todos = new Dictionary<int,Todo> {
                    { 5, new Todo { Id = 5, IsComplete = true, CompleteDate = DateTime.Now } }
                }
            };
            var todosController = new TodosController(todosRepository);
            //When
            var rc = todosController.MarkComplete(todosRepository.Todos.First().Key, false);
            //Then
            Assert.True(1 == rc.Count(), "Count is wrong");
            Assert.True(5 == rc.First().Id, "Id is wrong");
            Assert.False(rc.First().IsComplete, "was not marked incomplete");
            Assert.False(null != rc.First().CompleteDate, "CompleteDate was not unset");
        }

        [Fact]
        public void DeleteRemoves()
        {
            //Given
            var todosRepository = new TestTodosRepository {
                Todos = new Dictionary<int,Todo> {
                    { 5, new Todo { Id = 5, IsComplete = true, CompleteDate = DateTime.Now } }
                }
            };
            var todosController = new TodosController(todosRepository);
            //When
            Assert.True(1 == todosRepository.Todos.Count(), "Should start with Count of 1");
            var rc = todosController.Delete(todosRepository.Todos.First().Key);
            //Then
            Assert.True(0 == rc.Count(), "Count should be zero now");
        }
    }
}