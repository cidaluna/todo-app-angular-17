import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodoService } from '../../../core/services/todo.service';
import { FilterEnum } from '../../models/filter.enum';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  noTodosClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>;
  filter$: Observable<FilterEnum>;
  filterEnum = FilterEnum; // Expõe o enum para o template


  constructor(private _todoService: TodoService){
    this.activeCount$ = this._todoService.todos$.pipe(map(
      (todos) => todos.filter((todo)=> !todo.isCompleted).length
    ));
    this.itemsLeftText$ = this.activeCount$.pipe(map(
      (activeCount) => ` item${activeCount !== 1 ? 's': ''} left`
    ));
    this.noTodosClass$ = this._todoService.todos$.pipe(map(
      (todos)=> todos.length === 0
    ));
    this.filter$ = this._todoService.filter$;
  }

  changeFilter(event: Event, filterName: FilterEnum){
    event.preventDefault();
    console.log('changeFilter:', filterName);
    this._todoService.changeFilter(filterName);
  }
}
