import { Component } from '@angular/core';
import { TodoService } from '../../../core/services/todo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title: string = '';

  constructor(private _todoService: TodoService){
    this._todoService.todos$.subscribe(todos => {
      console.log('todos: ', todos);
    })
  }

  changeText(event: Event): void{
    const inputElement = event.target as HTMLInputElement;
    this.title = inputElement.value.trim();
  }

  add(): void{
    if(!this.title || this.title.trim() === ""){
      return;
    }
    console.log('addTodo:', this.title);
    this._todoService.addTodo(this.title);
  }
}
