import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from './button/button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './search/search.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { BtnDeleteProductItemComponent } from './btn-delete-product-item/btn-delete-product-item.component';
import { BtnPopupAddItemComponent } from './btn-popup-add-item/btn-popup-add-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatDialogModule} from '@angular/material/dialog';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NzFormModule} from 'ng-zorro-antd/form';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ClassNamePipe } from './class-name.pipe';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ButtonComponent,
    SearchComponent,
    ProductItemComponent,
    BtnDeleteProductItemComponent,
    BtnPopupAddItemComponent,
    ClassNamePipe,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NzIconModule,
    NzModalModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    MdbCollapseModule,
    NzPopoverModule,
    NzLayoutModule,
    NzUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
