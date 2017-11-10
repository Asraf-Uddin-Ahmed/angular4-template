import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DropdownModel } from './dropdown-model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})

export class DropdownComponent implements OnInit {

  @Input() dropdownModel: DropdownModel;
  @Input() placeholder: string;

  @Output() onChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeOption(option) {
    this.dropdownModel.selectedOption = option;
    this.onChange.emit(option);
  }
}
