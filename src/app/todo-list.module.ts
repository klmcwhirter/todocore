import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { MdCoreModule }     from '@angular2-material/core';
import { MdCardModule }     from '@angular2-material/card';

import { TodoListComponent }   from './todo-list.component';
import { TodoComponent }       from './todo.component';
import { TodoCommentComponent }from './todo-comment.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, JsonpModule, MdCoreModule.forRoot(), MdCardModule.forRoot() ],
  declarations: [ TodoListComponent, TodoComponent, TodoCommentComponent ],
  exports:      [ TodoListComponent, TodoComponent, TodoCommentComponent ]
})
export class TodoListModule { }
