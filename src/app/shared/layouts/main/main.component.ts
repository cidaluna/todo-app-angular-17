import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { TodoComponent } from "../../../components/todo/todo.component";
import { TodosComponent } from '../../../components/todos/todos.component';
import { TodoService } from '../../../core/services/todo.service';
import { FilterEnum } from '../../models/filter.enum';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, TodoComponent, TodosComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'] // Corrigido para styleUrls
})
export class MainComponent {
  // Signal para o ID do todo que está sendo editado
  editingId = signal<string | null>(null);

  // Computed para calcular os todos visíveis com base no filtro
  visibleTodos = computed(() => {
    const todos = this._todoService.todos(); // Obtém a lista de todos
    const filter = this._todoService.filter(); // Obtém o filtro atual
    // Filtra os todos com base no filtro ativo
    if (filter === FilterEnum.active) {
      return todos.filter(todo => !todo.isCompleted);
    } else if (filter === FilterEnum.completed) {
      return todos.filter(todo => todo.isCompleted);
    }
    return todos; // Retorna todos se o filtro for "all"
  });

  // Computed para determinar se não há todos
  noTodoClass = computed(() => this._todoService.todos().length === 0);

  // Computed para verificar se todos os todos estão selecionados
  isAllTodosSelected = computed(() =>
    this._todoService.todos().every(todo => todo.isCompleted)
  );

  constructor(private _todoService: TodoService) {
    // Efeito para monitorar mudanças nos todos e no filtro
    effect(() => {
      console.log('Todos:', this._todoService.todos());
      console.log('Filter:', this._todoService.filter());
    });
  }

  /**
   * Alterna o estado de todos os todos (completos/incompletos)
   * @param event - O evento disparado pelo input de checkbox
   */
  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement; // Captura o elemento do evento
    this._todoService.toggleAll(target.checked); // Atualiza o estado de todos
  }

  /**
   * Define o ID do todo que está sendo editado.
   * @param editingId - O ID do todo que será editado ou `null` para desativar a edição.
   */
  setEditingId(editingId: string | null): void {
    this.editingId.set(editingId); // Atualiza o signal com o novo ID
  }
}
