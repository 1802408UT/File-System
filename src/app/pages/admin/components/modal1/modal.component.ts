import { ItemsService } from '@pages/admin/services/items.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BaseFormItem } from '@shared/utils/base-form-item';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class Modal1Component implements OnInit {
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public itemForm: BaseFormItem,
    private itemSvc: ItemsService
  ) {}

  ngOnInit(): void {
    if (this.data?.item.hasOwnProperty('id')) {
      this.actionTODO = Action.EDIT;
      this.itemForm.baseForm.updateValueAndValidity();
      this.data.title = 'Edit item';
      this.pathFormData();
    }
  }

  onSave(): void {
    const formValue = this.itemForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.itemSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
      });
    } else {
      const itemId = this.data?.item?.id;
      this.itemSvc.update(itemId, formValue).subscribe((res) => {
        console.log('Update', res);
      });
    }
  }

  checkField(field: string): boolean {
    return this.itemForm.isValidField(field);
  }

  private pathFormData(): void {
    this.itemForm.baseForm.patchValue({
      name: this.data?.item?.name,
      description: this.data?.item?.description,
      price: this.data?.item?.price,
      image: this.data?.item?.image
    });
  }
}
