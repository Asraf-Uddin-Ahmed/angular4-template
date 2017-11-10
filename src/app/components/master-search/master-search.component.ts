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
  searchText = '';

  constructor() { }

  ngOnInit() {
  }

  changeSortKey(sortKey) {
    console.log(sortKey);
  }
}
