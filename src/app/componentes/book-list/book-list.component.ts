import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicesService } from '../../servicio/services.service';
import { Links } from '../../interfaces/interfaces';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  bookLinks: Links[];

  constructor(private api: ServicesService) { }

  ngOnInit(): void {
    // Carga de libros
    this.api.getBooks().subscribe(() => {
      this.bookLinks = this.api.lista(); // Agreaga lista de libros a la variable
    });
  }

  ngOnDestroy(){ }

}
