import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { TodoService } from '../../../core/services/todo.service';
import { TodoComponent } from "../../../pages/todo/todo.component";
import { FilterEnum } from '../../models/filter';
import { ITodo } from '../../models/todo';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  visibleTodos$: Observable<ITodo[]>;
  noTodoClass$: Observable<boolean>; // verificar se mostra a seta collapsando os itens listados

  constructor(private _todoService: TodoService){
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
}
