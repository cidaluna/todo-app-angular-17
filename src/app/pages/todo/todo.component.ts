import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../../core/services/todo.service';
import { TodoCardComponent } from '../../shared/components/todo-card/todo-card.component';
import { ITodo } from '../../shared/models/todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoCardComponent, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit{
  todos: ITodo[] = [];
  constructor(private _todoService: TodoService){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.todos = this._todoService.getAllTodo();
  }

}
