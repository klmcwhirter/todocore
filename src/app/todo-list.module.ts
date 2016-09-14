import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdCoreModule } from '@angular2-material/core';
import { MdIconModule } from '@angular2-material/icon';

import { TodoListComponent }   from './todo-list.component';
import { TodoComponent }       from './todo.component';
import { TodoCommentComponent }from './todo-comment.component';

@NgModule({
  imports:      [
    BrowserModule, HttpModule, JsonpModule,
    MdButtonModule,
    MdCardModule,
    MdCoreModule,
    MdIconModule
  ],
  declarations: [ TodoListComponent, TodoComponent, TodoCommentComponent ],
  exports:      [ TodoListComponent, TodoComponent, TodoCommentComponent ]
})
export class TodoListModule { }
