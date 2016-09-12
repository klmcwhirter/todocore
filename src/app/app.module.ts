import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdCoreModule }     from '@angular2-material/core';
import { MdButtonModule }     from '@angular2-material/button';
import { MdSidenavModule }     from '@angular2-material/sidenav';
import { MdToolbarModule }     from '@angular2-material/toolbar';

import { AppComponent }   from './app.component';
import { TodoListModule }   from './todo-list.module';

@NgModule({
  imports:      [
    BrowserModule,
    MdCoreModule.forRoot(),
    MdButtonModule.forRoot(),
    MdSidenavModule.forRoot(),
    MdToolbarModule.forRoot(),
    TodoListModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
