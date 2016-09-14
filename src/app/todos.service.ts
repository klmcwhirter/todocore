import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';


import { Todo } from './todo.model';

@Injectable()
export class TodosService {
    constructor(private http: Http) {
    }

    getTodos(): Observable<Todo[]> {
        return this.http.get('api/todos')
                        .map((res: Response) => res.json())
                        .catch(this.handleError);
    }

    getTodo(id: number): Observable<Todo[]> {
        return this.http.get('api/todos/' + id)
                        .map((res: Response) => res.json())
                        .catch(this.handleError);
    }

    postTodo(todo: Todo): Observable<Todo[]> {
        return this.http.post('api/todos/', todo)
                        .map((res: Response) => res.json())
                        .catch(this.handleError);
    }

    putTodo(todo: Todo): Observable<Todo[]> {
        return this.http.post('api/todos/' + todo.id, todo)
                        .map((res: Response) => res.json())
                        .catch(this.handleError);
    }

    deleteTodo(id: number): Observable<Todo[]> {
        return this.http.delete('api/todos/' + id)
                        .map((res: Response) => res.json())
                        .catch(this.handleError);
    }

    markCompleteTodo(id: number, isComplete: boolean): Observable<Todo[]> {
        return this.http.put('api/todos/markComplete/' + id + '/' + isComplete.toString(), {})
                        .map((res: Response) => res.json())
                        .catch(this.handleError);
    }

    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
