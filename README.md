# todocore
This is an app written based on ASP.NET Core, Bootstrap and AngularJS 2.

It is my first attempt at writing a SPA using ASP.NET Core and
is a simple (naive) implementation of the [Todo application made famous by John Papa](https://johnpapa.net/inside-the-asp-net-single-page-apps-template/).

## ASP.NET Core
[ASP.NET Core](http://www.asp.net/core) is an Open Source version of the Microsoft ASP.NET platform stack.

## Bootstrap 4
[Bootstrap 4](http://v4-alpha.getbootstrap.com/) is the latest verion of the Twitter CSS library on which AngularJS 2 depends.

## AngularJS 2
[AngularJS 2](https://angular.io/) is the next version of AngularJS built from the ground up to support features of ECMAScript 6.
The app also takes advantage of the [ng-bootstrap](https://ng-bootstrap.github.io/#/home) integration layer.

## Sqlite
This app uses a Sqlite database. But could easily use another database by using a different [EF Core data provider](https://docs.efproject.net/en/latest/providers/index.html#).


## Todos Web Api
The TodosController provides the following API endpoints.

### Return the list of todos as JSON
```http
GET api/todos HTTP/1.1
```

### Return the todo with Id of 5 as a JSON list
```http
GET api/todos/5 HTTP/1.1
```

### Create a todo based on the {todo} passed in. 
```http
POST api/todos HTTP/1.1
content-type: application/json

{todo as JSON}
```

### Update the todo with Id of 5 based on the {todo} passed in. By default the {todo} is expected in JSON format
```http
PUT api/todos/5 HTTP/1.1
content-type: application/json

{todo as JSON}
```

### Mark the todo with id 5 as completed
```http
PUT api/todos/markComplete/5 HTTP/1.1
content-type: application/json

{todo as JSON}
```

### Delete the todo with Id of 5
```http
DELETE api/todos/5 HTTP/1.1
```

### Create a sample todo
```http
GET api/create HTTP/1.1
```
