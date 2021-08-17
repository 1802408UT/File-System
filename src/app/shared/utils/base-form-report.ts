import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormReport {
  errorMessage = null;

  constructor(private fb: FormBuilder) {}

  baseForm = this.fb.group({
    product: [
      '',
      [Validators.required, Validators.required],
    ],
    price: ['', [Validators.required, Validators.minLength(2)]],
    movimiento: ['', [Validators.required, Validators.minLength(2)]],
    vendedor: ['', [Validators.required, Validators.minLength(3)]],
  });

  isValidField(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseForm.get(field).touched || this.baseForm.get(field).dirty) &&
      !this.baseForm.get(field).valid
    );
  }

  private getErrorMessage(field: string): void {
    const { errors } = this.baseForm.get(field);

    if (errors) {
      const minlenght = errors?.minlength?.requiredLength;
      const messages = {
        required: 'You must enter a value.',
        minlength: `This field must be longer than ${minlenght} characters`,
      };

      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }
}
