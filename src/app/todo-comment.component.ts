import { Component, Input } from '@angular/core';

import { TodoComment } from './todo.model';

@Component({
  selector: 'p[todoComment]',
  templateUrl: 'app/todo-comment.component.html'
})
export class TodoCommentComponent {
  @Input() todoComment: TodoComment;
}
