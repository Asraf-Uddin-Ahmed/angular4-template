import { SortByField } from './../../components/master-search/sort-by-field';
import { Headers } from '@angular/http';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginationField } from '../../components/master-search/pagination-field';
import { SortDropdownModel } from '../../components/master-search/sort-dropdown-model';
import { FilterDropdownModel } from '../../components/master-search/filter-dropdown-model';

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
          label: 'Update Time',
          value: 'updateTime'
        },
        {
          label: 'Description',
          value: 'description'
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
  filterDropdowns: FilterDropdownModel[] = [
    {
      dropdownModel: {
        options: [
          {
            label: 'all',
            value: ''
          },
          {
            label: 'public',
            value: 1
          },
          {
            label: 'private',
            value: 2
          }
        ],
        selectedOption: null
      },
      placeholder: 'Privacy Mode',
      fieldName: 'searchItem.privacyMode'
    },
    {
      dropdownModel: {
        options: [
          {
            label: 'descriptive',
            value: 1
          },
          {
            label: 'mcq',
            value: 2
          },
          {
            label: 'fill in the blanks',
            value: 3
          }
        ],
        selectedOption: null
      },
      placeholder: 'Type',
      fieldName: 'searchItem.answerType'
    }
  ];
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
