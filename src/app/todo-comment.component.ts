import { Component, Input } from '@angular/core';

import { TodoComment } from './todo.model';

@Component({
  selector: 'p[todoComment]',
  template: `<span class="todocomment-id">{{todoComment.id}}</span>&nbsp;
  {{todoComment.text}}&nbsp;
  <span class="todocomment-updated">{{todoComment.updatedOn | date: 'short'}}</span>`
})
export class TodoCommentComponent {
  @Input() todoComment: TodoComment;
}
