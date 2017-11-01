import { BOOTSTRAP_SAMPLE_FORM_MODEL } from './../../components/dynamic-bootstrap-form/bootstrap-sample-form.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  model = BOOTSTRAP_SAMPLE_FORM_MODEL;

  constructor() { }
  ngOnInit() {
  }

}
