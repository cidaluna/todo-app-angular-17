import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/layouts/footer/footer.component';
import { HeaderComponent } from "../../shared/layouts/header/header.component";
import { MainComponent } from '../../shared/layouts/main/main.component';
import { MaterialModule } from '../../shared/material/material/material.module';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterOutlet, HeaderComponent, MainComponent, FooterComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent{

}
