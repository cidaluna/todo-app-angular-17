import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../shared/material/material/material.module';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterOutlet],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent{

}
