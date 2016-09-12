import { Component, Input } from '@angular/core';

import { Todo }             from './todo.model';

@Component({
  selector: 'todo',
  templateUrl: 'app/todo.component.html'
})
export class TodoComponent {
  @Input() todo: Todo;
}
