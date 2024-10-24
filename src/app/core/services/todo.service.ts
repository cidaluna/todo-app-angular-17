import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from '../../shared/models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos$ = new BehaviorSubject<ITodo[]>([]);

  addTodo(title: string): void{
    const newTodo: ITodo = {
      title,
      isCompleted: false,
      id: Math.random().toString(16),
    };
    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  }
}
