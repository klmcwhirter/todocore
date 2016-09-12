import { Component, OnInit } from '@angular/core';

import { Todo } from './todo.model';
import { TodosService } from './todos.service';

@Component({
  selector: 'todo-list',
  template: `
  <div *ngFor="let todo of this.todos">
    <todo [todo]="todo"></todo>
  </div>
  `,
  providers:  [ TodosService ]
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  errorMessage: string;

  ngOnInit() {
    this.getTodos();
  }

  constructor(
    private todosService: TodosService
  ) {}

  getTodos() {
    this.todosService.getTodos()
      .subscribe(
        todos => this.todos = todos,
        error => this.errorMessage = < any > error
      );
  }
}