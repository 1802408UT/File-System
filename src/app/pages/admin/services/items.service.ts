import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Items } from '@app/shared/models/items.interface'


@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Items[]> {
    return this.http
      .get<Items[]>(`${environment.API_URL}/items`)
      .pipe(catchError(this.handlerError));
  }

  getById(itemId: number): Observable<Items> {
    return this.http
      .get<any>(`${environment.API_URL}/items/${itemId}`)
      .pipe(catchError(this.handlerError));
  }

  new(items: Items): Observable<Items> {
    return this.http
      .post<Items>(`${environment.API_URL}/items`, items)
      .pipe(catchError(this.handlerError));
  }

  update(itemsId: number, item: Items): Observable<Items> {
    return this.http
      .patch<Items>(`${environment.API_URL}/items/${itemsId}`, item)
      .pipe(catchError(this.handlerError));
  }

  delete(itemsId: number): Observable<{}> {
    return this.http
      .delete<Items>(`${environment.API_URL}/items/${itemsId}`)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  
}
