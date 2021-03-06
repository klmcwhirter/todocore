import { Component, OnInit } from '@angular/core';

import { Todo, TodoPost } from './todo.model';
import { TodosService } from './todos.service';

@Component({
  selector: 'todo-list',
  templateUrl: 'app/todo-list.component.html',
  providers:  [ TodosService ]
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  errorMessage: string;

  addingTodo: boolean;
  newTodoTask: string;
  newTodoDue: any;

  ngOnInit() {
    this.getTodos();
  }

  constructor(
    private todosService: TodosService
  ) {}

  addComment(todo: Todo, comment: string) {
    this.todosService.postTodoComment(todo.id, comment)
      .subscribe(
        todos => this.todos = todos,
        error => this.errorMessage = <any> error
      );
  }

  addTodo() {
    let newTodo = new TodoPost(this.newTodoTask, this.newTodoDue, []);
    this.todosService.postTodo(newTodo)
      .subscribe(
        todos => this.todos = todos,
        error => this.errorMessage = <any> error
      );
      this.addingTodo = false;
      this.newTodoTask = '';
  }

  delete (todo: Todo) {
    this.todosService.deleteTodo(todo.id)
      .subscribe(
        todos => this.todos = todos,
        error => this.errorMessage = <any> error
      );
  }

  getTodos() {
    this.todosService.getTodos()
      .subscribe(
        todos => this.todos = todos,
        error => this.errorMessage = <any> error
      );
  }

  toggleComplete (todo: Todo) {
    this.todosService.markCompleteTodo(todo.id, !todo.isComplete)
      .subscribe(
        todos => this.todos = todos,
        error => this.errorMessage = <any> error
      );
  }

}
