import { SortByField } from './../../components/master-search/sort-by-field';
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

  sortByColumns = [
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
  sortByFieldNames: SortByField = new SortByField();

  constructor(private httpService: HttpService) {
    this.paginationFieldNames.startOffset = 'pagination.displayStart';
    this.paginationFieldNames.itemsPerPage = 'pagination.displaySize';
    this.sortByFieldNames.isAscendingSort = 'sortBy.isAscending';
    this.sortByFieldNames.sortByColumn = 'sortBy.fieldName';
  }

  ngOnInit() { }

  changeSearch($event) {
    console.log($event);
  }
}
