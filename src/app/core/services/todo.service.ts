import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterEnum } from '../../shared/models/filter';
import { ITodo } from '../../shared/models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos$ = new BehaviorSubject<ITodo[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

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
