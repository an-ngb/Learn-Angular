import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  form!: FormGroup;

  @Output() productFile = new EventEmitter<string>();

  faFilePen = faFilePen;

  show: boolean = true;

  // Variable to store shortLink from api response
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file!: File; // Variable to store file

  ngOnInit(): void {}

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService
  ) {}

  // On file Select
  onChange(event: any) {
    this.file = event.file;
    this.show = false;
    this.shortLink = event.file.response.imageUrl;
    this.productFile.emit(this.shortLink);
  }
}
