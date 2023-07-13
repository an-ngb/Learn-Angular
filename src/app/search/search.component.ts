import { Component, Output, Input, EventEmitter } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  faMagnifyingGlass = faMagnifyingGlass;

  form!: FormGroup;

  @Input() productName!: string;

  @Output() onSearch: EventEmitter<string> = new EventEmitter();

  search(): void {
    console.log(this.form.controls['input'].value);
    // if(this.form.invalid){
    //   alert('Please write down a product name.');
    //   return;
    // }
    this.onSearch.emit(this.form.controls['input'].value);
  }

  ngOnInit() {
    this.form = this.fb.group({
      input: [null, [Validators.required]],
    });
  }

  constructor(private fb: FormBuilder, private service: ProductService) {}
}
