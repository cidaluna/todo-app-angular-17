import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { TodoService } from '../../../core/services/todo.service';
import { FilterEnum } from '../../models/filter.enum';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  // Expondo o enum para o template para facilitar a comparação
  filterEnum = FilterEnum;

  // Usando signals para gerenciar reatividade
  activeCount = computed(() =>
    this._todoService.todos().filter((todo) => !todo.isCompleted).length
  );

  // Texto dinâmico para itens restantes
  itemsLeftText = computed(() => {
    const count = this.activeCount();
    return ` item${count !== 1 ? 's' : ''} left`;
  });

  // Define a classe para ocultar o footer se não houver todos
  noTodosClass = computed(() => this._todoService.todos().length === 0);

  // Mantém a referência ao filtro atual
  filter = this._todoService.filter;

  constructor(private _todoService: TodoService) {}

  // Método para mudar o filtro
  changeFilter(event: Event, filterName: FilterEnum) {
    event.preventDefault();
    console.log('changeFilter:', filterName);
    this._todoService.changeFilter(filterName);
  }
}
