import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() options;
  @Input() placeholder: string;

  @Output() onChange = new EventEmitter();

  selectedOptionLabel = '';

  constructor() { }

  ngOnInit() {
  }

  changeOption(option) {
    this.selectedOptionLabel = option.label;
    this.onChange.emit(option);
  }
}
