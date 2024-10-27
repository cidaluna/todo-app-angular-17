import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoService } from '../../core/services/todo.service';
import { FooterComponent } from '../../shared/layouts/footer/footer.component';
import { HeaderComponent } from '../../shared/layouts/header/header.component';
import { MainComponent } from '../../shared/layouts/main/main.component';
import { MaterialModule } from '../../shared/material/material/material.module';
import { TodoComponent } from '../todo/todo.component';
import { TodosComponent } from './todos.component';

describe('Todos Component', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations:[TodosComponent],
      imports: [
        TodoComponent, TodoService, HeaderComponent,
        MainComponent, FooterComponent, MaterialModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Todos Component', () => {
    expect(component).toBeTruthy();
  });
});
