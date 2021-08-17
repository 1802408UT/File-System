import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpRequest, HttpEvent,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  //Url obtenida de la variable de enviroments
  baseUrl = environment.APIUploadUrl;

  //Inyeccion de HttpClient
  constructor(private http: HttpClient) { }

  //Metodo que envia los archivos al endpoint /upload 
  upload(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('avatar', file);
   
    const req = new HttpRequest('POST', `${this.baseUrl}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  //Metodo para Obtener los archivos
  getFiles(){
    return this.http.get(`${this.baseUrl}/load`);
  }
  getFile(id:number){
    return this.http.get(`${this.baseUrl}/load/${id}`);
  }
  
  //Metodo para borrar los archivos
  deleteFile(filename: string){
    return this.http.get(`${this.baseUrl}/delete/${filename}`);
  }
  
}
