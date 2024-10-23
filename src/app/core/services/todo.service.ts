import { Injectable } from '@angular/core';
import { ITodo } from '../../shared/models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: ITodo[] = [{
    id: 1,
    title: 'Test Title',
    description: 'Test Description',
    status: 'OPEN',
    created_at: '10102024',
    updated_at: '10102024'
  }];

  constructor() { }

  getAllTodo(){
    return this.todos;
  }
}
