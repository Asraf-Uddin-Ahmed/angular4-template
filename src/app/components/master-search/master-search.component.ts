import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { PaginationField } from './pagination-field';
import { SortByField } from './sort-by-field';
import { DropdownModel } from '../dropdown/dropdown-model';

@Component({
  selector: 'app-master-search',
  templateUrl: './master-search.component.html',
  styleUrls: [
    '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../../../../node_modules/font-awesome/css/font-awesome.css',
    './master-search.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class MasterSearchComponent implements OnInit {

  @Input() sortByColumnDropdown: DropdownModel;
  @Input() totalItem: number;
  @Input() searchTextFields: string[];
  @Input() paginationFields: PaginationField;
  @Input() sortByFields: SortByField;

  @Output() onChange = new EventEmitter();


  readonly itemsPerPageDropdown: DropdownModel = {
    options: [
      {
        label: '10',
        value: 10
      },
      {
        label: '25',
        value: 25
      },
      {
        label: '50',
        value: 50
      },
      {
        label: '100',
        value: 100
      }
    ],
    selectedOption: {
      label: '10',
      value: 10
    }
  };
  searchText = '';
  sortByColumn = '';
  isAscendingSort = null;
  currentPage = 1;
  itemsPerPage = 10;

  constructor() { }

  ngOnInit() {
  }


  changeSearchText() {
    this.createSearchObject();
    console.log(this.searchText);
  }
  changePage() {
    this.createSearchObject();
    console.log(this.currentPage);
  }
  changeItemsPerPage($event) {
    this.itemsPerPage = $event.value;
    this.createSearchObject();
    console.log(this.itemsPerPage);
  }
  changeSortByColumn($event) {
    this.sortByColumn = $event.value;
    this.currentPage = 1;
    this.createSearchObject();
    console.log(this.sortByColumn);
  }
  toggleSortOrder() {
    this.isAscendingSort = !this.isAscendingSort;
    this.currentPage = 1;
    this.createSearchObject();
    console.log(this.isAscendingSort);
  }
  createSearchObject() {
    const searchObject = {};

    this.loadSearchTextFields(searchObject);
    this.loadPaginationFields(searchObject);
    this.loadSortFields(searchObject);

    this.onChange.emit(searchObject);
  }


  private loadSortFields(searchObject) {
    console.log(this.sortByFields);
    if (!this.sortByFields) {
      return;
    }
    if (this.sortByFields.sortByColumn && this.sortByColumn) {
      searchObject[this.sortByFields.sortByColumn] = this.sortByColumn;
    }
    if (this.sortByFields.isAscendingSort && this.isAscendingSort !== null) {
      searchObject[this.sortByFields.isAscendingSort] = this.isAscendingSort;
    }
  }
  private loadPaginationFields(searchObject) {
    if (!this.paginationFields) {
      return;
    }
    if (this.paginationFields.pageNumber) {
      searchObject[this.paginationFields.pageNumber] = this.currentPage;
    }
    if (this.paginationFields.startOffset) {
      const startOffset = (this.currentPage - 1) * this.itemsPerPage;
      searchObject[this.paginationFields.startOffset] = startOffset;
    }
    if (this.paginationFields.itemsPerPage) {
      searchObject[this.paginationFields.itemsPerPage] = this.itemsPerPage;
    }
  }
  private loadSearchTextFields(searchObject) {
    this.searchTextFields = this.searchTextFields ? this.searchTextFields : [];
    this.searchTextFields.forEach(fieldName => {
      searchObject[fieldName] = this.searchText;
    });
  }
}
