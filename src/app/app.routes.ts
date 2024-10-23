import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TodoComponent } from './pages/todo/todo.component';
import { DefaultComponent } from './shared/layouts/default/default.component';
import { MasterComponent } from './shared/layouts/master/master.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children:[{ path: '', component: LoginComponent }]
  },
  {
    path: '',
    component: MasterComponent,
    children:[{ path: 'todo', component: TodoComponent }]
  },
];
