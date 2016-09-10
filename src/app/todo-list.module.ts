import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule, JsonpModule } from '@angular/http';

import { TodoListComponent }   from './todo-list.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, JsonpModule ],
  declarations: [ TodoListComponent ],
  exports:      [ TodoListComponent ]
})
export class TodoListModule { }
