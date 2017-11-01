import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import {
  DynamicFormService,
  DynamicFormControlModel,
  DynamicFormArrayModel,
  DynamicInputModel
} from '@ng-dynamic-forms/core';

@Component({
  moduleId: module.id,
  selector: 'app-dynamic-bootstrap-form',
  templateUrl: './dynamic-bootstrap-form.component.html',
  styleUrls: ['../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class DynamicBootstrapFormComponent implements OnInit {

  @Input() formModel: DynamicFormControlModel[];

  @Output() actionSubmit = new EventEmitter();
  @Output() actionCancel = new EventEmitter();

  formGroup: FormGroup;

  arrayControl: FormArray;
  arrayModel: DynamicFormArrayModel;

  constructor(private formService: DynamicFormService) { }

  ngOnInit() {

    this.formGroup = this.formService.createFormGroup(this.formModel);

    this.arrayControl = this.formGroup.get('bootstrapFormGroup2').get('bootstrapFormArray') as FormArray;
    this.arrayModel = this.formService.findById('bootstrapFormArray', this.formModel) as DynamicFormArrayModel;
  }

  add() {
    this.formService.addFormArrayGroup(this.arrayControl, this.arrayModel);
  }

  insert(context: DynamicFormArrayModel, index: number) {
    this.formService.insertFormArrayGroup(index, this.arrayControl, context);
    console.log(this.formModel);
  }

  remove(context: DynamicFormArrayModel, index: number) {
    this.formService.removeFormArrayGroup(index, this.arrayControl, context);
  }

  move(context: DynamicFormArrayModel, index: number, step: number) {
    this.formService.moveFormArrayGroup(index, step, this.arrayControl, context);
  }

  clear() {
    this.formService.clearFormArray(this.arrayControl, this.arrayModel);
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
}
