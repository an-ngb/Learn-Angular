import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-btn-delete-product-item',
  templateUrl: './btn-delete-product-item.component.html',
  styleUrls: ['./btn-delete-product-item.component.scss']
})
export class BtnDeleteProductItemComponent {

  @Input() product!: number;
  @Output() onDeleteProduct: EventEmitter<Number> = new EventEmitter();

  faTimes = faTimes;

  onDelete(product: number){
    this.onDeleteProduct.emit(product);
  }
}
