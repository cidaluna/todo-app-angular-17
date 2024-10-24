import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { TodoService } from '../../../core/services/todo.service';
import { TodoComponent } from "../../../pages/todo/todo.component";
import { TodosComponent } from '../../../pages/todos/todos.component';
import { FilterEnum } from '../../models/filter.enum';
import { ITodo } from '../../models/todo';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, TodoComponent, TodosComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  visibleTodos$: Observable<ITodo[]>;
  noTodoClass$: Observable<boolean>; // verificar se mostra a seta collapsando os itens listados
  isAllTodosSelected$: Observable<boolean>;

  constructor(private _todoService: TodoService){
    this.isAllTodosSelected$ = this._todoService.todos$.pipe(map(
      (todos) => todos.every((todo) => todo.isCompleted))
    );
    this.noTodoClass$ = this._todoService.todos$.pipe(map(
      (todos) => todos.length === 0)
    );
    this.visibleTodos$ = combineLatest(
      this._todoService.todos$,
      this._todoService.filter$
    ).pipe(map(([todos, filter]: [ITodo[], FilterEnum]) => {
      console.log('combine: ', todos, filter);
      if(filter === FilterEnum.active){
        return todos.filter(todo => !todo.isCompleted)
      }else if(filter === FilterEnum.completed){
        return todos.filter(todo => todo.isCompleted)
      }
      return todos;
    }));
  }

  toggleAllTodos(event: Event):void{
    const target = event.target as HTMLInputElement;
    this._todoService.toggleAll(target.checked);
  }
}
