import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnPopupAddItemComponent } from './btn-popup-add-item.component';

describe('BtnPopupAddItemComponent', () => {
  let component: BtnPopupAddItemComponent;
  let fixture: ComponentFixture<BtnPopupAddItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnPopupAddItemComponent],
    });
    fixture = TestBed.createComponent(BtnPopupAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
