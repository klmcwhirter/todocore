import { Component, Input } from '@angular/core';

import { TodoComment } from './todo.model';

@Component({
  selector: 'p[todoComment]',
  template: `{{todoComment.id}} | {{todoComment.text}} | {{todoComment.updatedOn | date: 'medium'}}`
})
export class TodoCommentComponent {
  @Input() todoComment: TodoComment;
}
