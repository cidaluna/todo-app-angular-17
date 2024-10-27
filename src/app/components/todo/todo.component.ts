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
    console.log('setTodoInEditMode');
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  removeTodo():void{
    this._todoService.removeTodo(this.todoProps.id);
    console.log('removeTodo');
  }

  toggleTodo():void{
    console.log('toggleTodo');
    this._todoService.toggleTodo(this.todoProps.id);
  }

  changeText(event: Event):void{
    const value = (event.target as HTMLInputElement).value;
    this.editingText.set(value);
    console.log('changeText');
  }

  changeTodo():void{
    console.log('changeTodo:', this.editingText);
    this._todoService.changeTodo(this.todoProps.id, this.editingText()); // passa o id e o title
    this.setEditingIdEvent.emit(null); // o null fecha o modo edit
  }

}
