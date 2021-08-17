import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Contact} from '@pages/excel/model/model-excel';
import * as XLSX from 'xlsx';
import { products } from '@app/pages/products';

@Component({
  selector: 'app-excel-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})

export class ExportComponent implements OnInit {
  
  exportContacts: Contact[] = [];

  constructor(
    private route: ActivatedRoute,

    ) { }

  ngOnInit() {
    /*
    const contacts = products;
    this.exportContacts.push(contacts);
   /* for (let index = 0; index < 10; index++) {
      const contact = new Contact();
      contact.name = faker.name.findName();
      contact.phone = faker.phone.phoneNumber();
      contact.email = faker.internet.email();
      contact.address = faker.address.streetAddress();
      this.exportContacts.push(contact);
    }
*/
  }
  public exportToFile(fileName: string, element_id: string) {
    if (!element_id) throw new Error('Element Id does not exists');

    let tbl = document.getElementById(element_id);
    let wb = XLSX.utils.table_to_book(tbl);
    XLSX.writeFile(wb, fileName + '.xlsx');
  }
  


}
