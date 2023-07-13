import { Component, Input, Output } from '@angular/core';
import { Product } from '../Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product!: Product;

  products: any[] = [];

  constructor() {}
}
