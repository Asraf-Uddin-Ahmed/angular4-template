import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { DropdownOption } from '../dropdown/dropdown-option';
import { PaginationField } from './pagination-field';

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

  @Input() sortKeyOptions: DropdownOption[];
  @Input() totalItem: number;
  @Input() searchTextFields: string[];
  @Input() paginationFields: PaginationField;

  @Output() onChange = new EventEmitter();


  private readonly itemsPerPageOptions = [
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
  ];
  searchText = '';
  sortKey = '';
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
  changeSortKey($event) {
    this.sortKey = $event.value;
    this.currentPage = 1;
    this.createSearchObject();
    console.log(this.sortKey);
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

    this.onChange.emit(searchObject);
  }


  private loadPaginationFields(searchObject) {
    console.log(this.paginationFields);
    if (!this.paginationFields) {
      return;
    }
    if (this.paginationFields.pageNumber) {
      searchObject[this.paginationFields.pageNumber] = this.currentPage;
    } else if (this.paginationFields.startOffset) {
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
