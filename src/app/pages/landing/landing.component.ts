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
    this.httpService.get('http://localhost:8000/rooms')
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
  }

}
