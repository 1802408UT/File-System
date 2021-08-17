import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Report } from '@app/shared/models/report.interface';


@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Report[]> {
    return this.http
      .get<Report[]>(`${environment.API_URL}/report`)
      .pipe(catchError(this.handlerError));
  }

  getById(itemId: number): Observable<Report> {
    return this.http
      .get<any>(`${environment.API_URL}/report/${itemId}`)
      .pipe(catchError(this.handlerError));
  }

  new(report: Report): Observable<Report> {
    return this.http
      .post<Report>(`${environment.API_URL}/report`, report)
      .pipe(catchError(this.handlerError));
  } 
  upload(any): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}/report`, any)
      .pipe(catchError(this.handlerError));
  }
 
  update(reportId: number, report: Report): Observable<Report> {
    return this.http
      .patch<Report>(`${environment.API_URL}/report/${reportId}`, report)
      .pipe(catchError(this.handlerError));
  }

  delete(reportId: number): Observable<{}> {
    return this.http
      .delete<Report>(`${environment.API_URL}/report/${reportId}`)
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
