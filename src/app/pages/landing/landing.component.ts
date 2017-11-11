import { SortByField } from './../../components/master-search/sort-by-field';
import { Headers } from '@angular/http';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginationField } from '../../components/master-search/pagination-field';
import { SortDropdownModel } from '../../components/master-search/sort-dropdown-model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  sortByColumns: SortDropdownModel = {
    dropdownModel: {
      options: [
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
      ]
      // , selectedOption: {
      //   label: 'Name',
      //   value: 'name'
      // }
    }
    // , isAscendingSort: false
  };
  searchTextFieldNames = ['searchItem.name', 'searchItem.description'];
  sortByFieldNames: SortByField = {
    isAscendingSort: 'sortBy.isAscending',
    sortByColumn: 'sortBy.fieldName',
    queryPattern: 'order'
  };
  paginationFieldNames: PaginationField = new PaginationField();
  items = [];
  total = 0;

  constructor(private httpService: HttpService) {
    this.paginationFieldNames.startOffset = 'pagination.displayStart';
    this.paginationFieldNames.itemsPerPage = 'pagination.displaySize';
  }

  ngOnInit() { }

  changeSearch($event) {
    console.log($event);
    this.httpService.get('http://localhost/data', $event)
      .subscribe(data => {
        this.total = data.totalItem;
        this.items = data.items;
        console.log(data);
      }, err => {
        console.log(err);
      });
  }
}
