import { Headers } from '@angular/http';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private httpService: HttpService) {

  }

  ngOnInit() {

  }

  afterAddingFile(fileItem) {
    console.log('afterAddingFile => ', fileItem);
    fileItem.url = 'https://spacheck.s3.amazonaws.com/profile_picture/16745e1f-c086-e611-be6d-00266c4ad03f.png?AWSAccessKeyId=AKIAJA2KAUBNLM273EVQ&Expires=1510217429&Signature=UBqiZE64pYfLo6EKChJgZDswq1I%3D';
    // for upload instantly after adding file
    //fileItem.upload();
  }
  onProgress(fileItemWithProgress) {
    console.log('progress => ', fileItemWithProgress);
  }
  onSuccess(fileItem) {
    console.log('success => ', fileItem);
  }
  onError(fileItem) {
    console.log('error => ', fileItem);
  }
  onFileOverDropZone() {
    console.log('fileOverDropZone');
  }
}
