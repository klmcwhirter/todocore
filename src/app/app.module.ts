import { NgModule }        from '@angular/core';
import { BrowserModule }   from '@angular/platform-browser';

import { MdToolbarModule } from '@angular2-material/toolbar';

import { AppComponent }    from './app.component';
import { TodoListModule }  from './todo-list.module';

@NgModule({
  imports:      [
    BrowserModule,
    MdToolbarModule,
    TodoListModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
