import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: [
    '../../../assets/libs/bootstrap-3.3.7/css/bootstrap.min.css',
    './file-upload.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class FileUploadComponent implements OnInit {

  @Input() supportMultiple: boolean;
  @Input() showBottomActionButtons: boolean;

  @Output() onFileOverDropZone = new EventEmitter();
  @Output() afterAddingFile = new EventEmitter();
  @Output() onProgress = new EventEmitter();
  @Output() onSuccess = new EventEmitter();
  @Output() onError = new EventEmitter();

  public uploader: FileUploader;
  public hasDropZoneOver = false;

  constructor() {
    this.uploader = new FileUploader({
      disableMultipart: true,
      method: 'PUT'
    });
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
      fileItem.headers = [{ name: 'Content-Type', value: fileItem.file.type }];
      fileItem.withCredentials = false;
      this.afterAddingFile.emit(fileItem);
    };

    this.uploader.onSuccessItem = (fileItem: FileItem) => {
      this.onSuccess.emit(fileItem);
    };

    this.uploader.onErrorItem = (fileItem: FileItem) => {
      this.onError.emit(fileItem);
    };

    this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
      this.onProgress.emit({
        fileItem: fileItem,
        progress: progress
      });
    };
  }

  public fileOverDropZone(e: any): void {
    this.hasDropZoneOver = e;
    this.onFileOverDropZone.emit();
  }

}
