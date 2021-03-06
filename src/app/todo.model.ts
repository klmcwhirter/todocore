export class TodoComment {
  constructor(
    public id: number,
    public text: string,
    public updatedOn: Date,
    public todoId: number
  ) {}
}

export class Todo {
  constructor(
    public id: number,
    public task: string,
    public isComplete: boolean,
    public createDate: Date,
    public dueDate: Date,
    public completeDate: Date,
    public todoComments: TodoComment[]
  ) {}
}

export class TodoPost {
  constructor(
    public task: string,
    public dueDate: any, // Nullable type Date
    public todoComments: TodoComment[]    
  ) {}
}
