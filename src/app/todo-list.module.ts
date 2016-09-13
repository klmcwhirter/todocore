import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { TodoListComponent }   from './todo-list.component';
import { TodoComponent }       from './todo.component';
import { TodoCommentComponent }from './todo-comment.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, JsonpModule ],
  declarations: [ TodoListComponent, TodoComponent, TodoCommentComponent ],
  exports:      [ TodoListComponent, TodoComponent, TodoCommentComponent ]
})
export class TodoListModule { }
