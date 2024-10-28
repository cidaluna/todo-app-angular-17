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
    // O `effect` é uma função reativa e se reexecuta sempre que ocorre mudanças na lista de `todos`
    effect(() => {
      this._todoService.todos();
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
    console.log('HeaderComponent: Input Adicionando Todo:', currentTitle);
    this._todoService.addTodo(currentTitle);
    this.title.set(""); // Limpa o título após adicionar
  }
}
