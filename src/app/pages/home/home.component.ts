import { UserResponse } from '@shared/models/user.interface';
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import {products} from '@app/pages/home/products';
import {UploadFilesService} from '@admin/admin/services/upload.service'
import { HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  elementData = products;
    //Lista de archivos seleccionados
    selectedFiles: FileList;
    //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
    progressInfo = []
    //Mensaje que almacena la respuesta de las Apis
    message = '';
    //Nombre del archivo para usarlo posteriormente en la vista html
    fileName = "";
    fileInfos: Observable<any>;
  
  displayedColumns: string[] = ['id', 'name', 'price', 'description'];
  dataSource = this.elementData;
  data;
  isUser = null;
  isAdmin = null;
  isLogged = false;


  private destroy$ = new Subject<any>();
  

  constructor(public authSvc: AuthService, private uploadSrv: UploadFilesService) {}
  
  

  ngOnInit(): void {
    this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserResponse) => {
        this.isLogged = true;
        this.isUser = user?.role;
        
      });
   
      this.fileInfos = this.uploadSrv.getFiles();
      
    }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  selectFiles(event) {
    this.progressInfo = [];
    //Validación para obtener el nombre del archivo si es uno solo
    //En caso de que sea >1 asigna a fileName length
    event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " archivos";
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
    
  }
  upload(index, file) {
    this.progressInfo[index] = { value: 0, fileName: file.name };

    this.uploadSrv.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadSrv.getFiles();
        }
      },
      err => {
        this.progressInfo[index].value = 0;
        this.message = 'Actualice para comprobar que el archivo '+ file.name+' se haya subido.';
      });
  }

  getById(id:number){

    this.data = this.uploadSrv.getFile(id);


  }


}

