import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Product } from '../Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-btn-popup-add-item',
  templateUrl: './btn-popup-add-item.component.html',
  styleUrls: ['./btn-popup-add-item.component.scss']
})
export class BtnPopupAddItemComponent {

  @Output() onAddProduct: EventEmitter<Product> = new EventEmitter();

  products: Product[] = [];

  productName: string = '';

  productFile: string = '';

  isVisible = false;

  input?: string;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ProductService
  ) {}

  ngOnInit(){
    this.form = this.fb.group({
      input: [null, [Validators.required]]
    })
  }

  showModal(): void {
    this.isVisible = true;
  }

  getProductFileLink(event: any){
    console.log(event);

    this.productFile = event;
  }

  handleOk(): void {
    if(this.form.invalid){
      alert('Please write down a product name.');
      return;
    }

    const newProduct = {
      productName: this.form.controls['input'].value,
      productFile: this.productFile,
    }

    this.onAddProduct.emit(newProduct);

    this.form.controls['input'].setValue('');

    this.isVisible = false;
  }

  handleCancel(): void {
    this.form.controls['input'].setValue('');
    this.isVisible = false;
  }
}
