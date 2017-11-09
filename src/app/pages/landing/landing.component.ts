import { Headers } from '@angular/http';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    console.log('fileOverBase');
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
    console.log('fileOverAnother');
  }

  constructor(private httpService: HttpService) {
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

    this.uploader.onSuccessItem = (fileItem: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      console.log('success => ', fileItem);
    };

    this.uploader.onErrorItem = (fileItem: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      console.log('error => ', fileItem);
    };

    this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
      console.log('progress => ', progress);
    };
  }

}
