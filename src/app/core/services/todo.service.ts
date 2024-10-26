import { Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { FilterEnum } from '../../shared/models/filter.enum';
import { ITodo } from '../../shared/models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos = signal<ITodo[]>([]);
  filter = signal<FilterEnum>(FilterEnum.all);

   /**
   * Adiciona um novo todo à lista.
   * @param title - Título da nova tarefa a ser adicionada.
   */
  addTodo(title: string): void{
    const newTodo: ITodo = {
      title,
      isCompleted: false,
      id: uuidv4(), // Gerar um UUID em vez de usar Math.random()
    };
    // Atualiza a lista de todos adicionando o novo todo
    this.todos.update(todos => [...todos, newTodo]);
  }

  /**
   * Alterna o estado de conclusão de todas as tarefas para um valor booleano específico.
   * @param isCompleted - Define se todas as tarefas devem ser marcadas como concluídas ou não.
   */
  toggleAll(isCompleted: boolean): void{
    console.log('isCompleted: ', isCompleted);
    this.todos.update(todos =>
      todos.map(todo => ({
        ...todo,
        isCompleted,
      }))
    );
  }

  changeFilter(filterName: FilterEnum): void{
    // Muda o filtro ativo, e avisa/emite um novo valor para todos os observadores inscritos.
    this.filter.set(filterName);
  }

  /**
   * Modifica o título de uma tarefa específica.
   * @param id - O ID da tarefa que será modificada.
   * @param title - O novo título da tarefa.
   */
  changeTodo(id: string, title: string): void{
    this.todos.update(todos =>
      todos.map(todo => todo.id === id ? { ...todo, title } : todo)
    );
  }

   /**
   * Remove uma tarefa específica da lista.
   * @param id - O ID da tarefa a ser removida.
   */
  removeTodo(id: string): void{
    this.todos.update(todos =>
      todos.filter(todo => todo.id !== id)
    );
  }

  /**
   * Alterna o estado de conclusão de uma tarefa específica.
   * @param id - O ID da tarefa a ser alternada.
   */
  toggleTodo(id: string): void{
    // se estiver checked o contador items left decrementa atualizando
    this.todos.update(todos =>
      todos.map(todo => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)
    );
  }
}
