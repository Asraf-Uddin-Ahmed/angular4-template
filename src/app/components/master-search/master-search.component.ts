import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-master-search',
  templateUrl: './master-search.component.html',
  styleUrls: [
    '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    './master-search.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class MasterSearchComponent implements OnInit {

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
  totalItem = 0;

  searchText = '';
  currentPage = 1;
  itemsPerPage = 70;

  constructor() {
    this.totalItem = 700;
  }

  ngOnInit() {
  }

  changeSortKey(sortKey) {
    this.currentPage = 1;
    console.log(sortKey);
  }
  pageChange() {
    console.log(this.currentPage);
  }
}
