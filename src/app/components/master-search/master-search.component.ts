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
  totalItem = 700;

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
  currentPage = 1;
  itemsPerPage = 10;

  constructor() { }

  ngOnInit() {
  }

  changeSortKey($event) {
    this.sortKey = $event.value;
    this.currentPage = 1;
    console.log(this.sortKey);
  }
  changePage() {
    console.log(this.currentPage);
  }
  changeItemsPerPage($event) {
    this.itemsPerPage = $event.value;
    console.log(this.itemsPerPage);
  }
}