import { Component } from '@angular/core';

@Component({
  selector: 'todo-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  title: string;

  constructor() {
    this.title = 'Todo';
  }
}
