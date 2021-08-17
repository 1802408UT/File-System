import { Component, OnInit } from '@angular/core';
//import { products } from '@app/pages/products';
import { ItemsService } from '@pages/admin/services/items.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products;
  constructor(private itemSvc: ItemsService) { }

  ngOnInit(): void {
    this.itemSvc.getAll().subscribe((items) => {
      this.products = items;
    });
  }

}
