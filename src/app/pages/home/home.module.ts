import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule} from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProductsComponent } from '../products/products/products.component';
import { DetailsComponent } from '../products/details/details.component';
import { ExportComponent } from '@pages/excel/export/export.component';
import { ImportComponent } from '../excel/import/import.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HomeComponent, 
    ProductsComponent, 
    DetailsComponent, 
    ExportComponent, 
    ImportComponent, 
  
  ],
  
    imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class HomeModule { }
