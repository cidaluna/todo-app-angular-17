import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoService } from '../../core/services/todo.service';
import { TodoComponent } from './todo.component';

describe('Todo Component', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>;

  beforeEach(async () => {
    // Cria um mock do TodoService
    mockTodoService = jasmine.createSpyObj('TodoService', ['removeTodo', 'toggleTodo', 'changeTodo']);

    await TestBed.configureTestingModule({
      imports:[TodoComponent],
      providers: [
        { provide: TodoService, useValue: mockTodoService } // Injeção de dependência do serviço mockado
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;

    // Inicializa um ITodo mock para o teste
    component.todoProps = { id: '1', title: 'Test Todo', isCompleted: false };
  });

  it('should create Todo Component', () => {
    expect(component).toBeTruthy();
  });
});
