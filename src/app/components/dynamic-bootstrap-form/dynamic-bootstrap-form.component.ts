import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import {
  DynamicFormService,
  DynamicFormControlModel,
  DynamicFormArrayModel,
  DynamicInputModel
} from '@ng-dynamic-forms/core';
import { DynamicFormArrayModelHelper } from './dynamic-form-array-model-helper';

@Component({
  moduleId: module.id,
  selector: 'app-dynamic-bootstrap-form',
  templateUrl: './dynamic-bootstrap-form.component.html',
  styleUrls: ['../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class DynamicBootstrapFormComponent implements OnInit {

  @Input() dynamicFormControlModel: DynamicFormControlModel[];

  @Output() actionSubmit = new EventEmitter();
  @Output() actionCancel = new EventEmitter();

  formGroup: FormGroup;

  private dynamicFormArrayModelHelpers: { [id: string]: DynamicFormArrayModelHelper; } = {};

  constructor(private formService: DynamicFormService) { }

  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.dynamicFormControlModel);
    this.initDynamicFormArray();
  }

  onBlur($event) {
    console.log(`BLUR event on ${$event.model.id}: `, $event);
  }
  onChange($event) {
    console.log(`CHANGE event on ${$event.model.id}: `, $event);
  }
  onFocus($event) {
    console.log(`FOCUS event on ${$event.model.id}: `, $event);
  }

  submitForm() {
    this.actionSubmit.emit(this.formGroup);
  }
  cancelForm() {
    this.actionCancel.emit();
  }


  private initDynamicFormArray() {
    for (const group in this.formGroup.value) {
      for (const input in this.formGroup.value[group]) {
        const formArray = this.formGroup.get(group).get(input) as FormArray;
        const dynamicFormArrayModel = this.formService.findById(input, this.dynamicFormControlModel) as DynamicFormArrayModel;
        this.dynamicFormArrayModelHelpers[input] = new DynamicFormArrayModelHelper(this.formService, formArray, dynamicFormArrayModel);
      }
    }
  }

}
