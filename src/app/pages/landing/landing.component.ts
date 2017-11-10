import { Headers } from '@angular/http';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginationField } from '../../components/master-search/pagination-field';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  sortKeys = [
    {
      label: 'ID',
      value: 'ID'
    },
    {
      label: 'Name',
      value: 'name'
    },
    {
      label: 'Descrtiption',
      value: 'descrtiption'
    }
  ];
  searchTextFieldNames = ['description', 'name'];
  paginationFieldNames: PaginationField = new PaginationField();

  constructor(private httpService: HttpService) {
    this.paginationFieldNames.startOffset = 'pagination.displayStart';
    this.paginationFieldNames.itemsPerPage = 'pagination.displaySize';
  }

  ngOnInit() { }

  changeSearch($event) {
    console.log($event);
  }
}
