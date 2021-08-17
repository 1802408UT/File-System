import { Component, OnInit } from '@angular/core';
//import { products } from 'src/app/products';
import { ActivatedRoute, Params } from '@angular/router';
//import { CartService } from 'src/app/cart.service';
import { ItemsService } from '@pages/admin/services/items.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  
 product: any;
  x = this.route.snapshot.params.productId;
  data: any;
  result: any;
  products;
  constructor(
    private route: ActivatedRoute,
    private itemSvc: ItemsService
//    private cartService: CartService
  ) { }

  ngOnInit() {
    this.itemSvc.getAll().subscribe((items) => {
      this.products = items;
    this.route.paramMap.subscribe(params => this.product = this.products[this.x]);
    console.log(this.product);
    console.log(this.result);
  });
  }

}
