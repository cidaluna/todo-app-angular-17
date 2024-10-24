import { Component, Input } from '@angular/core';
import { ITodo } from '../../shared/models/todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @Input('todo') todoProps!: ITodo;

}
