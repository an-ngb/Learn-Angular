import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Product } from '../Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-btn-popup-add-item',
  templateUrl: './btn-popup-add-item.component.html',
  styleUrls: ['./btn-popup-add-item.component.scss'],
})
export class BtnPopupAddItemComponent {
  @Output() onAddProduct: EventEmitter<Product> = new EventEmitter();

  products: Product[] = [];

  productName: string = '';

  productFile: string = '';

  isVisible = false;

  isOkLoading = false;

  input?: string;

  qty?: number;

  form!: FormGroup;

  constructor(private fb: FormBuilder, private service: ProductService) {}

  ngOnInit() {
    this.form = this.fb.group({
      input: [null, [Validators.required]],
      qty: [null, [Validators.required]],
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  getProductFileLink(event: any) {
    this.productFile = event;
  }

  handleOk(): void {
    if (this.form.invalid) {
      alert('Please write down a product name.');
      return;
    }

    const newProduct = {
      productName: this.form.controls['input'].value,
      productQty: this.form.controls['qty'].value,
      productFile: this.productFile,
      isExpanded: false,
    };

    this.onAddProduct.emit(newProduct);

    this.isOkLoading = true;

    setTimeout(() => {
      this.form.controls['input'].setValue('');
      this.form.controls['qty'].setValue('');
      this.isVisible = false;
      this.isOkLoading = false;
    }, 2000);
  }

  handleCancel(): void {
    this.form.controls['input'].setValue('');
    this.form.controls['qty'].setValue('');
    this.isVisible = false;
  }
}
