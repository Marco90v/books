import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookListComponent } from './componentes/book-list/book-list.component';
import { BookSelectComponent } from './componentes/book-select/book-select.component';


const routes: Routes = [
  {path: 'books/:id', component: BookSelectComponent},
  {path: 'books', component: BookListComponent},
  {path: '', pathMatch: 'full', redirectTo: 'books'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
