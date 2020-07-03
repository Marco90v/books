import { Component, OnInit } from '@angular/core';
import { Book, Links } from '../../interfaces/interfaces';
import { ServicesService } from '../../servicio/services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-select',
  templateUrl: './book-select.component.html'
})
export class BookSelectComponent implements OnInit {

  title: string;
  author: string[];
  cover: number[];
  resume: string;
  linkList: Links[];
  private id: string;
  private book: Book;
  public sidenav = 'close';

  constructor(private api: ServicesService, private route: ActivatedRoute) {
    // Recupera el parametro y lo guarda en una Varibale
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getElements();
    });
   }

  ngOnInit(): void { }

  // verifica que la lista de libros este cargada, si no es asi la carga, recupera los datos adiciones como el covers y demas,
  // carga lista para sidenav
  getElements(){
    if (typeof this.api.Books === 'undefined'){
      this.api.getBooks().subscribe(() => this.getDatosLinkList());
    }else{ this.getDatosLinkList(); }
  }

  // complemento de getElemnts
  getDatosLinkList(){
    this.getDatos();
    this.linkList = this.api.lista();
  }

  // Metodo para recuperar covers y asignar variables de la vista, si el ID es incorrecto asigna 0 a cover y N/A a resume
  getDatos(){
    this.book = this.api.getBook(this.id);
    this.title = this.book.title;
    this.author = this.book.author;
    this.api.getDetalles(this.id).subscribe(detalles => {
      this.cover = detalles.covers;
      this.resume = detalles.description;
    }, () => {this.cover = [0]; this.resume = 'N/A';
    });
  }

  openNav(){this.sidenav = 'open'; }
  closeNav(){this.sidenav = 'close'; }

}
