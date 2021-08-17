import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ItemsService } from '@pages/admin/services/items.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Modal1Component } from './components/modal1/modal.component'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'image', 'actions'];
  dataSource = new MatTableDataSource();
  private destroy$ = new Subject<any>();

  @ViewChild(MatSort) sort: MatSort;
  constructor(private itemSvc: ItemsService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.itemSvc.getAll().subscribe((items) => {
      this.dataSource.data = items;
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    //this.itemSvc.getUser();
  }
  onDelete(itemId: number): void {
    if (window.confirm('Do you really want remove this item')) {
      this.itemSvc
        .delete(itemId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          console.log(res);
          // Update result after deleting the item.
          this.itemSvc.getAll().subscribe((items) => {
            this.dataSource.data = items;
          });
        });
    }
  }

  onOpenModal(item = {}): void {
    console.log('Item->', item);
    let dialogRef = this.dialog.open(Modal1Component, {
      height: '400px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'New item', item },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`, typeof result);
      // Update result after adding new item.
      this.itemSvc.getAll().subscribe((items) => {
        this.dataSource.data = items;
      });
    });
  }

 ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
