import { Component, effect, signal } from '@angular/core';
import { TodoService } from '../../../core/services/todo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = signal<string>('');

  constructor(private _todoService: TodoService){
    // Usando `effect` para reagir às mudanças nos `todos`
    effect(() => {
      const todos = this._todoService.todos();
      console.log('todos:', todos);
    });
  }

  changeText(event: Event): void{
    const inputElement = event.target as HTMLInputElement;
    this.title.set(inputElement.value.trim());
  }

  add(): void{
    const currentTitle = this.title();
    if (!currentTitle || currentTitle.trim() === "") {
      return;
    }
    console.log('addTodo:', currentTitle);
    this._todoService.addTodo(currentTitle);
    this.title.set(""); // Limpa o título após adicionar
  }
}
