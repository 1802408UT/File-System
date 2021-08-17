import { ReportService } from '@pages/admin/services/report.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BaseFormReport } from '@shared/utils/base-form-report';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class Modal2Component implements OnInit {
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public reportForm: BaseFormReport,
    private reportSvc: ReportService
  ) {}

  ngOnInit(): void {
    if (this.data?.report.hasOwnProperty('id')) {
      this.actionTODO = Action.EDIT;
      this.reportForm.baseForm.updateValueAndValidity();
      this.data.title = 'Edit report';
      this.pathFormData();
    }
  }

  onSave(): void {
    const formValue = this.reportForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.reportSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
      });
    } else {
      const reportId = this.data?.item?.id;
      this.reportSvc.update(reportId, formValue).subscribe((res) => {
        console.log('Update', res);
      });
    }
  }

  checkField(field: string): boolean {
    return this.reportForm.isValidField(field);
  }

  private pathFormData(): void {
    this.reportForm.baseForm.patchValue({
      product: this.data?.report?.product,
      price: this.data?.report?.price,
      movimiento: this.data?.report?.movimiento,
      vendedor: this.data?.report?.vendedor
    });
  }
}
