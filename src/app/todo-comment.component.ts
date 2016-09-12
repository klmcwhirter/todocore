import { Component, Input } from '@angular/core';

import { TodoComment } from './todo.model';

@Component({
  selector: 'todo-comment',
  template:`
  <p>{{todoComment.id}} | {{todoComment.text}} | {{todoComment.updatedOn | date: 'medium'}}</p>
  `
})
export class TodoCommentComponent {
  @Input() todoComment: TodoComment;
}
