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

}
