import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDeleteProductItemComponent } from './btn-delete-product-item.component';

describe('BtnDeleteProductItemComponent', () => {
  let component: BtnDeleteProductItemComponent;
  let fixture: ComponentFixture<BtnDeleteProductItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnDeleteProductItemComponent],
    });
    fixture = TestBed.createComponent(BtnDeleteProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
