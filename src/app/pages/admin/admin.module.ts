import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ModalComponent } from './components/modal/modal.component';
import { Modal1Component } from './components/modal1/modal.component';
import { Modal2Component } from './components/modal-reports/modal.component';
import { MaterialModule } from '@app/material.module';

@NgModule({
  declarations: [AdminComponent, ModalComponent, Modal1Component, Modal2Component],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
