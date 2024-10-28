import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, signal, SimpleChanges, ViewChild } from '@angular/core';
import { TodoService } from '../../core/services/todo.service';
import { ITodo } from '../../shared/models/todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo') todoProps!: ITodo;
  @Input('isEditing') isEditingProps!: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> = new EventEmitter();
  // Inicializa o signal com um valor vazio
  editingText = signal<string>('');
  @ViewChild('textInput')textInput!: ElementRef;
  isProcessing: boolean = false; // controlar se o metodo changeTodo ja foi chamado

  constructor(private _todoService: TodoService){}

  ngOnInit(){
    this.editingText.set(this.todoProps.title);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditing'] && changes['isEditing'].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }

    if (changes['todoProps']) {
      this.editingText.set(this.todoProps.title); // Atualiza o signal quando o todoProps muda
    }
  }

  setTodoInEditMode(): void{
    console.log('TodoComponent: Recebeu evento para editar o texto!');
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  removeTodo():void{
    this._todoService.removeTodo(this.todoProps.id);
    console.log('TodoComponent: Chamado o remove Todo.');
  }

  toggleTodo():void{
    console.log('TodoComponent: Alterado o check do Todo!');
    this._todoService.toggleTodo(this.todoProps.id);
  }

  changeText(event: Event):void{
    const value = (event.target as HTMLInputElement).value;
    this.editingText.set(value);
    console.log('TodoComponent: Houve alteração no texto');
  }

  changeTodo():void{
    if (this.isProcessing){
      return; // Se já estiver processando, sai da função
    }
    this.isProcessing = true;
    this._todoService.changeTodo(this.todoProps.id, this.editingText()); // passa o id e o title
    console.log('TodoComponent: Retorno após o service: ', this.editingText());
    this.setEditingIdEvent.emit(null); // o null fecha o modo edit
    setTimeout(() =>
      this.isProcessing = false
    , 100); // Reseta a flag após um tempo curto
  }

}
