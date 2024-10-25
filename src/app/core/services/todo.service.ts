import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterEnum } from '../../shared/models/filter.enum';
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

  toggleAll(isCompleted: boolean): void{
    console.log('isCompleted: ', isCompleted);
    const updatedTodos = this.todos$.getValue().map(
      (todo) => {
        return {
          ...todo,
          isCompleted,
        };
      }
    );
    this.todos$.next(updatedTodos);
    console.log('updatedTodos: ', updatedTodos);
  }

  changeFilter(filterName: FilterEnum): void{
    // Muda o filtro ativo, e avisa/emite um novo valor para todos os observadores inscritos.
    this.filter$.next(filterName);
  }

  changeTodo(id: string, title: string): void{
    const updatedTodos = this.todos$.getValue().map(
      (todo) => {
        if(todo.id === id){
          return {
            ...todo,
            title,
          };
        }
        return todo;
      });
    this.todos$.next(updatedTodos);
  }

  removeTodo(id: string): void{
    const updatedTodos = this.todos$.getValue().filter(
      (todo) => todo.id !== id);
    this.todos$.next(updatedTodos);
  }

  toggleTodo(id: string): void{
    // se estiver checked o contador items left decrementa atualizando
    const updatedTodos = this.todos$.getValue().map(
      (todo) => {
        if(todo.id === id){
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
    });
    this.todos$.next(updatedTodos);
  }
}
