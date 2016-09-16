import { Component, Input }  from '@angular/core';

import { Todo }              from './todo.model';

import { TodoListComponent } from './todo-list.component';

@Component({
  selector: 'todo[todo]',
  templateUrl: 'app/todo.component.html',
})
export class TodoComponent {
  @Input() todo: Todo;
  @Input() todoList: TodoListComponent;

  addingComment: boolean;
  newComment: string;

  constructor() {
    this.addingComment = false;
  }

  addComment() {
    this.todoList.addComment(this.todo, this.newComment);
  }
}
