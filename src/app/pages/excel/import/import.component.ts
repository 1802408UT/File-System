import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import {Contact} from '@pages/excel/model/model-excel';
import {ExcelService} from '@pages/excel/service/excel.service';
import {ReportService} from '@admin/admin/services/report.service';
import { BaseFormReport } from '@shared/utils/base-form-report';
import { Report } from '@app/shared/models/report.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Modal2Component } from '@app/pages/admin/components/modal-reports/modal.component';
import { AuthService } from '@auth/auth.service';
import { UserResponse } from '@app/shared/models/user.interface';


@Component({
  selector: 'app-excel-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  isAdmin = null;
  public importdata;
  public impordata1;
  importContacts: Contact[] = [];
  exportContacts: Contact[] = [];
  report: Report[] = [];
  /////////////////////////////////////////
  displayedColumns: string[] = ['id', 'product','price','movimiento', 'vendedor', 'actions'];
  dataSource = new MatTableDataSource();
  private destroy$ = new Subject<any>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private excelSrv: ExcelService,
     private reportSrv: ReportService,
     private http: HttpClient,
     private dialog: MatDialog,
     public authSvc: AuthService,
     //private report: Report
    ) { }

  ngOnInit(): void {
    this.reportSrv.getAll().subscribe((report) => {
      this.dataSource.data = report;
    });
    this.authSvc.user$
    .pipe(takeUntil(this.destroy$))
    .subscribe((user: UserResponse) => {
      this.isAdmin = user?.role;
  //    this.isUser = false;
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  onDelete(reportId: number): void {
    if (window.confirm('Do you really want remove this report')) {
      this.reportSrv
        .delete(reportId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          console.log(res);
          // Update result after deleting the item.
          this.reportSrv.getAll().subscribe((report) => {
            this.dataSource.data = report;
          });
        });
    }
  }
  
  onOpenModal(report = {}): void {
    console.log('Report->', report);
    let dialogRef = this.dialog.open(Modal2Component, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'New report', report },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`, typeof result);
      // Update result after adding new item.
      this.reportSrv.getAll().subscribe((report) => {
        this.dataSource.data = report;
      });
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const data = <any[]>this.excelSrv.importFromFile(bstr);

      const header: string[] = Object.getOwnPropertyNames(new Contact());
      const importedData = data.slice(1, -1);

      this.importContacts = importedData.map(arr => {
        const obj = {};
        for (let i = 0; i < header.length; i++) {
          const k = header[i];
          obj[k] = arr[i];
        }
        return <Contact>obj;
        
      })
      //console.log(data);
      //ImportData es la informacion capturada del excel
      this.importdata = this.importContacts;
      this.impordata1 = importedData;
      console.log(importedData);

      /*for (let index = 0; index < this.importContacts.length; index++) {
        const element = this.importContacts[index];
        console.log(element);
        
      }*/
    };
    reader.readAsBinaryString(target.files[0]);
    //console.log(this.importContacts);
  }

  exportData(tableId: string) {
    this.excelSrv.exportToFile("Reportes", tableId);
  }
  Save(): void {
    
    
    this.importdata;
    this.impordata1;
    //console.log(this.importdata[0]);
    this.report[0] = this.importdata[0];
    console.log(this.report[0]);
    /*
    this.itemSvc.new(formValue).subscribe((res) => {
      console.log('New ', res);
    });
    */
}
addHero(report: Report): Observable<Report> {
  return this.http.post<Report>('http://localhost:3000/report', report)}

}

