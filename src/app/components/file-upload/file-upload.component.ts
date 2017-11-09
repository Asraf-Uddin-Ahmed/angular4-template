import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: [
    '../../../assets/libs/bootstrap-3.3.7/css/bootstrap.min.css',
    './file-upload.component.css'
  ]
})
export class FileUploadComponent implements OnInit {

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
      fileItem.url = 'https://spacheck.s3.amazonaws.com/profile_picture/16745e1f-c086-e611-be6d-00266c4ad03f.png?AWSAccessKeyId=AKIAJA2KAUBNLM273EVQ&Expires=1510207674&Signature=6rE25vN7DAT50eY%2F9hyftwUD18o%3D';
      fileItem.headers = [{ name: 'Content-Type', value: fileItem.file.type }];
      fileItem.withCredentials = false;
      console.log(fileItem);
    };

    this.uploader.onSuccessItem = (fileItem: FileItem) => {
      console.log('success => ', fileItem);
    };

    this.uploader.onErrorItem = (fileItem: FileItem) => {
      console.log('error => ', fileItem);
    };

    this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
      console.log('progress => ', progress);
    };
  }

  public fileOverDropZone(e: any): void {
    this.hasDropZoneOver = e;
    console.log('fileOverDropZone => ', this.hasDropZoneOver);
  }

}
