import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book, Details, Links } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  private books: Book[]; // arreglo de Libros
  private book: Book; // Un solo libro
  private rutaBooks = '../../assets/search.json'; // 'https://the-books--goncalomatos2.repl.co/search?author=tolkien'
  // private rutaDetails= '../assets/books.json'; //'https://the-books--goncalomatos2.repl.co/books?id='
  // private rutaDetails = '../assets/books.json/books?id='; // 'https://the-books--goncalomatos2.repl.co/books?id='
  private rutaDetails = 'https://the-books--goncalomatos2.repl.co/books?id=';

  // set y get usado para editar variable books
  set Books(books: Book[]){this.books = books; }
  get Books(): Book[]{return this.books; }

  // Metodo realiza peticion y exrtae del json obtenido el ID, TITLE y AUTOR
  getBooks(){
    return this.http.get<any>(this.rutaBooks).pipe(
      map(model => {
        return this.Books = model.docs.map(items => ({id: items.id, title: items.title, author: items.author_name[0] }));
      })
    );
  }

  // Extrae del array de Books un elemento que coincida con el ID de no encontrase retorna N/A
  getBook(id: any): Book{
      // tslint:disable-next-line: no-unused-expression
      this.books.map(b => {(b.id === id) ? this.book = b : false; });
      // tslint:disable-next-line: no-unused-expression
      (typeof this.book === 'undefined') ? this.book = {id : 'N/A', title : 'N/A', author : ['N/A']} : false;
      return this.book;
  }

  // Peticion a detalles del libro segun el ID
  getDetalles(id: any): Observable<Details>{
    return this.http.get<any>(this.rutaDetails + id).pipe(
      map(data => {
        return {
          covers : data.details.covers,
        // tslint:disable-next-line: max-line-length
          description: data.details.description.value ? data.details.description.value : data.details.description ? data.details.description : 'N/A' };
      })
    );
  }

  // Lista de libros para ser mostrado en la vista principal y en el sidenav
  lista(): Links[]{
    return this.books.map(book => {
      return {title: book.title, url: `/books/${book.id}`};
    });
  }
}
